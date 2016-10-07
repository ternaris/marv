# -*- coding: utf-8 -*-
#
# MARV
# Copyright (C) 2016  Ternaris, Munich, Germany
#
# This file is part of MARV
#
# MARV is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# MARV is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with MARV.  If not, see <http://www.gnu.org/licenses/>.

from __future__ import absolute_import, division, print_function

import hashlib
import json
import logging
import os
from Queue import Queue
from glob import glob
from multiprocessing.connection import AuthenticationError, Listener
from os.path import getmtime
from threading import Thread

import flask
import flask_restless
from flask import current_app

from .._aggregate import Aggregate, Mapping, object_pairs_hook2
from .._detail import ALIGN
from .._model import db
from .._utils import parse_datetime, parse_filesize, render_default

LOG = logging.getLogger(__name__)


MAGIC = 45
PARSER = {
    'datetime': parse_datetime,
    'filesize': parse_filesize,
    'float': float,
    'int': int,
    'string': str,
    'string[]': str,
    'subset': lambda x: x,
    'timedelta': lambda x: x,
    'words': lambda x: x.split(),
}
VALUE_TYPE_MAP = {
    'string[]': 'string',
    'words': 'string',
}


class Meta(db.Model):
    __bind_key__ = 'listing'
    id = db.Column(db.Integer, primary_key=True)
    md5 = db.Column(db.String)
    magic = db.Column(db.Integer)


class ListingManager(object):
    loop = True
    relations = None
    secondaries = None
    Listing = None

    def __init__(self, app):
        self.relations = relations = {}
        self.secondaries = {}
        self.app = app
        self.site = site = app.site

        def generate_relation(fspec):
            secondary_name = 'listing_{}'.format(fspec.key)
            rel_id = '{}_id'.format(fspec.key)
            rel_dot_id = '{}.id'.format(fspec.key)
            secondary = db.Table(
                secondary_name,
                db.Column('listing_id', db.Integer, db.ForeignKey('listing.id')),
                db.Column(rel_id, db.Integer, db.ForeignKey(rel_dot_id)),
                info={'bind_key': 'listing'},
            )
            self.secondaries[fspec.key] = secondary
            rel_name = fspec.key.encode('ascii').capitalize()
            self.relations[fspec.key] = type(rel_name, (db.Model,), {
                '__bind_key__': 'listing',
                'id': db.Column(db.Integer, primary_key=True),
                'value': db.Column(db.String, index=True, unique=True),
            })
            return db.relationship(rel_name, secondary=secondary)

        @classmethod
        def listing_from_dct(cls, mtime, dct):
            filter_specs = site.filter_specs
            for key, value in dct.items():
                if key in filter_specs and filter_specs[key].value_type in ('subset', 'string[]'):
                    rel = relations[key]
                    rels = {x.value: x for x in rel.query.filter(rel.value.in_(value))}
                    missing = set(value) - rels.viewkeys()
                    rels.update((x, rel(value=x)) for x in missing)
                    dct[key] = rels.values()
            return cls(mtime=mtime, **dct)

        TYPES = {
            'datetime': lambda spec: db.Column(db.DateTime(timezone=True)),
            'filesize': lambda spec: db.Column(db.BigInteger),
            'string': lambda spec: db.Column(db.String),
            'string[]': generate_relation,
            'subset': generate_relation,
            'timedelta': lambda spec: db.Column(db.Float),
            'words': lambda spec: db.Column(db.String),
        }
        dct = {
            '__bind_key__': 'listing',
            'id': db.Column(db.Integer, primary_key=True),
            'json': db.Column(db.String, nullable=False),
            'mtime': db.Column(db.Float, nullable=False),
            'uuid': db.Column(db.String(34), index=True, unique=True, nullable=False),
            'from_dct': listing_from_dct,
            '__table_args__': (db.Index('fileset_filter',
                                        *[x.key for x in site.filter_specs.values() if x.value_type in (
                                            'datetime', 'filesize', 'string', 'timedelta', 'words'
                                        )]), ),
        }
        internal = dct.keys()
        dct.update((fspec.key, TYPES[fspec.value_type](fspec))
                   for fspec in site.filter_specs.values() if fspec.key not in internal)
        self.Listing = type('Listing', (db.Model,), dct)
        db.create_all(bind='listing')

        md5 = hashlib.md5()
        md5.update(self.site.config['collection']['listing_columns'])
        md5.update(self.site.config['collection']['filters'])
        md5 = md5.hexdigest()

        meta = Meta.query.first()
        if meta is None or meta.md5 != md5 or meta.magic < MAGIC:
            LOG.info('invalidating listing table due to hash mismatch')
            db.drop_all(bind='listing')
            db.create_all(bind='listing')
            db.session.add(Meta(md5=md5, magic=MAGIC))
            db.session.commit()

        self.queue = Queue()

    def listen(self):
        LOG.info('listening on %s', self.site.socket)
        listener = Listener(self.site.socket, authkey=self.site.authkey)
        while True:
            try:
                conn = listener.accept()
                uuid = conn.recv() if conn.poll(0.5) else None
                if uuid is not None:
                    self.queue.put(uuid)
                conn.close()
            except:
                LOG.warn('Exception', exc_info=True)

    def update_listing(self, loop=True):
        self.loop = loop
        Listing = self.Listing
        aggroot = self.site.aggroot
        listing_jsons = glob(os.path.join(aggroot, '*', 'listing.json'))
        with self.app.app_context():
            known = {k: v for k, v in db.session.query(Listing.uuid, Listing.mtime)}
            for listing_json in listing_jsons:
                uuid = os.path.basename(os.path.dirname(listing_json))
                mtime = getmtime(listing_json)
                known_mtime = known.pop(uuid, None)
                if mtime > known_mtime:
                    self.update_listing_row(uuid)
            if known:
                LOG.info('Discarding disappeared listings: %r', known.keys())
                Listing.query.filter(Listing.uuid.in_(known.viewkeys()))\
                             .delete(synchronize_session=False)
                db.session.commit()

            LOG.info('Listing is up-to-date')

            while self.loop:
                LOG.info('waiting for notification')
                uuid = self.queue.get()
                self.update_listing_row(uuid)

    def update_listing_row(self, uuid):
        Listing = self.Listing
        LOG.info('updating %s', uuid)
        Listing.query.filter(Listing.uuid == uuid)\
                     .delete(synchronize_session=False)
        listing_json = os.path.join(self.site.aggroot, uuid, 'listing.json')
        with open(listing_json) as f:
            listing = Listing.from_dct(
                getmtime(listing_json),
                json.load(f, object_pairs_hook=object_pairs_hook2)
            )
        db.session.add(listing)
        db.session.commit()
        LOG.debug('done')


def init_app(app, url_prefix):
    LOG.debug('init app')
    with app.app_context():
        listing_manager = ListingManager(app)
        app.Listing = Listing = listing_manager.Listing
        app.relations = relations = listing_manager.relations
        app.secondaries = secondaries = listing_manager.secondaries
        app.update_listing = listing_manager.update_listing
        app.update_listing_row = listing_manager.update_listing_row
        apimanager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)
        apimanager.create_api(Listing, url_prefix=url_prefix)
        for rel in relations.itervalues():
            apimanager.create_api(rel, url_prefix=url_prefix)

    if app.config['MARV_ENABLE_BG_THREADS']:
        thread = Thread(target=listing_manager.listen)
        thread.daemon = True
        thread.start()

        thread = Thread(target=listing_manager.update_listing)
        thread.daemon = True
        thread.start()
    else:
        listing_manager.update_listing(loop=False)

    @app.route(url_prefix + '/all-known-tags')
    def all_known_tags():
        rel = relations['tags']
        return flask.jsonify(list(sorted(x.value for x in rel.query)))

    @app.route(url_prefix + '/fileset-listing')
    def fileset_listing():
        filters = flask.request.args.get('filter', '{}')
        try:
            filters = json.loads(filters)
        except ValueError:
            return flask.abort(400)

        site = current_app.site
        query = Listing.query
        for k, v in filters.iteritems():
            spec = site.filter_specs[k]
            col = getattr(Listing, k)
            value = PARSER[spec.value_type](v['val'])
            op = v['op']
            if op == 'lt':
                query = query.filter(col < value)
            elif op == 'le':
                query = query.filter(col <= value)
            elif op == 'eq':
                query = query.filter(col == value)
            elif op == 'ne':
                query = query.filter(col != value)
            elif op == 'ge':
                query = query.filter(col >= value)
            elif op == 'gt':
                query = query.filter(col > value)
            elif op == 'substring':
                query = query.filter(col.like('%{}%'.format(value)))
            elif op == 'startswith':
                query = query.filter(col.like('{}%'.format(value)))
            elif op == 'any':
                rel = relations[k]
                sec = secondaries[k]
                relquery = rel.query\
                              .join(sec)\
                              .filter(rel.value.in_(value))\
                              .with_entities(sec.c.listing_id)
                query = query.filter(Listing.id.in_(relquery.subquery()))
                #query = query.filter(col.any(rel.value.in_(value)))
            elif op == 'all':
                rel = relations[k]
                sec = secondaries[k]
                relquery = rel.query\
                              .join(sec)\
                              .filter(reduce(lambda x, y: x|y, (rel.value == x for x in value)))\
                              .group_by(sec.c.listing_id)\
                              .having(db.func.count('*') == len(value))\
                              .with_entities(sec.c.listing_id)
                query = query.filter(Listing.id.in_(relquery.subquery()))
            elif op == 'substring_any':
                rel = relations[k]
                query = query.filter(col.any(rel.value.like('%{}%'.format(value))))
            elif op == 'words':
                query = reduce(lambda query, x: query.filter(col.like('%{}%'.format(x))),
                               value, query)
            else:
                flask.abort(400)
        rows = [json.loads(x.json) for x in query]
        listing_columns = site.listing_columns

        fspecs = site.filter_specs
        all_known = {name: list(sorted([x.value for x in rel.query]))
                     for name, rel in relations.items()
                     if set(['any', 'all']).intersection(fspecs[name].operators)}
        filters = [{'key': x.key,
                    'constraints': all_known.get(x.key),
                    'title': x.title,
                    'operators': x.operators,
                    'value_type': VALUE_TYPE_MAP.get(x.value_type, x.value_type)}
                   for x in site.filter_specs.itervalues()]

        summary = site.listing_summary(Mapping([('rows', rows)]))
        return flask.jsonify({
            'all_known': all_known,
            'filters': {'title': 'Filter',
                        'widget': {'type': 'filter', 'filters': filters}},
            'summary': {'title': 'Summary',
                        'widget': summary},
            'listing': {'title': 'Data sets ({} found)'.format(len(rows)),
                        'widget': {
                            'columns': [{
                                'align': ALIGN[x.formatter],
                                'formatter': x.formatter,
                                'sort_key': 'title' if x.formatter == 'route' else None,
                                'title': x.heading,
                                'list': x.islist,
                            } for x in listing_columns],
                            'rows': rows,
                            'sort': site.listing_sort_idx,
                            'sort_descending': site.listing_sort_descending,
                            'type': 'table'}},
        })

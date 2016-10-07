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

import csv
import fcntl
import json
import logging
import os
import shutil
from collections import OrderedDict, namedtuple
from importlib import import_module
from multiprocessing.connection import Client
from pkg_resources import iter_entry_points
from uuid import uuid4

import bcrypt
from configparser import ConfigParser

from ._aggregate import Aggregate, enc_default
from ._detail import Detail, parse_listing_columns
from ._detail import Keyval
from ._model import Fileset, db
from ._scan import ScanContext
from ._node import DAG
from ._utils import render_default


LOG = logging.getLogger(__name__)


class UnknownFilesets(Exception):
    pass


class ConfigError(Exception):
    pass


class Site(object):
    """A Marv site"""
    Listing = None
    Meta = None
    relations = None
    secondaries = None
    detail = None
    filter_specs = None
    listing_columns = None
    listing_headings = None
    listing_sort_idx = None
    listing_sort_descending = None
    listing_summary = None
    nodes = None
    profile = None
    scanroot = None
    server_available = None
    settype = None
    settypename = None

    def __init__(self, config):
        self.configfile = config
        self.configdir = os.path.dirname(config)
        self.config = ConfigParser()
        dbdir = os.path.join(self.configdir, 'db')
        if not os.path.exists(dbdir):
            os.makedirs(dbdir)
        self.dburi_files = 'sqlite:///' + os.path.join(dbdir, 'files.sqlite')
        self.dburi_listing = 'sqlite:///' + os.path.join(dbdir, 'listing.sqlite')
        self.aggroot = os.path.join(self.configdir, 'aggroot')
        self.authfile = os.path.join(self.configdir, 'users')
        self.socket = os.path.join(self.configdir, 'notify')
        authkey_file = os.path.join(self.configdir, 'authkey')
        if not os.path.exists(authkey_file):
            fd = os.open(authkey_file, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
            f = os.fdopen(fd, 'w')
            f.write(str(uuid4()))
            f.close()
        with open(authkey_file) as f:
            self.authkey = f.read()
        sessionkey_file = os.path.join(self.configdir, 'sessionkey')
        if not os.path.exists(sessionkey_file):
            fd = os.open(sessionkey_file, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
            f = os.fdopen(fd, 'w')
            f.write(str(uuid4()))
            f.close()
        with open(sessionkey_file) as f:
            self.sessionkey = f.read()
        self.sessionkey_file = sessionkey_file

    def load_config(self, _skip_nodes=False):
        with open(self.configfile) as f:
            self.config.read_file(f)
        cfg = self.config
        profiles = {ep.name: ep for ep in iter_entry_points(group='marv_profiles')}
        self.profile = profiles[cfg['marv']['profile']].load()
        colcfg = cfg['collection']
        lscfg = colcfg.get('listing_summary')
        self.listing_summary = Keyval(lscfg) if lscfg else None
        self.scanroot = os.path.abspath(os.path.join(self.configdir, colcfg['scanroot']))
        self.settypename = colcfg['fileset_type']
        self.window_title = colcfg.get('window_title', 'Marv')

        if not _skip_nodes:
            self.settype = import_module(self.settypename)
            self.nodes = DAG.from_config(cfg)

        secset = {k for k in cfg._proxies}
        secset.difference_update('node {}'.format(k) for k in
                                 cfg['collection'].get('nodes', '').split())
        secset.difference_update(['DEFAULT', 'collection'])
        self.detail = Detail.from_config(cfg, secset)
        self.listing_columns = parse_listing_columns(colcfg.get('listing_columns', ''))
        self.listing_headings = [x.heading for x in self.listing_columns]
        listing_sort = colcfg.get('listing_sort', None)
        if listing_sort:
            sort = [x.strip() for x in listing_sort.split('|')]
            self.listing_sort_idx = self.listing_headings.index(sort[0])
            self.listing_sort_descending = 'descending' in sort[1:2]

        FilterSpec = namedtuple('FilterSpec', ['key', 'title', 'operators',
                                               'value_type', 'inputs', 'extractor'])
        self.filter_specs = OrderedDict()
        string = self.config['collection'].get('filters', '')
        for i, row in enumerate(
                csv.DictReader(string.split('\n'), FilterSpec._fields,
                               delimiter='|', skipinitialspace=True, strict=True)
        ):
            row = {k: v and v.strip() or v for k, v in row.items()}
            assert row['key'] not in self.filter_specs
            row['operators'] = row['operators'].split()
            row['inputs'] = row['inputs'].split()
            self.filter_specs[row['key']] = FilterSpec(**row)

        if 'tags' not in self.filter_specs:
            raise ConfigError("Missing obligatory filter 'tags'")
        if 'uuid' not in self.filter_specs:
            raise ConfigError("Missing obligatory filter 'uuid'")
        if 'files' not in self.filter_specs:
            raise ConfigError("Missing obligatory filter 'files'")

        if secset:
            LOG.warn('Unused config sections %r', sorted(secset))

    def write_config(self):
        with open(self.configfile, 'w') as f:
            self.config.write(f)

    def node_run(self, uuids=None, update_detail=True, rerun=False, **kw):
        uuids = os.listdir(self.aggroot) if uuids is None else uuids
        for uuid in uuids:
            aggdir = os.path.join(self.aggroot, str(uuid))
            with Aggregate(aggdir) as agg:
                need_run = self.nodes.need_run(agg, rerun=rerun, **kw)
                for node in need_run:
                    agg.update(node.name, node)
                if update_detail:
                    detail_json = os.path.join(agg.path, 'detail.json')
                    if rerun or not os.path.exists(detail_json) or \
                       agg.mtime > os.stat(detail_json).st_mtime:
                        self.render_detail(agg)
                listing_json = os.path.join(agg.path, 'listing.json')
                if rerun or not os.path.exists(listing_json) or \
                   agg.mtime > os.stat(listing_json).st_mtime:
                    self.render_listing(agg)

    def node_discard(self, uuids=(), nodes=(), update_detail=True):
        uuids = os.listdir(self.aggroot) if uuids is 'ALL' else uuids
        for uuid in uuids:
            aggdir = os.path.join(self.aggroot, str(uuid))
            with Aggregate(aggdir) as agg:
                agg.discard(*nodes)
                if update_detail:
                    self.render_detail(agg)
                self.render_listing(agg)

    def scan(self):
        LOG.debug('scan')
        ctx = ScanContext(self.aggroot, self.scanroot, self.settype, self.settypename,
                          self.render_listing, self.render_detail)
        ctx.scan()
        return ctx

    def render_detail(self, agg):
        LOG.info('Rendering detail for %s', agg.fileset.uuid)
        detail = self.detail(agg)
        tmp = os.path.join(agg.path, 'detail.json.tmp')
        real = os.path.join(agg.path, 'detail.json')
        with open(tmp, 'w') as f:
            json.dump(detail, f, sort_keys=True, indent=2, default=render_default)
        os.rename(tmp, real)

    def render_listing(self, agg, notify=True):
        uuid = agg.fileset.uuid
        LOG.info('Render listing for %s', uuid)
        listing = {}
        for fspec in self.filter_specs.values():
            inputs = agg.subset(fspec.inputs)
            if not inputs:
                continue
            value = inputs.extract(fspec.extractor)
            # if fspec.value_type in ('subset', 'string[]'):
            #     rel = self.relations[fspec.key]
            #     value = [rel.query.filter(rel.value == x).first() or rel(value=x)
            #              for x in value]
            if fspec.value_type == 'timedelta':
                value = int(value.total_seconds())
            elif fspec.value_type == 'words':
                value = ' '.join(value)
            listing[fspec.key] = value
        listing['json'] = json.dumps({'id': uuid,
                                      'tags': agg.get('tags', []),
                                      'values': [col(agg)
                                                 for col in self.listing_columns]},
                                     default=render_default)
        tmp = os.path.join(agg.path, 'listing.json.tmp')
        real = os.path.join(agg.path, 'listing.json')
        with open(tmp, 'w') as f:
            json.dump(listing, f, sort_keys=True, indent=2, default=enc_default)
        os.rename(tmp, real)
        if notify:
            self.notify_listing(uuid)

    def remove_fileset(self, uuid, notify=True):
        uuid = str(uuid)
        aggdir = os.path.join(self.aggroot, uuid)
        with Aggregate(aggdir) as agg:
            fileset = Fileset.query.filter(Fileset.uuid == uuid).first()
            for x in fileset.files:
                db.session.delete(x)
            db.session.delete(fileset)
            db.session.commit()
            shutil.rmtree(aggdir)
        if notify:
            self.notify_listing(uuid)

    def notify_listing(self, uuid):
        if self.server_available is None:
            try:
                conn = Client(self.socket, authkey=self.authkey)
                conn.send(None)
            except IOError:
                LOG.debug('Server unavailable, disabling notifications')
                self.server_available = False
            else:
                self.server_available = True
                conn.close()

        if self.server_available:
            LOG.debug('notify for %s', uuid)
            conn = Client(self.socket, authkey=self.authkey)
            conn.send(uuid)
            conn.close()

    def authenticate(self, username, password):
        with open(self.authfile) as f:
            users = json.load(f)
        hashed = users[username].encode('utf-8')
        return bcrypt.hashpw(password, hashed) == hashed

    def user_add(self, username, password):
        # XXX: fixme
        if not os.path.exists(self.authfile):
            fd = os.open(self.authfile, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
            fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
            users = {}
        else:
            fd = os.open(self.authfile, os.O_RDONLY)
            fcntl.flock(fd, fcntl.LOCK_EX)
            with open(self.authfile) as f:
                users = json.load(f)

        if username in users:
            raise ValueError('User already exists %r' % username)
        users[username] = bcrypt.hashpw(password, bcrypt.gensalt())

        with open(self.authfile, 'w') as f:
            json.dump(users, f)
        fcntl.flock(fd, fcntl.LOCK_UN)
        os.close(fd)

    def user_rm(self, username):
        fd = os.open(self.authfile, os.O_RDONLY)
        fcntl.flock(fd, fcntl.LOCK_EX)
        with open(self.authfile) as f:
            users = json.load(f)

        del users[username]

        tmpfile = self.authfile + '.tmp'
        with open(tmpfile, 'w') as f:
            json.dump(users, f)
        os.rename(tmpfile, self.authfile)

    def user_pw(self, username, password):
        fd = os.open(self.authfile, os.O_RDONLY)
        fcntl.flock(fd, fcntl.LOCK_EX)
        with open(self.authfile) as f:
            users = json.load(f)

        assert username in users
        users[username] = bcrypt.hashpw(password, bcrypt.gensalt())

        tmpfile = self.authfile + '.tmp'
        with open(tmpfile, 'w') as f:
            json.dump(users, f)
        os.rename(tmpfile, self.authfile)

    def get_file_paths(self, **uuid):
        # XXX: broken
        return [Aggregate(os.path.join(self.outdir, x)).fileset for x in uuid]

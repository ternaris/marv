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

import os
from datetime import datetime
from itertools import groupby
from uuid import uuid4

import flask
import flask_login
from flask import Blueprint, current_app
from flask_login import current_user, login_user, logout_user

from . import listing
from .._aggregate import Aggregate
from .._model import db


api = Blueprint('webapi2', __name__)


def register(app, url_prefix=None):
    app.register_blueprint(api, url_prefix=url_prefix)
    login_manager = flask_login.LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User(id)

    listing.init_app(app, url_prefix=url_prefix)


### Public API for fetching data

@api.route('/fileset-detail/<uuid:uuid>/download/<int:idx>')
def download(uuid, idx):
    aggdir = os.path.join(current_app.site.aggroot, str(uuid))
    agg = Aggregate(aggdir)
    try:
        path = agg.fileset.files[idx].path
    except (IndexError, IOError):
        return flask.abort(404)
    return flask.send_file(path, as_attachment=True,
                           attachment_filename=os.path.basename(path))


@api.route('/file-list', methods=['POST'])
def file_list():
    Listing = current_app.Listing
    uuids = flask.request.get_json()
    files_rel = current_app.relations['files']
    files_sec = current_app.secondaries['files']
    query = files_rel.query.join(files_sec)\
                           .join(Listing)\
                           .filter(Listing.uuid.in_(uuids))\
                           .with_entities(Listing.uuid, files_rel.value)\
                           .order_by(Listing.uuid) if uuids else []
    return flask.jsonify({
        k: v for k, v in
        zip(('urls', 'paths'),
            zip(*(('fileset-detail/{}/download/{}'.format(uuid, i), relpath)
                  for uuid, files in groupby(query, key=lambda x: x[0])
                  for i, (_, relpath) in enumerate(files))))
    })


@api.route('/fileset-detail/<uuid:uuid>', defaults={'path': 'detail.json'})
@api.route('/fileset-detail/<uuid:uuid>/<path:path>')
def fileset_detail(uuid, path):
    aggdir = os.path.join(current_app.site.aggroot, str(uuid))
    try:
        return flask.send_from_directory(aggdir, path)
    except IOError:
        return flask.abort(404)


### Protected API

@api.route('/comment', methods=['POST'])
@flask_login.login_required
def comment():
    username = flask_login.current_user.username
    rv = {}
    for uuid, instructions in flask.request.get_json().items():
        aggdir = os.path.join(current_app.site.aggroot, str(uuid))
        with Aggregate(aggdir, catch_exc=False) as agg:
            comments = agg.get('comments') or []
            new_comments = [{'id': str(uuid4()),
                             'comment': x,
                             'timestamp': datetime.utcnow(),
                             'username': username}
                            for x in instructions['add']]
            def make_update(comments, new_comments):
                def update(_):
                    comments.extend(new_comments)
                    return comments
                update.cfg = {}
                update.inputs = {}
                update.params = {}
                return update
            agg.update('comments', make_update(comments, new_comments))
            current_app.site.render_detail(agg)
            current_app.site.render_listing(agg, notify=False)
            current_app.update_listing_row(agg.fileset.uuid)

    # join empty lines
    # if error_message:
    #     rv['error'] = error_message
    return flask.jsonify({})


@api.route('/tag', methods=['POST'])
@flask_login.login_required
def tag():
    for uuid, instructions in flask.request.get_json().items():
        aggdir = os.path.join(current_app.site.aggroot, str(uuid))
        with Aggregate(aggdir, catch_exc=False) as agg:
            tags = set(agg.get('tags') or [])
            add = instructions.get('add', [])
            remove = instructions.get('remove', [])
            def make_update(tags, add, remove):
                def update(_):
                    tags.update(add)
                    tags.difference_update(remove)
                    return list(sorted(tags))
                update.cfg = {}
                update.inputs = {}
                update.params = {}
                return update
            agg.update('tags', make_update(tags, add, remove))
            current_app.site.render_detail(agg)
            current_app.site.render_listing(agg, notify=False)
            current_app.update_listing_row(agg.fileset.uuid)
    return flask.jsonify({})


@api.route('/fileset', methods=['DELETE'])
@flask_login.login_required
def delete():
    for uuid in flask.request.get_json():
        current_app.site.remove_fileset(uuid, notify=False)
        current_app.update_listing_row(uuid)
    return flask.jsonify({})


# # XXX: protect and think about naming and mechanism
# @api.route('/render-listing', methods=['POST'])
# def state():
#     for uuid in flask.request.get_json():
#           fooo
#     db.session.commit()


### Authentication

class User(object):
    def __init__(self, username):
        self.username = username

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.username)


@api.route('/login', methods=['GET', 'POST'])
def login():
    if flask.request.method == 'POST':
        # XXX: POST should not be allowed if logged in
        if current_user.is_authenticated:
            logout_user()
        req = flask.request.get_json()
        username = req.get('username', '')
        password = req.get('password', '').encode('utf-8')
        if current_app.site.authenticate(username, password):
            user = User(username)
            login_user(user, remember=True)
    username = current_user.username if current_user.is_authenticated else None
    return flask.jsonify({'username': username})


@api.route('/logout', methods=['POST'])
@flask_login.login_required
def logout():
    logout_user()
    return flask.jsonify('')

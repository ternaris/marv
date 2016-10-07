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

import fcntl
import os
from datetime import datetime, timedelta

import flask
from pkg_resources import resource_filename

from .._aggregate import Mapping, Sequence
from .._model import db
from .._site import Site


class CustomJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, timedelta):
            return obj.total_seconds()
        elif isinstance(obj, Mapping):
            return obj._dct
        elif isinstance(obj, Sequence):
            return obj._list
        else:
            raise TypeError(type(obj))
        return flask.json.JSONEncoder.default(self, obj)


def create_app(marv_config, config_obj=None, web=True, app_root=None, **kw):
    app = flask.Flask(__name__)
    app.site = site = Site(marv_config)

    # default config
    app.config['APPLICATION_ROOT'] = app_root or None
    app.config['MARV_ENABLE_BG_THREADS'] = True
    app.config['SQLALCHEMY_BINDS'] = {'listing': site.dburi_listing}
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = site.dburi_files
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = site.sessionkey

    if web:
        app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
        app.json_encoder = CustomJSONEncoder

    if config_obj is not None:
        app.config.from_object(config_obj)
    app.config.update(kw)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    if not web:
        site.load_config()
        return app

    # Only one webserver
    #fd = os.open(site.sessionkey_file, os.O_RDONLY)
    #fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)

    from . import webapi2
    site.load_config(_skip_nodes=True)
    webapi2.register(app, '/marv/api/2')

    with open(resource_filename('marv.app', 'static/index.html')) as f:
        index_html = f.read().replace('MARV_APP_ROOT', app_root or "")\
                             .replace('MARV_CODE_LINK', site.profile.code_link)\
                             .replace('MARV_ISSUES_LINK', site.profile.issues_link)\
                             .replace('MARV_LOGO', site.profile.logo)\
                             .replace('MARV_WINDOW_TITLE', site.profile.window_title)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def assets(path):
        if not path:
            path = 'index.html'
        if path == 'index.html':
            return index_html
        return flask.send_from_directory(
            os.path.join(resource_filename('marv.app', 'static')), path)

    return app

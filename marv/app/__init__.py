# -*- coding: utf-8 -*-
#
# MARV
# Copyright (C) 2016-2017  Ternaris, Munich, Germany
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

import base64
import os
import sys
from logging import getLogger
from uuid import uuid4

import flask
import sqlalchemy.exc

from ..model import db


log = getLogger(__name__)


def create_app(site, config_obj=None, app_root=None, checkdb=False, **kw):
    app = flask.Flask(__name__)
    app.site = site

    try:
        fd = os.open(site.config.marv.sessionkey_file,
                     os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o666)
    except OSError:
        pass
    else:
        with os.fdopen(fd, 'w') as f:
            f.write(str(uuid4()))
        log.verbose('Generated %s', site.config.marv.sessionkey_file)

    with open(site.config.marv.sessionkey_file) as f:
        app.config['SECRET_KEY'] = f.read()

    # default config
    app_root = app_root.rstrip('/') if app_root else None
    app.config['APPLICATION_ROOT'] = app_root or None
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.config['SQLALCHEMY_DATABASE_URI'] = site.config.marv.dburi
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if config_obj is not None:
        app.config.from_object(config_obj)
    app.config.update(kw)

    db.init_app(app)
    if checkdb:
        with app.app_context():
            try:
                db.session.execute('SELECT name FROM sqlite_master WHERE type="table";')
            except sqlalchemy.exc.OperationalError:
                log.critical('Database not initialized, run marv init and restart')
                sys.exit(1)

    from marv_webapi import webapi
    webapi.init_app(app, url_prefix='/marv/api')

    staticdir = site.config.marv.staticdir
    with open(os.path.join(staticdir, 'index.html')) as f:
        index_html = f.read().replace('MARV_APP_ROOT', app_root or "")

    customjs = os.path.join(site.config.marv.frontenddir, 'custom.js')
    try:
        with(open(customjs)) as f:
            data = base64.b64encode(f.read())
    except IOError:
        pass
    else:
        assert '<script async src="main-built.js"></script>' in index_html
        index_html = index_html.replace(
            '<script async src="main-built.js"></script>',
            '<script src="data:text/javascript;base64,{}"></script>'.format(data) +
            '\n<script async src="main-built.js"></script>', 1
        )

    customcss = os.path.join(site.config.marv.frontenddir, 'custom.css')
    try:
        with(open(customcss)) as f:
            data = base64.b64encode(f.read())
    except IOError:
        pass
    else:
        assert '<link async rel="stylesheet" href="main-built.css" />' in index_html
        index_html = index_html.replace(
            '<link async rel="stylesheet" href="main-built.css" />',
            '<link async rel="stylesheet" href="main-built.css" />' +
            '<link rel="stylesheet" href="data:text/css;base64,{}" />'.format(data), 1
        )

    customdir = os.path.join(site.config.marv.frontenddir, 'custom')
    @app.route('/custom/<path:path>')
    def custom(path):
        return flask.send_from_directory(customdir, path, conditional=True)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def assets(path):
        if not path:
            path = 'index.html'

        if path == 'index.html':
            return index_html

        if path == 'docs':
            return flask.redirect(flask.request.base_url + '/', 301)

        if path == 'docs/':
            path = 'docs/index.html'

        return flask.send_from_directory(staticdir, path, conditional=True)

    return app

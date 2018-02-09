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

import os
from marv_cli import setup_logging
setup_logging(os.environ.get('MARV_LOGLEVEL', 'info'))

config = os.environ['MARV_CONFIG']
app_root = os.environ['MARV_APPLICATION_ROOT']

import marv.app
import marv.site
site = marv.site.Site(config)
site.load_for_web()
application = marv.app.create_app(site, app_root=app_root, checkdb=True)

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

from pkg_resources import resource_stream

from .app import create_app
from ._decorators import *
from ._globals import *

# XXX: only for bb testing, would be nice to get onto proper make_fileset
from ._model import make_fileinfo, make_filesetinfo

# XXX: used by bagset integration test
from ._site import Site


class Profile(object):
    def __init__(self, package, base, code_link, issues_link, logo,
                 scanroot_prompt, window_title):
        self.package = package
        self.base = base
        self.code_link = code_link
        self.issues_link = issues_link
        self.logo = logo
        self.scanroot_prompt = scanroot_prompt
        self.window_title = window_title

    @property
    def marv_conf_in(self):
        name = '/'.join([self.base, 'marv.conf.in'])
        return resource_stream(self.package, name).read()

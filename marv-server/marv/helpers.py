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


def detail_route(fileset, bagset_name):
    return {
        'route': 'detail',
        'id': fileset.uuid,
        'title': fileset.uuid if bagset_name is None else bagset_name,
    }


def download_link(file, fileset):
    return {
        'href': 'download/{}'.format(fileset.files.index(file)),
        'target': '_blank',
        'title': file.relpath,
    }


def file_status(file):
    state = []
    if file.missing:
        state.append({'icon': 'hdd',
                      'title': 'This file is missing',
                      'classes': 'text-danger'})
    return state

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

import marv


@marv.node()
@marv.input('fileset')
def md5(fileset):
    rv = []
    for file in fileset.files:
        md5 = hashlib.md5()
        with open(file.path, 'rb') as f:
            while True:
                data = f.read(1 << 20)
                if not data:
                    break
                md5.update(data)
        rv.append(md5.hexdigest())
    return rv

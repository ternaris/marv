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


from collections import OrderedDict


class DefaultOrderedDict(OrderedDict):
    def __init__(self, factory):
        super(DefaultOrderedDict, self).__init__()
        self._factory = factory

    def __getitem__(self, key):
        try:
            return super(DefaultOrderedDict, self).__getitem__(key)
        except KeyError:
            value = self._factory()
            self[key] = value
            return value

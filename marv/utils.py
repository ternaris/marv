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

import re
from datetime import datetime, timedelta
from datetime import tzinfo as tzinfo_base
from importlib import import_module
from itertools import islice

from marv_node.setid import decode_setid, encode_setid


def chunked(iterable, chunk_size):
    it = iter(iterable)
    return iter(lambda: tuple(islice(it, chunk_size)), ())


def find_obj(objpath, name=False):
    modpath, objname = objpath.split(':')
    mod = import_module(modpath)
    obj = getattr(mod, objname)
    return (objname, obj) if name else obj


def parse_filesize(string):
    val, unit = re.match(r'^\s*([0-9.]+)\s*([kmgtpezy]b?)?\s*$', string, re.I)\
                  .groups()
    val = float(val)
    if unit:
        val *= 1 << (10 * (1 + 'kmgtpezy'.index(unit.lower()[0])))
    return int(val)


def parse_datetime(s):
    class TZInfo(tzinfo_base):
        def __init__(self, offset=None):
            self.offset = offset

        def tzname(self, dt):
            return self.offset

        def utcoffset(self, dt):
            if self.offset == 'Z':
                hours, minutes = 0, 0
            else:
                hours, minutes = self.offset[1:].split(':')
            offset = timedelta(hours=int(hours), minutes=int(minutes))
            return offset if self.offset[0] == '+' else -offset

    groups = re.match(r'^(\d\d\d\d)-(\d\d)-(\d\d)T'
                     r'(\d\d):(\d\d):(\d\d)((?:[+-]\d\d:\d\d)|Z)$', s)\
              .groups()
    tzinfo = TZInfo(groups[-1])
    return datetime(*(int(x) for x in groups[:-1]), tzinfo=tzinfo)


def profile(func, sort='cumtime'):
    import functools
    import pstats
    from cProfile import Profile
    pr = Profile()
    @functools.wraps(func)
    def profiled(*args, **kw):
        pr.enable()
        rv = func(*args, **kw)
        pr.disable()
        ps = pstats.Stats(pr).sort_stats(sort)
        ps.print_stats()
        return rv
    return profiled


def underscore_to_camelCase(s):
    return ''.join(x.capitalize() for x in s.split('_'))

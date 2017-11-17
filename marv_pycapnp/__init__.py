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

import os
from collections import Mapping, Sequence

from capnp.lib.capnp import _DynamicStructReader as StructReader
from capnp.lib.capnp import _DynamicListReader as ListReader
from marv_node.setid import SetID


class ListWrapper(object):
    def __init__(self, list_reader, streamdir, setdir):
        assert isinstance(list_reader, ListReader), type(list_reader)
        self._reader = list_reader
        self._streamdir = streamdir
        self._setdir = setdir

    def __getitem__(self, idx):
        # pycapnp can't handle slices
        if isinstance(idx, slice):
            x = list(self._reader)[idx]
        else:
            x = self._reader[idx]
        streamdir = self._streamdir
        setdir = self._setdir
        return (Wrapper(x, streamdir, setdir) if isinstance(x, StructReader) else
                ListWrapper(x, streamdir, setdir) if isinstance(x, ListReader) else x)

    def __iter__(self):
        streamdir = self._streamdir
        setdir = self._setdir
        return (Wrapper(x, streamdir, setdir) if isinstance(x, StructReader) else
                ListWrapper(x, streamdir, setdir) if isinstance(x, ListReader) else x
                for x in self._reader)

    def __len__(self):
        return len(self._reader)


class Wrapper(object):
    def __init__(self, struct_reader, streamdir, setdir):
        assert isinstance(struct_reader, StructReader), type(struct_reader)
        self._reader = struct_reader
        self._streamdir = streamdir  # HACK: overloaded
        self._setdir = setdir

    # @property
    # def path(self):  # HACK: overload
    #     return os.path.realpath(os.path.join(self._streamdir, self.name))

    @property
    def relpath(self):  # HACK: overload
        path = os.path.relpath(self.path, self._setdir)
        return path.lstrip('.')

    @classmethod
    def from_dict(cls, schema, data):
        setid = data.pop('id', None)
        if isinstance(setid, SetID):
            data['id0'], data['id1'] = setid.lohi
        dct = cls._unwrap(data)
        struct_reader = schema.new_message(**dct).as_reader()
        return cls(struct_reader, None, None)

    def load(self, node):
        return node.load(self._setdir)

    @classmethod
    def _unwrap(cls, data):
        unwrap = cls._unwrap
        if isinstance(data, Mapping):
            return {k: unwrap(v) for k, v in data.iteritems()}
        elif isinstance(data, Sequence) and not isinstance(data, basestring):
            return [unwrap(x) for x in data]
        elif isinstance(data, Wrapper):
            return data._reader
        else:
            return data

    def __getattr__(self, name):
        # TODO: parse schema and do this properly
        if name == 'id' and hasattr(self._reader, 'id0'):
            return SetID(self._reader.id0, self._reader.id1)

        value = getattr(self._reader, name)

        if isinstance(value, StructReader):
            return Wrapper(value, self._streamdir, self._setdir)
        elif isinstance(value, ListReader):
            return ListWrapper(value, self._streamdir, self._setdir)
        else:
            return value

    def __repr__(self):
        return '<Wrapper {}>'.format(self._reader.schema.node.displayName)

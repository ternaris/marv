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

import struct
from base64 import b32decode, b32encode
from random import getrandbits


def decode_setid(encoded):
    """Decode setid as uint128"""
    try:
        lo, hi = struct.unpack('<QQ', b32decode(encoded.upper() + '======'))
    except struct.error:
        raise ValueError('Cannot decode {!r}'.format(encoded))
    return (hi << 64) + lo


def encode_setid(uint128):
    """Encode uint128 setid as stripped b32encoded string"""
    hi, lo = divmod(uint128, 2**64)
    return b32encode(struct.pack('<QQ', lo, hi))[:-6].lower()


class SetID(long):
    def __new__(cls, value, hi=None):
        if hi is not None:
            value = (hi << 64) + value
        value = decode_setid(value) if isinstance(value, basestring) else value
        return super(SetID, cls).__new__(cls, value)

    @classmethod
    def random(cls):
        return cls(getrandbits(128))

    @property
    def hi(self):
        return long(self) // 2**64

    @property
    def lo(self):
        return long(self) % 2**64

    @property
    def lohi(self):
        return tuple(long(x) for x in reversed(divmod(self, 2**64)))

    @property
    def abbrev(self):
        return str(self)[:10]

    def __repr__(self):
        return "SetID('{}')".format(self)

    def __str__(self):
        return encode_setid(self)

    def __unicode__(self):
        return encode_setid(self)

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

import unittest

from ..utils import decode_setid, encode_setid


class TestCase(unittest.TestCase):
    def test_encode_decode_setid(self):
        setid = 2**128 - 1
        encoded = encode_setid(setid)
        decoded = decode_setid(encoded.lower())
        self.assertEqual(encoded, '77777777777777777777777774')
        self.assertEqual(decoded, setid)

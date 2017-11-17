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

from ..setid import SetID


class TestCase(unittest.TestCase):
    def test_setid(self):
        self.assertNotEqual(SetID(42), SetID(17))
        self.assertEqual(SetID(42), SetID('fiaaaaaaaaaaaaaaaaaaaaaaaa'))
        self.assertEqual(repr(SetID(42)), "SetID('fiaaaaaaaaaaaaaaaaaaaaaaaa')")
        self.assertEqual(str(SetID(42)), 'fiaaaaaaaaaaaaaaaaaaaaaaaa')
        self.assertEqual(unicode(SetID(42)), u'fiaaaaaaaaaaaaaaaaaaaaaaaa')
        setid = SetID(42)
        self.assertEqual(setid.lohi, (setid.lo, setid.hi))
        self.assertEqual(setid.lohi, (42, 0))
        self.assertEqual(int(setid), 42)
        self.assertEqual(long(setid), 42)
        self.assertEqual(SetID(42, 0), SetID(42))
        self.assertEqual(SetID(42, 1), SetID((1 << 64) + 42))

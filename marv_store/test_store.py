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
import unittest

from . import Store
from marv_node.testing import temporary_directory
from marv_node.setid import SetID
from marv_nodes import dataset


SETID = SetID(42)


@unittest.skip
class TestCase(unittest.TestCase):
    def test(self):
        with temporary_directory() as tmpdir:
            scanroot = os.path.join(tmpdir, 'scanroot')
            os.mkdir(scanroot)
            file1 = os.path.join(scanroot, 'file1')
            file2 = os.path.join(scanroot, 'file2')
            with open(file1, 'w') as f:
                f.write('1')
            with open(file2, 'w') as f:
                f.write('10')

            storedir = os.path.join(tmpdir, 'store')
            os.mkdir(storedir)
            store = Store(storedir)
            store.add_dataset(SETID, 'testset', [file1, file2])

            reader = store[(dataset, SETID)]
            self.assertEqual(reader.key, 'dataset')
            self.assertEqual(repr(reader),
                             '<Reader fiaaaaaaaaaaaaaaaaaaaaaaaa/dataset-1>')

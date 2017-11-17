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
import shutil
import tempfile
import unittest
from contextlib import contextmanager


@contextmanager
def chdir(d):
    """Change working directory - NOT THREAD SAFE"""
    cwd = os.getcwd()
    os.chdir(d)
    try:
        yield d
    finally:
        os.chdir(cwd)


def make_scanroot(scanroot, names):
    if not os.path.exists(scanroot):
        os.makedirs(scanroot)
    for name in names:
        with open(os.path.join(scanroot, name), 'w') as f:
            f.write(name)


@contextmanager
def temporary_directory(keep=None):
    """Create, change into, and cleanup temporary directory"""
    tmpdir = tempfile.mkdtemp()
    with chdir(tmpdir):
        try:
            yield tmpdir
        finally:
            if not keep:
                shutil.rmtree(tmpdir)


def decode(data, encoding='utf-8'):
    if isinstance(data, str):
        data = data.decode(encoding)
    elif isinstance(data, dict):
        data = {decode(k): decode(v) for k, v in data.items()}
    elif isinstance(data, list):
        data = [decode(x) for x in data]
    elif isinstance(data, tuple):
        data = tuple(decode(x) for x in data)
    return data


class TestCase(unittest.TestCase):
    """Basic marv test case"""
    KEEP_TEST_DIR = None
    test_dir = None

    def run(self, result=None):
        with temporary_directory(self.KEEP_TEST_DIR) as tmpdir:
            self.test_dir = tmpdir
            super(TestCase, self).run(result)

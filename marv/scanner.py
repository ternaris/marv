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

"""
Datasets are created based on information provided by scanners.  A
scanner is responsible to group files into named datasets::

    def scan(dirpath, dirnames, filenames):
        return [DatasetInfo(os.path.basename(x), [x])
                for x in filenames
                if x.endswith('.csv')]

Scanners are called for every directory within the configured
scanroots, while files and directories starting with a ``.`` and
directories containing an (empty) ``.marvignore`` file are ignored and
will not be traversed into.

Further, traversal into subdirectories can be controlled by
altering the :paramref:`.dirnames` list in-place. To block further
traversal, e.g. for a directory-based dataset type, set it to an
empty list -- :py:func:`os.walk` is used behind the scenes::

  dirnames[:] = []

"""

from __future__ import absolute_import, division, print_function

from collections import namedtuple

DatasetInfo = namedtuple('DatasetInfo', ('name', 'files'))

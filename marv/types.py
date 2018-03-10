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

import capnp

from marv_detail.types_capnp import Section, Widget
from marv_nodes.types_capnp import Dataset, File, GeoJson, Words
from marv_pycapnp.types_capnp import BoolValue, TextValue, DataValue
from marv_pycapnp.types_capnp import Float32Value, Float64Value
from marv_pycapnp.types_capnp import Int8Value, Int16Value, Int32Value, Int64Value
from marv_pycapnp.types_capnp import UInt8Value, UInt16Value, UInt32Value, UInt64Value
from marv_pycapnp.types_capnp import TimedBool, TimedText, TimedData
from marv_pycapnp.types_capnp import TimedFloat32, TimedFloat64
from marv_pycapnp.types_capnp import TimedInt8, TimedInt16, TimedInt32, TimedInt64
from marv_pycapnp.types_capnp import TimedUInt8, TimedUInt16, TimedUInt32, TimedUInt64

__all__ = (
    'Section', 'Widget',
    'Dataset', 'File', 'GeoJson', 'Words',
    'BoolValue', 'TextValue', 'DataValue',
    'Float32Value', 'Float64Value',
    'Int8Value', 'Int16Value', 'Int32Value', 'Int64Value',
    'UInt8Value', 'UInt16Value', 'UInt32Value', 'UInt64Value',
    'TimedBool', 'TimedText', 'TimedData',
    'TimedFloat32', 'TimedFloat64',
    'TimedInt8', 'TimedInt16', 'TimedInt32', 'TimedInt64',
    'TimedUInt8', 'TimedUInt16', 'TimedUInt32', 'TimedUInt64',
)


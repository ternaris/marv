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

from .auth import auth
from .comment import comment
from .dataset import dataset
from .delete import delete
from .tag import tag
from .collection import collection, meta
from .tooling import api_group as marv_api_group


@marv_api_group()
def webapi(app):
    pass


# Groups and endpoints are all the same for now
webapi.add_endpoint(auth)
webapi.add_endpoint(comment)
webapi.add_endpoint(dataset)
webapi.add_endpoint(delete)
webapi.add_endpoint(collection)
webapi.add_endpoint(meta)
webapi.add_endpoint(tag)

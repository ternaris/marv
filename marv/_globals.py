# -*- coding: utf-8 -*-
#
# MARV
# Copyright (C) 2016  Ternaris, Munich, Germany
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

from functools import partial

from werkzeug.local import LocalStack, LocalProxy


def _lookup_log_object(name):
    top = _log_ctx_stack.top
    if top is None:
        raise RuntimeError('Running outside of log context')
    return getattr(top, name)


def _lookup_scan_object(name):
    top = _scan_ctx_stack.top
    if top is None:
        raise RuntimeError('Running outside of scan context')
    return getattr(top, name)


def _lookup_node_object(name):
    top = _node_ctx_stack.top
    if top is None:
        raise RuntimeError('Running outside of node context')
    return getattr(top, name)


_log_ctx_stack = LocalStack()
_scan_ctx_stack = LocalStack()
_node_ctx_stack = LocalStack()
log_debug = LocalProxy(partial(_lookup_log_object, 'debug'))
log_info = LocalProxy(partial(_lookup_log_object, 'info'))
log_warn = LocalProxy(partial(_lookup_log_object, 'warn'))
log_error = LocalProxy(partial(_lookup_log_object, 'error'))
make_fileset = LocalProxy(partial(_lookup_scan_object, 'make_fileset'))
make_file = LocalProxy(partial(_lookup_node_object, 'make_file'))

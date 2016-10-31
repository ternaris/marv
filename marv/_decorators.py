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

import inspect

from ._node import InputSpec, ParamSpec, NodeFunc


def _add_spec(func, arg):
    args = func.__dict__.setdefault('__marv_specs__', {})
    if arg.name in args:
        raise ValueError('Name collision {!r}'.format(arg.name))
    args[arg.name] = arg


def _get_defaults(func):
    argspec = inspect.getargspec(func)
    return dict(zip(reversed(argspec.args), reversed(argspec.defaults or [])))


def node(_ondemand=False, _autoload=False):
    """Create a node function"""
    def decorator(func):
        if isinstance(func, NodeFunc):
            raise TypeError('Attempted to convert function into node twice.')

        name = func.func_name
        specs = getattr(func, '__marv_specs__', {})

        argspec = inspect.getargspec(func)
        assert set(argspec.args) == set(specs.iterkeys())
        assert argspec.varargs is None
        assert argspec.keywords is None

        node_func = NodeFunc(name=name, func=func, specs=specs, ondemand=_ondemand)
        node_func.__doc__ = func.__doc__

        if hasattr(func, '__marv_specs__'):
            del func.__marv_specs__

        return node_func
    return decorator


def input(name, **kw):
    def decorator(func):
        _add_spec(func, InputSpec(name, **kw))
        assert _get_defaults(func).get(name) is None
        return func
    return decorator


def param(name, help=None):
    def decorator(func):
        default = _get_defaults(func)[name]
        _add_spec(func, ParamSpec(name, default, help))
        return func
    return decorator

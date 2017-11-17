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

from abc import ABCMeta, abstractproperty
from logging import getLogger


class Keyed(object):
    __metaclass__ = ABCMeta

    @abstractproperty
    def key(self):
        return None  #pragma: nocoverage

    def __cmp__(self, other):
        if not isinstance(other, type(self)):
            return NotImplemented
        return cmp(self.key, other.key)

    def __hash__(self):
        return hash((type(self), self.key))

    def __repr__(self):
        return '<{} key={!r}>'.format(type(self).__name__, self.key)


class GenWrapperMixin(object):
    _gen = None

    @property
    def close(self):
        return self._gen.close

    @property
    def next(self):
        return self._gen.next

    @property
    def send(self):
        return self._gen.send

    @property
    def throw(self):
        return self._gen.throw


class LoggerMixin(object):
    @property
    def logdebug(self):
        return self.log.debug

    @property
    def lognoisy(self):
        return self.log.noisy

    @property
    def logverbose(self):
        return self.log.verbose

    @property
    def loginfo(self):
        return self.log.info

    @property
    def logwarn(self):
        return self.log.warn

    @property
    def logerror(self):
        return self.log.error

    @property
    def log(self):
        logkey = ('marv', type(self).__name__.lower())
        if hasattr(self, 'key'):
            logkey += ((str(self.setid.abbrev),
                        self.node.name,
                        self.node.specs_hash[:10]) +
                       tuple(unicode(x) for x in self.key[2:]))
        return getLogger('.'.join(logkey))


class Task(object):
    __metaclass__ = ABCMeta
    __slots__ = ()

    def __repr__(self):
        return type(self).__name__


class Request(object):
    __metaclass__ = ABCMeta
    __slots__ = ()

    def __repr__(self):
        return type(self).__name__

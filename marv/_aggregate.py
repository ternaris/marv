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

import collections
import fcntl
import inspect
import json
import logging
import os
import shutil
import traceback
from datetime import datetime, timedelta
from io import BytesIO

from . import helpers
from ._globals import _log_ctx_stack, _node_ctx_stack, log_debug


log = logging.getLogger(__name__)


RESERVED_NODE_NAMES = ('marv', 'meta', 'listing', 'detail')


def enc_default(obj):
    if isinstance(obj, datetime):
        return {'$datetime': obj.isoformat()}
    elif isinstance(obj, timedelta):
        return {'$timedelta': obj.total_seconds()}
    elif isinstance(obj, Mapping):
        return obj._dct
    elif isinstance(obj, Sequence):
        return obj._list
    elif hasattr(obj, 'next'):
        return list(obj)
    else:
        raise TypeError(type(obj))


def object_pairs_hook(pairs):
    if len(pairs) == 1:
        key = pairs[0][0]
        value = pairs[0][1]
        if key == '$datetime':
            return datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f' if '.' in value else '%Y-%m-%dT%H:%M:%S')
        elif key == '$timedelta':
            return timedelta(0, value)
    return Mapping(pairs)


def json_dump_agg(*args, **kw):
    json.dump(*args, default=enc_default, indent=2, sort_keys=True, **kw)


def json_load_agg(*args, **kw):
    return json.load(*args, object_pairs_hook=object_pairs_hook, **kw)


def object_pairs_hook2(pairs):
    if len(pairs) == 1:
        key = pairs[0][0]
        value = pairs[0][1]
        if key == '$datetime':
            return datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f' if '.' in value else '%Y-%m-%dT%H:%M:%S')
        elif key == '$timedelta':
            return timedelta(0, value)
    return dict(pairs)


class Sequence(collections.Sequence):
    def __init__(self, items=()):
        self._list = list(items)

    def __getitem__(self, idx):
        return self._list.__getitem__(idx)

    def __len__(self):
        return self._list.__len__()


def replace_lists(obj):
    if isinstance(obj, (list, tuple)):
        return Sequence(replace_lists(x) for x in obj)
    elif isinstance(obj, dict):
        return {k: replace_lists(v) for k, v in obj.items()}
    else:
        return obj


class Mixin(object):
    def subset(self, keys):
        optional = [x.rstrip('?') for x in keys if x.endswith('?')]
        keys = set(x.rstrip('?') for x in keys)
        required = keys - set(optional)
        mapping = Mapping((k, v) for k, v in self.iteritems()
                          if k in keys and v is not None)
        for x in optional:
            mapping._dct.setdefault(x, None)
        return mapping if all((k in mapping) for k in required) else None


class Mapping(collections.Mapping, Mixin):
    def __init__(self, pairs=()):
        self._dct = dict(pairs)

    def __getitem__(self, key):
        return self._dct.__getitem__(key)

    def __iter__(self):
        return self._dct.__iter__()

    def __len__(self):
        return self._dct.__len__()

    def __getattr__(self, name):
        try:
            return self._dct.__getitem__(name)
        except KeyError:
            raise AttributeError(name)

    def get(self, key, default=None):
        return self._dct.get(key, default)

    def _normal(self, obj=None):
        obj = self if obj is None else obj
        if isinstance(obj, Mapping):
            return {k: self._normal(v) for k, v in obj._dct.items()}
        elif isinstance(obj, Sequence):
            return [self._normal(x) for x in obj._list]
        else:
            return obj

    def extract(self, spec):
        log.debug('extracting: %r', spec)
        dct = {}
        dct.update(self)
        dct['ctx'] = self
        # XXX: what makes sense here and what should only be here for
        # listing and details?
        dct['detail_route'] = helpers.detail_route
        dct['download_link'] = helpers.download_link
        dct['file_status'] = helpers.file_status
        return eval('(lambda:({}))()'.format(spec), dct)


class Aggregate(collections.Mapping, Mixin):
    _node_dir = None
    _node_dir_tmp = None

    def __init__(self, path, catch_exc=True):
        super(Aggregate, self).__init__()
        self.path = path
        self.catch_exc = catch_exc

    @classmethod
    def create(cls, path, **kw):
        os.makedirs(path)
        with open(os.path.join(path, 'meta.json'), 'w') as f:
            json_dump_agg({}, f)
        return cls(path, **kw)

    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name)

    def __getitem__(self, key):
        if key != 'meta' and not self.meta[key].has_output:
            return None
        node_json = os.path.join(self.path, '{}.json'.format(key))
        with open(node_json) as f:
            return json_load_agg(f)

    def __iter__(self):
        return iter(self.meta)

    def __len__(self):
        return len(self.meta)

    def __enter__(self):
        #self.lock()
        return self

    def __exit__(self, *exc_info):
        #self.unlock()
        if exc_info[0] is not None:
            log.warn('Exception in aggregate context', exc_info=exc_info)
            return True

    def lock(self):
        assert self._lock_fd is None
        fd = os.open(self.json_file, os.O_RDONLY)
        fcntl.flock(fd, fcntl.LOCK_EX)
        self._lock_fd = fd

    def unlock(self):
        assert self._lock_fd is not None
        fcntl.flock(self._lock_fd, fcntl.LOCK_UN)
        os.close(self._lock_fd)
        self._lock_fd = None

    @property
    def mtime(self):
        return os.stat(os.path.join(self.path, 'meta.json')).st_mtime

    def discard(self, *keys):
        assert 'fileset' not in keys, keys
        for key in keys:
            if not self.valid_key(key):
                raise ValueError('Invalid key %r' % key)

        meta = self.meta._dct
        for key in keys:
            self._cleanup_node(key)
            if key in meta:
                del meta[key]
        self._write_meta(meta)

    def _write_meta(self, value):
        node_json = os.path.join(self.path, '{}.json'.format('meta'))
        node_json_tmp = os.path.join(self.path, '{}.json.tmp'.format('meta'))
        with open(node_json_tmp, 'w') as f:
            json_dump_agg(value, f)
        os.rename(node_json_tmp, node_json)

    def valid_key(self, key):
        return not key.startswith('.') and \
            not key.startswith('_') and \
            key not in RESERVED_NODE_NAMES

    def update(self, key, node):
        assert self.valid_key(key)
        assert _node_ctx_stack.top is None
        _node_ctx_stack.push(self)

        try:
            uuid = self.fileset.uuid
        except AttributeError:
            uuid = 'NEW'

        # Setup logging for the update
        updatelog = BytesIO()
        handler = logging.StreamHandler(updatelog)
        formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')
        handler.setFormatter(formatter)
        root_logger = logging.getLogger()
        root_logger.addHandler(handler)

        assert _log_ctx_stack.top is None
        _log_ctx_stack.push(logging.getLogger('marv.node.{} {}'.format(key, uuid)))

        # XXX: deps config for messages and all dependencies
        meta = {'inputs': {x.name: x.kw for x in node.inputs.values()},
                'params': {x.name: x.default for x in node.params.values()}}
        meta['params'].update(**node.cfg)

        assert self._node_dir is None
        self._node_dir_tmp = os.path.join(self.path, '{}.tmp'.format(key))
        self._node_dir = node_dir = os.path.join(self.path, key)
        if os.path.exists(self._node_dir_tmp):
            shutil.rmtree(self._node_dir_tmp)

        meta['time_started'] = datetime.utcnow()
        try:
            value = node(self)
        except:
            value = None
            meta['error'] = traceback.format_exc()
            _log_ctx_stack.top.error('error', exc_info=True)
        meta['time_updated'] = datetime.utcnow()
        _log_ctx_stack.pop()
        updatelog.seek(0)
        meta['log'] = updatelog.readlines()
        root_logger.removeHandler(handler)
        _node_ctx_stack.pop()

        meta['has_output'] = value is not None
        if value is None:
            self._cleanup_node(key)
        else:
            old_dir = os.path.join(self.path, '{}.old'.format(key))
            if os.path.exists(old_dir):
                shutil.rmtree(old_dir)

            node_json = os.path.join(self.path, '{}.json'.format(key))
            node_json_tmp = os.path.join(self.path, '{}.json.tmp'.format(key))
            with open(node_json_tmp, 'w') as f:
                json_dump_agg(value, f)

            # Not atomic, just attempted to be as quick as possible
            if os.path.exists(node_dir):
                os.rename(node_dir, old_dir)
            os.rename(node_json_tmp, node_json)
            if os.path.exists(self._node_dir_tmp):
                os.rename(self._node_dir_tmp, node_dir)

            if os.path.exists(old_dir):
                shutil.rmtree(old_dir)

        dct = self.meta._dct
        dct[key] = meta
        self._write_meta(dct)
        self._node_dir = None
        self._node_dir_tmp = None

    def _cleanup_node(self, key):
        node_json_tmp = os.path.join(self.path, '{}.json.tmp'.format(key))
        if os.path.exists(node_json_tmp):
            os.unlink(node_json_tmp)

        node_json = os.path.join(self.path, '{}.json'.format(key))
        if os.path.exists(node_json):
            os.unlink(node_json)

        node_dir = os.path.join(self.path, key)
        node_dir_tmp = os.path.join(self.path, '{}.tmp', key)
        if os.path.exists(node_dir):
            shutil.rmtree(node_dir)
        if os.path.exists(node_dir_tmp):
            shutil.rmtree(node_dir_tmp)

    def config_for(self, key):
        return self._meta[key]['config']

    def time_updated(self, name):
        try:
            return self.meta[name].time_updated
        except KeyError:
            return datetime.fromtimestamp(0)

    def make_file(self, name):
        if not os.path.exists(self._node_dir_tmp):
            os.makedirs(self._node_dir_tmp)
        path = os.path.join(self._node_dir_tmp, name)
        fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o666)
        os.close(fd)
        log_debug('made file: %r', name)
        return path, os.path.relpath(os.path.join(self._node_dir, name), self.path)

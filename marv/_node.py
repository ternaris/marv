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

import logging
from collections import OrderedDict, defaultdict

from ._globals import log_info, log_debug
from ._utils import find_obj


log = logging.getLogger(__name__)


class InputSpec(object):
    def __init__(self, name, **kw):
        self.name = name
        self.kw = kw
        """Used to instantiate on-demand input"""


class ParamSpec(object):
    def __init__(self, name, default, help):
        self.name = name
        self.default = default
        self.type = type(default)
        self.help = help


class NodeFunc(object):
    def __init__(self, name, func, specs, ondemand=False):
        # XXX: rename to output?
        self.name = name
        self.func = func
        self.specs = specs
        self.ondemand = ondemand

    def __call__(self, *args, **kw):
        return self.func(*args, **kw)


class Node(object):
    def __init__(self, node_func, output=None, **cfg):
        assert isinstance(node_func, NodeFunc), node_func
        assert set(cfg).issubset(node_func.specs), (cfg, node_func.specs)
        # XXX: rename to name?
        self.output = output if output is not None else node_func.name
        self.name = self.output
        self.ondemand = node_func.ondemand
        self.node_func = node_func
        self.cfg = {k: node_func.specs[k].type(v) for k, v in cfg.items()}

        # node, will be filled by transformer
        self.inputs = {k: v for k, v in node_func.specs.items()
                       if isinstance(v, InputSpec)}
        self.params = {k: v for k, v in node_func.specs.items()
                       if isinstance(v, ParamSpec)}
        self.deps = OrderedDict()
        self.dependents = set()

    @classmethod
    def from_config(cls, key, node=None, output=None, **cfg):
        output = output or key.rsplit(':', 1)[-1]
        node = node or key
        return cls(find_obj(node), output=output, **cfg)

    def __call__(self, aggregate, **kw):
        # XXX: ondemand dependencies currently run in the same transformation context
        # a dedicated one might be better, forbidding make_file, but enabling logging
        #
        # Maybe the node provides log_* and aggregate.make_file
        # we would need two concurrent loggers for generators in ondemand
        inputs = {output: (dep(aggregate, **self.inputs[dep.output].kw) if dep.ondemand else
                           aggregate[output])
                  for output, dep in self.deps.items()}
        none_inputs = [k for k, v in inputs.iteritems() if v is None]
        if none_inputs:
            log_debug('skipping due to None inputs: %r', sorted(none_inputs))
            return None
        cfg = self.cfg.copy()
        cfg.update(kw)
        assert not cfg or not set(cfg).issubset(inputs), (cfg, kw, inputs)
        inputs.update(cfg)
        log_info('starting')
        rv = self.node_func(**inputs)
        log_info('finished')
        return rv

    def __repr__(self):
        return '<Node {}{!r}>'.format('ondemand ' if self.ondemand else '',
                                      self.output)


class DAG(object):
    def __init__(self, nodes):
        class DummyFileset:
            name = 'fileset'
            dependents = set()
            ondemand = False

        roots = [DummyFileset]
        missing = {}
        depends_on = defaultdict(list)
        for node in nodes:
            assert node.name != 'fileset'
            if not node.inputs:
                roots.append(node)
            else:
                missing[node.name] = set(node.inputs.iterkeys())
            for dep in node.inputs.iterkeys():
                depends_on[dep].append(node)

        # topological sort order
        ordered = OrderedDict()
        while roots:
            current = roots.pop(0)
            ordered[current.name] = current
            for node in depends_on.pop(current.name, ()):
                node.deps[current.name] = current
                current.dependents.add(node.name)
                missing[node.name].remove(current.name)
                if not missing[node.name]:
                    roots.append(node)

        if depends_on:
            raise ValueError("Unresolved deps: {}".format(sorted(depends_on)))
        log.info('Registered nodes in order: %s', ordered.keys())
        assert len(ordered) == len(nodes) + 1, (len(ordered), len(nodes) + 1)

        self.nodes = ordered

    @classmethod
    def from_config(cls, cfg):
        sections = cfg._proxies if hasattr(cfg, '_proxies') else cfg
        names = cfg['collection'].get('nodes', '').split()
        nodes = [Node.from_config(k, **sections.get('node {}'.format(k), {}))
                 for k in names]
        return cls(nodes)

    def need_run(self, agg, nodes=None, changed_config=False,
                 rerun=False, dependent=True):
        if nodes is None:
            nodes = self.nodes.keys()

        if not nodes:
            return []

        needs_run = set()
        for node in self.nodes.itervalues():
            if node.name == 'fileset' or \
               node.name not in nodes or \
               node.ondemand:
                continue
            elif rerun:
                log.debug('adding %r due to rerun', node)
                needs_run.add(node.name)
            elif changed_config and agg.config_for(node.name) != node.cfg:
                log.debug('adding %r due to changed config', node)
                needs_run.add(node.name)
            elif node.name not in agg:
                log.debug('adding %r due to missing output', node)
                needs_run.add(node.name)
            elif any((x in needs_run) for x in node.deps):
                log.debug('adding %r due to dependency', node)
                needs_run.add(node.name)
            elif agg.time_updated(node.name) < max(agg.time_updated(x) for x in node.deps):
                log.debug('adding %r due to being outdated', node)
                needs_run.add(node.name)
        if dependent:
            for node in list(needs_run):
                for dep in self.nodes[node].dependents:
                    if dep in agg:
                        needs_run.add(dep)
        return [x for x in self.nodes.itervalues() if x.name in needs_run]

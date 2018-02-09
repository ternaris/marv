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

import unittest

from ..run import run_nodes
from ..testing import make_dataset, make_sink, marv


dataset = make_dataset()
SETID = dataset.setid


class TestCase(unittest.TestCase):
    def test_run(self):
        @marv.node()
        @marv.input('offset', default=0)
        def root(offset):
            yield marv.push(10+offset)
            yield marv.push(20+offset)

        @marv.node()
        @marv.input('stream_a', default=root)
        def square(stream_a):
            while True:
                a = yield marv.pull(stream_a)
                if a is None:
                    break
                yield marv.push(a**2)

        @marv.node()
        @marv.input('stream_a', default=root)
        @marv.input('stream_b', default=root.clone(offset=5))
        @marv.input('stream_c', default=square)
        def add(stream_a, stream_b, stream_c):
            while True:
                a = yield marv.pull(stream_a)
                b = yield marv.pull(stream_b)
                c = yield marv.pull(stream_c)
                if a is None:
                    break
                yield marv.push(a+b+c)

        sinks = [make_sink(x) for x in [root, square, add]]
        run_nodes(dataset, sinks, {})
        self.assertEqual([x.stream for x in sinks], [
            [10, 20],
            [100, 400],
            [125, 445],
        ])

    def test_run_combined(self):
        @marv.node()
        @marv.input('offset', default=0)
        def root(offset):
            yield marv.push(10+offset)
            yield marv.push(20+offset)

        @marv.node()
        @marv.input('stream_a', default=root)
        def square(stream_a):
            while True:
                a = yield marv.pull(stream_a)
                if a is None:
                    break
                yield marv.push(a**2)

        @marv.node()
        @marv.input('stream_a', default=root)
        @marv.input('stream_b', default=root.clone(offset=5))
        @marv.input('stream_c', default=square)
        def add(stream_a, stream_b, stream_c):
            while True:
                a, b, c = yield marv.pull_all(stream_a, stream_b, stream_c)
                if a is None:
                    break
                yield marv.push(a+b+c)

        sinks = [make_sink(x) for x in [root, square, add]]
        run_nodes(dataset, sinks, {})
        self.assertEqual([x.stream for x in sinks], [
            [10, 20],
            [100, 400],
            [125, 445],
        ])

    def test_substream_subscription(self):
        @marv.node(group='ondemand')
        def source():
            out = yield marv.create_stream('foo')
            yield out.msg(1)

        msgs = []
        @marv.node()
        @marv.input('handle', default=marv.select(source, 'foo'))
        def consumer(handle):
            msg = yield marv.pull(handle)
            msgs.append(msg)

        sinks = [make_sink(x) for x in [consumer]]
        run_nodes(dataset, sinks, {})
        self.assertEqual(msgs, [1])

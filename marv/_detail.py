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

import csv
import logging
import re
from collections import defaultdict
from itertools import cycle


LOG = logging.getLogger(__name__)


ALIGN = defaultdict(lambda: 'left')
ALIGN.update({
    'filesize': 'right',
    'icon': 'center',
    'int': 'right',
    'timedelta': 'right',
})

# Used in case a default value instead of None is sane, e.g. in the summary
DEFAULT = defaultdict(lambda: None)
DEFAULT.update({
    'filesize': 0,
    'int': 0,
    'timedelta': 0,
})


class Detail(object):
    def __init__(self, title_spec, sections, summary):
        self.sections = sections
        self.title_spec = title_spec
        self.summary = summary

    @classmethod
    def from_config(cls, cfg, secset):
        details = cfg['collection'].get('details', '').split()
        secset.difference_update('detail {}'.format(k) for k in details)
        sections = [Section.from_config(k, **cfg['detail {}'.format(k)])
                    for k in details]
        summary = cfg['collection'].get('detail_summary', None)
        summary = Keyval(summary) if summary else None
        title_spec = cfg['collection'].get('detail_title', None)
        return cls(title_spec, sections, summary)

    def __call__(self, agg):
        LOG.debug('Rendering %r', self)
        return {'tags': agg.get('tags', []),
                'comments': agg.get('comments', []),
                'title': agg.get(self.title_spec) or agg.fileset.uuid,
                'sections': [x for x in (x(agg) for x in self.sections) if x],
                'summary': {'widget': (self.summary(agg)
                                       if self.summary else None)}}

    def __repr__(self):
        return '<Detail {!r}>'.format([x.key for x in self.sections])


class Section(object):
    def __init__(self, key, title, widget, inputs=None, collapsed=False, repeat=False):
        self.collapsed = collapsed
        self.inputs = inputs
        self.key = key
        self.repeat = repeat
        self.title = title
        self.widget = widget

    @classmethod
    def from_config(cls, key, widget, inputs=None, title=None, **cfg):
        collapsed = cfg.pop('collapsed', None)
        inputs = inputs.split() if inputs else None
        title = title or key
        repeat = widget.endswith('[]')
        if repeat:
            cfg['repeat'] = repeat
        widget = WIDGETS[widget[:-2] if repeat else widget](**cfg)
        return cls(key, title, widget, inputs, collapsed, repeat)

    def __call__(self, aggregate):
        if self.inputs:
            inputs = aggregate.subset(self.inputs)
            if not inputs:
                LOG.debug('Omitting %s for %s', self.key, aggregate.fileset.uuid)
                return None
        else:
            inputs = aggregate
        rendered = self.widget(inputs)
        widgets = rendered if self.repeat else [rendered]
        return {'type': 'section',
                'title': self.title,
                'collapsed': self.collapsed,
                'widgets': widgets}

    def __repr__(self):
        return '<Section {!r}>'.format(self.key)


class Gallery(object):
    def __init__(self, images, caption=None, repeat=False):
        self.caption = caption
        self.images = images
        self.repeat = repeat

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        caption = inputs.extract(self.caption)
        images = inputs.extract(self.images)
        if not self.repeat:
            caption = [caption]
            images = [images]
        images = ([{'src': x} for x in imgs] for imgs in images)
        rv = [{'type': 'gallery',
               'caption': x,
               'images': y} for x, y in zip(caption, images)]
        return rv

    def __repr__(self):
        return '<Gallery{} {!r} {!r}>'.format(([] if self.repeat else ''),
                                              self.caption, self.images)


class Image(object):
    def __init__(self, image, caption=None, repeat=False):
        self.caption = caption
        self.image = image
        self.repeat = repeat

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        caption = inputs.extract(self.caption)
        image = inputs.extract(self.image)
        if not self.repeat:
            caption = [caption]
            image = [image]
        image = ({'src': x} for x in image)
        rv = [{'type': 'image',
               'caption': x,
               'image': y} for x, y in zip(caption, image)]
        return rv

    def __repr__(self):
        return '<Image{} {!r} {!r}>'.format(([] if self.repeat else ''),
                                              self.caption, self.image)


class Column(object):
    def __init__(self, heading, formatter, inputs, extractor):
        self.extractor = extractor.strip()
        self.formatter = formatter.strip()
        self.heading = heading.strip()
        self.inputs = [x.strip() for x in inputs.split()]
        self.islist = self.formatter.endswith('[]')
        if self.islist:
            self.formatter = self.formatter[:-2]

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        inputs = inputs.subset(self.inputs)
        if not inputs:
            LOG.debug('Omitting %s', self.heading)
        else:
            value = inputs.extract(self.extractor)
        return (x for x in (value if inputs else cycle([[] if self.islist else None])))

    def __repr__(self):
        return '<Column {!r} {!r}>'.format(self.heading, self.inputs)


class Item(object):
    def __init__(self, heading, formatter, inputs, extractor):
        self.extractor = extractor.strip()
        self.formatter = formatter.strip()
        self.heading = heading.strip()
        self.inputs = [x.strip() for x in inputs.split()]
        self.islist = self.formatter.endswith('[]')
        if self.islist:
            self.formatter = self.formatter[:-2]

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        inputs = inputs.subset(self.inputs)
        if not inputs:
            LOG.debug('Omitting %s', self.heading)
        else:
            value = inputs.extract(self.extractor)
        return {'align': ALIGN[self.formatter],
                'formatter': self.formatter,
                'title': self.heading,
                'list': self.islist,
                'value': value if inputs else ([] if self.islist else
                                               DEFAULT[self.formatter])}

    def __repr__(self):
        return '<Item {!r} {!r}>'.format(self.heading, self.inputs)


class SummaryItem(object):
    def __init__(self, heading, formatter, inputs, extractor):
        self.extractor = extractor.strip()
        self.formatter = formatter.strip()
        self.heading = heading.strip()
        self.inputs = [x.strip() for x in inputs.split()]
        self.islist = self.formatter.endswith('[]')
        if self.islist:
            self.formatter = self.formatter[:-2]

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        inputs = inputs.subset(self.inputs)
        value = None
        if inputs:
            value = inputs.extract(self.extractor)
            LOG.debug(value)
        return {'formatter': self.formatter,
                'title': self.heading,
                'list': self.islist,
                'value': value if inputs else ([] if self.islist else
                                               DEFAULT[self.formatter])}

    def __repr__(self):
        return '<Item {!r} {!r}>'.format(self.heading, self.inputs)


class ListingColumn(object):
    def __init__(self, heading, formatter, inputs, extractor):
        self.extractor = extractor.strip()
        self.formatter = formatter.strip()
        self.heading = heading.strip()
        self.inputs = [x.strip() for x in inputs.split()]
        self.islist = self.formatter.endswith('[]')
        if self.islist:
            self.formatter = self.formatter[:-2]

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        inputs = inputs.subset(self.inputs)
        if not inputs:
            LOG.debug('Omitting %s', self.heading)
        else:
            value = inputs.extract(self.extractor)
        return value if inputs else ([] if self.islist else None)

    def __repr__(self):
        return '<Item {!r} {!r}>'.format(self.heading, self.inputs)


class Keyval(object):
    def __init__(self, items):
        if isinstance(items, basestring):
            items = parse_items(items)
        self.items = items

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        return {
            'type': 'keyval',
            'items': [item(inputs) for item in self.items],
        }

    def __repr__(self):
        return '<Keyval {!r}>'.format([x.heading for x in self.items])


class Summary(object):
    def __init__(self, items):
        if isinstance(items, basestring):
            items = parse_summary_items(items)
        self.items = items

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        return {
            'type': 'summary',
            'items': [item(inputs) for item in self.items],
        }

    def __repr__(self):
        return '<Summary {!r}>'.format([x.heading for x in self.items])


class OSM(object):
    def __init__(self, geo_json):
        self.geo_json = geo_json

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        return {
            'type': 'osm',
            'geoJSON': inputs.extract(self.geo_json)
        }

    def __repr__(self):
        return '<OSM {!r}>'.format(self.geo_json)


def parse_columns(string):
    columns = []
    for row in csv.DictReader(string.split('\n'), ['heading', 'formatter',
                                                   'inputs', 'extractor'],
                              delimiter='|', skipinitialspace=True, strict=True):
        columns.append(Column(**row))
    return columns


def parse_listing_columns(string):
    columns = []
    for row in csv.DictReader(string.split('\n'), ['heading', 'formatter',
                                                   'inputs', 'extractor'],
                              delimiter='|', skipinitialspace=True, strict=True):
        columns.append(ListingColumn(**row))
    return columns


def parse_items(string):
    items = []
    for row in csv.DictReader(string.split('\n'), ['heading', 'formatter',
                                                   'inputs', 'extractor'],
                              delimiter='|', skipinitialspace=True, strict=True):
        items.append(Item(**row))
    return items


def parse_summary_items(string):
    items = []
    for row in csv.DictReader(string.split('\n'), ['heading', 'formatter',
                                                   'inputs', 'extractor'],
                              delimiter='|', skipinitialspace=True, strict=True):
        items.append(SummaryItem(**row))
    return items


class Table(object):
    sort = None
    sort_descending = None

    def __init__(self, columns, sort=None):
        if isinstance(columns, basestring):
            columns = parse_columns(columns)
        self.columns = columns
        if sort:
            sort, flags = re.match(r'^\s*([^|]+?)\s*(?:\|(.*))?$', sort).groups()
            self.sort = (i for i, x in enumerate(columns) if x.heading == sort).next()
            if flags:
                flags = flags.split()
                self.sort_descending = 'descending' in flags

    def __call__(self, inputs):
        LOG.debug('Rendering %r', self)
        return {
            'sort': self.sort,
            'sort_descending': self.sort_descending,
            'type': 'table',
            'columns': [{'align': ALIGN[x.formatter],
                         'formatter': x.formatter,
                         'title': x.heading,
                         'list': x.islist} for x in self.columns],
            'rows': [
                {'id': i, 'values': x}
                for i, x in enumerate(zip(*(col(inputs) for col in self.columns)))],
        }

    def __repr__(self):
        return '<Table {!r}>'.format([x.heading for x in self.columns])


WIDGETS = {
    'gallery': Gallery,
    'image': Image,
    'keyval': Keyval,
    'osm': OSM,
    'table': Table,
}

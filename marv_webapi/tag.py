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

from itertools import cycle

import flask

from marv.model import Tag, dataset_tag, db
from .tooling import api_endpoint as marv_api_endpoint


@marv_api_endpoint('/tag', methods=['POST'], acl=['__authenticated__'])
def tag():
    # TODO: very similar to cli marv_tag
    changes = flask.request.get_json()
    if not changes:
        flask.abort(400)

    for collection, ops in changes.items():
        if collection not in flask.current_app.site.collections:
            flask.abort(400)

        addop = ops.get('add', {})
        removeop = ops.get('remove', {})

        add = addop.viewkeys()
        remove = removeop.viewkeys()

        if add:
            stmt = Tag.__table__.insert().prefix_with('OR IGNORE')
            db.session.execute(stmt, [{'collection': collection,
                                       'value': x} for x in add])

        if add or remove:
            tags = {value: id for id, value in (db.session.query(Tag.id, Tag.value)
                                                .filter(Tag.collection == collection)
                                                .filter(Tag.value.in_(add | remove)))}

        if add:
            stmt = dataset_tag.insert().prefix_with('OR IGNORE')
            values = [{'tag_id': x, 'dataset_id': y} for tag, ids in addop.items()
                      for x, y in zip(cycle([tags[tag]]), ids)]
            db.session.execute(stmt, values)

        if remove:
            where = reduce(lambda acc, x: acc | x, (
                ((dataset_tag.c.tag_id == x) & (dataset_tag.c.dataset_id == y))
                for tag, ids in removeop.items()
                for x, y in zip(cycle([tags[tag]]), ids)
            ))
            stmt = dataset_tag.delete().where(where)
            db.session.execute(stmt)

    db.session.commit()

    # TODO: report about unprocessed "setids"
    return flask.jsonify({})

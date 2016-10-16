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

import os
from datetime import datetime
from fnmatch import fnmatch
from uuid import uuid4
from os.path import getmtime

from ._aggregate import Aggregate
from ._globals import _scan_ctx_stack
from ._model import File, Fileset, db, make_fileinfo


import logging
LOG = logging.getLogger(__name__)


class ScanContext(object):
    def __init__(self, outdir, scanroot, settype, settypename,
                 render_listing, render_detail):
        self.outdir = outdir
        self.scanroot = scanroot
        self.settype = settype
        self.settypename = settypename
        self.pattern = self.settype.PATTERN
        self.agg_added = {}
        self.files_added = set()
        self.files_found = None
        self.files_modified = None
        self.files_new = None
        self.render_listing = render_listing
        self.render_detail = render_detail

    @property
    def files_discarded(self):
        return self.files_new - self.files_added

    def make_fileset(self, files):
        """Used by a scanner to create a fileset consisting of FILES"""
        uuid = str(uuid4())
        path = os.path.join(self.outdir, uuid)
        def add_fileset(_):
            return {'files': [{'missing': x.missing,
                               'mtime': x.mtime,
                               'path': x.path,
                               'relpath': os.path.relpath(x.path, self.scanroot),
                               'size': os.stat(x.path).st_size} for x in files],
                    'scanroot': self.scanroot,
                    'type': self.settypename,
                    'uuid': uuid}
        add_fileset.cfg = {}
        add_fileset.inputs = {}
        add_fileset.params = {}
        with Aggregate.create(path) as agg:
            agg.update('fileset', add_fileset)
            self.render_detail(agg)
            self.render_listing(agg)

        fileset = Fileset(**agg.fileset)
        db.session.add(fileset)

        self.agg_added[fileset.uuid] = agg
        self.files_added.update(files)
        LOG.info('added %r', fileset)

    def scan(self):
        self.push()
        existing = set()
        known = {x.to_info(): x for x in
                 File.query.join(Fileset).filter(Fileset.type == self.settypename)}
        known_paths = {x.path for x in known.viewkeys()}
        for dirpath, subdirs, filenames in os.walk(self.scanroot):
            # Ignore directories containing a .marvignore file
            if os.path.exists(os.path.join(dirpath, '.marvignore')):
                subdirs[:] = []
                continue

            existing.update(
                make_fileinfo(path, getmtime(path))
                for path in (os.path.join(dirpath, name) for name in filenames)
                if fnmatch(path, self.pattern)
            )

        new_or_modified = existing - known.viewkeys()
        new_fileinfos = {x for x in new_or_modified if x.path not in known_paths}
        modified = new_or_modified - new_fileinfos
        if modified:
            LOG.warn('Ignoring changed mtime of files for now')
        # for info in modified:
        #     file = known[info]
        #     file.mtime = info.mtime
        #     file.missing = info.missing
        #     # XXX: update agg.fileset

        try:
            self.settype.scan(new_fileinfos)
        except:
            db.session.rollback()
            raise

        db.session.commit()
        self.files_found = existing
        self.files_modified = modified
        self.files_new = new_fileinfos
        self.pop()

    # Context API

    def pop(self):
        if _scan_ctx_stack.top is not self:
            raise RuntimeError('Scan context to pop is not top-most')
        _scan_ctx_stack.pop()
        return self

    def push(self):
        if _scan_ctx_stack.top is not None:
            raise RuntimeError('Top-most scan context already exists')
        _scan_ctx_stack.push(self)

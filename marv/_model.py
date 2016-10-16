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
from collections import namedtuple
from datetime import datetime
from uuid import uuid4

import flask_sqlalchemy


db = flask_sqlalchemy.SQLAlchemy()

Fileinfo = namedtuple('Fileinfo', ('path', 'mtime', 'missing'))
Filesetinfo = namedtuple('Filesetinfo', ('files', 'type', 'uuid'))

def make_fileinfo(path, mtime, missing=None):
    """Create Fileinfo object with some defaults"""
    return Fileinfo(path, mtime, missing or False)


def make_filesetinfo(files, type, uuid=None):
    return Filesetinfo(files, type, uuid)


class File(db.Model):
    """Minimum information to track a file on the filesystem"""
    id = db.Column(db.Integer, primary_key=True)
    fileset_id = db.Column(db.Integer, db.ForeignKey('fileset.id'), nullable=False)
    missing = db.Column(db.Boolean)
    mtime = db.Column(db.Float, nullable=False)
    relpath = db.Column(db.String, unique=True, nullable=False)

    @property
    def path(self):
        return os.path.join(self.fileset.scanroot, self.relpath)

    def to_info(self):
        """Return Fileinfo object for File model"""
        return make_fileinfo(self.path, self.mtime, self.missing)

    def __repr__(self):
        return '<{} "{}">'.format(self.__class__.__name__, self.path)


class Fileset(db.Model):
    """Minimum information to track a set of files"""
    id = db.Column(db.Integer, primary_key=True)
    files = db.relationship('File', backref=db.backref('fileset', uselist=False))
    scanroot = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    uuid = db.Column(db.String(36), unique=True, nullable=False)

    def __init__(self, files, **kw):
        files = [(x if isinstance(x, File) else
                  File(missing=x.missing, mtime=x.mtime, relpath=x.relpath))
                 for x in files]
        super(Fileset, self).__init__(files=files, **kw)

    def __repr__(self):
        return '<{} "{}" files={} last={}>'.format(
            self.__class__.__name__, self.type, len(self.files), self.files[-1]
        )

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

import json
import os
import shutil
import sys
import tempfile
import traceback
import unittest
from functools import partial
from itertools import groupby

from click.testing import CliRunner
from mock import patch

import marv
from marv.app import create_app
from marv.cli import marv as marvcli


PATTERN='*'


@marv.node()
@marv.input('fileset')
def fileset_name(fileset):
    return os.path.basename(os.path.dirname(fileset.files[0].path))


def scan(new_files):
    for _, files in groupby(sorted(new_files),
                            lambda x: os.path.basename(os.path.dirname(x.path))):
        marv.make_fileset(files)


UUIDS = [
    "00000000-0000-0000-0000-000000000000",
    "11111111-1111-1111-1111-111111111111",
    "22222222-2222-2222-2222-222222222222",
    "33333333-3333-3333-3333-333333333333",
    "44444444-4444-4444-4444-444444444444",
    "55555555-5555-5555-5555-555555555555",
    "66666666-6666-6666-6666-666666666666",
]


def uuid4_mock():
    return iter(UUIDS)


class TestCase(unittest.TestCase):
    MARV_ENABLE_BG_THREADS = False
    MARV_TESTING_CATCH = not set(['--pdb', '--ipdb']).intersection(set(sys.argv))
    MARV_TESTING_KEEP = os.environ.get('MARV_TESTING_KEEP')
    MARV_TESTING_RECORD = os.environ.get('MARV_TESTING_RECORD')
    MARV_CONF = """
    [marv]
    profile = robotics

    [collection]
    scanroot = ./scanroot
    fileset_type = marv.tests.test_functional
    nodes =
        marv.nodes:md5
        marv.tests.test_functional:fileset_name
    filters =
        uuid  | UUID  | startswith    | string   | fileset | fileset.uuid
        tags  | Tags  | any all       | subset   | tags    | tags
        files | Files | substring_any | string[] | fileset | x.relpath for x in fileset.files
    listing_summary =
        filesets | int      | rows | len(rows)
        size     | filesize | rows | sum(x['values'][1] or 0 for x in rows)
    listing_columns =
        Name | route    | fileset fileset_name? | detail_route(fileset, fileset_name)
        Size | filesize | fileset               | sum(x.size for x in fileset.files)
    """
    TESTING = True

    def setUp(self):
        self.site_dir = site_dir = tempfile.mkdtemp()
        self.cleanup_site_dir = lambda: shutil.rmtree(site_dir)

        # Generate marv.conf
        self.marv_conf = os.path.join(site_dir, 'marv.conf')
        with open(self.marv_conf, 'w') as f:
            f.write(self.MARV_CONF)

        # Create scanroot
        self.scanroot = os.path.join(self.site_dir, 'scanroot')
        os.makedirs(self.scanroot)

        self.clirunner = CliRunner()
        # initialize web app and test client
        self.app = create_app(self.marv_conf, config_obj=self)
        self.client = self.app.test_client()

    def tearDown(self):
        if not self.MARV_TESTING_KEEP:
            self.cleanup_site_dir()
        else:
            print('Keeping %r', self.site_dir)

    def marvcli(self, cli_args, env=None, exit_code=0):
        cmd = self.clirunner.invoke(marvcli, ['--config', self.marv_conf] + cli_args,
                                    env=env, catch_exceptions=self.MARV_TESTING_CATCH)
        if self.MARV_TESTING_CATCH:
            sys.stdout.write(cmd.output_bytes)
            cmd.exc = ''.join(traceback.format_exception(*cmd.exc_info))
            sys.stdout.write(cmd.exc)
        self.assertEqual(cmd.exit_code, exit_code)
        return cmd

    @patch('marv._scan.uuid4', uuid4_mock().next)
    @patch('marv._scan.getmtime', lambda x: 0.0)
    @patch('marv.app.listing.getmtime', lambda x: 0.0)
    def test(self):
        rv = self.client.get('/')
        self.assertIn('MARV Robotics', rv.data)
        rv = self.client.get('/main-built.js')
        self.assertIn('html', rv.data)

        # Populate scanroot
        fs1dir = os.path.join(self.scanroot, 'fileset1')
        fs2dir = os.path.join(self.scanroot, 'fileset2')
        os.makedirs(fs1dir)
        os.makedirs(fs2dir)
        with open(os.path.join(fs1dir, 'A'), 'w') as f:
            f.write('1\n2\n3')
        with open(os.path.join(fs2dir, 'X'), 'w') as f:
            f.write('10\n20\n30')
        with open(os.path.join(fs2dir, 'Y'), 'w') as f:
            f.write('40\n50\n60')

        # Scan filesets
        self.marvcli(['fileset', 'scan'])

        self.assertAPI('/marv/api/2/listing', '.initial')
        self.assertAPI('/marv/api/2/fileset-listing', '.initial')
        #self.assertEquals(['all_known', 'filters', 'listing', 'summary'],
        #                  sorted(json.loads(rv.data)))

        # Update listing
        self.app.update_listing(loop=False)
        self.assertAPI('/marv/api/2/listing', '.scanned')
        self.assertAPI('/marv/api/2/fileset-listing', '.scanned')

        # Fetch detail views
        self.assertAPI('/marv/api/2/fileset-detail/{}'.format(UUIDS[0]), '.scanned')
        self.assertAPI('/marv/api/2/fileset-detail/{}'.format(UUIDS[1]), '.scanned')

        # Invalid UUID
        rv = self.client.get('/marv/api/2/fileset-detail/A')
        self.assertStatus(rv, 404)

        # Unknown UUID
        rv = self.client.get('/marv/api/2/fileset-detail/{}'.format(UUIDS[-1]))
        self.assertStatus(rv, 404)

        # download file
        rv = self.client.get('/marv/api/2/fileset-detail/{}/download/1'
                             .format(UUIDS[1]))
        self.assertStatus(rv, 200)

        # download invalid file
        rv = self.client.get('/marv/api/2/fileset-detail/{}/download/2'
                             .format(UUIDS[1]))
        self.assertStatus(rv, 404)

        # download invalid uuid
        rv = self.client.get('/marv/api/2/fileset-detail/{}/download/1'
                             .format(UUIDS[-1]))
        self.assertStatus(rv, 404)

        # get file list
        #self.assertAPI('/marv/api/2/file-list', method='post', data=UUIDS[:2])

    def assertAPI(self, endpoint, suffix='', method='get', data=None):
        method = getattr(self.client, method)
        if data is not None:
            method = partial(method, data=data)
        rv = method(endpoint)
        data = json.loads(rv.data)
        json_file = os.path.join(__file__.rsplit('.', 1)[0],
                                 '{}{}.json'.format(endpoint.replace('/', '_'),
                                                    suffix))
        if self.MARV_TESTING_RECORD:
            if not os.path.exists(os.path.dirname(json_file)):
                os.makedirs(os.path.dirname(json_file))
            with open(json_file, 'w') as f:
                json.dump(data, f, sort_keys=True, indent=2)
        else:
            with open(json_file) as f:
                self.assertEqual(data, json.load(f))

    def assertStatus(self, resp, code):
        self.assertEqual(resp.status_code, code)

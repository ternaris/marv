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

import os
from setuptools import setup

HERE = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(HERE, 'README.rst')) as f:
    README = f.read()

setup(name='marv',
      version='3.1.0',
      description='MARV framework',
      long_description=README,
      classifiers=[
          'Development Status :: 5 - Production/Stable',
          "Framework :: Flask",
          'License :: OSI Approved :: GNU Affero General Public License v3 or later (AGPLv3+)',
          'Operating System :: POSIX :: Linux',  # for now
          'Programming Language :: Python',
          'Programming Language :: Python :: 2.7',
          'Programming Language :: Python :: 2 :: Only',  # for now
          'Programming Language :: Python :: Implementation :: CPython',  # for now
          "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
          'Topic :: Scientific/Engineering',
      ],
      author='Ternaris',
      author_email='team@ternaris.com',
      url='https://github.com/ternaris/marv',
      license='AGPLv3+',
      packages=[
          'marv',
          'marv.app',
          'marv.tests',
          'marv_detail',
          'marv_node',
          'marv_node.testing',
          'marv_node.tests',
          'marv_nodes',
          'marv_pycapnp',
          'marv_pycapnp.tests',
          'marv_store',
          'marv_webapi',
      ],
      include_package_data=True,
      zip_safe=False,
      test_suite='nose.collector',
      tests_require=['nose'],
      install_requires=['Flask-Cors',
                        'Flask-SQLAlchemy',
                        'PyJWT',
                        'bcrypt',
                        'configparser',
                        'pycapnp-for-marv',
                        'marv-cli'],
      extras_require={
          'testing': ['coverage',
                      'ipdb',
                      'ipdbplugin',
                      'ipython',
                      'mock',
                      'nose',
                      'testfixtures'],
      },
      entry_points={'marv_cli': ['marv = marv.cli']})

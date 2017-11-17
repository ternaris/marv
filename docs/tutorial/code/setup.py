# -*- coding: utf-8 -*-
#
# This file is part of MARV Tutorial Code by Ternaris
#
# To the extent possible under law, the person who associated CC0
# with MARV Tutorial Code has waived all copyright and related or
# neighboring rights to MARV Tutorial Code.
#
# You should have received a copy of the CC0 legalcode along with
# this work.  If not, see
# <http://creativecommons.org/publicdomain/zero/1.0/>.

from __future__ import absolute_import, division, print_function

from setuptools import setup

setup(name='marv-tutorial-code',
      version='1.0',
      description='MARV Tutorial Code',
      url='',
      author='Ternaris',
      author_email='team@ternaris.com',
      license='CC0',
      packages=['marv_tutorial'],
      install_requires=['marv',
                        'marv-robotics',
                        'matplotlib',
                        'mpld3'],
      include_package_data=True,
      zip_safe=False)

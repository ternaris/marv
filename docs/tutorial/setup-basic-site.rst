.. _setup-basic-site:

Tutorial: Setup basic site
==========================

A site holds everything MARV knows about your datasets. It contains one or more collections of datasets that can be browsed and queried separately. Here you learn how to setup a basic site with one collection and a couple of example bags.

All code and configuration of this tutorial is included in the top-level ``tutorial`` folder of your release of MARV Robotics EE.


Prerequisites
-------------

- :ref:`install`

.. code-block:: console

  $ ls -1
  tutorial  # link to tutorial directory
  venv      # python virtualenv (Installation)


Initialize site
---------------

Let's start by creating a directory that will hold bag files, called a *scanroot*, and one for our marv site:

.. code-block:: console

  $ mkdir scanroot
  $ mkdir site

Then create the site configuration file ``site/marv.conf`` with the following content:

.. literalinclude:: setup-basic-site0/marv.conf
    :language: cfg

There is one collection that uses marv robotics' default bag scanner :func:`marv_robotics.bag.scan`, which is looking for bags in the scanroot we just created. We are ready to initialize the site -- after activating the virtual environment marv is installed to, and simplifying marv's log format as we are not interested in times:

.. code-block:: console

  $ source venv/bin/activate
  (venv) $ export MARV_LOG_FORMAT='%(levelname).4s %(name)s %(message)s'
  (venv) $ cd site
  (venv:~/site) $ marv init
  INFO marv.site Initialized from /home/zaphod/site/marv.conf

.. note::

   Whenever you change your configuration, remember to stop ``uwsgi`` (see below), rerun ``marv init``, and then start ``uwsgi`` again.


Serve the site
--------------

MARV is implemented using the Web Server Gateway Interface (`WSGI <https://www.python.org/dev/peps/pep-3333/>`_) and we are use the `uwsgi <https://uwsgi-docs.readthedocs.io/en/latest/>`_ application server with a simple configuration file ``site/uwsgi-dev.conf`` suitable to serve it for development:

.. literalinclude:: setup-basic-site0/uwsgi-dev.conf
    :language: cfg

uwsgi got installed into the virtual environment during installation of :ref:`marv-install` and you used it already to serve the documentation you are looking at. Let's stop that and restart with the configuration we just created. The new one will continue to serve the documentation:

.. code-block:: console

  CTRL-C
  (venv) $ uwsgi --ini site/uwsgi-dev.conf
  ...
  mounting marv.app.wsgi:application on /
  WSGI app 0 (mountpoint='/') ready in 0 seconds on interpreter 0x207e9a0 pid: 3806 (default app)
  *** uWSGI is running in multiple interpreter mode ***
  spawned uWSGI worker 1 (pid: 3806, cores: 1)
  spawned uWSGI worker 2 (pid: 3812, cores: 1)
  spawned uWSGI worker 3 (pid: 3813, cores: 1)
  spawned uWSGI worker 4 (pid: 3814, cores: 1)

You should see something like the above lines and MARV should be accessible via http://localhost:8000. In case you are running inside a container, make sure you forwarded the correct port.


.. note::

   In the course of this tutorial we'll keep changing the configuration. For these changes to take effect, uwsgi has to be stopped (CTRL-C) and the site reinitialized with ``marv init``.


Create user account
-------------------

*EE*:

MARV requires you to be signed-in to see anything worthwhile. In order to be able to sign-in, you need to create a user first. Let's make him an admin, so he can also discard datasets from marv. From now on we can continue in the terminal we used to initialize the marv site previously:

.. code-block:: console

  (venv:~/site) $ marv user add zaphod
  Password:
  Repeat for confirmation:
  (venv:~/site) $ marv group adduser zaphod admin

After creating the user, you should be able to sign-in using his credentials and be presented with an yet empty listing of the bags collection.

*CE*:

The current community edition displays datasets without being signed-in and signed-in users all have the same permissions.


Populate scanroot
-----------------

Let's give marv two bag files from the `mit stata center data set <http://projects.csail.mit.edu/stata/downloads.php>`_:

.. code-block:: console

  (venv:~/site) $ cd ../scanroot
  (venv:~/scanroot) $ curl -O http://infinity.csail.mit.edu/data/2011/2011-01-24-06-18-27.bag
  (venv:~/scanroot) $ curl -O http://infinity.csail.mit.edu/data/2011/2011-01-25-06-29-26.bag
  (venv:~/scanroot) $ cd -
  (venv:~/site) $

After scanning for datasets they will appear in the bag collection's listing:

.. code-block:: console

  (venv:~/site) $ marv scan
  INFO marv.collection.bags added <Dataset qmflhjcp6j3hsq7e56xzktf3yq 2011-01-24-06-18-27>
  INFO marv.collection.bags added <Dataset vmgpndaq6frctewzwyqsrukg2y 2011-01-25-06-29-26>

The *dataset ids*, or short *set ids*, are generated randomly -- you will see different ones. If not, watch out for the Heart of Gold. Now, reload the browser. The listing should contain the two datasets. Visiting a detail view, there is no information yet, but it's already possible to comment and tag the datasets.


Add and run basic nodes
-----------------------

MARV ships with some default nodes. Let's run these:

.. code-block:: console

  (venv:~/site) $ marv run --collection=bags
  INFO marv.run qmflhjcp6j.meta_table.dwz4xbykdt.default (meta_table) started
  INFO marv.run qmflhjcp6j.summary_keyval.dwz4xbykdt.default (summary_keyval) started
  INFO marv.run qmflhjcp6j.summary_keyval.dwz4xbykdt.default finished
  INFO marv.run qmflhjcp6j.meta_table.dwz4xbykdt.default finished
  INFO marv.run vmgpndaq6f.meta_table.dwz4xbykdt.default (meta_table) started
  INFO marv.run vmgpndaq6f.summary_keyval.dwz4xbykdt.default (summary_keyval) started
  INFO marv.run vmgpndaq6f.summary_keyval.dwz4xbykdt.default finished
  INFO marv.run vmgpndaq6f.meta_table.dwz4xbykdt.default finished

By now the detail summary section is providing minimal information.

Given that we are dealing with bag files, it makes sense to add nodes that extract and display bag meta information:

.. literalinclude:: setup-basic-site1/marv.conf
    :language: cfg
    :emphasize-lines: 9-

.. code-block:: console

  (venv:~/site) $ marv run --collection=bags
  INFO marv.run qmflhjcp6j.bagmeta_table.gahvdc4vpg.default (bagmeta_table) started
  INFO marv.run qmflhjcp6j.connections_section.yjrewalqzc.default (connections_section) started
  INFO marv.run qmflhjcp6j.bagmeta.dwz4xbykdt.default (bagmeta) started
  INFO marv.run qmflhjcp6j.bagmeta.dwz4xbykdt.default finished
  INFO marv.run qmflhjcp6j.connections_section.yjrewalqzc.default finished
  INFO marv.run qmflhjcp6j.bagmeta_table.gahvdc4vpg.default finished
  INFO marv.run vmgpndaq6f.bagmeta_table.gahvdc4vpg.default (bagmeta_table) started
  INFO marv.run vmgpndaq6f.connections_section.yjrewalqzc.default (connections_section) started
  INFO marv.run vmgpndaq6f.bagmeta.dwz4xbykdt.default (bagmeta) started
  INFO marv.run vmgpndaq6f.bagmeta.dwz4xbykdt.default finished
  INFO marv.run vmgpndaq6f.connections_section.yjrewalqzc.default finished
  INFO marv.run vmgpndaq6f.bagmeta_table.gahvdc4vpg.default finished

Reload your browser and check the result.


Summary
-------

You initialized a marv site with one collection that looks for bag files in a scanroot directory. You setup uwsgi to serve your site for development purposes, created a user account for sign-in to the web application, populated the scanroot with some bag files and configured and ran nodes to display meta information about these bag files.

.. code-block:: console

  $ ls -1
  scanroot  # holds bag files
  site      # holds config and databases
  tutorial  # link to tutorial directory
  venv      # python virtualenv (Installation)

Familiarize yourself a bit with the web frontend (http://localhost:8000). We intend it to be self-explanatory. Please let us know if you have questions.

Now your are ready to write your first nodes :ref:`write-your-own`.

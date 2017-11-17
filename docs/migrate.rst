.. _migrate:

Migration
=========

Before doing any migration you might want to check the :ref:`config` and :ref:`deploy` sections.

16.10 -> 17.11
--------------

In the old site:

1. **Make sure you have a backup of your old site!**

2. Dump database of old marv:

   .. code-block:: console

      curl -LO https://gist.githubusercontent.com/chaoflow/02a1be706cf4948a9f4d7f1fd66d6c73/raw/de4feab88bcfa756abfb6c7f5a8ccaef7f25b36d/marv-16.10-dump.py
      python2 marv-16.10-dump.py > /tmp/dump.json

For and in the new instance:

3. Follow :ref:`install` and :ref:`setup-basic-site` to setup a basic site.

4. Replace ``marv.conf`` with the default :ref:`config` and adjust as needed (e.g. scanroot).

5. Initialize site with new configuration:

   .. code-block:: console

      marv init

6. If your scanroot has moved, adjust paths as needed:

   .. code-block:: console

      sed -i -e 's,/old/scanroot/,/path/to/new/scanroot/,g' /tmp/dump.json

7. Restore database in new marv:

   .. code-block:: console

      marv restore /tmp/dump.json

8. Set password for each user:

   .. code-block:: console

      marv user pw <username>

9. Run nodes:

   .. code-block:: console

      marv query -0 --collection=bags |xargs -0 -L25 -P4 marv run --keep-going

10. Run again sequentially to see if there are nodes producing errors:

   .. code-block:: console

      marv run --collection=bags


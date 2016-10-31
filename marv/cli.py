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

import logging
import os
from pkg_resources import iter_entry_points, resource_stream

import click

from marv_cli import marv


PROFILES = {ep.name: ep for ep in iter_entry_points(group='marv_profiles')}
DEFAULT_PROFILE = sorted(PROFILES)[0] if PROFILES else None


def create_app(loglevel=logging.INFO, web=False, **kw):
    from marv_cli import CONFIG, VERBOSE
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    logger = logging.getLogger()
    logger.addHandler(handler)
    logger.setLevel(max(10, loglevel - VERBOSE * 10))
    from marv import app
    return app.create_app(CONFIG, web=web, **kw)


@marv.command('init')
@click.option('--list-profiles', is_flag=True, help='List available MARV profiles')
@click.option('--profile', default=DEFAULT_PROFILE, show_default=True,
              type=click.Choice(sorted(PROFILES.keys())),
              help='Profiles provide default configuration and more')
@click.option('--scanroot', help='Path to scanroot containing filesets')
@click.option('--approot',
              help='Application root for MARV to run, if not at root of domain')
@click.option('--uwsgi-ip', default='0.0.0.0', show_default=True,
              help='IP address to run uwsgi server on')
@click.option('--uwsgi-port', default='8000', show_default=True,
              help='Port to run uwsgi server on')
@click.option('-v', '--verbose', count=True, help='Increase verbosity')
@click.argument('directory', required=False, type=click.Path(file_okay=False))
@click.pass_context
def marv_init(ctx, directory, list_profiles, profile, scanroot,
              approot, uwsgi_ip, uwsgi_port, verbose):
    """Initialize a marv site"""
    if not PROFILES:
        ctx.fail('No profiles available')

    if list_profiles:
        for name, ep in sorted(PROFILES.iteritems()):
            if verbose:
                click.echo('{}  {}'.format(name, ep.dist))
            else:
                click.echo(name)
        ctx.exit()

    profile = PROFILES[profile].load()

    if not directory:
        ctx.fail('Please provide a path to a directory to initialize as MARV site.')
        click.echo('A MARV site holds a config file and database')
    if not os.path.exists(directory):
        os.makedirs(directory)

    marv_conf = os.path.join(directory, 'marv.conf')
    wsgi_py = os.path.join(directory, 'wsgi.py')
    uwsgi_conf = os.path.join(directory, 'uwsgi.conf')

    gen_marv_conf = not os.path.exists(marv_conf) or \
        click.confirm('{} already exists, do you want to overwrite?'.format(marv_conf))
    gen_wsgi_py = not os.path.exists(wsgi_py) or \
        click.confirm('{} already exists, do you want to overwrite?'.format(wsgi_py))
    gen_uwsgi_conf = not os.path.exists(uwsgi_conf) or \
        click.confirm('{} already exists, do you want to overwrite?'.format(uwsgi_conf))

    if gen_marv_conf:
        scanroot = scanroot or click.prompt(profile.scanroot_prompt)
    if gen_wsgi_py:
        approot = approot or \
            click.prompt('Application root for MARV, if not at root of domain',
                         default='')

    if gen_marv_conf:
        with open(marv_conf, 'w') as f:
            f.write(profile.marv_conf_in.replace('SCANROOT', scanroot))
        click.echo('Wrote config file %s' % marv_conf)

    if gen_wsgi_py:
        with open(wsgi_py, 'w') as f:
            f.write(resource_stream('marv', 'data/wsgi.py.in').read()
                    .replace('MARV_APP_ROOT', repr(approot)))
        click.echo('Wrote %s' % wsgi_py)

    if gen_uwsgi_conf:
        with open(uwsgi_conf, 'w') as f:
            f.write(resource_stream('marv', 'data/uwsgi.conf.in').read()
                    .replace('WSGI_PY', os.path.abspath(wsgi_py))
                    .replace('UWSGI_IP', uwsgi_ip)
                    .replace('UWSGI_PORT', uwsgi_port))
        click.echo('Wrote %s' % uwsgi_conf)


@marv.group('fileset')
def marv_fileset():
    """Manage filesets"""


@marv_fileset.command('discard')
@click.argument('uuids', nargs=-1, type=click.UUID, required=True)
def marv_fileset_discard(uuids):
    """Discard everything marv knows about a fileset"""
    app = create_app()
    with app.app_context():
        for uuid in uuids:
            app.site.remove_fileset(uuid)


@marv_fileset.command('scan')
def marv_fileset_scan():
    """Scan for new and changed filesets"""
    app = create_app()
    with app.app_context():
        app.site.scan()


@marv.group('node')
def marv_node():
    """Run or discard marv nodes"""


@marv_node.command('discard')
@click.option('--all-nodes/--no-all-nodes',
              help='Check all nodes for selected filesets')
@click.option('--all-filesets/--no-all-filesets',
              help='Check selected nodes for all filesets')
@click.option('--update-detail/--no-update-detail', default=True,
              help='Update detail views')
@click.option('--comments', help='Also discard comments')
@click.option('--tags', help='Also discard tags')
@click.option('--node', multiple=True, help='Select nodes to discard')
@click.option('--fileset', multiple=True, type=click.UUID,
              help='Select filesets for which to discard nodes')
@click.pass_context
def marv_node_discard(ctx, all_nodes, all_filesets, update_detail,
                      fileset, node, comments, tags):
    """Discard marv node output"""
    if node and all_nodes:
        ctx.fail('Specified --node with --all or --all-nodes')
    if fileset and all_filesets:
        ctx.fail('Specified --fileset with --all or --all-filesets')
    if not fileset and not all_filesets:
        click.echo('No filesets selected, nothing to discard')
        ctx.exit()
    if not node and not all_nodes:
        click.echo('No nodes selected, nothing to discard')
        ctx.exit()

    if all_filesets:
        click.confirm('Are you sure you want to discard %s for all filesets' % (
            'all nodes' if all_nodes else ', '.join(sorted(node))), abort=True)

    app = create_app()
    with app.app_context():
        if all_nodes:
            nodes = app.site.nodes.nodes.keys()
            nodes.remove('fileset')
            if comments:
                nodes.append('comments')
            if tags:
                nodes.append('tags')
        else:
            if 'fileset' in node:
                ctx.fail("Refusing to discard fileset node.\n"
                         "Use 'marv fileset discard' to discard a fileset.")
            unknown = set(node) - app.site.nodes.nodes.viewkeys()
            if unknown:
                ctx.fail('Unknown nodes %s' % list(sorted(unknown)))
            nodes = node
        app.site.node_discard(
            nodes=nodes,
            uuids='ALL' if all_filesets else [str(x) for x in fileset],
            update_detail=update_detail)


@marv_node.command('list')
def marv_node_list():
    app = create_app()
    for x in sorted(app.site.nodes.nodes):
        click.echo(x)


@marv_node.command('run')
@click.option('--all-nodes/--no-all-nodes',
              help='Check all nodes for selected filesets')
@click.option('--all-filesets/--no-all-filesets',
              help='Check selected nodes for all filesets')
@click.option('--changed-config/--no-changed-config',
              help='Run nodes whose config changed')
@click.option('--rerun/--no-rerun',
              help='Rerun nodes even if they are not outdated')
@click.option('--dependent/--no-dependent', default=True,
              help='Run dependent previously run nodes')
@click.option('--update-detail/--no-update-detail', default=True,
              help='Update detail views')
@click.option('--node', multiple=True, help='Select nodes to check')
@click.option('--fileset', multiple=True, type=click.UUID,
              help='Select filesets to check')
@click.pass_context
def marv_node_run(ctx, all_nodes, all_filesets, changed_config, rerun,
                  dependent, fileset, node, update_detail):
    """Run nodes for filesets"""
    if node and all_nodes:
        ctx.fail('Specified --node with --all or --all-nodes')
    if fileset and all_filesets:
        ctx.fail('Specified --fileset with --all or --all-filesets')
    if not fileset and not all_filesets:
        click.echo('No filesets selected, nothing to be done')
        ctx.exit()
    # if not node and not all_nodes and not update_detail:
    #     click.echo('Neither nodes nor detail update selected, nothing to be done')
    #     ctx.exit()

    app = create_app()
    with app.app_context():
        if 'fileset' in node:
            ctx.fail("Cannot rerun fileset node.\n"
                     "Use 'marv fileset discard|scan' to discard and rescan a fileset.")
        unknown = set(node) - app.site.nodes.nodes.viewkeys()
        if unknown:
            ctx.fail('Unknown nodes: %s' % ', '.join(sorted(unknown)))
        app.site.node_run(nodes=None if all_nodes else node,
                          uuids=None if all_filesets else [str(x) for x in fileset],
                          changed_config=changed_config,
                          rerun=rerun,
                          dependent=dependent,
                          update_detail=update_detail)


@marv.group('user')
def marv_user():
    """Manage user accounts"""


@marv_user.command('add')
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True,
              help='Password will be prompted')
@click.argument('username')
def marv_user_add(username, password):
    """Add a user"""
    app = create_app()
    with app.app_context():
        app.site.user_add(username, password.encode('utf-8'))


@marv_user.command('rm')
@click.argument('username')
def marv_user_rm(username):
    """Remove a user"""
    app = create_app()
    with app.app_context():
        app.site.user_rm(username)


@marv_user.command('pw')
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True,
              help='Password will be prompted')
@click.argument('username')
def marv_user_pw(username, password):
    """Change password"""
    app = create_app()
    with app.app_context():
        app.site.user_pw(username, password.encode('utf-8'))


@marv.group('develop')
def marv_develop():
    """Development tools"""


@marv_develop.command('server')
@click.option('--port', default=5000, help='Port to listen on')
@click.option('--ipdb/--no-ipdb',
              help='Run server within ipdb wrapper to debug exceptions')
@click.option('--public/--no-public',
              help='Listen on all IPs instead of only 127.0.0.1')
def marv_devserver(ipdb, port, public):
    """Run development webserver"""
    import marv._globals
    from flask_cors import CORS
    app = create_app(loglevel=logging.INFO, web=True, MARV_ENABLE_BG_THREADS=False)
    CORS(app)

    if ipdb:
        from ipdb import launch_ipdb_on_exception
        with launch_ipdb_on_exception():
            app.run(debug=True,
                    host=('0.0.0.0' if public else '127.0.0.1'),
                    port=port,
                    passthrough_errors=True,
                    use_debugger=False,
                    use_reloader=False)
    else:
        app.run(debug=True,
                host=('0.0.0.0' if public else '127.0.0.1'),
                port=port,
                reloader_type='watchdog',
                threaded=True)

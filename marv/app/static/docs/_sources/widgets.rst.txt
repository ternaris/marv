.. _widgets:

Widgets
=======

The frontend detail view consists of sections displayed as tabs containing widgets. Specific nodes produce the output rendered by the frontend into sections and widgets. See :ref:`write-your-own` for an introduction to this.

:ref:`section_nodes` are decorated with ``@marv.node(Section)`` and push a dictionary with title and a list of widgets:

.. code-block:: python

   section = {'title': 'Section title', 'widgets': [widget, ...]}

:ref:`widget_nodes` are decorated with ``@marv.node(Widget)`` and push a dictionary with an optional title and one key corresponding to a ``widget_type`` (e.g. ``image``) and ``value`` with data extracted from a dataset to be rendered by the widget (e.g. ``{'src': 'img/path'}``.

.. code-block:: python

   widget = {'title': 'Widget title', widget_type: data}

Widgets are either rendered directly into a section or are used as part of another composite widget, e.g. an ``image`` in a ``gallery`` (see below).

Valid values for ``widget_type`` are given in the following sections. The ``title`` key is optional and omitted for brevity.


.. _widget_image:

Image
^^^^^
.. code-block:: python

   image = {'image': {'src': img.relpath}}

Example: Image used inside gallery :func:`marv_robotics.detail.galleries`


.. _widget_gallery:

Gallery
^^^^^^^
.. code-block:: python

   gallery = {'gallery': {'images': [image, ...]}}

Example: :func:`marv_robotics.detail.galleries`


.. _widget_video:

Video
^^^^^
.. code-block:: python

   video = {'video': {'src': videofile.relpath}}

Example: :func:`marv_robotics.detail.video_section`


.. _widget_trajectory:

Trajectory
^^^^^^^^^^
Example: :func:`marv_robotics.detail.trajectory_section`


.. _widget_table:

Table
^^^^^
Example: :func:`marv_robotics.detail.bagmeta_table`


.. _widget_keyval:

Key/value
^^^^^^^^^
Example: :func:`marv_robotics.detail.summary_keyval`


.. _widget_pre:

Preformatted
^^^^^^^^^^^^
Wraps data into an html ``<pre></pre>`` tag.

.. code-block:: python

   pre = {'pre': 'foo\nbar'}


.. _widget_custom:

Custom
^^^^^^
Renders custom widgets.

.. code-block:: python

   custom = {'custom': {'type': 'foo', 'data': json.dumps(data)}}

Create ``site/frontend/custom.js`` and restart your instance to customize widgets and formatters.

.. literalinclude:: config/custom.js


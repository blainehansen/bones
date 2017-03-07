The big thing here will be responsive visibility stuff, flexbox shorthands, other various shorthands, making anchors (and anything else that makes sense) act intelligently like boxes, etc.

the ability to shift something into a javascript showable box rather than a default visible box on some sizes.

simplified Z-index system. Background, stage, and curtain (different metaphor though). Mixin that places something in that general zone, and accepts a small integer value to give slight differentiation between elements at the same overall level.

multi-line text clamping?

A "sidenote" system that pulls something out of a div and to the side at the same vertical location would be good.

Change responsive mixin to just `bn-media` and allow responsive tokens like `xs-only` `sm-down` `xs-md` `md-not` and then just `xs` for up which is default.

Responsive aspect ratio helpers

Things to make sizing and containing (object fit) of images more sane and easy.

Divider mixin, takes total number of rus to take up, and then a border width property, with a top or bottom boolean switch
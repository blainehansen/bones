Root elements:
- vertical/horizontal reflow: main axis sizes can only use grid if they are in a fixed size parent. any elements that want to expand in the cross axis larger than the viewport must use a window container.
- fixed (viewport?): nothing can even be bigger than the viewport. windows are the only way in both axes.

Boxes:
- grid (whether logically horizontal or vertical depends entirely on root element)
- vertical/horizontal windows
- vertical/horizontal shiftable

Grid:
- grid container acts as row. Doesn't require a column in it to hold stuff. Can be sized and positioned etc like a column
- column box. doesn't need it's immediate parent to be a row.





All of these can be used as padding, sizing, and positioning(margin) arguments.

One of the big things this whole framework is trying to accomplish, is making grid measurements useable in almost every relevant context.





Containers are the highest level boxes. They determine how everything within them is reflowed.
To size and position themselves, they are given a horizontal and vertical column system. This system can be used to apply margins or padding.
Containers can be nested and stacked.

Vertical size as a portion of the parent size. If this is going to take up a dynamic portion of the parent's height, that height must be determined by something. 





So we need both. We need a height and width column system that refers to the parent and therefore available space, and a column system that refers to the viewport size.

A "fit-box" that squeezes anything you put into it into the required size.


Viewport based sized containers
- default is 100vh
- give hcolumn based sizing options to make someting a percentage of viewport size
- a viewport based container, when placed inside any other container, is going to act in a stacking manner.
- has a "one-tile" version, only as big as one screen, and a "tile list" version, where you have many one after the other. The tile list can be set to reflow horizontally.

Rythmn containers
- give column based sizing options
- everything is measured in rhythm units and reflows vertically.

Blank containers?
- only some base resets and nothing else? No expectations and just a canvas for the user?

Flexbox containers? Specifically for doing whatever fancy flexbox stuff?
- allow flexbox attributes like alignment and such to be used in any context, like in grid system.

A "Pathway Tiles" system? Where the user can navigate both up and down to different tiles in discrete steps?


Grid system:
- both height and width columning, but height is only available in a viewport based box.
- have default 12 column system, with overrides for percentages
- no gutters, at least not by default. give control over guttering
- column based padding
Rows and containers behave identically, so rows are only necessary for clearing breaks and for logical organization? mixin to initialize `body` as the bones root? Therefore making a distinction between containers and rows unnecessary?
The bootstrap abstraction of a container is unnecessary. We simply declare a certain element (almost certainly `body`) to be our bones root, and then containers are used in much the same way rows always were before. Also, that bones root can also be declared as a container, if nesting of containers isn't needed.
Let's also have a "row break" modifier for columns, so that hard rows can be implemented without wrapper divs if they're not necessary.
Implement an "additive" model of grid elements, where the root can be a container can be a column.
Mixins to give entire container gutters, or just a column gutters, or a container that has gutters already baked in. Perhaps implement a box with "electric fence" edges, we just don't want things to touch them no matter what breakpoint we're at, but we might want larger padding at other breakpoints. 
The grid breakpoint prefixes are culled from the global breakpoint map, so you can pass strings as options based on your custom breakpoints.
functions or mixins to exert global and unified control over rhythm unit size.

We're considering getting rid of the distinction between a container and a column entirely. They're all just vertical reflow boxes, with the only difference being that there are different types of containers (but we're really only designing the behavior of one type of box right now), and that containers take up their entire row. That should just be an argument, not an entire element type. 

Convenience classes can be generated on the fly based on global maps etc.


Whenever different types of elements should behave differently from a bleed versus inset perspective, we  to 
**Children declare their own margin/padding (distance from the parent container).** This way we have finer grain control and need less wrapper divs.
Padding can be called in the form of either rem units or grid units.
For rem units, can be given a map with breakpoint codes to rem units, or just a reference to a global map of some sort.


Tools for sizing things based on vertical rhythm.
- pixels measure the base text size for each breakpoint
- breakpoint map, combined with a base size map
- rhythm unit given in rems, so it responds to base size
- mixins to quickly give different rhythm unit sizes for different breakpoints
- mixins to quickly create elements with certain sizes (such a as a divider element, where you pass in a total whole number of rhythm units for the entire divider to take up, and then a fractional rhythm unit size to be the actual divider).

Element nature coercion
- make anything behave like a box, a content, a control, or a decoration, but only bother to do this for types that have a useful behavior or an ambiguous or flexible semantic nature.
- have notable exceptions for some elements which are by their nature one type.

Element appearance coercion
- make links appear like buttons, things like that.


Stacking abilities
- you can stack containers on containers, or just rows on containers?
- give a height and width column system to position and size.
- give different "semantic layers", basically ways for people to control in an intuitive way what goes on top of what without messing with z-indexes. Make default for source order to stack from bottom to top (children to stack on top of parents)
- with this it probably makes sense to require parent-child relationships, since child-child relationships are handled by "relative-to"

"Relative-to" positioning abilites (includes both inside a box and outside of it)
- should probably include systems to be aware of paddings beneath?
In achieving this, it does seem relative positioning should be the new default. This does mean we have to be careful about intermediate wrapper divs interfering with the intended "relative-ness". Perhaps we could have one of these "takes a selector and called on the parent" mixins to have finer grained control over which is the relative-to? And actually keep default static and allow that mixin to handle it? Certainly at a high level it seems most reliable to use javascript.

Device or ability related selection mechanisms
and of course size related selection mechanisms


An initializer, that actually loads/calls the framework. Doing this allows us to use computed maps and variables and allow the user to provide their own overrides, and gives them a sense of clarity about when they have to provide those overrides.





Component ecosystem. Default is always just to provide mixins and everything, but also api and systems for outputting convenience classes?
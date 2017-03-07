Philosophy:

Completely Semantic templates. Everything describes nature not appearance.
- this allows for complete switchouts of layout without even touching the template.
- everything is a mixin or extend placeholder, so everything can be levied on the stylesheet side. some useful pre-considered classes.
- coercion of different elements into bones types: box, content, control, decoration
- only necessary, useful, and logical wrapper divs, using an additive model.

Unopinionated Toolset:
- not about making useful styling decisions, but giving tools.

Separation of UI and aesthetic layers:
- Bones layer and Skin layer, with Muscle optionally in between.
- Default "Dust" Skin.
The template layer (in the age of dynamic templating languages) is really about data interface and the semantics of that data. It's about dredging up our data and providing controls for it. The more design-level thinking we introduce into that layer, the more cloudy our real task (data interface) becomes. 


Component/Skin ecosystem:
- easily shareable and reuseable.
- framework of frameworks, all others can be skins.
- all components should expose the elements and selectors they use, in order to allow endpoint customization.

DRY, Abstract, One source of truth. This is an interface *API*, not just a framework or toolkit.
- global maps and collections that allow you to change global things in one place, such as breakpoints.
- built from a good programmer's perspective
- large degrees of abstraction rather than many detailed variables.
- A handful of foundational variables can generate everything else. Strong relationships between all elements should be established from the beginning.



Consider an "object-oriented" model, where selectors act as id's or classnames, and then maps contain different assigned attributes, and those maps are used to "construct" the dom element the same way you'd construct an object, with different attributes being reconciled against each other and computed.
"Object Oriented Selectors"


Practical Goals:
(components and features)

Effortless vertical rhythm
cooperative basic building blocks
useful pre-considered components
more than just row based layouts
system for designing *any* layout meant for any device or useage pattern.
device specifying systems for more than rows and for more than just screen size, such as for swipable or not
effortless resizing

Effortless vertical rhythm and resizing:
- most things measured in rhythm units.
- some things measured in vertical columns.

Viewport sized boxes:
- two types of overall layouts. Some fixed to viewport size (rhythm units aren't useful here?) and largely measured in vertical columns. Rest reflowing only based on size of rhythm unit. the first type shoudl come with a warning to use responsibly.
- allow for "card"-like swiping between different viewport-sized boxes

stacking abilites, where a "stackable" div inside another is given a two-way row structure to lay itself out on top of others. Especially useful for controls and small nested components.

Shorthands and sizing systems for fixed elements.

Films and gradients utilizing before and after elements.

"Relative-to" placement abilites. Easily place something according to the position of another thing. (look into bootstrap 4 popups?)

"Pushable" boxes, ones that are moved in the layout by some things but not all, and instead have things slide under them.

Namespace-able inclusion of framework and skins, (and other frameworks?) so that different methodologies and styles don't run over each other.



















---
ignore: true
title: "A Design Framework for Programmers"
---

I want a framework built for an architect's or product designer's or dev's perspective. Something that can be "called" more than loaded up in full. I want something with a huge level of abstraction on top of the actual design, so I can make more conceptual decisions rather than little design technical decisions. I want to be able to deploy a site with a design that is both beautiful *and* unique. Bootstrap is great, but non-designers have a hard time confidently hacking into it without committing a bunch of work. The control is too fine-grained and too separated. I want a unified abstraction.
Everything should be hsl first. It's the most realistic color system.
Everything should be flexbox first. It's the first non-stupid positioning system.



Things that could or should be universal to all sub-frameworks and therefore components:
- column system
- text alignment



```
.modal-shell(.active|.inactive)
	.modal-header
	.modal-content
	.modal-footer
```



[Bootstrap has hundreds of variables.](http://getbootstrap.com/customize/#less-variables) That's just way too many. I want all of those variables related to each other some how, and I want a handful of variables exposed to me that ripple outward to the rest of the design. If you had a couple tiers of variables that would be ideal, variables talking about how the relationships changed or how things related to each other.

Ripple for the name?

I want a sass framework truly for programmers. More than that, I want a methodology and library for building frameworks, which by their nature impose certain decisions on you.

Dial (because all the major design decisions are values that can be dialed in to the architect's desires), a methodology and library for building well separated design frameworks.

Components can be assembled into templates. Components and other basic relationships can be defined by frameworks, which are skinned by themes. And components can be shared between all frameworks.

Strong template / theme separation.

Layers of design specificity.
Components, Alignment, positioning, relative size and spacing. (Template Layer)
Absolute size and spacing.
Fonts, dividers, border shapes, semantic shading, relative line weight and curvature.
Relative color relationships.
Absolute colors, palette.

A handful of foundational variables used to generate everything else. Strong relationships between all elements should be established from the beginning.

Everything available as a mixin or extend placeholder, making it so you can "hang" the framework styles on your blocks without cluttering your markup. Classes and ids should only describe what something "is", not how it looks.



Template describes what blocks exist, what they are, and the relationships between them. Theme fills in the rest.

Template: alignment and positioning, and all relative qualities.
Theme: everything else.



Mixin when it's more or less a function, extend when something "is" a type. Id and class names in markup should always represent what something "is" rather than what it looks like. They represent content decisions, not design decisions. What something "is" will of course affect what it looks like, but they aren't the same thing. Content decisions are about the *relationship* of different elements with each other, and these relationships will continue to exist regardless of how the designer chooses to manifest them.

Ids say there's something different about this *particular* element, but it can still have a class to say it is the same overall type as other elements.


## All elements of design to consider:
Boxes
Text

How big is it?
How is it aligned?
How far spaced is it?
What color is it?
How important is it?
What decorations or borders or whatever does it have?


box size
box borders
box colors
box alignment
text size
text alignment
text colors
text nature or font (italic, bold, other more abstract designations like display or info or title) text importance can be a simple number, and a map can designate levels of text importance, and types of text can simply be given a text importance number. Or could we have two different types? Titling vs content?
text decoration


## Everything in the template layer. These are like paint by numbers things. They say what there is.
* Abstract positioning. Alignment and relative positioning. This includes column systems, responsive states, alignment of text and boxes with each other. Also border existence.
* Abstract sizing. Vertical rhythm, margins and paddings, font sizes, and border widths measured in rhythm units.
* Abstract borders. Nature. This should be treated much like fonts are. Existence, corner rounding, weight.
* Abstract fonts. Importance of text (title vs aside vs info), nature of text (italic, bold, etc).
* Abstract colors. Angular hue relationships, relative opacities or saturations or brightnesses.
* Abstract animations. Rotation angles, positioning, start and end states.

## Everything in the theme layer. Gives all of those abstract relationships "foundation" values that ripple throughout.
* Absolute positioning. Supply exact column widths.
* Absolute sizing. Exact size of rhythm units.
* Absolute borders. Spread of types, seed width.
* Absolute fonts. Spread of fonts that correlate to each designation.
* Absolute colors. Designates seed hue, opacity, saturation, brightness.
* Absolute animations. Exact positioning, speeds, change slopes.


It's possible to have only the following base variables:
$rhythm-unit, the number of pixels everything else will measured in increments of.
$hue-map, a "meaning type" to hue angle map.
$font-map, a "meaning type" to font map.

Other tiers of variables?
$saturation-spread(map). Internal "meaning types". A spread would be a seed value and a spread function or value.
$brightness-spread(map)
various sizing or importance  maps


Frameworks define the abstract relationships and the "meaning types" (bootstrap's "default/primary/success/info/warning/danger"), themes fill in the blanks left by frameworks. Components are framework and theme agnostic.

Components are basically just about borders, lines, and positioning and alignment, and in a way abstract sizing.



Essentially, most actual designing with this system will either involve saying "this is different than this in this way", or "this is this type, which exists on this continuum we've defined over here"

## "this is different than this in this way"
Mixins or functions that point to another class or whatever that say it's different than that thing in such a way.

## "this is this type, which exists on this continuum we've defined over here"
Defining maps or lists that give a spread, and then using those spread values throughout 
Also possibly mixins or functions that take a spread, and then output a series of classes or placeholders that relate to text or background colors or whatever.


Function Library, a design methodology that focuses on relationships between values rather than directly defining them.
Components, collection of positioning or template oriented relationship decisions.
Framework, collection of theme oriented relationship decisions. Comes with several relationship types. Bootstrap has it's feedback color types for example.
Themes
Templates




Spread function, outputs a map or list with a spread of values.

Something to help weave the net together.

Output styles function, outputs a bunch of styles from a spread that relate to particular type of thing.

Something to take a spread and output styles to all relevant boxes or texts.

Define intermediate box or text types.

A mixin to take a placeholder or something and stick it into a list of selectors.


It's looking like you want functions or mixins that say "put this into these selectors" rather than opening the selectors manually and putting them there.


Mixin that takes a list of attributes and contexts for setting them, and applies a map or whatever to all of them.


Possibly super advanced ruby to detect element types and figure out how to apply colors or whatever.
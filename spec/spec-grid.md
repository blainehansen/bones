# Grid System

The big goal of Bones is to create a flexible system that could be used for any layout you could imagine, while keeping the templates focused on data access and relationships with a minimum of clutter.

The bones grid system is different and special for three reasons:
- Additive Box Model
- Responsive Tokens
- Global Rhythm


## Additive Box Model

In other grid systems, the layout won't function correctly without several layers of nesting, like this:

```jade
body
	.container.fluid
		.row
			.col-lg-4.col-lg-offset-4.col-md-6.col-md-offset-3.col-sm-8.col-sm-offset-2
				p Finally!
				p Four layers down...
				.row.images
					.col-xs-6.col-sm-3
						img(src="happy-puppies.jpg").img-responsive
					.col-xs-6.col-sm-3
						img(src="smiling-flowers.jpg").img-responsive
					.col-xs-6.col-sm-3
						img(src="waving-beautiful-people.jpg").img-responsive
					.col-xs-6.col-sm-3
						img(src="sunny-lake.jpg").img-responsive
```

This introduces clutter and makes the template brittle and inflexible.

Bones goes about it a different way:

```jade
body
	p Whoa already?
	.images
		img(src="happy-puppies.jpg")
		img(src="smiling-flowers.jpg")
		img(src="waving-beautiful-people.jpg")
		img(src="sunny-lake.jpg")
```

```sass
body
	@include root-element()
	@include grid-box('lg-4, md-6, sm-8')

.images img
	@include column('sm-3, xs-6')
```

This keeps the template clean, and allows us to make data relationship (template level) decisions separately from UI (stylesheet level) decisions. Semantic markup provides many benefits we might not have even thought about, like the ability to allow users to customize their layout, providing different layouts for users to choose from, or change your entire UI system without building completely different templates.


## Responsive Tokens

You may have noticed this call and it's arguments: `@include grid-box('lg-4, md-6, sm-8')`.
Bones uses these Responsive Tokens as a shorthand to apply responsive grid measurements to many different attributes. Responsive Tokens can be used for size, padding, margins, and positions. The general format is "breakpointname-size", with a couple of exceptions. Let's go through all the types.

### Grid Measurements

The normal kind of token is just like what we've seen, something like `'sm-6, xs-2'`.

When supplying arguments that could have more than one number (like for things like padding shorthands), we instead use something like this: `'sm: 6 7 2 6, xs: 2 4'`. These work according to [css shorthand rules](http://www.w3schools.com/css/css_padding.asp).


### Different Units

By applying a modifier to the end of a responsive token, you can change the units it's referring to.

- Rhythm Units: add `ru`: `'sm-6ru, xs-2ru'`.

- Percentages: a twelve column system doesn't allow for all the possibilities, so you can get more fine-grained if you want to. Add `p`: `'sm-20p, xs-10p`'.

- Viewport Units: add `vw` or `vh`: `'sm-20vh, xs-10-vh'`. You can also just add `v` and if it's clear from context (like you're setting a value for width and you want `vw`). In general this will assume width: `'sm-20v, xs-10v'`.


### Shorthands

'fill' can be used to say "take up the entire parent"
a number by itself without a responsive previx like "xs-" will just be applied at all breakpoints



## Custom Breakpoints

You can set any breakpoints you want, with any names, and still be able to refer to them with responsive tokens.

```sass
$bn-breakpoints: (
	weenee: 260px,
	teenee: 540px,
	jumbo: 1200px,
	wumbo: 2400px,
	dumbo: 5000px
)

.content
	@include column('jumbo-10, teenee-12')
	@include padding('wumbo: 5 3 5, jumbo-20p')

.sidebar
	@include column('teenee-2, weenee-12')
	@include margin-top('dumbo-10v')
```

## Boxes

The basic components of a Bones layout are boxes. These all behave differently in the way they're sized, and the way their contents interact with their frame.


### Block Box

These behave a lot like rows, taking up their entire parent. They take a size argument that only applies to the content area, which will also be centered.

```sass
.my-row
	// the centered content area will be those widths at those breakpoints, but the whole box will take up the entire parent.
	@include block-box('lg-6, sm-8, xs-10')
```

Since the size argument also controls the margins, you can shift the box around with the `$shift` argument. Negative values go to the left, postive to the right. Setting margins directly on a block will cause it to freak out.

```sass
.my-row
	// will shift the box to the left two grid measures
	@include block-box('lg-6, sm-8, xs-10', $shift: '-lg-2')

	// or just to pull all the way to one side
	@include block-box('lg-6, sm-8, xs-10', $shift: 'lg-left')

	// or to shift *from* a particular side
	// also works with $shift-from-right
	@include block-box('lg-6, sm-8, xs-10', $shift-from-left: 'lg-2')
```


#### Box Types

This is not needed because of properties and extending???

```sass
$bn-box-types: (
	text-box: (
		padding: 'xs-2ru, sm: 2ru 1, md: 2ru 2',
		gutter: 'xs-2ru'
	),
	inset-box: (
		gutter: 'xs-1ru, sm-3ru',
		border-width: 0.1 // this will be interpreted as ru
	)
)

$bn-default-box-type: 'text-box'

#main-content
	@include column('sm-8', $type: text-box)
	@include margin-right('sm-4', $type: text-box)
```

Giving an array of types does its best to rectify them together. The earlier you put the type, the higher precedence it takes.


### Column Box

These take a width and only take up that amount of space.

```sass
.my-column
	@include column-box('lg-6, sm-8, xs-10')
```


### Columning

The columns for a box can be set one of two ways, either by calling `column-box` directly on the children, or by using `bn-children-columns` on the parent to set a pattern or ratio for its children. This is handy for when you know your grid will always be the same way.

```sass
// These both achieve the exact same thing.
.thingy
	// this sets the size of .thingy
	@include block-box('lg-6, sm-8, xs-10')

	// this says that all .thingy-child elements beneath this one should be lg:4 sm:6
	@include bn-children-columns('lg:4, sm:6', $selector: '.thingy-child')

.thingy
	@include block-box('lg-6, sm-8, xs-10')

	.thingy-child
		@include column-box('lg:4, sm:6')
```

The `bn-children-columns` mixin gives you the ability to declare all the children have no external gutter, and also to set a ratio rather than our exact column system.

With this system you can set "m" columns, or ones that are purely empty and filled in with margin. `m` connects that margin to the column to its left, `mr` attaches it to the one on the right.

// TODO blaine remove gutter system from things and make bn-gutter for self and bn-children-gutters


```sass
.container
	@include bn-children-columns('xs:(4 3 4 2m 2)', $gutter: 'xs-0.5ru sm-1ru', $external-gutter: false)

	// or
	@include bn-children-columns-ratio('sm:(2 1m 3 1) lg:(2 4)',)
```

To achieve internal margin (aka fixed margin, in ru rather than as a grid measurement, done for the purpose of spacing borders away from other elements), we will have to use `calc(percent - ru)` for the element size. We can refer to this as gutter so that it can logically be included in the mixin that handles sizing. Probably, to incorporate the two types of margin (internal for rus and external for grid measures), we'll have to do something like `calc(percent + ru)` for the margin in question.

To handle the fixed widths of gutters and borders, a system where "shorthands" for different kinds of boxes of columns or whatever (these shorthands, that could be passed as maps or strings that refer to maps that exist elsewhere, define attributes like gutters and border sizes, as well as any defaults for padding and margins and such) can be passed to the various mixins handling box sizing and margins and padding so that they're aware of a single source of truth.
We'll probably want some kind of `box()` mixin that just takes a lot of arguments all at once.


Handle internal gutter (only in between elements and not when touching outside container).
System for "flush-margin" and "flush-padding"

Add a "columns" shortcut that can be applied at the container level. like neutroncss




### Responsive Content Types

Many things, like blockquotes and images, can be sized with responsive tokens. This is best done when you don't want the item to have a wrapper div, but be intermingled with other things like text.

```sass
#article
	img.feature
		@include bn-responsive-image('xs-fill sm-5 lg-3', $margin: 'xs-2ru, sm-4ru, lg-1' $pull: right)

	.quote
		@include bn-responsive-quote('sm-4', $type: bigQuote)
```


### Window Box

These allow you to have a fixed size frame but content scrolling beyond it. This could be used for things like a horizontally scrolling image gallery in an article that's laid out vertically.

These are boxes that have a fixed size in *both* directions, but allow their content to spill out in one or both directions, with scrolls appearing as necessary. Essentially it's like you have a window on your page that shows a small portion of a larger box of stuff. The frame is fixed, but the internals behave like a vertical or horizontal grid box when given those orientations, but the 'both' orientation behaves like a normal html canvas.

For example:

```sass
.picture-window
	@include windox-box('vertical', $width: 'fill', $height: 'sm-fill, lg-6') // will have contents that are the same width as the window, but will expand vertically with a scroll appearing on the window-box

	@include windox-box('horizontal') // will have contents that are the same height as the window, but will expand horizontally with a scroll appearing on the window-box

	@include windox-box('both') // will have contents that can expand both horizontally and vertically with scrolls appearing on both directions. Be sure to set both sizes for all contents!
```


### Shiftable Containers

These behave very similarly to Window Containers, just without allowing scrolls. They have a fixed size in both directions, but allow their content to spill out in one or both directions and hide that content and make you unhide it yourself with javascript or whatever. This is perfect for things like carousels, or anything where you want to handle the navigation yourself rather than let the browser handle it with scrolls.

```sass
.shiftable-carousel
	@include shiftable-box('vertical') // will have contents that are the same width as the box, but will expand vertically into hidden space

	@include shiftable-box('horizontal') // will have contents that are the same height as the box, but will expand horizontally into hidden space

	@include shiftable-box('both') // will have contents that can expand both horizontally and vertically into hidden space. Be sure to set sizes for all contents!
```

Those expanding contents behave identically to Grid Containers, so just work with the contents in that way.

In the default javascript included with Bones, there is a method called `shift-able('.selector', measurement)` that allows you to move the contents in whatever direction (this is achieved with negative margin).


### Fixed Grid Containers

Grid based sizing containers that aren't intended to grow in either direction.
Identical to a shiftable, except we aren't calling it that and intending to use it in that way. This is just an alias. The internals are assumed to operate like a grid box, and we can give this box an orientation argument.


### Spill Box Containers

A boring box that's fixed in both directions, and doesn't specify anything in particular about it's contents. They'll spill out visibly without scroll if you put something too big in them. You can use responsive tokens to size them in whatever directions make sense based on their container.




## Root Boxes

Root Boxes are an easy way to quickly set up your layout. Simply call the root box mixin on whatever you want your root to be (almost certainly will be `body`). The root box determines the overall orientation of the entire layout.

```sass
body
	@include root-box()
```


### Normal (Vertical Reflow)

This is the most typical variety, called by `root-box()`. These are used just like `block-box`, except they'll take up the entire viewport. The page will expand and scroll vertically, and be fixed in width according to the viewport width.


### Shiftable Viewport

This is just like a `shiftable-box`, but will take up the viewport.

Called with `shiftable-viewport-root-box()`.


### Fixed Viewport

This basically only allows one screen of content, and the browser never scrolls in either direction. Good for things like landing or loading pages.

Called with `viewport-root-box()`.
# Stacking and Films

Bones provides a simple system to stack elements on top of each other, and to apply films and gradients to their backgrounds.


## Films

To apply a film on top of a boxes background (for example you have a background image you want to wash a layer of color over) simply call the `bn-film` mixin

```sass
.washed-box
	@include bn-film($hex-color, $opacity)
	@include bn-film($hue, $saturation, $lightness, $opacity)
```

You can do the same with gradients.

```sass
.washed-gradient-box
	@include bn-film-gradient(gradient)
```


## Stacking

For each container type, there's a corresponding "stackable" version that you can simply place on top of another element, that will treat the element they're being stacked on just like their parent in a normal context.

- Grid Boxes will fill their container in their cross axis, horizontally for a normal grid-box and vertically for an h-grid-box (make sure it has a set height to fill!). Then just treat it as usual.

Columns can't be stacked on top of something by themselves, so make sure to instead stack a Grid Box to hold them.

```sass
.getting-stacked-on
	// pass the selector for the stacking child and then normal arguments
	@include grid-stackable(.stacking-grid-box, 'sm-5', $type: text-box)

	.stacking-grid-box
		.column-box
			@include column('sm-4')

	// @include h-grid-stackable(.stacking-h-grid-box)
```

- Window Boxes are sized as usual.
- Shiftable
- Box

For the above three container types that have fixed sizes in both directions (windows, shiftables, and boxes), an "anchor:offset" system is available to position them in their parent. These can be called like responsive tokens.

- `top`
- `top-left`
- `top-right`
- `bottom`
- `bottom-left`
- `bottom-right`
- `right `
- `left`
- `center`

```sass
.parent-box
	.stacking-window
		@include stackable-window('horizontal', $width: fill, $height: 20ru, $anchors: 'xs-left, sm-left:5ru')
```

The anchor arguments here override sizing ones, so watch out to make sure you're not contradicting yourself!






some sort of "drawer" or push off stage systems. Allow you to take stacked or fixed element and push it off it's frame and either $show or $hide some portion or size of it.

Different for fixed elements, since they are related to the whole screen and not a parent. Gets more complicated with things like grid boxes. Essentially it is only possible to do this with a box that has neither axis declared as visible, since that takes over.

https://css-tricks.com/popping-hidden-overflow/



special considerations for background and foreground of viewport/html/body/window?

mixin to stack a child element, called on the parent

```sass
.box-with-stackable
	@include stackable(.child-box, $anchor: left right top, $match: left-20p)

	.child-box
		@include grid-box('sm-5')

```


elements can either fill their parent (using left,right0 etc) or they can be anchored to one side, we can place our container on the parent like a grid element and just treat the parent as the container of like a grid box


essentially we can just stack one of our containers on top of another, by default aligning with top and left? and then allowing the default behavior of the container to handle everything else



## Outer Edge

To place a box on the outer edge of a box it's being stacked on 

```sass
.parent-box
	.outside-drawer-button
```


To get complete control over placing elements next to each other, consider using the awesome tool [Tether](http://tether.io/docs/welcome/)



definitely a system streamlining the concept of stack contexts would be cool.
https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
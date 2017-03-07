# Global Rhythm

If you're completely unfamiliar with the idea of Vertical Rhythm and would like to understand it in depth, read [this article](https://zellwk.com/blog/why-vertical-rhythms/). For now just know that it's a way of making all the vertical sizes on your page look proportional by using a certain measurement over and over.

Vertical Rhythm is an incredibly powerful concept in good design, and it's something that Bones uses in *everything*, not just the typography. Bones makes it effortless to create designs where every element seems proportional and cleanly lines up with the things around it.


## The Rhythm Unit (ru)

The Rhythm Unit (which I'll abbreviate from now on as 'ru') is the single measurement that will act as the foundation for an entire Bones layout. All fonts will use it for their line heights, boxes can be sized with it, paddings and margins will use it, and they'll all tend to do so in small whole numbers. Basically anything in your layout that isn't specified by the grid system is specified by the ru, and this is a beautiful thing, because it makes all the spacial relationships between the various elements incredibly clear.

You can set both the base font size for the html element, as well as the size of the ru unit. When setting the size of the ru unit, you're choosing a ratio compared to the base font size, and that ratio will determine the default line-height as well.

```sass
$bn-base-font-size: 16px

$bn-ru-number: 1.25 // sets it directly (you've done the math)

$bn-ru-ratio: 5/4 // Bones will do it for you :)

	// all of these values are the defaults
```


### The `ru()` Function

To use the rhythm unit anywhere in your design, just use the `ru()` function and pass in a nice smooth number.

```sass
.picture-tile
	width: ru(10)
	height: ru(15)
```

You can also use them in [responsive tokens]() by simply adding `ru` to the end.

```sass
.content-column
	@include padding(xs-2ru, sm-4ru)
```
initializers and other processing functions to establish baselines on html and such.


### Responsive Font Sizes

In Bones (or any system where `rems` are used to measure everything), changing the `font-size` on the `html` element changes the sizes of all measurements given in `rems`. Different font sizes are provided at each breakpoint by default in Bones based simply on ratios between them, but you can further customize them.

```sass
$bn-responsive-base-font-sizes: (
	xs: 12px,
	sm: 14px,
	md: 16px,
	lg: 18px,
)
	// these are the defaults
```

You can also just give a ratio or value or function shorthand to change them by.

```sass
$bn-responsive-base-font-size-ticker: 2px (default)
$bn-responsive-base-font-size-ratio: 5/4
$bn-responsive-base-font-size-function: middle-favor
```


## Type Scales

Bones provides complete control over your type scales. The simplest way to set your type scale is to [provide a ratio](http://type-scale.com/), such as the Golden Ratio (1.618).

```sass
$bn-type-scale-ratio: 1.333 // (Perfect Fourth, the default)

// pass a list to get a multiple strand type-scale
$bn-type-scale-ratio: 1.200, 1.618 // (Minor Third and Golden Ratio)
```

[Modular Scale](http://www.modularscale.com/?1&em&1.2,1.618&sass&text) and [the above-mentioned Type Scale](http://type-scale.com/) are both great tools to play around with and choose your font sizes.

Different sizes using integer multiples of that ratio are then avaiable with the `type-scale` mixin, which will output a `font-size` and a `line-height` that will comfortably contain it.


```sass
p.blog-content
	@include type-scale(0)
	// @include type-scale() achieves the same thing. 0 is default argument

span.image-caption
	@include type-scale(-1)

h1.blog-title
	@include type-scale(3)

#hero-text
	@include type-scale(7)
```

Want to define shorthand names for your type scales? Define the `bn-type-scale-names` map, with string names associating to integers. Then just use them with `type-scale`.

```sass
$bn-type-scale-names: (
	hero: 7,
	big: 3,
	important: 1,
	fine-print: -2
)

span.legal-disclaimer
	@include type-scale(fine-print)

h1.blog-title
	@include type-scale(big)

#hero-text
	@include type-scale(hero)
```

To make things even easier, you can even have Bones distribute these sizes to the selectors that use them, with `$bn-type-scale-selectors`. Just associate a type scale shorthand or integer with a selector or an array of selectors.

```sass
$bn-type-scale-selectors: (
	fine-print: (.legal-dislaimer, .image-caption),
	4: (.blog-title, #big-thing),
	7: #hero-text,
)
	// all done
```

### Incremental Leading

[Incremental Leading](http://www.markboulton.co.uk/journal/incremental-leading) is a technique that gives some text a line-height larger or smaller than normal at some nice ratio that occasionally realigns with the main flow. To give an area of text this quality, use the `bn-type-scale-incremental` mixin and pass a type-scale argument (integer or shorthand) and a ratio. Optionally include another type-scale argument to act as the comparison font.

```sass
p.sidenote
	@include bn-type-scale-incremental(-1, 5/4) // 5 lines of -1 text will take up the same space as 4 of the 0 text

p.hero-caption
	@include bn-type-scale-incremental(hero-caption, 6/5, hero) // 6 lines of hero-caption text will take up the same space as 5 of the hero text
	// remember that these customizations only apply if you refer to these texts this way 
```


### Fine Grained Customization

Want to get *really* picky about your type scales? Most designs have no reason to, and the easy abstractions provided above are almost always more than enough control. But if you really want to, this is the section for you.

If you'd like to change the number of rhythm units (aka multiples of base line height) for different points in your scale, use this. You can refer to each degree in the scale with either a number or a shorthand, and the lines value you provide will only be used when you refer to that type scale with that same identifier.

```sass
$bn-type-scale-custom-lines: (
	-2: 0.5,
	fine-print: .75,
	// these are both referring to the same font-size, but will use different line values depending on how you refer to them

	3: 1.5,

	7: (
		// you can even specify different breakpoints
		xs: 3.5,
		md-down: 6/5 
		lg: 7/5 hero // you can also give one or both the second two arguments from bn-type-scale-incremental
	)
)
```

To set a different type scale ratio for each breakpoint:

```sass
$bn-responsive-type-scale: (
	xs: 1.125,
	sm: 1.200,
	md: (1.333, 1.500),
	lg: 1.618,
	// xl isn't given, but any breakpoints left out will use the nearest value either below them, or above them if one doesn't exist. The global default, if set, overrides this?
)
```

You can also specify an entire map optionally changing both that and the lines for each degree. 

```sass
$bn-responsive-type-scale: (
	xs: (
		ratio: 1.125,
		type-scale-lines: (
			-2: 0.5,
			fine-print: .75
			// these are both referring to the same font-size, but will use different line values
			7: 4.5
		)
	),
	sm: 1.200,
	md: (1.333, 1.500),
	lg: (
		// since ratio is left out, this will use the nearest value either below if it exists, or above if it doesn't, resorting to a global default if neither does, and throwing an error if it can't find anything.
		type-scale-lines: (
			7: 5.5
		)
	),
)
```

### Manual Font Sizing

manual font-size declaration function, allowing overriding stuff. Potentially useful for things like control text.

To size a text completely manually, use `bn-font-size`. Pass a total number of rhythm units to take up per line, and either a type-scale argument or a percentage of the total rhythm units to take up.

```sass
h3.weird-header
	@include bn-font-size(2, 80%)

span.input-text
	@include bn-font-size(.8, fine-print)
```

And of course, you can go to back to the stone age and just manually declare things the way you want.

```sass
p.content-block
	font-size: ru(.7)
	line-height: ru(1.5)
```

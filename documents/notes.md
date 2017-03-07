@bones sizing functions that make the change curve less linear, so smaller is less relatively small and bigger is less relatively big

@bones it's probably most realistic for trigger type relationships to have lots of that conveyed in data attributes

@bones functionality to make lists of a thing alternate a specific attribute with each one

@bones dividers where the actual divider is only a small portion of the size, and the whole divider size itself is actually measured in rhythm units

@bones in skin, mixins that take lists of selectors to similarly style

@bones for viewport sized boxes, the vertical rhythm could possibly just have a remainder at the bottom?

@bones for fixed and absolute placed elements, you can have a viewport column like system for laying them out

@bones api for easily stacking elements and adding films

@bones things like side triangles with svg? heavy svg integration?

@bones hoverable color mixin, that simply uses a global hover change amount

@bones http://snugug.github.io/designing-the-modern-web/ hash /compound-asymmetric-grid

@bones a medallion component

@bones you can target an element for a javascript animation through the stylesheets if you somehow give it attributes that expose it to a cloning function in the javascript or build layer that adds the necessary target attributes to the element in the template. this would make it necessary to detect changes to these qualities and trigger the build again, and for the addition process to occur after the stylesheets were built.
(might be necessary to create custom scss implementation)

@bones mixins helping to set the sizing of text to be responsive and appropriate to it's purpose, such as titles, banners, body, captions, etc

@bones a mixin called on the parent that takes a child selector as argument. used for elements that need to alter the parent in some way

@bones inset vs bleed, systems to quickly decide how a child takes up it's parent's space

@bones any element can be coerced into a box or an item

@bones your "screen above" etc mixins with access to a global breakpoint map

@bones spread image component, can initialize with different gutter widths
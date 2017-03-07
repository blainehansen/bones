horizontal root box
h-block-box
h-column-box
h-window-box


### Horizontal Reflow

This is basically the same as the vertical, but flipped on its side so the screen scroll direction is horizontal. Called with 'horizontal-root-box()'.

Only `bn-h-grid-box`, `window`, `shiftable`, and `spillable` boxes make sense and will behave correctly here.


The `h-grid-box()` is the same version but for the horizontal direction. It fills its parent vertically and then expands horizontally.

**Important**, if you don't set the horizontal size of an `h-grid-box` or all of its contents, they will behave weirdly (you know, because text isn't laid out horizontally).
**Also**, these won't expand infinitely past the horizontal side if used in a normal vertical reflow root box. 



root box decides overall flow
then `switch-to-vertical` and `switch-to-horizontal` or whatever handles awkward situations, taking specific arguments about how size this particular box. this is just an api level mechanism to prompt them to provide needed information. we can't guarantee the horizontal and vertical system won't be misused.
`block-box` and `column-box` (and their `h` counterparts) do the rest of the work, with a safe assumption about what's going on outside of them.
`children-columns` then
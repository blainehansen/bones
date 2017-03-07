So there's the frame and the content. An axis can have: unbounded frame and content (natural), bound frame and bound content (barrier), and bound frame and unbounded content (window or shiftable). An axis whose frame *is* the viewport only keeps its distinction between natural/window/shiftable in the way it treats other elements beyond it in its axis. So a window axis can be larger than the viewport and still be window if it has other elements placed at a fixed distance from it's frame-begin. If there are no other objects in this axis, the distinction breaks down. Or rather, the distinction is in whether the viewport scrolls the object or it scrolls itself, or if the entire viewport scroll is affected by this element or not.


Viewport boxes, those make great sense because they'll expand to full size and be fixed in a direction. Intended to have all sizing within done with the grid system. Fixed size elements 

Normal Vertical Reflow boxes, the basis of the grid system. Elements are force reflowed. Max-widths are enforced. Users are encouraged to always use the grid system to size any widths that could be larger than the viewport.

Horizontal Reflow boxes. Either fill their parent vertically or are given a fixed height, and expand to slowly fill parent horizontally, overflowing into scroll (handle swipe on mobile). Elements are force reflowed. Max-heights are enforced. Users are encouraged to always use the grid system to size any heights that could be larger than the viewport.

Window boxes. Either fill their parent both horizontally and vertically or have fixed width and height, and can be unbounded (allow for scroll) in either direction (handle swipe or drag or jquery scrolling or whatever). Within these, fixed sizes are encouraged for unbounded axes, and grid system for bounded axes.

Ready Made Flexboxes, mostly just as a convenience.

Bare Boxes, something intended to be sized fixed in both directions that would like to use responsive sizing arguments.

We should make a distinction between boxes and containers. Containers want the ability to change the rules of even their parent, whereas a box is just going to do what it's told and behave according to the parent. Both boxes and containers can accept a $row argument that makes them expand.


Axes can: expand infinitely in an unbounded way, and have their visibility limited by either the viewport (natural) or a fixed size (window); force reflow onto other axis (barrier); or allow spilling but hide said spilling until shifts allow it to be seen (shiftable)

- Natural: affects the viewport scroll only.
- Window: has it's own scroll, but could impact viewport scroll if larger than the viewport bad design
- Barrier: never affects the viewport scroll, doesn't have it's own, and never moves. forces reflow
- Shiftable: doesn't affect the viewport scroll, but doesn't move itself through scroll either.

Different kinds of root elements!!!!!! Then the containers have a smaller list of useful options.


Root element. Ensures everything beneath it will work correctly.
Containers. Reflowing (horizontal and vertical) and fixed. Reflowing is normal, content vertically as expected, and fixed is the exact size of the viewport without any scrolling allowed. Horizontal reflowing could be used for things like galleries or whatever.

This is less about "viewport sized" containers than it is about *no scrolling* containers. There are containers that are intended to scroll in one direction, ones that don't scroll at all, and those that go in a direction but through swipes or clicks instead of native scrolls.
Furthermore, it's not about "the viewport", but instead just available space. If the container in question is at the document root, you'll get a viewport sized object, otherwise you'll get one that fills it's parent.
# SVG Holiday Animation

SVG animation designed to add a little holiday cheer for homepage.

![Reveal on scroll gif](resources/holiday.gif)

## Details

The implementation consists of the following. On page load:

- Calculating the height of the content section (This could change depending on the number of sections/promotions added to the page).

- Also calculate the width of the screen to determine the number of decorative SVGs that would be needed to fill each row.

- Dynamically generating the correct number of rows to cover the content. Each row consists of a number of decorative svgs. The rows are offset in position to look more akin to a pattern.

- Each row is tied to a scroll magic scene, that manages the animation to clear the decorations from the screen and vice versa when user is scrolling back up page.

### Demo


[Live demo](https://bournecreative.github.io/bournecreative.svgAnimate.io/)

Built with vanilla javascript, scss, scroll magic, green sock, using ES6 modules, and using laravel mix for the project build.

# Roses Example

This is an example of a product feedback form using only MDC React components. This also uses some MDC Web-only packages, which are just styles ([typography](https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography), [theme](https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme), and [shape](https://github.com/material-components/material-components-web/tree/master/packages/mdc-shape)).

MDC Web Package | Description
--- | ---
Typography | - Set messaging text (font-size, line-height, etc.)
Theme | - Set messaging ink color
Shape | - Set Chip corner shape

## Running example
> starting from root directory (`/material-components-web-react`)

1. `cd ./examples/roses`
1. `npm i`
1. `npm start`
1. in web browser, head to `localhost:8080` (may be different if you have another web server running, such as the screenshot tests)

> NOTE: Ensure that you're on at least NodeJS version 10.4.x
 
## Alternate theme

If you want to see MDC Web's Themeing power in action, head to the `./examples/roses/index.scss` file, and uncomment the first line below the license (line 23):

```sass
$mdc-theme-primary: #b31839; // uncomment for alternate primary theme color
```

This will update the primary color for the app. Just refresh the page and allow the Sass to recompile with #b31839 as the primary color. Feel free to experiment!x

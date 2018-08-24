## Importing Font Icons

If you need to import font icons to your app, the best way is to include it as a `<link>` tag in the head of your document. For example if you're using Material Icons you would add this to your `<head>`:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet">
```

Further details documented on [Material Icons docs ](https://google.github.io/material-design-icons/#icon-font-for-the-web).

By not including the font icon inside your CSS file, it reduces the file size. By reducing CSS file size, you decrease the time to initial load since CSS files are render blocking. This does present some drawbacks -- the main issue being FOUC (Flash of unstyled content). Your users will not see the actual icons until the font icon file loads.

### Use with MDC Ripple

If you load your font icons with a [Ripple](../packages/ripple) with the above method, you will need to set the height and width of the icons. This is because MDC Ripple calculates the ripple size from the initial height/width.

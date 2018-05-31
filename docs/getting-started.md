# Getting Started

## With create-react-app

`create-react-app` is a popular CLI tool to getting started with React. If you're new to React or Webpack, you might be starting out here. This section will walk you through configuring `create-react-app` to install and use our components.

>  Recommended things to know

> 1. node/npm
> 2. JavaScript
> 3. HTML/CSS
> 4. ES6

> _NOTE:_ If you haven't used `create-react-app` before, you may want to read the [Overview Guide](https://github.com/facebook/create-react-app#quick-overview).


### Step 1: Install create-react-app

Install `create-react-app`:

```
npm i -g create-react-app
create-react-app my-app
cd my-app
npm i
```

> NOTE: all npm commands can be replaced with yarn

### Step 2: Using Sass

If you want to use the compiled CSS and not customize any colors, text, etc. you can skip to Step 2a.

Most likely you'll want to start using the [Sass mixins](https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md#sass) to customize your app. There are a few ways to achieve this. `create-react-app` does have a [recommended approach](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc), but at the time of writing this guide it doesn't work.

The alternative route is to [`eject`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject), which is what this step will cover.

> Cautionary note: this is irreversible and may not work in your case. You may need to do some searching to find a method that works for you.

```
npm run eject
```
Answer `yes` to the prompt to continue.

You will then see some output, which will produce a `/scripts` and `/config` directory. Open the `/config/webpack.config.dev.js` file. Scroll down to the CSS loader. It should look something like this:

```js
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
}
```

Update this to import Sass instead of CSS. Replace the above object with:

```js
{
  test: /\.scss$/,
  use: [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        includePaths: ['./node_modules'], // this tells sass-loader to look at /node_modules to find @material/foo sass files
      }
    },
  ]
}
```

Run the follow in the command line:

```
npm i -D sass-loader node-sass
```

Phew! That was the tough part. Your app is now configured to compile any Sass you throw at it, and ready for some MDC-React action.

### Step 2a: Use Compiled CSS

If you performed [Step 2](#step-2-using-sass), then you can skip to [Step 3](##step-3-use-mdc-react-button).

If you don't need to customize your app, then using the CSS is a quicker way to get started with MDC React Components. Each package comes with a `/dist` directory, which includes compiled ES5 and CSS files. `create-react-app` is ready to import CSS files. To import the Button CSS copy the following line into `./src/App.js` imports:

```js
import '@material/react-button/dist/button.css';
```

If you want to use the minified version, the import instead looks like:

```js
import '@material/react-button/dist/button.min.css';
```

### Step 3: Use MDC React Button

Open `./src/App.js`. Then replace the boilerplate App code (entire file) with the barebones MDC React Button:

```js
import React, {Component} from 'react';
import Button from '@material/react-button';

// replace this line with the line in Step 2a if you are using compiled CSS instead  
import '@material/react-button/index.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Button
          raised
          onClick={() => console.log('clicked!')}
        >
          Click Me!
        </Button>
      </div>
    );
  }
}

export default App;
```


You can also use these same configurations for your own Webpack build pipeline without `create-react-app`. But this is the quickest way to getting started with MDC React Components. Button is one of our simpler components, but you should be able to apply these same principles you learn here to any the components. Thanks for trying out MDC React Components, and remember to tell a friend! Enjoy!

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import App from './App';
import topAppBarVariants from './top-app-bar/variants';
import drawerVariants from './drawer/variants';
import selectVariants from './select/variants';
import textFieldVariants from './text-field/variants';
import dialogVariants from './dialog/variants';
import {COMPONENTS} from './constants';
import './index.scss';

const variantRoute = (path: string, Component: React.ComponentClass) => (
  <Route exact key={path} path={`/${path}`} component={Component} />
);

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path='/' component={App} />
      {COMPONENTS.map((componentPath) => {
        const Component = require(`./${componentPath}/index`).default;
        return (
          <Route
            exact
            key={componentPath}
            path={`/${componentPath}`}
            component={Component}
          />
        );
      })}
      {dialogVariants.map((variant: string) => {
        const path = `dialog/${variant}`;
        const Component = require(`./dialog/${variant}`).default;
        return variantRoute(path, Component);
      })}
      {drawerVariants.map((variant: string) => {
        const path = `drawer/${variant}`;
        const Component = require(`./drawer/${variant}`).default;
        return variantRoute(path, Component);
      })}
      {selectVariants.map((variant: string) => {
        const path = `select/${variant}`;
        const Component = require(`./select/${variant}`).default;
        return variantRoute(path, Component);
      })}
      {textFieldVariants.map((variant: string) => {
        const path = `text-field/${variant}`;
        const Component = require(`./text-field/${variant}`).default;
        return variantRoute(path, Component);
      })}
      {topAppBarVariants.map((variant: string) => {
        const path = `top-app-bar/${variant}`;
        const Component = require(`./top-app-bar/${variant}`).default;
        return variantRoute(path, Component);
      })}
    </div>
  </HashRouter>,
  document.getElementById('mcdr-screenshot-test-app')
);

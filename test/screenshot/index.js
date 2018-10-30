import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import App from './App';
import topAppBarVariants from './top-app-bar/variants';
import drawerVariants from './drawer/variants';
import textFieldVariants from './text-field/variants';

import './index.scss';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path='/' component={App}/>
      {COMPONENTS.map((componentPath) => {
        const Component = require(`./${componentPath}/index.js`).default;
        return (
          <Route exact key={componentPath} path={`/${componentPath}`} component={Component}/>
        );
      })}
      {drawerVariants.map((variant) => {
        const path = `drawer/${variant}`;
        const Component = require(`./drawer/${variant}.js`).default;
        return (
          <Route exact key={path} path={`/${path}`} component={Component}/>
        );
      })}
      {textFieldVariants.map((variant) => {
        const path = `text-field/${variant}`;
        const Component = require(`./text-field/${variant}.js`).default;
        return (
          <Route exact key={path} path={`/${path}`} component={Component}/>
        );
      })}
      {topAppBarVariants.map((variant) => {
        const path = `top-app-bar/${variant}`;
        const Component = require(`./top-app-bar/${variant}.js`).default;
        return (
          <Route exact key={path} path={`/${path}`} component={Component}/>
        );
      })}
    </div>
  </HashRouter>
), document.getElementById('mcdr-screenshot-test-app'));

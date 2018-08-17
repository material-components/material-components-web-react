import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import Home from './Home';
import topAppBarVariants from './top-app-bar/variants';

import './index.scss';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path='/' component={Home}/>
      {COMPONENTS.map((componentPath) => {
        const Component = require(`./${componentPath}/index.js`).default;
        return (
          <Route exact key={componentPath} path={`/${componentPath}`} component={Component}/>
        );
      })}
      {topAppBarVariants.map((variant) => {
        const path = `top-app-bar/${variant}`;
        const Component = require(path.resolve(__dirname, `${path}.js`)).default;
        return (
          <Route exact key={path} path={`/${path}`} component={Component}/>
        );
      })}
    </div>
  </HashRouter>
), document.getElementById('mcdr-screenshot-test-app'));

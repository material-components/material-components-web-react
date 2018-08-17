import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './Home';
import TextField from './text-field/index';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home}/>
      {COMPONENTS.map((componentPath) => {
        const Component = require(`./${componentPath}/index.js`).default;
        return (
          <Route exact key={componentPath} path={`/${componentPath}`} component={Component}/>
        );
      })}
    </div>
  </BrowserRouter>
), document.getElementById('mcdr-screenshot-test-app'));

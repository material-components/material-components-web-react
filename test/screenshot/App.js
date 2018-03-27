import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import Catalog from './Catalog';
import TemporaryPackage from './temporary-package';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    );
  }
}

class RouteContainer_ extends React.Component {
  render() {
    return (
      <main>
        <nav className="mdc-toolbar-fixed-adjust">
          <Switch>
            <Route exact path="/" component={Catalog} />
            <Route path="/temporary-package" component={TemporaryPackage} />
          </Switch>
        </nav>
      </main>
    );
  }
}


const RouteContainer = withRouter(RouteContainer_);

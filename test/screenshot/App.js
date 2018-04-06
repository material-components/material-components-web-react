import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import Catalog from './Catalog';
import TopAppBar from './top-app-bar/TopAppBar';

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
        <nav>
          <Switch>
            <Route exact path="/" component={Catalog} />
            <Route path="/top-app-bar" component={TopAppBar} />
          </Switch>
        </nav>
      </main>
    );
  }
}


const RouteContainer = withRouter(RouteContainer_);

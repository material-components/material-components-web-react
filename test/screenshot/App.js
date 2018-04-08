import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import Catalog from './Catalog';
import TopAppBar from './top-app-bar/TopAppBar';
import MaterialIcon from './material-icon/MaterialIcon';

import './index.scss';

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
            <Route path="/material-icon" component={MaterialIcon} />
          </Switch>
        </nav>
      </main>
    );
  }
}


const RouteContainer = withRouter(RouteContainer_);

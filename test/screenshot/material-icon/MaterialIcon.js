import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Menu from './Menu';

import './index.scss';

export default class MaterialIcon extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/material-icon/menu" component={Menu} />
        <Route render={this.renderLinks} />
      </Switch>
    );
  }

  renderLinks() {
    return (
      <div>
        <div>
          <a href='./menu'>
            Menu Icon
          </a>
        </div>
      </div>
    );
  }
};

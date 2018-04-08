import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ShortCollapsed from './ShortCollapsed';
import Short from './Short';
import Prominent from './Prominent';
import Standard from './Standard';
import StandardWithNavigationIconElement from './StandardWithNavigationIconElement';
import StandardNoActionItems from './StandardNoActionItems';

import './index.scss';

export default class TopAppBar extends React.Component {

  links = [{
    component: ShortCollapsed,
    pathname: 'shortCollapsed',
    title: 'Short Collapsed',
  }, {
    component: Short,
    pathname: 'short',
    title: 'Short',
  }, {
    component: Prominent,
    pathname: 'prominent',
    title: 'Prominent',
  }, {
    component: Standard,
    pathname: 'standard',
    title: 'Standard',
  }, {
    component: StandardWithNavigationIconElement,
    pathname: 'standardWithNavigationIconElement',
    title: 'Standard with Navigation Icon Element',
  }, {
    component: StandardNoActionItems,
    pathname: 'standardNoActionItems',
    title: 'Standard No Action Items',
  }];

  render() {
    return (
      <Switch>
        {
          this.links.map((link, index) => (
            <Route
              path={`/top-app-bar/${link.pathname}`}
              component={link.component}
              key={index}
            />
          ))
        }
        <Route render={() => this.renderLinks()} />
      </Switch>
    );
  }

  renderLinks() {
    return (
      <div>
        {this.links.map(this.renderLink)}
      </div>
    );
  }

  renderLink(link, index) {
    return (
      <div key={index}>
        <a href={`./${link.pathname}`}>
          {link.title}
        </a>
      </div>
    );
  }
};

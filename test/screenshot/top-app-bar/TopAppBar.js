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
  render() {
    return (
      <Switch>
        <Route path="/top-app-bar/shortCollapsed" component={ShortCollapsed} />
        <Route path="/top-app-bar/short" component={Short} />
        <Route path="/top-app-bar/prominent" component={Prominent} />
        <Route path="/top-app-bar/standard" component={Standard} />
        <Route path="/top-app-bar/standardWithNavigationIconElement" component={StandardWithNavigationIconElement} />
        <Route path="/top-app-bar/standardNoActionItems" component={StandardNoActionItems} />
        <Route render={this.renderLinks} />
      </Switch>
    );
  }

  renderLinks() {
    return (
      <div>
        <div>
          <a href='./shortCollapsed'>
            Short Collapsed
          </a>
        </div>

        <div>
          <a href='./short'>
            Short
          </a>
        </div>

        <div>
          <a href='./prominent'>
            Prominent
          </a>
        </div>

        <div>
          <a href='./standard'>
            Standard
          </a>
        </div>

        <div>
          <a href='./standardWithNavigationIconElement'>
            Standard with Navigation Icon Element
          </a>
        </div>

        <div>
          <a href='./standardNoActionItems'>
            Standard No Action Items
          </a>
        </div>
      </div>
    );
  }
};

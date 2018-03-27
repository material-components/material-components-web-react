import './temporary-package.scss';

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FooTest from './FooTest';
import BarTest from './BarTest';

export default class TempPackage extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/temporary-package/foo-test" component={FooTest} />
        <Route path="/temporary-package/bar-test" component={BarTest} />
        <Route render={this.renderLinks} />
      </Switch>
    );
  }

  renderLinks() {
    return (
      <div>
        <div>
          <a href='/temporary-package/foo-test'>
            Foo Test
          </a>
        </div>
        <div>
          <a href='/temporary-package/bar-test'>
            Bar Test
          </a>
        </div>
      </div>
    );
  }
}

import './temporary-package.scss';

import React from 'react';

export default class TempPackage extends React.Component {

  render() {
    return (
      <div>
        <a href='/temporary-package/foo-test'>
          Foo Test
        </a>
        <a href='/temporary-package/bar-test'>
          Bar Test
        </a>
      </div>
    );
  }

}

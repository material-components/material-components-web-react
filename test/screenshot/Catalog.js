import React from 'react';

export default class Catalog extends React.Component {
  render() {
    return (
      <div>
        <a href='/temporary-package'>Temporary Package</a>
        <a href='/temporary-package/foo-test'>Foo Test</a>
      </div>
    );
  }
}

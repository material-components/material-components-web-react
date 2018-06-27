import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ChipSet from '../../../packages/chips';

class TestChipSet extends React.Component {
  render() {
    const {
      className, labels, // eslint-disable-line react/prop-types
    } = this.props;

    return <ChipSet
      className={className}
      labels={labels}
    />;
  }
}

ReactDOM.render((
  <div>
    <TestChipSet
      labels={['Jane Smith', 'John Doe']}
    />
    <TestChipSet
      className='demo-custom-color'
      labels={['Custom color', 'Custom color']}
    />
  </div>
), document.getElementById('app'));

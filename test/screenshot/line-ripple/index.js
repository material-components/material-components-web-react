import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import LineRipple from '../../../packages/line-ripple';

class Line extends React.Component {
  state = {
    active: false,
  };

  render() {
    return (
      <div
        onClick={() => this.setState({active: !this.state.active})}
        className='line-ripple-container'>
        <LineRipple active={this.state.active} />
      </div>
    );
  }
};

class LineActive extends React.Component {
  render() {
    return (
      <div
        className='line-ripple-container'>
        <LineRipple active />
      </div>
    );
  }
}

ReactDOM.render((
  <div>
    <Line />
    <LineActive />
  </div>
), document.getElementById('app'));

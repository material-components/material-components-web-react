import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import LineRipple from '../../../packages/line-ripple';

class Line extends React.Component {
  state = {
    shouldActivate: false,
  };

  render() {
    const style = {
      position: 'relative',
      width: '200px',
      height: '40px', border: '1px solid pink',
    };

    return (
      <div
        onClick={() => this.setState({shouldActivate: !this.state.shouldActivate})}
        style={style}>
        <LineRipple shouldActivate={this.state.shouldActivate} />
      </div>
    );
  }
};

ReactDOM.render((
  <Line />
), document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import '../../../packages/line-ripple/index.scss';
import './index.scss';

import LineRipple from '../../../packages/line-ripple';

class Line extends React.Component {

  constructor(props) {
    super(props);
    this.rippleElement = React.createRef();
  }

  render() {
    const style = {position: 'relative', width: '200px', height: '40px', background: 'pink'};

    return (
      <div
        onClick={() => {console.log(this.rippleElement); this.rippleElement.current && this.rippleElement.current.activate()}}
        style={style}>
        <LineRipple ref={this.rippleElement} />
      </div>
    );
  }
}
ReactDOM.render((
  <Line />
), document.getElementById('app'));

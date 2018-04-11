import React from 'react';
import ReactDOM from 'react-dom';

import withRipple from '../../../packages/ripple';

import './index.scss';

const Div = ({children, className = '', initRipple, unbounded, ...otherProps}) => {
  const classes = `ripple-test-component ${className}`;
  return (
    <div
      className={classes}
      ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
}

const DivRipple = withRipple(Div);

ReactDOM.render((
  <div>
    <DivRipple>
      Woof
    </DivRipple>

    <br />

    <DivRipple disabled>
      Disabled
    </DivRipple>
  </div>
), document.getElementById('app'));

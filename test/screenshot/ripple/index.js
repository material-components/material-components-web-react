import React from 'react';

import withRipple from '../../../packages/ripple';

import './index.scss';

/*eslint-disable */
const Div = ({children, className = '', initRipple, unbounded, ...otherProps}) => {
/* eslint-enable */
  const classes = `ripple-test-component ${className}`;
  return (
    <div
      className={classes}
      ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

const DivRipple = withRipple(Div);


const RippleScreenshotTest = () => {
  return (
    <div>
      <DivRipple>
        Woof
      </DivRipple>

      <br />

      <DivRipple disabled>
        Disabled
      </DivRipple>

      <br />

      <DivRipple unbounded className='ripple-unbounded'>
        Unbounded
      </DivRipple>
    </div>
  );
};

export default RippleScreenshotTest;

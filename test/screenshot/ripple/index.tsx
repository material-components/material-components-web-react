import React from 'react';
import {withRipple, InjectedProps} from '../../../packages/ripple';
import './index.scss';

interface DivProps extends InjectedProps<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
  initRipple: (surface: HTMLDivElement) => void;
  unbounded: boolean;
}

/*eslint-disable */
const Div: React.FunctionComponent<DivProps> = ({
  children,
  className = "",
  initRipple,
  unbounded,
  ...otherProps
}) => {
  /* eslint-enable */
  const classes = `ripple-test-component ${className}`;
  return (
    <div className={classes} ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

const DivRipple = withRipple<DivProps, HTMLDivElement>(Div);

const RippleScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <DivRipple>Woof</DivRipple>

      <br />

      <DivRipple disabled>Disabled</DivRipple>

      <br />

      <DivRipple unbounded className='ripple-unbounded'>
        Unbounded
      </DivRipple>
    </div>
  );
};
export default RippleScreenshotTest;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCSelectFoundation} from '@material/select';

import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';
import Wrapper from './Select';
import NativeControl from './NativeControl';

export default class Select extends React.Component {
  render() {
    const {
      disabled,
      onChange,
      id,
      label,
      outlined,
      box,
      dense,
      className,
      nativeControlClassName,
      floatingLabelClassName,
      lineRippleClassName,
      notchedOutlineClassName,
      children,
      ...otherProps,
    } = this.props;

    return (
      <Wrapper
        dense={dense}
        outlined={outlined}
        box={box}
        label={label}
        className={className}
        floatingLabelClassName={floatingLabelClassName}
        lineRippleClassName={lineRippleClassName}
        notchedOutlineClassName={notchedOutlineClassName}
      >
        <NativeControl
          disabled={disabled}
          onChange={onChange}
          id={id}
          className={nativeControlClassName}
          {...otherProps}
        >
          {children}
        </NativeControl>
      </Wrapper>
    );
  }
}

export {Wrapper, NativeControl};

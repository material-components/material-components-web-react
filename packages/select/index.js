import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Wrapper from './Select';
import NativeControl from './NativeControl';

export default class Select extends React.Component {
  render() {
    const {
      box,
      children,
      className,
      disabled,
      floatingLabelClassName,
      id,
      label,
      lineRippleClassName,
      nativeControlClassName,
      notchedOutlineClassName,
      onChange,
      outlined,
      ...otherProps,
    } = this.props;

    return (
      <Wrapper
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


Select.propTypes = {
  box: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  floatingLabelClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  lineRippleClassName: PropTypes.string,
  nativeControlClassName: PropTypes.string,
  notchedOutlineClassName: PropTypes.string,
  onChange: PropTypes.func,
  outlined: PropTypes.bool,
};

Select.defaultProps = {
  box: false,
  children: null,
  className: '',
  disabled: false,
  floatingLabelClassName: '',
  id: '',
  label: '',
  lineRippleClassName: '',
  nativeControlClassName: '',
  notchedOutlineClassName: '',
  onChange: () => {},
  outlined: false,
};

export {Wrapper, NativeControl};

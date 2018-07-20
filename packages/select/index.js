import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Select';
import NativeControl from './NativeControl';

export default class Select extends React.Component {

  render() {
    const {
      box,
      children, // eslint-disable-line no-unused-vars
      className,
      disabled,
      floatingLabelClassName,
      id,
      label,
      lineRippleClassName,
      nativeControlClassName,
      notchedOutlineClassName,
      onChange,
      options, // eslint-disable-line no-unused-vars
      outlined,
      ...otherProps
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
          {this.renderOptions()}
        </NativeControl>
      </Wrapper>
    );
  }

  renderOptions() {
    const {children, options} = this.props;
    if (!(options && options.length)) {
      return children;
    }

    return options.map((option, index) => {
      if (typeof option === 'string') {
        option = {value: option, label: value};
      }

      return (
        <option
          disabled={option.disabled}
          value={option.value}
          key={index}
        >
          {option.labe}
        </option>
      );
    });
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
  options: PropTypes.arrayOf(PropTypes.node),
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
  options: [],
  outlined: false,
};

export {Wrapper, NativeControl};

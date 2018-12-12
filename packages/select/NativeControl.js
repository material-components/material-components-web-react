// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class NativeControl extends React.Component {
  nativeControl_ = React.createRef();

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled(this.props.disabled);
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  handleFocus = (evt) => {
    const {foundation, onFocus} = this.props;
    foundation.handleFocus(evt);
    onFocus(evt);
  }

  handleBlur = (evt) => {
    const {foundation, onBlur} = this.props;
    foundation.handleBlur(evt);
    onBlur(evt);
  }

  handleMouseDown = (evt) => {
    const {onMouseDown} = this.props;
    this.setRippleCenter(evt.clientX, evt.target);
    onMouseDown(evt);
  }

  handleTouchStart = (evt) => {
    const {onTouchStart} = this.props;
    const clientX = evt.touches[0] && evt.touches[0].clientX;
    this.setRippleCenter(clientX, evt.target);
    onTouchStart(evt);
  }

  setRippleCenter = (xCoordinate, target) => {
    if (target !== this.nativeControl_.current) return;
    const targetClientRect = target.getBoundingClientRect();
    const normalizedX = xCoordinate - targetClientRect.left;
    this.props.setRippleCenter(normalizedX);
  }

  render() {
    const {
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      children,
      foundation,
      value,
      handleDisabled,
      onFocus,
      onBlur,
      onTouchStart,
      onMouseDown,
      setRippleCenter,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <select
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        disabled={disabled}
        value={value}
        className={this.classes}
        ref={this.nativeControl_}
        {...otherProps}
      >
        {children}
      </select>
    );
  }
}

NativeControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  foundation: PropTypes.shape({
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
  }),
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onTouchStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  setRippleCenter: PropTypes.func,
  handleDisabled: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

NativeControl.defaultProps = {
  className: '',
  children: null,
  disabled: false,
  foundation: {
    handleFocus: () => {},
    handleBlur: () => {},
  },
  id: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onTouchStart: () => {},
  onMouseDown: () => {},
  setRippleCenter: () => {},
  handleDisabled: () => {},
  value: '',
};

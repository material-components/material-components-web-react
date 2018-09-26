// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCCheckboxFoundation} from '@material/checkbox/dist/mdc.checkbox';
import withRipple from '@material/react-ripple';

import NativeControl from './NativeControl';

export class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.rippleActivator = React.createRef();
    this.foundation_ = null;
    this.state = {
      checked: props.checked,
      classList: new Set(),
      disabled: props.disabled,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCCheckboxFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.handleChange();
    this.foundation_.setDisabled(this.props.disabled);
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.foundation_.handleChange();
    }
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  init = (el) => {
    this.props.initRipple(el, this.rippleActivator.current);
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-checkbox', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasNativeControl: () => true,
      isAttachedToDOM: () => true,
      isChecked: () => this.state.checked,
      isIndeterminate: () => false,

      // setNativeControlAttr
      // removeNativeControlAttr
      // setNativeControlChecked
      // setNativeControlDisabled
      // forceLayout
    };
  }

  render() {
    const {
      /* eslint-disable */
      className,
      checked,
      disabled,
      initRipple,
      unbounded,
      /* eslint-enable */
      nativeControlId,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onAnimationEnd={() => this.foundation_.handleAnimationEnd()}
        ref={this.init}
        {...otherProps}
      >
        <NativeControl
          id={nativeControlId}
          checked={this.state.checked}
          disabled={this.state.disabled}
          onChange={(evt) => {
            this.setState(
              {checked: evt.target.checked},
              () => this.foundation_.handleChange());
          }}
          rippleActivatorRef={this.rippleActivator}
        />
        <div className='mdc-checkbox__background'>
          <svg className='mdc-checkbox__checkmark'
              viewBox='0 0 24 24'>
            <path className='mdc-checkbox__checkmark-path'
                  fill='none'
                  d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
          </svg>
          <div className='mdc-checkbox__mixedmark'></div>
        </div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  nativeControlId: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  nativeControlId: null,
  initRipple: () => {},
  unbounded: true,
};

export default withRipple(Checkbox);

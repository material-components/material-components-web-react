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
    this.inputElement_ = React.createRef();
    this.foundation_ = null;
    this.state = {
      checked: props.checked,
      indeterminate: props.indeterminate,
      classList: new Set(),
      ['aria-checked']: false,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCCheckboxFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setDisabled(this.props.disabled);
    // indeterminate property on checkboxes is not supported:
    // https://github.com/facebook/react/issues/1798#issuecomment-333414857
    if (this.inputElement_.current) {
      this.inputElement_.current.indeterminate = this.state.indeterminate;
    }
  }

  componentDidUpdate(prevProps) {
    const {
      checked,
      indeterminate,
      disabled,
    } = this.props;

    if (checked !== prevProps.checked || indeterminate !== prevProps.indeterminate) {
      this.handleChange(checked, indeterminate);
    }
    if (disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(disabled);
    }
  }

  componentWillUnmount() {
    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }

  init = (el) => {
    this.props.initRipple(el, this.inputElement_.current);
  }

  handleChange = (checked, indeterminate) => {
    this.setState({checked, indeterminate}, () => {
      this.foundation_.handleChange();
      if (this.inputElement_.current) {
        this.inputElement_.current.indeterminate = indeterminate;
      }
    });
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
      // isAttachedToDOM will likely be removed
      // https://github.com/material-components/material-components-web/issues/3691
      isAttachedToDOM: () => true,
      isChecked: () => this.state.checked,
      isIndeterminate: () => this.state.indeterminate,
      setNativeControlAttr: (attr, value) => this.setState({[attr]: value}),
      removeNativeControlAttr: (attr) => this.setState({[attr]: false}),
    };
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      checked,
      indeterminate,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      disabled,
      nativeControlId,
      onChange,
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
          disabled={disabled}
          aria-checked={this.state['aria-checked']}
          onChange={(evt) => {
            const {checked, indeterminate} = evt.target;
            this.handleChange(checked, indeterminate);
            onChange(evt);
          }}
          rippleActivatorRef={this.inputElement_}
        />
        <div className='mdc-checkbox__background'>
          <svg className='mdc-checkbox__checkmark'
            viewBox='0 0 24 24'
            focusable='false'
          >
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
  indeterminate: PropTypes.bool,
  nativeControlId: PropTypes.string,
  onChange: PropTypes.func,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  indeterminate: false,
  nativeControlId: null,
  onChange: () => {},
  initRipple: () => {},
  unbounded: true,
};

export default withRipple(Checkbox);

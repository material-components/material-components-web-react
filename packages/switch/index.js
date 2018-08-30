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

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCSwitchFoundation} from '@material/switch/dist/mdc.switch';

import ThumbUnderlay from './ThumbUnderlay';
import NativeControl from './NativeControl';

export default class Switch extends Component {

  constructor(props) {
    super(props);
    this.rippleActivator = React.createRef();
    this.foundation_ = null;
    this.state = {
      checked: props.checked,
      classList: new Set(),
      disabled: props.disabled,
      nativeControlChecked: props.checked,
      nativeControlDisabled: props.disabled,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCSwitchFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setChecked(this.props.checked);
    this.foundation_.setDisabled(this.props.disabled);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.checked !== prevProps.checked) {
      this.foundation_.setChecked(this.props.checked);
    }
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-switch', Array.from(classList), className);
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
      setNativeControlChecked: (nativeControlChecked) => {
        this.setState({nativeControlChecked});
      },
      setNativeControlDisabled: (nativeControlDisabled) => {
        this.setState({nativeControlDisabled});
      },
    };
  }

  render() {
    const {
      /* eslint-disable */
      className,
      checked,
      disabled,
      /* eslint-enable */
      nativeControlId,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        {...otherProps}
      >
        <div className='mdc-switch__track' />
        <ThumbUnderlay
          rippleActivator={this.rippleActivator}>
          <NativeControl
            id={nativeControlId}
            checked={this.state.nativeControlChecked}
            disabled={this.state.nativeControlDisabled}
            onChange={(evt) => {
              this.setState({nativeControlChecked: evt.target.checked});
              this.foundation_ && this.foundation_.handleChange(evt);
            }}
            rippleActivatorRef={this.rippleActivator}
          />
        </ThumbUnderlay>
      </div>
    );
  }
}

Switch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  nativeControlId: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  nativeControlId: null,
};

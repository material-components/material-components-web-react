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
import {MDCRadioFoundation} from '@material/radio/dist/mdc.radio';
import withRipple from '@material/react-ripple';
import NativeControl from './NativeControl';

class Radio extends React.Component {

  foundation_ = null;
  radioElement_ = React.createRef();
  rippleActivator = null;

  state = {
    classList: new Set(),
    disabled: false,
    nativeControlId: '',
  };

  componentDidMount() {
    this.foundation_ = new MDCRadioFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
    if (this.props.children.props.id) {
      this.setState({nativeControlId: this.props.children.props.id});
    }

    if (this.rippleActivator) {
      this.props.initRipple(this.radioElement_.current, this.rippleActivator);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
    if (this.props.children.props.id !== prevProps.children.props.id) {
      this.setState({nativeControlId: this.props.children.props.id});
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-radio', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      setNativeControlDisabled: (disabled) => this.setState({disabled}),
    };
  }

  init = (el) => {
    this.props.initRipple(el, this.inputControl_.current);
  }

  setRippleActivator = (element) => this.rippleActivator = element;

  render() {
    const {nativeControlId} = this.state;
    const {
      label,
      initRipple,
      unbounded,
      className,
      ...otherProps
    } = this.props;

    return (
      <div className='mdc-form-field'>
        <div className={this.classes} ref={this.radioElement_} {...otherProps}>
          {this.renderNativeControl()}
          <div className='mdc-radio__background'>
            <div className='mdc-radio__outer-circle'></div>
            <div className='mdc-radio__inner-circle'></div>
          </div>
        </div>
        {label ? <label htmlFor={nativeControlId}>{label}</label> : null}
      </div>
    );
  }

  renderNativeControl () {
    const children = React.Children.only(this.props.children);
    const updatedProps = Object.assign({}, children.props, {
      disabled: this.state.disabled,
      setRippleActivator: this.setRippleActivator,
    });
    return (
      React.cloneElement(children, updatedProps)
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  unbounded: PropTypes.bool,
};

Radio.defaultProps = {
  className: '',
  disabled: false,
  unbounded: true,
};

export default withRipple(Radio);
export {NativeControl as NativeRadioControl};

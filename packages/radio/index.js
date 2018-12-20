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
import {withRipple} from '@material/react-ripple';
import NativeControl from './NativeControl';

class Radio extends React.Component {
  foundation_ = null;
  radioElement_ = React.createRef();
  rippleActivatorRef = React.createRef();

  state = {
    classList: new Set(),
    disabled: false,
    nativeControlId: '',
  };

  constructor(props) {
    super(props);
    this.foundation_ = new MDCRadioFoundation(this.adapter);
  }

  componentDidMount() {
    this.foundation_.init();
    const childProps = this.props.children.props;
    if (childProps.disabled) {
      this.foundation_.setDisabled(childProps.disabled);
    }
    if (childProps.id) {
      this.setState({nativeControlId: childProps.id});
    }
    if (this.rippleActivatorRef && this.rippleActivatorRef.current) {
      this.props.initRipple(this.radioElement_.current, this.rippleActivatorRef.current);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const childProps = this.props.children.props;
    if (childProps.disabled !== prevProps.children.props.disabled) {
      this.foundation_.setDisabled(childProps.disabled);
    }
    if (childProps.id !== prevProps.children.props.id) {
      this.setState({nativeControlId: childProps.id});
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

  render() {
    const {nativeControlId} = this.state;
    const {
      /* eslint-disable no-unused-vars */
      label,
      initRipple,
      unbounded,
      className,
      /* eslint-enable no-unused-vars */
      wrapperClasses,
      ...otherProps
    } = this.props;

    return (
      <div className={classnames('mdc-form-field', wrapperClasses)}>
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

  renderNativeControl() {
    const children = React.Children.only(this.props.children);
    const updatedProps = Object.assign({}, children.props, {
      disabled: this.state.disabled,
      rippleActivatorRef: this.rippleActivatorRef,
    });
    return (
      React.cloneElement(children, updatedProps)
    );
  }
}

Radio.propTypes = {
  label: PropTypes.string,
  initRipple: PropTypes.func,
  className: PropTypes.string,
  wrapperClasses: PropTypes.string,
  unbounded: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Radio.defaultProps = {
  label: '',
  initRipple: () => {},
  className: '',
  wrapperClasses: '',
  unbounded: true,
  children: null,
};

export default withRipple(Radio);
export {Radio, NativeControl as NativeRadioControl};

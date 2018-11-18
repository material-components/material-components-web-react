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
import * as React from "react";
import classnames from "classnames";
import {MDCLineRippleFoundation} from "@material/line-ripple";

export type LineRippleProps = {
  className?: string,
  style?: object,
  active?: boolean,
  rippleCenter: number | 0
};

type LineRippleState = {
  classList: Set<any>,
  style: {}
};

export default class LineRipple extends React.Component<
  LineRippleProps,
  LineRippleState
> {

  static defaultProps = {
    className: "",
    style: {},
    active: false,
    // rippleCenter: 0
  };
  
  foundation_: null | MDCLineRippleFoundation;

  state = {
    classList: new Set(),
    style: {}
  };

  componentDidMount() {
    this.foundation_ = new MDCLineRippleFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.active) {
      this.foundation_.activate();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        this.foundation_.activate();
      } else {
        this.foundation_.deactivate();
      }
    }
    // isNaN checks are a temporary fix until MDC Web has fix
    // https://github.com/material-components/material-components-web-react/issues/275
    // https://github.com/material-components/material-components-web/issues/3643
    if (
      this.props.rippleCenter !== prevProps.rippleCenter &&
      !isNaN(this.props.rippleCenter)
    ) {
      this.foundation_.setRippleCenter(this.props.rippleCenter);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      addClass: className =>
        this.setState({ classList: this.state.classList.add(className) }),
      removeClass: className => {
        const { classList } = this.state;
        classList.delete(className);
        this.setState({ classList });
      },
      hasClass: className => this.state.classList.has(className),
      setStyle: this.setStyle
    };
  }

  get classes() {
    const { className } = this.props;
    const { classList } = this.state;
    return classnames("mdc-line-ripple", Array.from(classList), className);
  }

  setStyle = (varName, value) => {
    const styleName = varName.replace(/-(\w)/g, (_, v) => v.toUpperCase());
    const updatedStyle = Object.assign({}, this.state.style);
    updatedStyle[styleName] = value;
    this.setState({ style: updatedStyle });
  };

  getMergedStyles = () => {
    const { style: wrappedStyle } = this.props;
    const { style } = this.state;
    return Object.assign({}, style, wrappedStyle);
  };

  render() {
    const {
      style, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      active, // eslint-disable-line no-unused-vars
      rippleCenter, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        style={this.getMergedStyles()}
        onTransitionEnd={evt => this.foundation_.handleTransitionEnd(evt)}
        {...otherProps}
      />
    );
  }
}

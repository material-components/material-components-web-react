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
import classnames from 'classnames';
import {MDCLineRippleFoundation} from '@material/line-ripple/foundation';
import {MDCLineRippleAdapter} from '@material/line-ripple/adapter';

export interface LineRippleProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  active?: boolean;
  rippleCenter?: number;
}

interface LineRippleState {
  classList: Set<string>;
  style: React.CSSProperties;
}

export default class LineRipple extends React.Component<
  LineRippleProps,
  LineRippleState
> {
  static defaultProps = {
    className: '',
    style: {},
    active: false,
    rippleCenter: 0,
  };

  foundation_!: MDCLineRippleFoundation;

  state: LineRippleState = {
    classList: new Set(),
    style: {},
  };

  componentDidMount() {
    this.foundation_ = new MDCLineRippleFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.active) {
      this.foundation_.activate();
    }
  }

  componentDidUpdate(prevProps: LineRippleProps) {
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
    const {rippleCenter} = this.props;
    if (
      rippleCenter &&
      rippleCenter !== prevProps.rippleCenter &&
      !isNaN(rippleCenter)
    ) {
      this.foundation_.setRippleCenter(rippleCenter);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter(): MDCLineRippleAdapter {
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.state.classList.has(className),
      setStyle: this.setStyle,
      registerEventHandler: () => null,
      deregisterEventHandler: () => null,
    };
  }

  get classes() {
    const {className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-line-ripple', Array.from(classList), className);
  }

  setStyle = (varName: string, value: string) => {
    const styleName = varName.replace(/-(\w)/g, (_, v) => v.toUpperCase());
    const updatedStyle: any = Object.assign({}, this.state.style);
    updatedStyle[styleName] = value;
    this.setState({style: updatedStyle});
  };

  // TODO: look into possible performance hit
  getMergedStyles = () => {
    const {style: wrappedStyle} = this.props;
    const {style} = this.state;
    return Object.assign({}, style, wrappedStyle);
  };

  onTransitionEnd = (evt: React.TransitionEvent<Element>) =>
    this.foundation_.handleTransitionEnd(evt.nativeEvent);

  render() {
    const {
      style, // eslint-disable-line @typescript-eslint/no-unused-vars
      className, // eslint-disable-line @typescript-eslint/no-unused-vars
      active, // eslint-disable-line @typescript-eslint/no-unused-vars
      rippleCenter, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        style={this.getMergedStyles()}
        onTransitionEnd={this.onTransitionEnd}
        {...otherProps}
      />
    );
  }
}

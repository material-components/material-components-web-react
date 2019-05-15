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
import {MDCFloatingLabelFoundation} from '@material/floating-label/foundation';
import {MDCFloatingLabelAdapter} from '@material/floating-label/adapter';
import {cssClasses} from '@material/floating-label/constants';

export interface FloatingLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  handleWidthChange?: (width: number) => void;
  float?: boolean;
}

interface FloatingLabelState {
  classList: Set<string>;
}

export default class FloatingLabel extends React.Component<
  FloatingLabelProps,
  FloatingLabelState
> {
  foundation!: MDCFloatingLabelFoundation;
  labelElement: React.RefObject<HTMLLabelElement> = React.createRef();

  static defaultProps: Partial<FloatingLabelProps> = {
    className: '',
    float: false,
  };

  state: FloatingLabelState = {
    classList: new Set(),
  };

  componentDidMount() {
    this.initializeFoundation();
    this.handleWidthChange();
    if (this.props.float) {
      this.foundation.float(true);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: FloatingLabelProps) {
    if (this.props.children !== prevProps.children) {
      this.handleWidthChange();
    }
    if (this.props.float !== prevProps.float) {
      this.foundation.float(this.props.float!);
    }
  }

  initializeFoundation = () => {
    this.foundation = new MDCFloatingLabelFoundation(this.adapter);
    this.foundation.init();
  };

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames(cssClasses.ROOT, Array.from(classList), className);
  }

  get adapter(): MDCFloatingLabelAdapter {
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: this.removeClassFromClassList,
      // the adapter methods below are effectively useless since React
      // handles events and width differently
      registerInteractionHandler: () => undefined,
      deregisterInteractionHandler: () => undefined,
      // Always returns 0 beacuse MDC Web component does
      // only proxies to foundation.getWidth.
      // MDC React instead passes it from the text-field
      // component to floating-label component.
      getWidth: () => 0,
    };
  }

  // must be called via ref
  shake = () => {
    this.foundation.shake(true);
  };

  removeClassFromClassList = (className: string) => {
    const {classList} = this.state;
    classList.delete(className);
    this.setState({classList});
  };

  handleWidthChange = () => {
    if (this.props.handleWidthChange && this.labelElement.current) {
      this.props.handleWidthChange(this.labelElement.current.offsetWidth);
    }
  };

  onShakeEnd = () => {
    this.removeClassFromClassList(cssClasses.LABEL_SHAKE);
  };

  render() {
    const {
      className, // eslint-disable-line @typescript-eslint/no-unused-vars
      children,
      handleWidthChange, // eslint-disable-line @typescript-eslint/no-unused-vars
      float, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <label
        className={this.classes}
        ref={this.labelElement}
        onAnimationEnd={this.onShakeEnd}
        {...otherProps}
      >
        {children}
      </label>
    );
  }
}

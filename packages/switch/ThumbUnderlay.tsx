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

import * as React from 'react';
import * as classnames from 'classnames';
// TODO: fix with #528
// @ts-ignore
import withRipple from '@material/react-ripple';

export interface ThumbUnderlayProps extends React.HTMLProps<HTMLDivElement> {
  className: string;
  initRipple: (surface: HTMLDivElement, activator: HTMLInputElement) => void;
  unbounded: boolean;
  rippleActivator?: React.RefObject<HTMLInputElement>;
}

function isHTMLInputElement(element: any): element is HTMLInputElement {
  return element !== null;
}

export class ThumbUnderlay extends React.Component<ThumbUnderlayProps, {}> {
  static defaultProps = {
    className: '',
    initRipple: () => {},
    unbounded: true,
  };

  init = (el: HTMLDivElement) => {
    if (this.props.rippleActivator) {
      if (isHTMLInputElement(this.props.rippleActivator.current)) {
        this.props.initRipple(el, this.props.rippleActivator.current);
      }
    }
  };

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  render() {
    const {
      children,
      /* eslint-disable */
      className,
      initRipple,
      unbounded,
      rippleActivator,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    return (
      <div className={this.classes} ref={this.init} {...otherProps}>
        <div className='mdc-switch__thumb'>{children}</div>
      </div>
    );
  }
}

export default withRipple(ThumbUnderlay);

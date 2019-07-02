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

import {
  withRipple,
  InjectedProps,
  RippledComponentInterface,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
  RippledComponentState,
} from '@material/react-ripple';

export interface TabRippleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    InjectedProps<HTMLDivElement> {
  className: string;
  ref?: React.RefObject<TabRipple>;
}

class TabRippleBase extends React.Component<TabRippleProps, {}> {
  get classes() {
    return classnames('mdc-tab__ripple', this.props.className);
  }

  render() {
    const {
      // keeping out of ...otherProps
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      unbounded,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      initRipple,
      ...otherProps
    } = this.props;
    return <div className={this.classes} {...otherProps} ref={initRipple} />;
  }
}

const TabRipple = withRipple<TabRippleProps, HTMLDivElement>(TabRippleBase);
type TabRipple = React.Component<TabRippleProps, RippledComponentState> &
  RippledComponentInterface<any>;
export default TabRipple;

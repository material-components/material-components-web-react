// The MIT License
//
// Copyright (c) 2019 Google, Inc.
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
import {MenuListItem, MenuListItemProps} from '@material/react-menu'; // eslint-disable-line no-unused-vars

export type OptionProps<T extends HTMLElement = HTMLElement> = BaseOptionProps &
  (T extends HTMLOptionElement
    ? React.HTMLProps<HTMLOptionElement>
    : MenuListItemProps<T>);

interface BaseOptionProps {
  enhanced?: boolean;
}

class Option<T extends HTMLElement = HTMLElement> extends React.Component<
  OptionProps<T>,
  {}
> {
  static defaultProps = {
    enhanced: false,
  };

  render() {
    const {value, enhanced, children, ...otherProps} = this.props;

    if (enhanced) {
      return (
        <MenuListItem data-value={value} {...otherProps}>
          {children}
        </MenuListItem>
      );
    }
    return (
      <option value={value} {...otherProps}>
        {children}
      </option>
    );
  }
}

export default Option;

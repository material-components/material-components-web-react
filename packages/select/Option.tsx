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
import {MenuListItem, MenuListItemProps} from '@material/react-menu';

export interface EnhancedOptionProps<T> extends MenuListItemProps<T> {}
// export type OptionProps<T extends HTMLElement>
//   = T extends HTMLOptionElement ? HTMLOptionElement : EnhancedOptionProps<T>;

// const EnhancedOption: <T extends HTMLElement = HTMLElement>(props: EnhancedOptionProps<T>) =>
// React.ReactElement<EnhancedOptionProps<T>> = ({
//   value,
//   children,
//   ...otherProps
// }) => {
//   return (
//     <MenuListItem
//       data-value={value}
//       {...otherProps}
//     >
//       {children}
//     </MenuListItem>
//   );
// }

class EnhancedOption<T extends HTMLElement = HTMLElement> extends React.Component<EnhancedOptionProps<T>, {}> {
  static defaultProps = {};

  render() {
    const {
      value,
      children,
      ...otherProps
    } = this.props;

    return (
      <MenuListItem
        data-value={value}
        {...otherProps}
      >
        {children}
      </MenuListItem>
    );
  }
}

EnhancedOption.defaultProps = MenuListItem.defaultProps;;

export default EnhancedOption;
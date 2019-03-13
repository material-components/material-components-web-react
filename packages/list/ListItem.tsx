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
import {MDCListFoundation} from '@material/list/foundation';

export interface ListItemProps<T> extends React.HTMLProps<T> {
  checkboxList?: boolean;
  radioList?: boolean;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onClick?: React.MouseEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  tag?: string;
  activated?: boolean;
  selected?: boolean;
};

// TODO: convert to functional component
// https://github.com/material-components/material-components-web-react/issues/729
export default class ListItem<T extends HTMLElement = HTMLElement> extends React.Component<
  ListItemProps<T>,
  {}
  > {
  private listItemElement = React.createRef<T>();

  static defaultProps: Partial<ListItemProps<HTMLElement>> = {
    checkboxList: false,
    radioList: false,
    className: '',
    tabIndex: -1,
    onKeyDown: () => {},
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    tag: 'li',
  };

  get classes() {
    const {className, activated, selected} = this.props;
    return classnames('mdc-list-item', className, {
      [MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS]: activated,
      [MDCListFoundation.cssClasses.LIST_ITEM_SELECTED_CLASS]: selected,
    });
  }

  get role() {
    const {checkboxList, radioList, role} = this.props;
    if (role) {
      return role;
    } else if (checkboxList) {
      return 'checkbox';
    } else if (radioList) {
      return 'radio';
    }
    return null;
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      children,
      role,
      checkboxList,
      radioList,
      /* eslint-enable no-unused-vars */
      tag: Tag,

      ...otherProps
    } = this.props;
    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag
        role={this.role}
        className={this.classes}
        ref={this.listItemElement}
        {...otherProps}
      >
        {this.props.children}
      </Tag>
    );
  }
}

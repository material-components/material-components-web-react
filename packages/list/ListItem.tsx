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
import classnames from 'classnames';
import {MDCListFoundation} from '@material/list/foundation';
import {ListItemContext} from './index';

export interface ListItemProps<T extends HTMLElement = HTMLElement> extends React.HTMLProps<T> {
  checkboxList?: boolean;
  radioList?: boolean;
  tag?: string;
  activated?: boolean;
  selected?: boolean;
  ref?: React.Ref<any>;
};

const getRole = (checkboxList?: boolean, radioList?: boolean, role?: string) => {
  if (role) {
    return role;
  } else if (checkboxList) {
    return 'checkbox';
  } else if (radioList) {
    return 'radio';
  }
  return null;
}

const getClasses = (activated: boolean, selected: boolean, className: string) => {
  return classnames('mdc-list-item', className, {
    [MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS]: activated,
    [MDCListFoundation.cssClasses.LIST_ITEM_SELECTED_CLASS]: selected,
  });
}

// TODO: convert to functional component
// https://github.com/material-components/material-components-web-react/issues/729
const ListItemBase: React.FunctionComponent<ListItemProps> = ({
  checkboxList = false,
  radioList = false,
  className = '',
  tabIndex = -1,
  tag: Tag = 'li',
  children,
  activated = false,
  selected = false,
  role,
  ...otherProps
}) => {
  console.log(otherProps)
  return (
    // https://github.com/Microsoft/TypeScript/issues/28892
    // @ts-ignore
    <Tag
      role={getRole(checkboxList, radioList, role)}
      className={getClasses(activated, selected, className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}

class ListItem extends React.Component<ListItemProps, {}> {
  updatedProps?: ListItemProps;
  render() {
    return (
      <ListItemContext.Consumer>
        {(getNewProps) => {
          this.updatedProps = this.updatedProps || getNewProps(this.props);
          return (<ListItemBase {...this.updatedProps} />);
        }}
      </ListItemContext.Consumer>
    );
  }
}

export default ListItem;
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
import React, { Component } from "react";
import classnames from "classnames";
type ListItemProps = {
  className?: string,
  classNamesFromList?: any[],
  attributesFromList?: object,
  childrenTabIndex?: number,
  tabIndex?: number,
  shouldFocus?: boolean,
  shouldFollowHref?: boolean,
  shouldToggleCheckbox?: boolean,
  onKeyDown?: (...args: any[]) => any,
  onClick?: (...args: any[]) => any,
  onFocus?: (...args: any[]) => any,
  onBlur?: (...args: any[]) => any,
  tag?: string
};
export default class ListItem extends Component<ListItemProps, {}> {
  listItemElement_ = React.createRef();
  componentDidUpdate(prevProps) {
    const { shouldFocus, shouldFollowHref, shouldToggleCheckbox } = this.props;
    if (shouldFocus !== prevProps.shouldFocus && shouldFocus) {
      this.focus();
    }
    if (shouldFollowHref !== prevProps.shouldFollowHref && shouldFollowHref) {
      this.followHref();
    }
    if (
      shouldToggleCheckbox !== prevProps.shouldToggleCheckbox &&
      shouldToggleCheckbox
    ) {
      this.toggleCheckbox();
    }
  }
  get classes() {
    const { className, classNamesFromList } = this.props;
    return classnames("mdc-list-item", className, classNamesFromList);
  }
  focus() {
    const element = this.listItemElement_.current;
    if (element) {
      element.focus();
    }
  }
  followHref() {
    const element = this.listItemElement_.current;
    if (element && element.href) {
      element.click();
    }
  }
  toggleCheckbox() {
    // TODO(bonniez): implement
    // https://github.com/material-components/material-components-web-react/issues/352
  }
  render() {
    const {
      /* eslint-disable */
      className,
      classNamesFromList,
      childrenTabIndex,
      shouldFocus,
      shouldFollowHref,
      shouldToggleCheckbox,
      /* eslint-enable */
      attributesFromList,
      children,
      tag: Tag,
      ...otherProps
    } = this.props;
    return (
      <Tag
        className={this.classes}
        {...otherProps}
        {...attributesFromList} // overrides attributes in otherProps
        ref={this.listItemElement_}
      >
        {React.Children.map(children, this.renderChild)}
      </Tag>
    );
  }
  renderChild = child => {
    const props = Object.assign({}, child.props, {
      tabIndex: this.props.childrenTabIndex
    });
    return React.cloneElement(child, props);
  };
}
ListItem.defaultProps = {
  className: "",
  classNamesFromList: [],
  attributesFromList: {},
  childrenTabIndex: -1,
  tabIndex: -1,
  shouldFocus: false,
  shouldFollowHref: false,
  shouldToggleCheckbox: false,
  onKeyDown: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
  tag: "li"
};

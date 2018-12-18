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

export interface ListItemProps<T> extends React.HTMLProps<T> {
  className: string,
  classNamesFromList: string[],
  attributesFromList: object,
  childrenTabIndex: number,
  tabIndex: number,
  shouldFocus: boolean,
  shouldFollowHref: boolean,
  shouldToggleCheckbox: boolean,
  onKeyDown: React.KeyboardEventHandler<T>;
  onClick: React.MouseEventHandler<T>;
  onFocus: React.FocusEventHandler<T>;
  onBlur: React.FocusEventHandler<T>;
  tag: string,
  children: React.ReactNode,
};

function isAnchorElement(element: any): element is HTMLAnchorElement {
  return !!element.href;
}

function isFocusableElement(element: any): element is HTMLElement {
  return typeof <HTMLElement>element.focus === 'function';
}

export default class ListItem<T extends {} = HTMLElement> extends React.Component<
  ListItemProps<T>,
  {}
  > {
  listItemElement_: React.RefObject<T> = React.createRef();

  static defaultProps: Partial<ListItemProps<HTMLElement>> = {
    className: '',
    classNamesFromList: [],
    attributesFromList: {},
    childrenTabIndex: -1,
    tabIndex: -1,
    shouldFocus: false,
    shouldFollowHref: false,
    shouldToggleCheckbox: false,
    onKeyDown: (_: React.KeyboardEvent<HTMLElement>) => {},
    onClick: (_: React.MouseEvent<HTMLElement>) => {},
    onFocus: (_: React.FocusEvent<HTMLElement>) => {},
    onBlur: (_: React.FocusEvent<HTMLElement>) => {},
    tag: 'li',
  };

  componentDidUpdate(prevProps: ListItemProps<T>) {
    const {shouldFocus, shouldFollowHref, shouldToggleCheckbox} = this.props;
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
    const {className, classNamesFromList} = this.props;
    return classnames('mdc-list-item', className, classNamesFromList);
  }

  focus() {
    const element = this.listItemElement_.current;
    if (isFocusableElement(element)) {
      element.focus();
    }
  }

  followHref() {
    const element = this.listItemElement_.current;
    if (isAnchorElement(element)) {
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
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
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

  renderChild = (child: React.ReactChild) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return child;
    }

    const props = Object.assign({}, child.props, {
      tabIndex: this.props.childrenTabIndex,
    });
    return React.cloneElement(child, props);
  };
}

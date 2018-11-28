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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withRipple from '@material/react-ripple';

export class ListItem extends Component {
  listItemElement_ = null;

  componentDidUpdate(prevProps) {
    const {
      shouldFocus,
      shouldFollowHref,
      shouldToggleCheckbox,
    } = this.props;
    if (shouldFocus !== prevProps.shouldFocus && shouldFocus) {
      this.focus();
    }
    if (shouldFollowHref !== prevProps.shouldFollowHref && shouldFollowHref) {
      this.followHref();
    }
    if (shouldToggleCheckbox !== prevProps.shouldToggleCheckbox && shouldToggleCheckbox) {
      this.toggleCheckbox();
    }
  }

  init = (el) => {
    this.listItemElement_ = el;
    this.props.initRipple(el);
  }

  get classes() {
    const {className, classNamesFromList} = this.props;
    return classnames('mdc-list-item', className, classNamesFromList);
  }

  focus() {
    const element = this.listItemElement_;
    if (element) {
      element.focus();
    }
  }

  followHref() {
    const element = this.listItemElement_;
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
      initRipple,
      unbounded,
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
        ref={this.init}
      >
        {React.Children.map(children, this.renderChild)}
      </Tag>
    );
  }

  renderChild = (child) => {
    const props = Object.assign({},
      child.props,
      {tabIndex: this.props.childrenTabIndex}
    );
    return React.cloneElement(child, props);
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classNamesFromList: PropTypes.array,
  attributesFromList: PropTypes.object,
  childrenTabIndex: PropTypes.number,
  tabIndex: PropTypes.number,
  shouldFocus: PropTypes.bool,
  shouldFollowHref: PropTypes.bool,
  shouldToggleCheckbox: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  tag: PropTypes.string,
  unbounded: PropTypes.bool,
  initRipple: PropTypes.func,
};

ListItem.defaultProps = {
  className: '',
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
  tag: 'li',
  unbounded: false,
  initRipple: () => {},
};

export default withRipple(ListItem);

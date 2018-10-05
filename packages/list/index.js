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

import {MDCListFoundation} from '@material/list/dist/mdc.list';

import ListItem from './ListItem';
import ListDivider from './ListDivider';
import {ListGroup, ListGroupSubheader} from './ListGroup';

export default class List extends Component {
  listItems_ = [];
  listElement_ = React.createRef();

  componentDidMount() {
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(this.props.singleSelection);
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, nonInterative, dense, avatarList, twoLine} = this.props;
    return classnames('mdc-list', className, {
      'mdc-list--non-interactive': nonInterative,
      'mdc-list--dense': dense,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--two-line': twoLine,
    });
  }

  get adapter() {
    return {

    };
  }

  getListItemIndexOfElement_ = (element) => {
    for (let i = 0; i < this.listItems_.length; i++) {
      if (this.listItems_[i].listItemElement_.current === element) {
        return i;
      }
    }
    return -1;
  }

  getListItemIndexOfTarget_ = (eventTarget) => {
    let target = eventTarget;

    // Find the first ancestor that is a list item.
    while (getListItemIndexOfElement_(target) < 0) {
      // if (target === this.listElement_.current || target === document) {
      //   return -1;
      // }
      target = target.parentElement;
    }

    return getListItemIndexOfCurrent(target);
  }

  onKeyDown = (e) => {
    e.persist(); // Persist the synthetic event to access its `key`
    const index = this.getListItemIndexOfTarget_(e.target);
    if (index >= 0) {
      this.foundation_.handleKeydown(e, true /* isRootListItem is true if index >= 0 */, index);
    }
    this.props.onKeyDown(e);
  }

  onClick = (e) => {
    const index = this.getListItemIndexOfTarget_(e.target);
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = e.target.type === 'checkbox';
    this.foundation_.handleClick(index, toggleCheckbox);
    this.props.onClick(e);
  }

  // onFocusIn is not yet supported in React, use onFocus as workaround
  // https://github.com/facebook/react/issues/6410
  onFocus = (e) => {
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusIn(e, index);
    this.props.onClick(e);
  }

  // onFocusOut is not yet supported in React, use onBlur as workaround
  // https://github.com/facebook/react/issues/6410
  onBlur = (e) => {
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusOut(e, index);
    this.props.onClick(e);
  }

  render() {
    const {
      /* eslint-disable */
      className,
      onKeyDown,
      onClick,
      onFocus,
      onBlur,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;

    return (
      <ul
        className={this.classes}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...otherProps}
      >
        {React.Children.map(children, this.renderListItem)}
      </ul>
    );
  }

  renderListItem = (listItem) => {
    const {
      children,
      ...otherProps
    } = listItem.props;

    const props = {
      ref: (el) => this.listItems_.push(el),
      ...otherProps,
    };

    return React.cloneElement(listItem, props, children);
  }
}

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  nonInterative: PropTypes.bool,
  dense: PropTypes.bool,
  avatarList: PropTypes.bool,
  twoLine: PropTypes.bool,
  singleSelection: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

List.defaultProps = {
  className: '',
  nonInterative: false,
  dense: false,
  avatarList: false,
  twoLine: false,
  singleSelection: false,
  onKeyDown: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export {ListItem, ListDivider, ListGroup, ListGroupSubheader};

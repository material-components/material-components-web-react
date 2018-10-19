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

const ARIA_ORIENTATION = 'aria-orientation';
const VERTICAL = 'vertical';

export default class List extends Component {
  listItems_ = {};
  listItemIndices_ = {};
  state = {
    listItemAttributes: {}, // maps key to {attr: val} map object
    listItemClassList: {}, // maps key to classList set
    listItemChildrenTabIndex: {}, // maps key to children's tabIndex
  };

  componentDidMount() {
    for (let key in this.listItems_) {
      this.initListItemAttributes_(key);
      this.initListItemChildrenTabIndex_(key);
      this.initListItemClassList_(key);
    }

    const {singleSelection, selectedIndex, wrapFocus} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
    if (selectedIndex) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
  }

  componentDidUpdate(prevProps) {
    const {singleSelection, selectedIndex, wrapFocus} = this.props;
    if (singleSelection !== prevProps.singleSelection) {
      this.foundation_.setSingleSelection(singleSelection);
    }
    if (wrapFocus !== prevProps.wrapFocus) {
      this.foundation_.setWrapFocus(wrapFocus);
    }
    if (selectedIndex !== prevProps.selectedIndex) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
    if (this.props[ARIA_ORIENTATION] !== prevProps[ARIA_ORIENTATION]) {
      this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  initListItemAttributes_(key) {
    const {listItemAttributes} = this.state;
    listItemAttributes[key] = {
      'aria-selected': false,
      'tabIndex': this.listItemIndices_[key] === 0 ? 0 : -1,
    };
    this.setState({listItemAttributes});
  }

  initListItemChildrenTabIndex_(key) {
    const {listItemChildrenTabIndex} = this.state;
    listItemChildrenTabIndex[key] = -1;
    this.setState({listItemChildrenTabIndex});
  }

  initListItemClassList_(key) {
    const {listItemClassList} = this.state;
    listItemClassList[key] = new Set();
    this.setState({listItemClassList});
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

  getListItemClasses_(key, className) {
    const {listItemClassList} = this.state;
    return listItemClassList[key] ?
      classnames(Array.from(listItemClassList[key]), className) :
      className;
  }

  get adapter() {
    return {
      getListItemCount: () => Object.keys(this.listItems_).length,
      getFocusedElementIndex: () => this.getListItemIndexOfTarget_(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const key = this.getListItemKeyFromIndex_(index);
        listItemAttributes[key][attr] = value;
        this.setState({listItemAttributes});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const key = this.getListItemKeyFromIndex_(index);
        delete listItemAttributes[key][attr];
        this.setState({listItemAttributes});
      },
      addClassForElementIndex: (index, className) => {
        const {listItemClassList} = this.state;
        const key = this.getListItemKeyFromIndex_(index);
        listItemClassList[key].add(className);
        this.setState({listItemClassList});
      },
      removeClassForElementIndex: (index, className) => {
        const {listItemClassList} = this.state;
        const key = this.getListItemKeyFromIndex_(index);
        listItemClassList[key].delete(className);
        this.setState({listItemClassList});
      },
      focusItemAtIndex: (index) => {
        const key = this.getListItemKeyFromIndex_(index);
        const listItem = this.listItems_[key];
        if (listItem) {
          listItem.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const {listItemChildrenTabIndex} = this.state;
        const key = this.getListItemKeyFromIndex_(listItemIndex);
        listItemChildrenTabIndex[key]= tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      followHref: (index) => {
        const key = this.getListItemKeyFromIndex_(index);
        const listItem = this.listItems_[key];
        if (listItem) {
          listItem.followHref();
        }
      },
      toggleCheckbox: (index) => {
        const key = this.getListItemKeyFromIndex_(index);
        const listItem = this.listItems_[key];
        if (listItem) {
          listItem.toggleCheckbox();
        }
      },
    };
  }

  getListItemKeyFromIndex_ = (index) => {
    for (let key in this.listItemIndices_) {
      if (this.listItemIndices_[key] === index) return key;
    };
    return '';
  }

  getIndexOfListItemElement_ = (element) => {
    let listItemKey = '';
    for (let key in this.listItems_) {
      if (this.listItems_[key].listItemElement === element) {
        listItemKey = key;
        break;
      }
    }
    return this.listItemIndices_[listItemKey];
  }

  getListItemIndexOfTarget_ = (eventTarget) => {
    let target = eventTarget;

    // Find the first ancestor that is a list item.
    while (this.getIndexOfListItemElement_(target) < 0) {
      if (target === document) {
        return -1;
      }
      target = target.parentElement;
    }

    return this.getIndexOfListItemElement_(target);
  }

  onKeyDown = (e) => {
    this.props.onKeyDown(e);
    e.persist(); // Persist the synthetic event to access its `key`
    const index = this.getListItemIndexOfTarget_(e.target);
    if (index >= 0) {
      this.foundation_.handleKeydown(e, true /* isRootListItem is true if index >= 0 */, index);
    }
  }

  onClick = (e) => {
    this.props.onClick(e);
    const index = this.getListItemIndexOfTarget_(e.target);
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = e.target.type === 'checkbox';
    this.foundation_.handleClick(index, toggleCheckbox);
  }

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  onFocus = (e) => {
    this.props.onFocus(e);
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusIn(e, index);
  }

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  onBlur = (e) => {
    this.props.onBlur(e);
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusOut(e, index);
  }

  render() {
    const {
      /* eslint-disable */
      className,
      onKeyDown,
      onClick,
      onFocus,
      onBlur,
      nonInterative,
      dense,
      avatarList,
      twoLine,
      singleSelection,
      wrapFocus,
      selectedIndex,
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

  renderListItem = (listItem, index) => {
    const {
      key,
      className, // eslint-disable-line
      children,
      childrenTabIndex,
      ...otherProps
    } = listItem.props;
    
    const keyOrIndex = key || index;
    const props = Object.assign({
      key: key,
      className: this.getListItemClasses_(keyOrIndex),
      childrenTabIndex: this.state.listItemChildrenTabIndex[keyOrIndex],
      ref: (listItem) => {
        this.listItems_[keyOrIndex] = listItem;
        this.listItemIndices_[keyOrIndex] = index;
      },
      ...otherProps,
    },
    this.state.listItemAttributes[keyOrIndex]);

    return React.cloneElement(listItem, props, children);
  }
}

/* eslint-disable quote-props */

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  nonInterative: PropTypes.bool,
  dense: PropTypes.bool,
  avatarList: PropTypes.bool,
  twoLine: PropTypes.bool,
  singleSelection: PropTypes.bool,
  wrapFocus: PropTypes.bool,
  selectedIndex: PropTypes.number,
  'aria-orientation': PropTypes.string,
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
  wrapFocus: true,
  selectedIndex: -1,
  'aria-orientation': VERTICAL,
  onKeyDown: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

/* eslint-enable quote-props */

export {ListItem};

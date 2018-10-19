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
    listItemAttributes: {}, // maps id to {attr: val} map object
    listItemClassList: {}, // maps id to classList set
    listItemChildrenTabIndex: {}, // maps id to children's tabIndex
  };

  componentDidMount() {
    const {singleSelection, selectedIndex, wrapFocus} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
    if (selectedIndex) {
      this.foundation_.setSelectedIndex(selectedIndex);
    } else {
      const id = this.getListItemIdFromIndex_(0);
      const {listItemAttributes} = this.state;
      listItemAttributes[id] = Object.assign({}, listItemAttributes[id], {
        tabIndex: 0,
      });
      this.setState({listItemAttributes});
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

  initListItem = (id) => {
    const {listItemAttributes, listItemChildrenTabIndex, listItemClassList} = this.state;
    listItemAttributes[id] = {
      'aria-selected': false,
      'tabIndex': -1,
    };
    listItemChildrenTabIndex[id] = -1;
    listItemClassList[id] = new Set();
    this.setState({listItemAttributes, listItemChildrenTabIndex, listItemClassList});
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

  getListItemClasses_(id, className) {
    const {listItemClassList} = this.state;
    return listItemClassList[id] ?
      classnames(Array.from(listItemClassList[id]), className) :
      className;
  }

  get adapter() {
    return {
      getListItemCount: () => Object.keys(this.listItems_).length,
      getFocusedElementIndex: () => this.getListItemIndexOfTarget_(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const id = this.getListItemIdFromIndex_(index);
        listItemAttributes[id][attr] = value;
        this.setState({listItemAttributes});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const id = this.getListItemIdFromIndex_(index);
        delete listItemAttributes[id][attr];
        this.setState({listItemAttributes});
      },
      addClassForElementIndex: (index, className) => {
        const {listItemClassList} = this.state;
        const id = this.getListItemIdFromIndex_(index);
        listItemClassList[id].add(className);
        this.setState({listItemClassList});
      },
      removeClassForElementIndex: (index, className) => {
        const {listItemClassList} = this.state;
        const id = this.getListItemIdFromIndex_(index);
        listItemClassList[id].delete(className);
        this.setState({listItemClassList});
      },
      focusItemAtIndex: (index) => {
        const id = this.getListItemIdFromIndex_(index);
        const listItem = this.listItems_[id];
        if (listItem) {
          listItem.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const {listItemChildrenTabIndex} = this.state;
        const id = this.getListItemIdFromIndex_(listItemIndex);
        listItemChildrenTabIndex[id]= tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      followHref: (index) => {
        const id = this.getListItemIdFromIndex_(index);
        const listItem = this.listItems_[id];
        if (listItem) {
          listItem.followHref();
        }
      },
      toggleCheckbox: (index) => {
        const id = this.getListItemIdFromIndex_(index);
        const listItem = this.listItems_[id];
        if (listItem) {
          listItem.toggleCheckbox();
        }
      },
    };
  }

  getListItemIdFromIndex_ = (index) => {
    for (let id in this.listItemIndices_) {
      if (this.listItemIndices_[id] === index) return id;
    };
    return '';
  }

  getIndexOfListItemElement_ = (element) => {
    let listItemId = '';
    for (let id in this.listItems_) {
      if (this.listItems_[id].listItemElement === element) {
        listItemId = id;
        break;
      }
    }
    return this.listItemIndices_[listItemId];
  }

  getListItemIndexOfTarget_ = (eventTarget) => {
    let target = eventTarget;

    // Find the first ancestor that is a list item.
    while (this.getIndexOfListItemElement_(target) === undefined) {
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
      id,
      className, // eslint-disable-line
      children,
      childrenTabIndex,
      ...otherProps
    } = listItem.props;
    
    const idOrIndex = id || index;
    const props = Object.assign({
      id: id,
      className: this.getListItemClasses_(idOrIndex),
      childrenTabIndex: this.state.listItemChildrenTabIndex[idOrIndex],
      init: () => this.initListItem(idOrIndex),
      ref: (listItem) => {
        this.listItems_[idOrIndex] = listItem;
        this.listItemIndices_[idOrIndex] = index;
      },
      ...otherProps,
    },
    this.state.listItemAttributes[idOrIndex]);

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
  'aria-orientation': VERTICAL,
  onKeyDown: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

/* eslint-enable quote-props */

export {ListItem};

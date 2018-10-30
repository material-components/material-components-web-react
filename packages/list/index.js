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
import ListItemGraphic from './ListItemGraphic';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';

const ARIA_ORIENTATION = 'aria-orientation';
const VERTICAL = 'vertical';

export default class List extends Component {
  listItems_ = {};
  listItemIndices_ = {};
  state = {
    listItemFocus: [],
    listItemFollowHref: [], 
    listItemToggleCheckbox: [],
    listItemAddAttributes: {}, // maps id to {attr: val} map object
    listItemRemoveAttributes: {}, // maps id to array of attr
    listItemAddClassList: {}, // maps id to classList array
    listItemRemoveClassList: {},
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
      const {listItemAddAttributes} = this.state;
      listItemAddAttributes[id] = Object.assign({}, listItemAddAttributes[id], {
        tabIndex: 0,
      });
      this.setState({listItemAddAttributes});
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
    const {listItemAddAttributes, listItemRemoveAttributes, listItemAddClassList, listItemRemoveClassList, listItemChildrenTabIndex} = this.state;
    listItemAddAttributes[id] = {
      'aria-selected': false,
      'tabIndex': -1,
    };
    listItemRemoveAttributes[id] = [];
    listItemAddClassList[id] = [];
    listItemRemoveClassList[id] = [];
    listItemChildrenTabIndex[id] = -1;
    this.setState({listItemAddAttributes, listItemRemoveAttributes, listItemAddClassList, listItemRemoveClassList, listItemChildrenTabIndex});
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
      getListItemCount: () => Object.keys(this.listItems_).length,
      getFocusedElementIndex: () => this.getListItemIndexOfTarget_(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const {listItemAddAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const id = this.getListItemIdFromIndex_(index);
        listItemAddAttributes[id][attr] = value;
        this.setState({listItemAddAttributes});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const {listItemRemoveAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        const id = this.getListItemIdFromIndex_(index);
        listItemRemoveAttributes[id].push(attr);
        this.setState({listItemRemoveAttributes});
      },
      addClassForElementIndex: (index, className) => {
        const {listItemAddClassList} = this.state;
        const id = this.getListItemIdFromIndex_(index);
        listItemAddClassList[id].push(className);
        this.setState({listItemAddClassList});
      },
      removeClassForElementIndex: (index, className) => {
        const {listItemRemoveClassList} = this.state;
        const id = this.getListItemIdFromIndex_(index);
        listItemRemoveClassList[id].push(className);
        this.setState({listItemRemoveClassList});
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const {listItemChildrenTabIndex} = this.state;
        const id = this.getListItemIdFromIndex_(listItemIndex);
        listItemChildrenTabIndex[id]= tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      focusItemAtIndex: (index) => {
        const {listItemFocus} = this.state;
        listItemFocus.push(index);
        this.setState(listItemFocus);
      },
      followHref: (index) => {
        const {listItemFollowHref} = this.state;
        listItemFollowHref.push(index);
        this.setState(listItemFollowHref);
      },
      toggleCheckbox: (index) => {
        const {listItemToggleCheckbox} = this.state;
        listItemToggleCheckbox.push(index);
        this.setState(listItemToggleCheckbox);
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
      if (!target || target === document) {
        return -1;
      }
      target = target.parentElement;
    }

    return this.getIndexOfListItemElement_(target);
  }

  handleKeyDown = (e, id) => {
    this.props.onKeyDown(e);
    e.persist(); // Persist the synthetic event to access its `key`
    const index = this.listItemIndices_[id];
    if (index >= 0) {
      this.foundation_.handleKeydown(e, true /* isRootListItem is true if index >= 0 */, index);
    }
  }

  handleClick = (e, id) => {
    this.props.onClick(e);
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = e.target.type === 'checkbox';
    const index = this.listItemIndices_[id];
    this.foundation_.handleClick(index, toggleCheckbox);
  }

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleFocus = (e, id) => {
    this.props.onFocus(e);
    const index = this.listItemIndices_[id];
    this.foundation_.handleFocusIn(e, index);
  }

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleBlur = (e, id) => {
    this.props.onBlur(e);
    const index = this.listItemIndices_[id];
    this.foundation_.handleFocusOut(e, index);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
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
      /* eslint-enable no-unused-vars */
      children,
      ...otherProps
    } = this.props;

    return (
      <ul
        className={this.classes}
        {...otherProps}
      >
        {React.Children.map(children, this.renderListItem)}
      </ul>
    );
  }

  renderListItem = (listItem, index) => {
    const {
      id,
      /* eslint-disable no-unused-vars */
      className,
      childrenTabIndex,
      /* eslint-enable no-unused-vars */
      children,
      ...otherProps
    } = listItem.props;

    const {
      listItemFocus,
      listItemFollowHref, 
      listItemToggleCheckbox,
      listItemAddAttributes,
      listItemRemoveAttributes,
      listItemAddClassList,
      listItemRemoveClassList,
      listItemChildrenTabIndex,
    } = this.state;

    const idOrIndex = id || index.toString();

    let focused = false;
    let i = listItemFocus.indexOf(idOrIndex);
    if (i > -1) {
      focused = true;
      listItemFocus.splice(i, 1);
    }

    let followHref = false;
    i = listItemFollowHref.indexOf(idOrIndex);
    if (i > -1) {
      followHref = true;
      listItemFollowHref.splice(i, 1);
    }

    let toggleCheckbox = false;
    i = listItemToggleCheckbox.indexOf(idOrIndex);
    if (i > -1) {
      toggleCheckbox = true;
      listItemToggleCheckbox.splice(i, 1);
    }

    let attributesToAdd = [];
    if (idOrIndex in listItemAddAttributes) {
      attributesToAdd = listItemAddAttributes[idOrIndex];
      listItemAddAttributes[idOrIndex] = {};
    }

    let attributesToRemove = [];
    if (idOrIndex in listItemRemoveAttributes) {
      attributesToRemove = listItemRemoveAttributes[idOrIndex];
      listItemRemoveAttributes[idOrIndex] = [];
    }

    let classNamesToAdd = [];
    if (idOrIndex in listItemAddClassList) {
      classNamesToAdd = listItemAddClassList[idOrIndex];
      listItemAddClassList[idOrIndex] = [];
    }

    let classNamesToRemove = [];
    if (idOrIndex in listItemRemoveClassList) {
      classNamesToRemove = listItemRemoveClassList[idOrIndex];
      listItemRemoveClassList[idOrIndex] = [];
    }

    let newChildTabIndex = undefined;
    if (idOrIndex in listItemChildrenTabIndex) {
      newChildTabIndex = listItemChildrenTabIndex[idOrIndex];
      listItemChildrenTabIndex[idOrIndex] = null;
    }

    const props = {
      id: id,
      init: () => this.initListItem(idOrIndex),

      shouldFocus: focused,
      shouldFollowHref: followHref,
      shouldToggleCheckbox: toggleCheckbox,
      attributesToAdd: attributesToAdd,
      attributesToRemove: attributesToRemove,
      classNamesToAdd: classNamesToAdd,
      classNamesToRemove: classNamesToRemove,
      childrenTabIndex: newChildTabIndex || childrenTabIndex,

      onKeyDown: (e) => this.handleKeyDown(e, idOrIndex),
      onClick: (e) => this.handleClick(e, idOrIndex),
      onFocus: (e) => this.handleFocus(e, idOrIndex),
      onBlur: (e) => this.handleBlur(e, idOrIndex),

      ref: (listItem) => {
        this.listItems_[idOrIndex] = listItem;
        this.listItemIndices_[idOrIndex] = index;
      },
      ...otherProps,
    };

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

export {ListItem, ListItemGraphic, ListItemText, ListItemMeta};

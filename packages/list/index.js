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

export default class List extends Component {
  listItems_ = [];
  state = {
    listItemAttributes: {}, // maps index to {attr: val} map object
    listItemClassList: {}, // maps index to classList set
    listItemChildrenTabIndex: {}, // maps index to children's tabIndex
  };

  componentWillMount() {
    React.Children.forEach(this.props.children, (child, index) => {
      this.initListItemClassList(child, index);
    });
  }

  componentDidMount() {
    for (let i = 0; i < this.listItems_.length; i++) {
      this.initListItemAttributes_(i);
      this.initListItemChildrenTabIndex_(i);
    }

    const {singleSelection, selectedIndex, wrapFocus} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(this.props['aria-orientation'] === 'vertical');
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
    if (this.props['aria-orientation'] !== prevProps['aria-orientation']) {
      this.foundation_.setVerticalOrientation(this.props['aria-orientation'] === 'vertical');
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  initListItemAttributes_(index) {
    const listItemAttributes = this.state.listItemAttributes;
    listItemAttributes[index] = {
      'aria-selected': false,
      tabIndex: index === 0 ? 0 : -1, // only the first list item in a list is tabbable
    };
    this.setState({listItemAttributes});
  }

  initListItemChildrenTabIndex_(index) {
    const listItemChildrenTabIndex = this.state.listItemChildrenTabIndex;
    listItemChildrenTabIndex[index] = -1;
    this.setState({listItemChildrenTabIndex});
  }

  initListItemClassList(listItem, index) {
    const {className} = listItem.props;
    const listItemClassList = this.state.listItemClassList;
    listItemClassList[index] = new Set(className.split(' '));
    this.setState({listItemClassList});
  }

  updateListItemClassList = (listItem) => {
    const index = this.listItems_.indexOf(listItem);
    const listItemClassList = this.state.listItemClassList;
    listItemClassList[index] = new Set(listItem.classes.split(' '));
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

  getListItemClasses_(index) {
    const {listItemClassList} = this.state;
    return listItemClassList[index] ? classnames(Array.from(listItemClassList[index])) : '';
  }

  get adapter() {
    return {
      getListItemCount: () => this.listItems_.length,
      getFocusedElementIndex: () => this.getListItemIndexOfElement_(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const listItemAttributes = this.state.listItemAttributes;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        listItemAttributes[index][attr] = value;
        this.setState({listItemAttributes});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const listItemAttributes = this.state.listItemAttributes;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        listItemAttributes[index][attr] = null;
        this.setState({listItemAttributes});
      },
      addClassForElementIndex: (index, className) => {
        const listItemClassList = this.state.listItemClassList;
        listItemClassList[index].add(className);
        this.setState({listItemClassList});
      },
      removeClassForElementIndex: (index, className) => {
        const listItemClassList = this.state.listItemClassList;
        listItemClassList[index].delete(className);
        this.setState({listItemClassList});
      },
      focusItemAtIndex: (index) => {
        const listItem = this.listItems_[index];
        if (listItem) {
          listItem.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const listItemChildrenTabIndex = this.state.listItemChildrenTabIndex;
        listItemChildrenTabIndex[listItemIndex]= tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      followHref: (index) => {
        const listItem = this.listItems_[index];
        if (listItem) {
          listItem.followHref();
        }
      },
      toggleCheckbox: (index) => {
        const listItem = this.listItems_[index];
        if (listItem) {
          listItem.toggleCheckbox();
        }
      },
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
    while (this.getListItemIndexOfElement_(target) < 0) {
      if (target === document) {
        return -1;
      }
      target = target.parentElement;
    }

    return this.getListItemIndexOfElement_(target);
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

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  onFocus = (e) => {
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusIn(e, index);
    this.props.onFocus(e);
  }

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  onBlur = (e) => {
    const index = this.getListItemIndexOfTarget_(e.target);
    this.foundation_.handleFocusOut(e, index);
    this.props.onBlur(e);
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
      className,
      children,
      ...otherProps
    } = listItem.props;

    const props = Object.assign({}, {
        updateClassList: this.updateListItemClassList,
        ref: (listItem) => !this.listItems_[index] && this.listItems_.push(listItem),
        ...otherProps,
      },
      {className: this.getListItemClasses_(index)},
      {childrenTabIndex: this.state.listItemChildrenTabIndex[index]},
      this.state.listItemAttributes[index],
    );
    
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
  'aria-orientation': 'vertical',
  onKeyDown: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export {ListItem};

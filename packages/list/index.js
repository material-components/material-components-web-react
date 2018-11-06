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
import ListGroup from './ListGroup';
import ListGroupSubheader from './ListGroupSubheader';

const ARIA_ORIENTATION = 'aria-orientation';
const VERTICAL = 'vertical';

export default class List extends Component {
  listItemCount = 0;
  state = {
    focusListItemAtIndex: -1,
    followHrefAtIndex: -1,
    toggleCheckboxAtIndex: -1,

    // listItemAttributes: {index: {attr: value}}
    listItemAttributes: {
      0: {
        tabIndex: 0,
      },
    },
    // listItemClassNames: {index: Array<String>}
    listItemClassNames: {},
    // listItemChildrenTabIndex: {index: Number}
    listItemChildrenTabIndex: {},
  };

  componentDidMount() {
    const {singleSelection, wrapFocus, selectedIndex} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    if (singleSelection && typeof selectedIndex === 'number' && !isNaN(selectedIndex)) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
  }

  componentDidUpdate(prevProps) {
    const {singleSelection, wrapFocus, selectedIndex} = this.props;
    if (singleSelection !== prevProps.singleSelection) {
      this.foundation_.setSingleSelection(singleSelection);
    }
    if (selectedIndex !== prevProps.selectedIndex && typeof selectedIndex === 'number' && !isNaN(selectedIndex)) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
    if (wrapFocus !== prevProps.wrapFocus) {
      this.foundation_.setWrapFocus(wrapFocus);
    }
    if (this.props[ARIA_ORIENTATION] !== prevProps[ARIA_ORIENTATION]) {
      this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, nonInteractive, dense, avatarList, twoLine} = this.props;
    return classnames('mdc-list', className, {
      'mdc-list--non-interactive': nonInteractive,
      'mdc-list--dense': dense,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--two-line': twoLine,
    });
  }

  get adapter() {
    return {
      getListItemCount: () => this.listItemCount,
      // Remove when MDC Web issue resolves:
      // https://github.com/material-components/material-components-web/issues/4058
      getFocusedElementIndex: () => -1,
      setAttributeForElementIndex: (index, attr, value) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemAttributes[index]) {
          listItemAttributes[index] = {};
        }
        listItemAttributes[index][attr] = value;
        this.setState({listItemAttributes});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemAttributes[index]) {
          return;
        }
        delete listItemAttributes[index][attr];
        this.setState({listItemAttributes});
      },
      addClassForElementIndex: (index, className) => {
        const {listItemClassNames} = this.state;
        if (!listItemClassNames[index]) {
          listItemClassNames[index] = [];
        }
        listItemClassNames[index].push(className);
        this.setState({listItemClassNames});
      },
      removeClassForElementIndex: (index, className) => {
        const {listItemClassNames} = this.state;
        if (!listItemClassNames[index]) {
          return;
        }
        const i = listItemClassNames[index].indexOf(className);
        if (i >= 0) {
          listItemClassNames[index].splice(i, 1);
          this.setState({listItemClassNames});
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const {listItemChildrenTabIndex} = this.state;
        listItemChildrenTabIndex[listItemIndex] = tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      focusItemAtIndex: (index) => {
        this.setState({focusListItemAtIndex: index});
      },
      followHref: (index) => {
        this.setState({followHrefAtIndex: index});
      },
      toggleCheckbox: (index) => {
        this.setState({toggleCheckboxAtIndex: index});
      },
    };
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      nonInteractive,
      dense,
      avatarList,
      twoLine,
      singleSelection,
      selectedIndex,
      handleSelect,
      wrapFocus,
      /* eslint-enable no-unused-vars */
      children,
      ...otherProps
    } = this.props;

    this.listItemCount = 0;
    return (
      <ul
        className={this.classes}
        {...otherProps}
      >
        {React.Children.map(children, this.renderChild)}
      </ul>
    );
  }

  renderChild = (child) => {
    if (child.type.name === 'ListItem') {
      return this.renderListItem(child, this.listItemCount++);
    } else {
      return child;
    }
  }

  handleKeyDown = (e, index) => {
    e.persist(); // Persist the synthetic event to access its `key`
    this.foundation_.handleKeydown(e, true /* isRootListItem is true if index >= 0 */, index);
    // Work around until MDC Web issue is resolved:
    // https://github.com/material-components/material-components-web/issues/4053
    if (index >= 0 && (e.key === 'Enter' || e.keyCode === 13 || e.key === 'Space' || e.keyCode === 32)) {
      this.props.handleSelect(index);
    }
  }

  handleClick = (e, index) => {
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = e.target.type === 'checkbox';
    this.foundation_.handleClick(index, toggleCheckbox);
    // Work around until MDC Web issue is resolved:
    // https://github.com/material-components/material-components-web/issues/4053
    if (index >= 0) {
      this.props.handleSelect(index);
    }
  }

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleFocus = (e, index) => {
    this.foundation_.handleFocusIn(e, index);
  }

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleBlur = (e, index) => {
    this.foundation_.handleFocusOut(e, index);
  }

  renderListItem = (listItem, index) => {
    const {
      onKeyDown,
      onClick,
      onFocus,
      onBlur,
      ...otherProps
    } = listItem.props;

    const {
      focusListItemAtIndex,
      followHrefAtIndex,
      toggleCheckboxAtIndex,
      listItemAttributes,
      listItemClassNames,
      listItemChildrenTabIndex,
    } = this.state;

    const props = {
      ...otherProps,
      onKeyDown: (e) => {
        onKeyDown(e);
        this.handleKeyDown(e, index);
      },
      onClick: (e) => {
        onClick(e);
        this.handleClick(e, index);
      },
      onFocus: (e) => {
        onFocus(e);
        this.handleFocus(e, index);
      },
      onBlur: (e) => {
        onBlur(e);
        this.handleBlur(e, index);
      },
      shouldFocus: focusListItemAtIndex === index,
      shouldFollowHref: followHrefAtIndex === index,
      shouldToggleCheckbox: toggleCheckboxAtIndex === index,
      attributesFromList: listItemAttributes[index],
      classNamesFromList: listItemClassNames[index],
      childrenTabIndex: listItemChildrenTabIndex[index],
    };

    return React.cloneElement(listItem, props);
  }
}

/* eslint-disable quote-props */

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  nonInteractive: PropTypes.bool,
  dense: PropTypes.bool,
  avatarList: PropTypes.bool,
  twoLine: PropTypes.bool,
  singleSelection: PropTypes.bool,
  selectedIndex: PropTypes.number,
  handleSelect: PropTypes.func,
  wrapFocus: PropTypes.bool,
  'aria-orientation': PropTypes.string,
};

List.defaultProps = {
  className: '',
  nonInteractive: false,
  dense: false,
  avatarList: false,
  twoLine: false,
  singleSelection: false,
  selectedIndex: -1,
  handleSelect: () => {},
  wrapFocus: true,
  'aria-orientation': VERTICAL,
};

/* eslint-enable quote-props */

export {ListItem, ListItemGraphic, ListItemText, ListItemMeta, ListGroup, ListGroupSubheader};

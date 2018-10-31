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
  state = {
    focusListItemAtIndex: -1,
    followHrefAtIndex: -1, 
    toggleCheckboxAtIndex: -1,
    // listItemAttributes: {index: {attr: value}}
    listItemAttributes: {
      0: {
        tabIndex: 0,
      }
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
    if (singleSelection && selectedIndex) {
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
    if (selectedIndex !== prevProps.selectedIndex) {
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
      getListItemCount: () => {
        let count = 0;
        React.Children.forEach(this.props.children, child => {
          if (child.type.name === 'ListItem') {
            count++;
          }
        });
        return count;
      },
      getFocusedElementIndex: () => {
        let index = -1;
        React.Children.forEach(this.props.children, (child, i) => {
          if (child === document.activeElement) {
            index = i;
          }
        });
        return index;
      },
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
        listItemClassNames[index].splice(i, 1);
        this.setState({listItemClassNames});
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
      nonInterative,
      dense,
      avatarList,
      twoLine,
      singleSelection,
      selectedIndex,
      wrapFocus,
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

  resetListItemProps = (index) => {
    const {listItemAttributes, listItemClassNames, listItemChildrenTabIndex} = this.state;
    listItemAttributes[index] = {};
    listItemClassNames[index] = [];
    listItemChildrenTabIndex[index] = -1;
    this.setState({listItemAttributes, listItemClassNames, listItemChildrenTabIndex});
  }

  handleKeyDown = (e, index) => {
    e.persist(); // Persist the synthetic event to access its `key`
    if (index >= 0) {
      this.foundation_.handleKeydown(e, true /* isRootListItem is true if index >= 0 */, index);
    }
  }

  handleClick = (e, index) => {
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = e.target.type === 'checkbox';
    this.foundation_.handleClick(index, toggleCheckbox);
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
        onKeyDown();
        this.handleKeyDown(e, index);
      },
      onClick: (e) => {
        onClick();
        this.handleClick(e, index);
      },
      onFocus: (e) => {
        onFocus();
        this.handleFocus(e, index);
      },
      onBlur: (e) => {
        onBlur();
        this.handleBlur(e, index);
      },
      shouldFocus: focusListItemAtIndex === index,
      shouldFollowHref: followHrefAtIndex === index,
      shouldToggleCheckbox: toggleCheckboxAtIndex === index,
      attributesToSet: listItemAttributes[index],
      classNamesToAdd: listItemClassNames[index],
      childrenTabIndex: listItemChildrenTabIndex[index],
    };

    return React.cloneElement(listItem, props);
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
  'aria-orientation': PropTypes.string,
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
};

/* eslint-enable quote-props */

export {ListItem, ListItemGraphic, ListItemText, ListItemMeta};

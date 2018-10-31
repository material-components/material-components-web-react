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
    /* listItemPropUpdates should be in the following shape: 
    {
      listItemIndex: {
        'shouldFocus': Boolean,
        'shouldFollowHref': Boolean,
        'shouldToggleCheckbox': Boolean,
        'classesNamesToAdd': Array<String>,
        'attributesToSet': {
          String: String || Number
          ...
        },
        'childrenTabIndex': Number,
      }
      ...
    } */
    listItemPropUpdates: {
      0: {
        attributesToSet: {
          tabIndex: 0,
        }
      }
    },
  };

  componentDidMount() {
    const {singleSelection, wrapFocus} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    if (singleSelection) {
      this.setSelectedIndex();
    }
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(this.props[ARIA_ORIENTATION] === VERTICAL);
  }

  componentDidUpdate(prevProps) {
    const {singleSelection, wrapFocus} = this.props;
    if (singleSelection !== prevProps.singleSelection) {
      this.foundation_.setSingleSelection(singleSelection);
    }
    if (singleSelection) {
      this.setSelectedIndex();
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

  setSelectedIndex = () => {
    React.Children.forEach(this.props.children, (child, index) => {
      if (child.props.selected) {
        this.foundation_.setSelectedIndex(index);
      }
    });
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
        const {listItemPropUpdates} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        if (!listItemPropUpdates[index]['attributesToSet']) {
          listItemPropUpdates[index]['attributesToSet'] = {};
        }
        listItemPropUpdates[index]['attributesToSet'][attr] = value;
        this.setState({listItemPropUpdates});
      },
      removeAttributeForElementIndex: (index, attr) => {
        const {listItemPropUpdates} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        if (!listItemPropUpdates[index]['attributesToSet']) {
          return;
        }
        delete listItemPropUpdates[index]['attributesToSet'][attr];
        this.setState({listItemPropUpdates});
      },
      addClassForElementIndex: (index, className) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        if (!listItemPropUpdates[index]['classNamesToAdd']) {
          listItemPropUpdates[index]['classNamesToAdd'] = [];
        }
        listItemPropUpdates[index]['classNamesToAdd'].push(className);
        this.setState({listItemPropUpdates});
      },
      removeClassForElementIndex: (index, className) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        if (!listItemPropUpdates[index]['classNamesToAdd']) {
          return;
        }
        const i = listItemPropUpdates[index]['classNamesToAdd'].indexOf(className);
        listItemPropUpdates[index]['classNamesToAdd'].splice(i, 1);
        this.setState({listItemPropUpdates});
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[listItemIndex]) {
          listItemPropUpdates[listItemIndex] = {};
        }
        listItemPropUpdates[listItemIndex]['childrenTabIndex'] = tabIndexValue;
        this.setState({listItemPropUpdates});
      },
      focusItemAtIndex: (index) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        listItemPropUpdates[index]['shouldFocus'] = true;
        this.setState({listItemPropUpdates});
      },
      followHref: (index) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        listItemPropUpdates[index]['shouldFollowHref'] = true;
        this.setState({listItemPropUpdates});
      },
      toggleCheckbox: (index) => {
        const {listItemPropUpdates} = this.state;
        if (!listItemPropUpdates[index]) {
          listItemPropUpdates[index] = {};
        }
        listItemPropUpdates[index]['shouldToggleCheckbox'] = true;
        this.setState({listItemPropUpdates});
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
    const {listItemPropUpdates} = this.state;
    listItemPropUpdates[index] = {};
    this.setState(listItemPropUpdates);
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

    const {listItemPropUpdates} = this.state;
    const props = Object.assign({
      resetPropUpdates: () => this.resetListItemProps(index),
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
      ...otherProps,
    }, listItemPropUpdates[index]);

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

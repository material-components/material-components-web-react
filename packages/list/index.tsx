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
// @ts-ignore
import {MDCListFoundation} from '@material/list/dist/mdc.list';
import ListItem, {ListItemProps} from './ListItem'; // eslint-disable-line no-unused-vars
import ListItemGraphic from './ListItemGraphic';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';
import ListDivider from './ListDivider';
import ListGroup from './ListGroup';
import ListGroupSubheader from './ListGroupSubheader';
const ARIA_ORIENTATION = 'aria-orientation';
const VERTICAL = 'vertical';
const CHECKBOX_TYPE = 'checkbox';

export interface ListProps<T> {
  className: string,
  nonInteractive: boolean,
  dense: boolean,
  avatarList: boolean,
  twoLine: boolean,
  singleSelection: boolean,
  selectedIndex: number,
  handleSelect: (selectedIndex: number) => void,
  wrapFocus: boolean,
  'aria-orientation': string,
  tag: string,
  children: ListItem<T> | ListItem<T>[] | React.ReactNode,
};

type ListState = {
  focusListItemAtIndex: number,
  followHrefAtIndex: number,
  toggleCheckboxAtIndex: number,
  listItemAttributes: {[N: number]: any},
  listItemClassNames: {[N: number]: string[]},
  listItemChildrenTabIndex: {[N: number]: number},
};

type Props<T> = ListProps<T> & React.HTMLProps<HTMLElement>;

function isCheckbox(element: any): element is HTMLInputElement {
  return element.type === CHECKBOX_TYPE;
}

function isReactText(element: any): element is React.ReactText {
  return typeof element === 'string' || typeof element === 'number';
}

export default class List<T extends HTMLElement = HTMLElement> extends React.Component<Props<T>, ListState> {
  listItemCount = 0;
  foundation_ = MDCListFoundation;

  state: ListState = {
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

  static defaultProps = {
    'className': '',
    'nonInteractive': false,
    'dense': false,
    'avatarList': false,
    'twoLine': false,
    'singleSelection': false,
    'selectedIndex': -1,
    'handleSelect': () => {},
    'wrapFocus': true,
    'aria-orientation': VERTICAL,
    'tag': 'ul',
  };

  componentDidMount() {
    const {singleSelection, wrapFocus, selectedIndex} = this.props;
    this.foundation_ = new MDCListFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSingleSelection(singleSelection);
    if (
      singleSelection &&
      typeof selectedIndex === 'number' &&
      !isNaN(selectedIndex)
    ) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
    this.foundation_.setWrapFocus(wrapFocus);
    this.foundation_.setVerticalOrientation(
      this.props[ARIA_ORIENTATION] === VERTICAL
    );
  }

  componentDidUpdate(prevProps: Props<T>) {
    const {singleSelection, wrapFocus, selectedIndex} = this.props;
    if (singleSelection !== prevProps.singleSelection) {
      this.foundation_.setSingleSelection(singleSelection);
    }
    if (
      selectedIndex !== prevProps.selectedIndex &&
      typeof selectedIndex === 'number' &&
      !isNaN(selectedIndex)
    ) {
      this.foundation_.setSelectedIndex(selectedIndex);
    }
    if (wrapFocus !== prevProps.wrapFocus) {
      this.foundation_.setWrapFocus(wrapFocus);
    }
    if (this.props[ARIA_ORIENTATION] !== prevProps[ARIA_ORIENTATION]) {
      this.foundation_.setVerticalOrientation(
        this.props[ARIA_ORIENTATION] === VERTICAL
      );
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {
      className,
      nonInteractive,
      dense,
      avatarList,
      twoLine,
    } = this.props;
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
      setAttributeForElementIndex: (index: number, attr: string, value: string) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemAttributes[index]) {
          listItemAttributes[index] = {};
        }
        listItemAttributes[index][attr] = value;
        this.setState({listItemAttributes});
      },
      removeAttributeForElementIndex: (index: number, attr: string) => {
        const {listItemAttributes} = this.state;
        attr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (!listItemAttributes[index]) {
          return;
        }
        delete listItemAttributes[index][attr];
        this.setState({listItemAttributes});
      },
      addClassForElementIndex: (index: number, className: string) => {
        const {listItemClassNames} = this.state;
        if (!listItemClassNames[index]) {
          listItemClassNames[index] = [];
        }
        listItemClassNames[index].push(className);
        this.setState({listItemClassNames});
      },
      removeClassForElementIndex: (index: number, className: string) => {
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
      setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: number) => {
        const {listItemChildrenTabIndex} = this.state;
        listItemChildrenTabIndex[listItemIndex] = tabIndexValue;
        this.setState({listItemChildrenTabIndex});
      },
      focusItemAtIndex: (index: number) => {
        this.setState({focusListItemAtIndex: index});
      },
      followHref: (index: number) => {
        this.setState({followHrefAtIndex: index});
      },
      toggleCheckbox: (index: number) => {
        this.setState({toggleCheckboxAtIndex: index});
      },
    };
  }

  handleKeyDown = (e: React.KeyboardEvent<any>, index: number) => {
    e.persist(); // Persist the synthetic event to access its `key`
    this.foundation_.handleKeydown(
      e,
      true /* isRootListItem is true if index >= 0 */,
      index
    );
    // Work around until MDC Web issue is resolved:
    // https://github.com/material-components/material-components-web/issues/4053
    if (
      index >= 0 &&
      (e.key === 'Enter' ||
        e.keyCode === 13 ||
        e.key === 'Space' ||
        e.keyCode === 32)
    ) {
      this.props.handleSelect(index);
    }
  };

  handleClick = (e: React.MouseEvent<any>, index: number) => {
    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    if (!isCheckbox(e.target)) return;
    const toggleCheckbox = e.target.type === CHECKBOX_TYPE;
    this.foundation_.handleClick(index, toggleCheckbox);
    // Work around until MDC Web issue is resolved:
    // https://github.com/material-components/material-components-web/issues/4053
    if (index >= 0) {
      this.props.handleSelect(index);
    }
  };

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleFocus = (e: React.FocusEvent, index: number) => {
    this.foundation_.handleFocusIn(e, index);
  };

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleBlur = (e: React.FocusEvent, index: number) => {
    this.foundation_.handleFocusOut(e, index);
  };

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
      tag: Tag,
      ...otherProps
    } = this.props;
    this.listItemCount = 0;
    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag className={this.classes} {...otherProps}>
        {React.Children.map(children, this.renderChild)}
      </Tag>
    );
  }

  renderChild = (child: React.ReactElement<ListItemProps<T>> | React.ReactChild) => {
    if (isReactText(child)) {
      return child;
    }
    return this.renderListItem(child, this.listItemCount++);
  };

  renderListItem = (listItem: React.ReactElement<ListItemProps<T>>, index: number) => {
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
      onKeyDown: (e: React.KeyboardEvent<T>) => {
        onKeyDown(e);
        this.handleKeyDown(e, index);
      },
      onClick: (e: React.MouseEvent<T>) => {
        onClick(e);
        this.handleClick(e, index);
      },
      onFocus: (e: React.FocusEvent<T>) => {
        onFocus(e);
        this.handleFocus(e, index);
      },
      onBlur: (e: React.FocusEvent<T>) => {
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
  };
}

/* eslint-enable quote-props */
export {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
};

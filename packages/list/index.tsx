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
import classnames from 'classnames';
import {MDCListFoundation} from '@material/list/foundation';
import {MDCListIndex} from '@material/list/types';
import {MDCListAdapter} from '@material/list/adapter';
import ListItem, {ListItemProps} from './ListItem'; // eslint-disable-line no-unused-vars
import ListItemGraphic from './ListItemGraphic';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';
import ListDivider from './ListDivider';
import ListGroup from './ListGroup';
import ListGroupSubheader from './ListGroupSubheader';
const ARIA_ORIENTATION = 'aria-orientation';
const VERTICAL = 'vertical';

export interface ListProps<T extends HTMLElement> extends React.HTMLProps<HTMLElement> {
  className?: string;
  checkboxList?: boolean;
  radioList?: boolean;
  nonInteractive?: boolean;
  dense?: boolean;
  avatarList?: boolean;
  twoLine?: boolean;
  singleSelection?: boolean;
  selectedIndex?: MDCListIndex;
  handleSelect?: (activatedItemIndex: number, selected: MDCListIndex) => void;
  wrapFocus?: boolean;
  tag?: string;
  children: ListItem<T> | ListItem<T>[] | React.ReactNode;
  ref?: React.Ref<any>;
};

function isReactText(element: any): element is React.ReactText {
  return typeof element === 'string' || typeof element === 'number';
}

function isListItem(element: any): element is ListItem {
  return element && element.type === ListItem;
}

function isSelectedIndexType(selectedIndex: unknown): selectedIndex is MDCListIndex {
  return typeof selectedIndex === 'number' && !isNaN(selectedIndex) || Array.isArray(selectedIndex);
}

export default class List<T extends HTMLElement = HTMLElement> extends React.Component<ListProps<T>, {}> {
  listItemCount = 0;
  foundation!: MDCListFoundation;
  hasInitializedListItem = false;

  private listElement = React.createRef<T>();

  static defaultProps: Partial<ListProps<HTMLElement>> = {
    'className': '',
    'checkboxList': false,
    'radioList': false,
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
    this.foundation = new MDCListFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setSingleSelection(singleSelection!);
    this.foundation.layout();
    if (isSelectedIndexType(selectedIndex)) {
      this.foundation.setSelectedIndex(selectedIndex);
    }
    this.foundation.setWrapFocus(wrapFocus!);
    this.foundation.setVerticalOrientation(
      this.props[ARIA_ORIENTATION] === VERTICAL
    );
    this.initializeListType();
  }

  componentDidUpdate(prevProps: ListProps<T>) {
    const {singleSelection, wrapFocus, selectedIndex} = this.props;
    const hasSelectedIndexUpdated = selectedIndex !== prevProps.selectedIndex;
    if (singleSelection !== prevProps.singleSelection) {
      this.foundation.setSingleSelection(singleSelection!);
    }
    if (hasSelectedIndexUpdated && isSelectedIndexType(selectedIndex)) {
      this.foundation.setSelectedIndex(selectedIndex);
    }
    if (wrapFocus !== prevProps.wrapFocus) {
      this.foundation.setWrapFocus(wrapFocus!);
    }
    if (this.props[ARIA_ORIENTATION] !== prevProps[ARIA_ORIENTATION]) {
      this.foundation.setVerticalOrientation(
        this.props[ARIA_ORIENTATION] === VERTICAL
      );
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();  
  }

  initializeListType = () => {
    const {singleSelection} = this.props;
    const {cssClasses, strings} = MDCListFoundation;

    if (!this.listElement.current) return;
    const checkboxListItems = this.listElement.current.querySelectorAll(strings.ARIA_ROLE_CHECKBOX_SELECTOR);
    const radioSelectedListItem = this.listElement.current.querySelector(strings.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      const preselectedItems = this.listElement.current.querySelectorAll(strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
      const selectedIndex =
          [].map.call(preselectedItems, (listItem: Element) => this.listElements.indexOf(listItem)) as number[];
      this.foundation.setSelectedIndex(selectedIndex);
    } else if (singleSelection) {
      const isActivated = this.listElement.current.querySelector(cssClasses.LIST_ITEM_ACTIVATED_CLASS);
      if (isActivated) {
        this.foundation.setUseActivatedClass(true);
      }
    } else if (radioSelectedListItem) {
      this.foundation.setSelectedIndex(this.listElements.indexOf(radioSelectedListItem));
    }
  }

  get listElements(): Element[] {
    if (this.listElement.current) {
      return [].slice.call(
        this.listElement.current.querySelectorAll(
          MDCListFoundation.strings.ENABLED_ITEMS_SELECTOR
        )
      );
    }
    return [];
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

  get adapter(): MDCListAdapter {
    return {
      getListItemCount: () => this.listElements.length,
      getFocusedElementIndex: () => this.listElements.indexOf(document.activeElement as HTMLLIElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const listItem = this.listElements[index];
        if (listItem) {
          listItem.setAttribute(attr, value);
        }
      },
      addClassForElementIndex: (index, className) => {
        const listItem = this.listElements[index];
        if (listItem) {
          listItem.classList.add(className);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const listItem = this.listElements[index];
        if (listItem) {
          listItem.classList.remove(className);
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const listItem = this.listElements[listItemIndex];
        const selector = MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
        const listItemChildren: Element[] =
          [].slice.call(listItem.querySelectorAll(selector));
        listItemChildren.forEach((el) => el.setAttribute('tabindex', tabIndexValue));
      },
      focusItemAtIndex: (index) => {
        const element = this.listElements[index] as HTMLElement | undefined;
        if (element) {
          element.focus();
        }
      },
      setCheckedCheckboxOrRadioAtIndex: () => {
        // TODO: implement when this issue is fixed:
        // https://github.com/material-components/material-components-web-react/issues/438
        // not implemented since MDC React Radio/Checkbox has events to
        // handle toggling checkbox to correct state
      },
      hasCheckboxAtIndex: (index) => {
        const listItem = this.listElements[index];
        return !!listItem.querySelector(MDCListFoundation.strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: (index) => {
        const listItem = this.listElements[index];
        return !!listItem.querySelector(MDCListFoundation.strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: (index) => {
        const listItem = this.listElements[index];
        const selector = MDCListFoundation.strings.CHECKBOX_SELECTOR;
        const toggleEl = listItem.querySelector<HTMLInputElement>(selector);
        return toggleEl!.checked;
      },
      isFocusInsideList: () => {
        if (!this.listElement.current) return false;
        return this.listElement.current.contains(document.activeElement);
      },
      notifyAction: (index) => {
        this.props.handleSelect!(index, this.foundation.getSelectedIndex());
      },
    };
  }

  get role() {
    const {checkboxList, radioList, role} = this.props;
    if (role) return role;
    if (checkboxList) {
      return 'group';
    } else if (radioList) {
      return 'radiogroup';
    }
    return null;
  }

  handleKeyDown = (e: React.KeyboardEvent<any>, index: number) => {
    e.persist(); // Persist the synthetic event to access its `key`
    this.foundation.handleKeydown(
      e.nativeEvent,
      true /* isRootListItem is true if index >= 0 */,
      index
    );
  };

  handleClick = (_e: React.MouseEvent<any>, index: number) => {
    // TODO: fix https://github.com/material-components/material-components-web-react/issues/728
    // Hardcoding toggleCheckbox to false for now since we want the checkbox to handle checkbox logic.
    // The List Foundation tries to toggle the checkbox and radio, but its difficult to turn that off for checkbox
    // or radio.
    this.foundation.handleClick(index, false);
  };

  // Use onFocus as workaround because onFocusIn is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleFocus = (e: React.FocusEvent, index: number) => {
    this.foundation.handleFocusIn(e.nativeEvent, index);
  };

  // Use onBlur as workaround because onFocusOut is not yet supported in React
  // https://github.com/facebook/react/issues/6410
  handleBlur = (e: React.FocusEvent, index: number) => {
    this.foundation.handleFocusOut(e.nativeEvent, index);
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      checkboxList,
      radioList,
      nonInteractive,
      dense,
      avatarList,
      twoLine,
      singleSelection,
      role,
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
      <Tag
        className={this.classes}
        ref={this.listElement}
        role={this.role}
        {...otherProps}
      >
        {React.Children.map(children, this.renderChild)}
      </Tag>
    );
  }

  renderChild = (child: React.ReactElement<ListItemProps<T>> | React.ReactChild) => {
    if (!isReactText(child)) {
      const {renderAsListItem} = child.props;
      debugger
      if (renderAsListItem || isListItem(child)) {
        console.log('MEOW')
        return this.renderListItem(child, this.listItemCount++);
      }
    }
    return child;
  };

  renderListItem = (listItem: React.ReactElement<ListItemProps<T>>, index: number) => {
    const {checkboxList, radioList, selectedIndex} = this.props;
    let tabIndex = {};
    const {
      onKeyDown,
      onClick,
      onFocus,
      onBlur,
      ...otherProps
    } = listItem.props;

    if (!this.hasInitializedListItem) {
      const isSelectedIndexArray = Array.isArray(selectedIndex) && selectedIndex.length > 0;
      // if selectedIndex is populated then check if its a checkbox/radioList
      if (selectedIndex && (isSelectedIndexArray || selectedIndex > -1)) {
        const isCheckboxListSelected
          = checkboxList && Array.isArray(selectedIndex) && selectedIndex.indexOf(index) > -1;
        const isNonCheckboxListSelected = selectedIndex === index;
        if (isCheckboxListSelected || isNonCheckboxListSelected) {
          tabIndex = {tabIndex: 0};
          this.hasInitializedListItem = true;
        }
      // set tabIndex=0 to first listItem if selectedIndex is not populated
      } else {
        tabIndex = {tabIndex: 0};
        this.hasInitializedListItem = true;
      }
    }


    const props = {
      // otherProps must come first
      ...otherProps,
      checkboxList,
      radioList,
      onKeyDown: (e: React.KeyboardEvent<T>) => {
        console.log('meow')
        onKeyDown!(e);
        this.handleKeyDown(e, index);
      },
      onClick: (e: React.MouseEvent<T>) => {
        onClick!(e);
        this.handleClick(e, index);
      },
      onFocus: (e: React.FocusEvent<T>) => {
        onFocus!(e);
        this.handleFocus(e, index);
      },
      onBlur: (e: React.FocusEvent<T>) => {
        onBlur!(e);
        this.handleBlur(e, index);
      },
      ...tabIndex,
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
  ListItemProps,
};

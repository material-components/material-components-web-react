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

import React from 'react';
import classnames from 'classnames';
import {MDCListFoundation} from '@material/list/foundation';
import {MDCListIndex} from '@material/list/types';
import {MDCListAdapter} from '@material/list/adapter';
// @ts-ignore @types cannot be used on dist files
import memoizeOne from 'memoize-one/dist/memoize-one.cjs.js';

import ListItem, {ListItemProps} from './ListItem'; // eslint-disable-line @typescript-eslint/no-unused-vars
import ListItemGraphic from './ListItemGraphic';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';
import ListDivider from './ListDivider';
import ListGroup from './ListGroup';
import ListGroupSubheader from './ListGroupSubheader';

const HORIZONTAL = 'horizontal';

export interface ListProps extends React.HTMLProps<HTMLElement> {
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
  ref?: React.Ref<any>;
  orientation?: 'vertical' | 'horizontal';
}

interface ListState {
  listItemClassNames: {[listItemIndex: number]: string[]};
}

export interface ListItemContextShape {
  checkboxList?: boolean;
  radioList?: boolean;
  handleClick?: (e: React.MouseEvent<any>, index: number) => void;
  handleKeyDown?: (e: React.KeyboardEvent<any>, index: number) => void;
  handleBlur?: (e: React.FocusEvent<any>, index: number) => void;
  handleFocus?: (e: React.FocusEvent<any>, index: number) => void;
  onDestroy?: (index: number) => void;
  getListItemInitialTabIndex?: (index: number) => number;
  getClassNamesFromList?: () => ListState['listItemClassNames'];
  tabIndex?: number;
}

function isSelectedIndexType(
  selectedIndex: unknown
): selectedIndex is MDCListIndex {
  return (
    (typeof selectedIndex === 'number' && !isNaN(selectedIndex)) ||
    Array.isArray(selectedIndex)
  );
}

export const defaultListItemContext: ListItemContextShape = {
  handleClick: () => {},
  handleKeyDown: () => {},
  handleBlur: () => {},
  handleFocus: () => {},
  onDestroy: () => {},
  getListItemInitialTabIndex: () => -1,
  getClassNamesFromList: () => ({}),
};

export const ListItemContext = React.createContext(defaultListItemContext);

export default class List extends React.Component<ListProps, ListState> {
  foundation!: MDCListFoundation;
  hasInitializedListItemTabIndex = false;

  private listElement = React.createRef<HTMLElement>();

  state: ListState = {
    listItemClassNames: {},
  };

  static defaultProps: Partial<ListProps> = {
    className: '',
    checkboxList: false,
    radioList: false,
    nonInteractive: false,
    dense: false,
    avatarList: false,
    twoLine: false,
    singleSelection: false,
    selectedIndex: -1,
    handleSelect: () => {},
    wrapFocus: true,
    tag: 'ul',
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
    // Vertical is the default so true unless explicitly horizontal.
    this.foundation.setVerticalOrientation(
      this.props.orientation !== HORIZONTAL
    );
    this.initializeListType();
  }

  componentDidUpdate(prevProps: ListProps) {
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
    if (this.props.orientation !== prevProps.orientation) {
      this.foundation.setVerticalOrientation(
        this.props.orientation !== HORIZONTAL
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
    const checkboxListItems = this.listElement.current.querySelectorAll(
      strings.ARIA_ROLE_CHECKBOX_SELECTOR
    );
    const radioSelectedListItem = this.listElement.current.querySelector(
      strings.ARIA_CHECKED_RADIO_SELECTOR
    );

    if (checkboxListItems.length) {
      const preselectedItems = this.listElement.current.querySelectorAll(
        strings.ARIA_CHECKED_CHECKBOX_SELECTOR
      );
      const selectedIndex = [].map.call(preselectedItems, (listItem: Element) =>
        this.listElements.indexOf(listItem)
      ) as number[];
      this.foundation.setSelectedIndex(selectedIndex);
    } else if (singleSelection) {
      const isActivated = this.listElement.current.querySelector(
        cssClasses.LIST_ITEM_ACTIVATED_CLASS
      );
      if (isActivated) {
        this.foundation.setUseActivatedClass(true);
      }
    } else if (radioSelectedListItem) {
      this.foundation.setSelectedIndex(
        this.listElements.indexOf(radioSelectedListItem)
      );
    }
  };

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
    const {className, nonInteractive, dense, avatarList, twoLine} = this.props;
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
      getFocusedElementIndex: () =>
        this.listElements.indexOf(document.activeElement as HTMLLIElement),
      getAttributeForElementIndex: (index, attr) => {
        const listItem = this.listElements[index];
        return listItem.getAttribute(attr);
      },
      setAttributeForElementIndex: (index, attr, value) => {
        const listItem = this.listElements[index];
        if (listItem) {
          listItem.setAttribute(attr, value);
        }
      },
      /**
       * Pushes class name to state.listItemClassNames[listItemIndex] if it doesn't yet exist.
       */
      addClassForElementIndex: (index, className) => {
        const {listItemClassNames} = this.state;
        if (
          listItemClassNames[index] &&
          listItemClassNames[index].indexOf(className) === -1
        ) {
          listItemClassNames[index].push(className);
        } else {
          listItemClassNames[index] = [className];
        }
        this.setState({listItemClassNames});
      },
      /**
       * Finds the className within state.listItemClassNames[listItemIndex], and removes it
       * from the array.
       */
      removeClassForElementIndex: (index, className) => {
        const {listItemClassNames} = this.state;
        if (listItemClassNames[index]) {
          const removalIndex = listItemClassNames[index].indexOf(className);
          if (removalIndex !== -1) {
            listItemClassNames[index].splice(removalIndex, 1);
            this.setState({listItemClassNames});
          }
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const listItem = this.listElements[listItemIndex];
        const selector =
          MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
        const listItemChildren: Element[] = [].slice.call(
          listItem.querySelectorAll(selector)
        );
        listItemChildren.forEach((el) =>
          el.setAttribute('tabindex', tabIndexValue)
        );
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
        return !!listItem.querySelector(
          MDCListFoundation.strings.CHECKBOX_SELECTOR
        );
      },
      hasRadioAtIndex: (index) => {
        const listItem = this.listElements[index];
        return !!listItem.querySelector(
          MDCListFoundation.strings.RADIO_SELECTOR
        );
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

  /**
   * Called from ListItem.
   * Initializes the tabIndex prop for the listItems. tabIndex is determined by:
   * 1. if selectedIndex is an array, and the index === selectedIndex[0]
   * 2. if selectedIndex is a number, and the the index === selectedIndex
   * 3. if there is no selectedIndex
   */
  getListItemInitialTabIndex = (index: number) => {
    const {selectedIndex} = this.props;
    let tabIndex = -1;
    if (!this.hasInitializedListItemTabIndex) {
      const isSelectedIndexArray =
        Array.isArray(selectedIndex) &&
        selectedIndex.length > 0 &&
        index === selectedIndex[0];
      const isSelected = selectedIndex === index;
      if (isSelectedIndexArray || isSelected || selectedIndex === -1) {
        tabIndex = 0;
        this.hasInitializedListItemTabIndex = true;
      }
    }

    return tabIndex;
  };

  /**
   * Method checks if the list item at `index` contains classes. If true,
   * method merges state.listItemClassNames[index] with listItem.props.className.
   * The return value is used as the listItem's className.
   */
  private getListItemClassNames = () => {
    const {listItemClassNames} = this.state;
    return listItemClassNames;
  };

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

  onDestroy = (index: number) => {
    const {listItemClassNames} = this.state;
    delete listItemClassNames[index];
    this.setState({listItemClassNames});
  };

  private getListProps = (checkboxList?: boolean, radioList?: boolean) => ({
    checkboxList: Boolean(checkboxList),
    radioList: Boolean(radioList),
    handleKeyDown: this.handleKeyDown,
    handleClick: this.handleClick,
    handleFocus: this.handleFocus,
    handleBlur: this.handleBlur,
    onDestroy: this.onDestroy,
    getClassNamesFromList: this.getListItemClassNames,
    getListItemInitialTabIndex: this.getListItemInitialTabIndex,
  });

  // decreases rerenders
  // https://overreacted.io/writing-resilient-components/#dont-stop-the-data-flow-in-rendering
  getListPropsMemoized = memoizeOne(this.getListProps);

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
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
      /* eslint-enable @typescript-eslint/no-unused-vars */
      children,
      tag: Tag,
      orientation,
      ...otherProps
    } = this.props;

    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag
        className={this.classes}
        ref={this.listElement}
        role={this.role}
        // Only specify aria-orientation if:
        // - orientation is horizontal (vertical is implicit)
        // - props.role is falsy (not overridden)
        // - this.role is truthy (we are applying role for checkboxList/radiogroup that supports aria-orientation)
        // https://github.com/material-components/material-components-web/tree/master/packages/mdc-list#accessibility
        aria-orientation={
          orientation === HORIZONTAL && !role && this.role
            ? HORIZONTAL
            : undefined
        }
        {...otherProps}
      >
        <ListItemContext.Provider
          value={this.getListPropsMemoized(checkboxList, radioList)}
        >
          {children}
        </ListItemContext.Provider>
      </Tag>
    );
  }
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

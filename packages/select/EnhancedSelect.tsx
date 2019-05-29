// The MIT License
//
// Copyright (c) 2019 Google, Inc.
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
import {MDCMenuSurfaceFoundation} from '@material/menu-surface/foundation';
import Menu, {MenuList} from '@material/react-menu';
import {OptionProps} from './Option'; // eslint-disable-line @typescript-eslint/no-unused-vars
import {CommonSelectProps} from './BaseSelect';
import MDCSelectFoundation from '@material/select/foundation';

const {Corner} = MDCMenuSurfaceFoundation;
const TRUE = 'true';
const FALSE = 'false';

export type EnhancedChild<T extends HTMLElement> = React.ReactElement<
  OptionProps<T>
>;

export interface EnhancedSelectProps
  extends CommonSelectProps,
    React.HTMLProps<HTMLElement> {
  closeMenu?: () => void;
  onEnhancedChange?: (index: number, item: Element) => void;
  anchorElement: HTMLElement | null;
  value?: string;
  ref?: React.Ref<any>;
  isInvalid?: boolean;
}

interface EnhancedSelectState {
  'aria-expanded'?: boolean | 'false' | 'true';
  selectedItem: Element | null;
  selectedValue?: string;
}

export default class EnhancedSelect extends React.Component<
  EnhancedSelectProps,
  EnhancedSelectState
> {
  nativeControl: React.RefObject<HTMLSelectElement> = React.createRef();
  private selectedTextEl = React.createRef<HTMLDivElement>();
  menuEl = React.createRef<Menu>();

  static defaultProps: Partial<EnhancedSelectProps> = {
    disabled: false,
    closeMenu: () => {},
    onEnhancedChange: () => {},
    value: '',
    anchorElement: null,
    isInvalid: false,
  };

  state: EnhancedSelectState = {
    'aria-expanded': undefined,
    selectedItem: null,
    selectedValue: '',
  };

  componentDidUpdate(prevProps: EnhancedSelectProps) {
    if (this.props.value !== prevProps.value) {
      this.setSelected();
    }
  }

  get listElements() {
    return this.menuEl.current !== null && this.menuEl.current!.listElements;
  }

  setSelected = () => {
    const listElements =
      this.menuEl.current !== null && this.menuEl.current!.listElements;
    if (!listElements || !listElements.length) return;

    const index = this.getIndexByValue(listElements);
    const selectedItem = listElements[index];
    const selectedValue =
      (selectedItem &&
        selectedItem.getAttribute(
          MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR
        )) ||
      '';
    this.setState({selectedItem, selectedValue});
  };

  private getIndexByValue = (listElements: Element[]) => {
    const {value} = this.props;
    let index = -1;
    if (index < 0 && value) {
      listElements.some((element: Element, elementIndex: number) => {
        if (
          element.getAttribute(
            MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR
          ) === value
        ) {
          index = elementIndex;
          return true;
        }
        return false;
      });
    }
    return index;
  };

  private handleMenuClose = () => {
    const {closeMenu, foundation} = this.props;
    closeMenu!();
    this.setState({'aria-expanded': undefined});
    if (foundation && document.activeElement !== this.selectedTextEl.current) {
      foundation.handleBlur();
    }
  };

  private handleMenuOpen = () => {
    this.setState({'aria-expanded': true});
    if (this.listElements && this.listElements.length > 0) {
      let index = this.getIndexByValue(this.listElements);
      index = index > -1 ? index : 0;
      const listItem = this.listElements[index];
      (listItem as HTMLElement).focus();
    }
  };

  render() {
    const {
      children,
      required,
      open,
      disabled,
      anchorElement,
      onMouseDown,
      onTouchStart,
      onKeyDown,
      onFocus,
      onClick,
      onBlur,
      onEnhancedChange,
      isInvalid,
    } = this.props;

    const {
      'aria-expanded': ariaExpanded,
      selectedValue,
      selectedItem,
    } = this.state;

    const selectedTextAttrs: {[key: string]: string} = {};
    if (required) {
      selectedTextAttrs['aria-required'] = required.toString();
    }
    if (ariaExpanded && ariaExpanded !== FALSE) {
      selectedTextAttrs['aria-expanded'] = TRUE;
    }
    if (isInvalid) {
      selectedTextAttrs['aria-invalid'] = TRUE;
    }
    if (disabled) {
      selectedTextAttrs['aria-disabled'] = TRUE;
    } else {
      selectedTextAttrs['aria-disabled'] = FALSE;
    }

    return (
      <React.Fragment>
        <input
          type='hidden'
          name='enhanced-select'
          disabled={disabled}
          value={selectedValue}
        />
        <div
          className='mdc-select__selected-text'
          {...selectedTextAttrs}
          ref={this.selectedTextEl}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
        >
          {selectedItem ? (selectedItem as Element).textContent!.trim() : ''}
        </div>
        <Menu
          className='mdc-select__menu'
          onClose={this.handleMenuClose}
          onOpen={this.handleMenuOpen}
          open={open}
          onSelected={onEnhancedChange}
          anchorElement={anchorElement || undefined}
          anchorCorner={Corner.BOTTOM_START}
          ref={this.menuEl}
          onMount={this.setSelected}
        >
          <MenuList>
            {/* TODO: this should use React.createContext instead */}
            {React.Children.map(children, (child) => {
              const c = child as React.ReactElement<OptionProps>;
              return React.cloneElement(c, {...c.props, enhanced: true});
            })}
          </MenuList>
        </Menu>
      </React.Fragment>
    );
  }
}

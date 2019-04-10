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

import * as React from 'react';
import classnames from 'classnames';
import {MDCMenuSurfaceFoundation} from '@material/menu-surface/foundation';
import Menu, {MenuList} from '@material/react-menu';
import {OptionProps} from './Option';
import {CommonSelectProps} from './BaseSelect';

const {Corner} = MDCMenuSurfaceFoundation;

export type EnhancedChild<T extends HTMLElement> = React.ReactElement<OptionProps<T>>;

export interface EnhancedSelectProps extends CommonSelectProps, React.HTMLProps<HTMLElement> {
  closeMenu?: () => void;
  onEnhancedChange?: (index: number, item: Element) => void;
  anchorElement: HTMLElement | null;
  value?: string;
  ref?: React.Ref<any>;
  selectedIndex?: number;
  isInvalid?: boolean;
}

interface EnhancedSelectState {
  'aria-expanded'?: boolean | 'false' | 'true';
}

export default class EnhancedSelect extends React.Component<
  EnhancedSelectProps,
  EnhancedSelectState
  > {
  nativeControl: React.RefObject<HTMLSelectElement> = React.createRef();
  private selectedTextEl = React.createRef<HTMLDivElement>();
  private menuEl = React.createRef<Menu>();

  static defaultProps: Partial<EnhancedSelectProps> = {
    disabled: false,
    handleDisabled: () => {},
    closeMenu: () => {},
    onEnhancedChange: () => {},
    value: '',
    anchorElement: null,
    selectedIndex: -1,
    isInvalid: false,
  };

  state = {
    'aria-expanded': undefined,
  }

  componentDidUpdate(prevProps: EnhancedSelectProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled!(this.props.disabled!);
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  handleMenuClose = () => {
    const {closeMenu, foundation} = this.props;
    closeMenu!();
    this.setState({'aria-expanded': undefined});
    if (foundation && document.activeElement !== this.selectedTextEl.current) {
      foundation.handleBlur();
    }
  }

  handleMenuOpen = () => {
    const {selectedIndex} = this.props;
    this.setState({'aria-expanded': true});
    if (this.menuEl.current && this.menuEl.current.listElements) {
      const index = selectedIndex! > -1 ? selectedIndex! : 0;
      (this.menuEl.current.listElements[index] as HTMLElement).focus();
    }
  }

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
      onBlur,
      onEnhancedChange,
      isInvalid,
      selectedIndex,
    } = this.props;
    
    const {'aria-expanded': ariaExpanded} = this.state;

    const selectedTextAttrs: {[key: string]: string} = {};
    if (required) {
      selectedTextAttrs['aria-required'] = required.toString();
    }
    if (ariaExpanded || ariaExpanded === 'true') {
      selectedTextAttrs['aria-expanded'] = 'true';
    }
    if (isInvalid) {
      selectedTextAttrs['aria-invalid'] = 'true';
    }

    const selectedItem = this.menuEl.current && this.menuEl.current.listElements[selectedIndex!];

    return (
      <React.Fragment>
        <input type='hidden' name='enhanced-select' disabled={disabled}/>
        <div
          className='mdc-select__selected-text'
          {...selectedTextAttrs}
          ref={this.selectedTextEl}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {selectedItem ? selectedItem.textContent!.trim() : ''}
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
        >
          <MenuList>
            {children}
          </MenuList>
        </Menu>
      </React.Fragment>
    );
  }
}

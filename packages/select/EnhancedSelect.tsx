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
import {MDCSelectFoundation} from '@material/select/foundation';
import Menu, {MenuList} from '@material/react-menu';
import { EnhancedOptionProps } from './Option';

// type RefCallback<T> = (node: T | null) => void;
export type EnhancedChild<T extends HTMLElement> = React.ReactElement<EnhancedOptionProps<T>>;

export interface EnhancedSelectProps extends React.HTMLProps<HTMLSelectElement> {
  foundation?: MDCSelectFoundation;
  setRippleCenter?: (lineRippleCenter: number) => void;
  handleDisabled?: (disabled: boolean) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
  closeMenu?: () => void;
  handleSelected?: (index: number, element: Element) => void;
}

interface EnhancedSelectState {
  'aria-expanded'?: boolean | 'false' | 'true';
  selectedTextValue: string;
}

export default class EnhancedSelect extends React.Component<
  EnhancedSelectProps,
  EnhancedSelectState
  > {
  nativeControl: React.RefObject<HTMLSelectElement> = React.createRef();
  // private menuEl = React.createRef<HTMLDivElement>();
  private selectedTextEl = React.createRef<HTMLDivElement>();

  static defaultProps: Partial<EnhancedSelectProps> = {
    // className: '',
    disabled: false,
    // setRippleCenter: () => {},
    handleDisabled: () => {},
    closeMenu: () => {},
    handleSelected: () => {},
    // value: '',
  };

  state = {
    'aria-expanded': undefined,
    selectedTextValue: '',
  }

  componentDidUpdate(prevProps: EnhancedSelectProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled!(this.props.disabled!);
    }
    if (this.props.value !== prevProps.value) {
      this.setState({selectedTextValue: this.props.value || ''});
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  // TODO: also on nativeControl
  handleClick = (evt: React.MouseEvent<any> | React.TouchEvent<any>) => {
    if (this.props.foundation) {
      this.props.foundation.handleClick(this.getNormalizedXCoordinate(evt));
    }
  }

  handleKeydown = (evt: React.KeyboardEvent<any>) => {
    if (this.props.foundation) {
      this.props.foundation.handleKeydown(evt.nativeEvent);
    }
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
    this.setState({'aria-expanded': true});
    // TODO
    // if (this.menuEl.current) {
    //   this.menuEl.current.focus();
    // }
  }

  handleFocus = (evt: React.FocusEvent<HTMLSelectElement>) => {
    const {foundation, onFocus} = this.props;
    if (foundation && foundation.handleFocus) {
      foundation.handleFocus();
    }
    onFocus && onFocus(evt);
  };

  handleBlur = (evt: React.FocusEvent<HTMLSelectElement>) => {
    const {foundation, onBlur} = this.props;
    if (foundation && foundation.handleFocus) {
      foundation.handleBlur();
    }
    onBlur && onBlur(evt);
  };

  private isTouchEvent_(evt: MouseEvent | TouchEvent): evt is TouchEvent {
    return Boolean((evt as TouchEvent).touches);
  }

  private getNormalizedXCoordinate(evt: React.MouseEvent<any> | React.TouchEvent<any>) {
    // TODO: does this work?
    const targetClientRect = (evt.currentTarget as Element).getBoundingClientRect();
    const xCoordinate = this.isTouchEvent_(evt.nativeEvent) ? evt.nativeEvent.touches[0].clientX : evt.nativeEvent.clientX;
    return xCoordinate - targetClientRect.left;
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      // className,
      children,
      // foundation,
      // value,
      // handleDisabled,
      // setRippleCenter,
      required,
      open,
      handleSelected,
      // closeMenu
      /* eslint-enable no-unused-vars */
    } = this.props;
    const {selectedTextValue} = this.state;
    const {'aria-expanded': ariaExpanded} = this.state;

    const selectedTextAttrs: {[key: string]: string} = {};
    if (required) {
      selectedTextAttrs['aria-required'] = required.toString();
    }
    if (ariaExpanded || ariaExpanded === 'true') {
      selectedTextAttrs['aria-expanded'] = 'true';
    }

    return (
      <React.Fragment>
        <input type='hidden' name='enhanced-select'/>
        <div
          className='mdc-select__selected-text'
          {...selectedTextAttrs}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
          ref={this.selectedTextEl}
        >{selectedTextValue}</div>
        <Menu
          className='mdc-select__menu'
          onClose={this.handleMenuClose}
          onOpen={this.handleMenuOpen}
          open={open}
          onSelected={handleSelected}
        >
          <MenuList>
            {children}
          </MenuList>
        </Menu>
      </React.Fragment>
    );
  }
}

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
// import classnames from 'classnames';
// import {MDCSelectFoundation} from '@material/select/foundation';
// import {MDCMenuSurfaceFoundation} from '@material/menu-surface/foundation';
import NativeControl, {NativeControlProps} from './NativeSelect';
import EnhancedSelect, {EnhancedSelectProps} from './EnhancedSelect';
import {MDCSelectFoundation} from '@material/select/foundation';

export type BaseSelectProps<T extends HTMLElement>
  = (T extends HTMLSelectElement ? NativeControlProps : EnhancedSelectProps);

export interface CommonSelectProps {
  enhanced: boolean;
  className?: string;
  disabled?: boolean;
  foundation?: MDCSelectFoundation;
  handleDisabled?: (disabled: boolean) => void;
  value?: string;
}

export class BaseSelect<T extends HTMLElement = HTMLSelectElement>
  extends React.Component<BaseSelectProps<T>> {

  static defaultProps = {
    enhanced: false,
  };

  handleFocus = (evt: React.FocusEvent<T>) => {
    const {foundation, onFocus} = this.props;
    if (foundation) {
      foundation.handleFocus();
    }
    onFocus && onFocus(evt);
  };

  handleBlur = (evt: React.FocusEvent<T>) => {
    const {foundation, onBlur} = this.props;
    if (foundation) {
      foundation.handleBlur();
    }
    debugger
    onBlur && onBlur(evt);
  };

  handleTouchStart = (evt: React.TouchEvent<T>) => {
    const {foundation, onTouchStart} = this.props;
    if (foundation) {
      foundation.handleClick(this.getNormalizedXCoordinate(evt));
    } 
    onTouchStart && onTouchStart(evt);
  }

  handleMouseDown = (evt: React.MouseEvent<T>) => {
    const {foundation, onMouseDown} = this.props;
    if (foundation) {
      foundation.handleClick(this.getNormalizedXCoordinate(evt));
    } 
    onMouseDown && onMouseDown(evt);
  }

  handleClick = (evt: React.MouseEvent<T> | React.TouchEvent<T>) => {
    if (this.props.foundation) {
      this.props.foundation.handleClick(this.getNormalizedXCoordinate(evt));
    }
  }

  handleKeyDown = (evt: React.KeyboardEvent<T>) => {
    const {foundation, onKeyDown} = this.props;
    if (foundation) {
      foundation.handleKeydown(evt.nativeEvent);
    }
    onKeyDown && onKeyDown(evt);
  }

  private isTouchEvent = (evt: MouseEvent | TouchEvent): evt is TouchEvent => {
    return Boolean((evt as TouchEvent).touches);
  }
  
  private getNormalizedXCoordinate 
    = (evt: React.MouseEvent<T> | React.TouchEvent<T>) => {
    const targetClientRect = (evt.currentTarget as Element).getBoundingClientRect();
    const xCoordinate = this.isTouchEvent(evt.nativeEvent) ? evt.nativeEvent.touches[0].clientX : evt.nativeEvent.clientX;
    return xCoordinate - targetClientRect.left;
  }


  render() {
    const {
      enhanced,
      children,
      onFocus,
      onBlur,
      onMouseDown,
      onTouchStart,
      onKeyDown,
      ref,
      ...otherProps
    } = this.props;

    const props = {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart,
      ...otherProps
    };

    if (enhanced) {
      return (
      <EnhancedSelect
        onKeyDown={this.handleKeyDown}
        {...props}
      >
          {children}
        </EnhancedSelect>
      );
    }
    return (
      <NativeControl
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </NativeControl>
    );
  }
}
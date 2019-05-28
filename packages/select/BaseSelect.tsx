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
import NativeSelect, {
  NativeSelectProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from './NativeSelect';
import EnhancedSelect, {
  EnhancedSelectProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from './EnhancedSelect';
import {MDCSelectFoundation} from '@material/select/foundation';

export type BaseSelectProps<T extends HTMLElement> = T extends HTMLSelectElement
  ? NativeSelectProps
  : EnhancedSelectProps;

export interface CommonSelectProps {
  enhanced: boolean;
  className?: string;
  disabled?: boolean;
  foundation?: MDCSelectFoundation;
  value?: string;
  selectClassName?: string;
}

export class BaseSelect<
  T extends HTMLElement = HTMLSelectElement
> extends React.Component<BaseSelectProps<T>> {
  static defaultProps = {
    enhanced: false,
    selectClassName: '',
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
    onBlur && onBlur(evt);
  };

  handleTouchStart = (evt: React.TouchEvent<T>) => {
    const {foundation, onTouchStart} = this.props;
    if (foundation) {
      foundation.handleClick(this.getNormalizedXCoordinate(evt));
    }
    onTouchStart && onTouchStart(evt);
  };

  handleMouseDown = (evt: React.MouseEvent<T>) => {
    const {foundation, onMouseDown} = this.props;
    if (foundation) {
      foundation.handleClick(this.getNormalizedXCoordinate(evt));
    }
    onMouseDown && onMouseDown(evt);
  };

  handleClick = (evt: React.MouseEvent<T>) => {
    const {foundation, onClick} = this.props;
    if (foundation) {
      foundation.handleClick(this.getNormalizedXCoordinate(evt));
    }
    onClick && onClick(evt);
  };

  handleKeyDown = (evt: React.KeyboardEvent<T>) => {
    const {foundation, onKeyDown} = this.props;
    if (foundation) {
      foundation.handleKeydown(evt.nativeEvent);
    }
    onKeyDown && onKeyDown(evt);
  };

  private isTouchEvent = (evt: MouseEvent | TouchEvent): evt is TouchEvent => {
    return Boolean((evt as TouchEvent).touches);
  };

  private getNormalizedXCoordinate = (
    evt: React.MouseEvent<T> | React.TouchEvent<T>
  ) => {
    const targetClientRect = (evt.currentTarget as Element).getBoundingClientRect();
    const xCoordinate = this.isTouchEvent(evt.nativeEvent)
      ? evt.nativeEvent.touches[0].clientX
      : evt.nativeEvent.clientX;
    return xCoordinate - targetClientRect.left;
  };

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      onFocus,
      onBlur,
      onClick,
      onMouseDown,
      onTouchStart,
      ref,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      enhanced,
      children,
      onKeyDown,
      selectClassName,
      ...otherProps
    } = this.props;

    const props = {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      onTouchStart: this.handleTouchStart,
      className: selectClassName,
      ...otherProps,
    };

    if (enhanced) {
      return (
        <EnhancedSelect onKeyDown={this.handleKeyDown} {...props}>
          {children}
        </EnhancedSelect>
      );
    }
    return (
      <NativeSelect onKeyDown={onKeyDown} {...props}>
        {children}
      </NativeSelect>
    );
  }
}

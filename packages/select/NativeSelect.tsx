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
import {CommonSelectProps} from './BaseSelect';

type RefCallback<T> = (node: T | null) => void;

export interface NativeSelectProps extends CommonSelectProps, React.HTMLProps<HTMLSelectElement> {
  innerRef?: RefCallback<HTMLSelectElement> | React.RefObject<HTMLSelectElement>;
  value?: string;
  ref?: React.Ref<any>;
}

export default class NativeSelect extends React.Component<
  NativeSelectProps,
  {}
  > {
  NativeSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  static defaultProps: Partial<NativeSelectProps> = {
    className: '',
    children: null,
    disabled: false,
    handleDisabled: () => {},
    value: '',
  };

  componentDidUpdate(prevProps: NativeSelectProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled!(this.props.disabled!);
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  attachRef = (node: HTMLSelectElement | null) => {
    const {innerRef} = this.props;

    // https://github.com/facebook/react/issues/13029#issuecomment-410002316
    // @ts-ignore this is acceptable according to the comment above
    this.NativeSelect.current = node;

    if (!innerRef) {
      return;
    }

    if (typeof innerRef !== 'function') {
      // @ts-ignore same as above
      innerRef.current = node;
    } else {
      innerRef(node);
    }
  }

  render() {
    const {
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      children,
      foundation,
      value,
      handleDisabled,
      onFocus,
      onBlur,
      onTouchStart,
      onMouseDown,
      innerRef,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <select
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        disabled={disabled}
        value={value}
        className={this.classes}
        ref={this.attachRef}
        {...otherProps}
      >
        {children}
      </select>
    );
  }
}

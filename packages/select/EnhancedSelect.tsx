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

type RefCallback<T> = (node: T | null) => void;

export interface NativeControlProps extends React.HTMLProps<HTMLSelectElement> {
  className: string;
  disabled: boolean;
  foundation: MDCSelectFoundation;
  setRippleCenter: (lineRippleCenter: number) => void;
  handleDisabled: (disabled: boolean) => void;
  value: string;
  innerRef?: RefCallback<HTMLSelectElement> | React.RefObject<HTMLSelectElement>;
}

export default class EnhancedSelect extends React.Component<
  NativeControlProps,
  {}
  > {
  nativeControl: React.RefObject<HTMLSelectElement> = React.createRef();

  static defaultProps: Partial<NativeControlProps> = {
    className: '',
    children: null,
    disabled: false,
    setRippleCenter: () => {},
    handleDisabled: () => {},
    value: '',
  };

  componentDidUpdate(prevProps: NativeControlProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled(this.props.disabled);
    }
    if (this.props.value !== prevProps.value) {
      
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  attachRef = (node: HTMLSelectElement | null) => {
    const {innerRef} = this.props;

    // https://github.com/facebook/react/issues/13029#issuecomment-410002316
    // @ts-ignore this is acceptable according to the comment above
    this.nativeControl.current = node;

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
      setRippleCenter,
      innerRef,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        <input type='hidden' name='enhanced-select' />
        <div className='mdc-select__selected-text'></div>
        <Menu>
          <MenuList>
            {children}
          </MenuList>
        </Menu>
      </React.Fragment>
    );
  }
}

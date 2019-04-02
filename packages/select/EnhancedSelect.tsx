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
import Menu, {MenuProps} from '@material/react-menu';
import { EnhancedOptionProps } from './Option';

// type RefCallback<T> = (node: T | null) => void;
export type EnhancedChild<T extends HTMLElement> = React.ReactElement<EnhancedOptionProps<T>>;

export interface EnhancedSelectProps extends MenuProps {
  foundation?: MDCSelectFoundation;
  setRippleCenter?: (lineRippleCenter: number) => void;
  handleDisabled?: (disabled: boolean) => void;
  value?: string;
  disabled?: boolean;
  className?: string;
}

export default class EnhancedSelect extends React.Component<
  EnhancedSelectProps,
  {}
  > {
  nativeControl: React.RefObject<HTMLSelectElement> = React.createRef();

  static defaultProps: Partial<EnhancedSelectProps> = {
    // className: '',
    disabled: false,
    // setRippleCenter: () => {},
    handleDisabled: () => {},
    // value: '',
  };

  componentDidUpdate(prevProps: EnhancedSelectProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled!(this.props.disabled!);
    }
    if (this.props.value !== prevProps.value) {
      
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  // attachRef = (node: HTMLSelectElement | null) => {
  //   const {innerRef} = this.props;

  //   // https://github.com/facebook/react/issues/13029#issuecomment-410002316
  //   // @ts-ignore this is acceptable according to the comment above
  //   this.nativeControl.current = node;

  //   if (!innerRef) {
  //     return;
  //   }

  //   if (typeof innerRef !== 'function') {
  //     // @ts-ignore same as above  
  //     innerRef.current = node;
  //   } else {
  //     innerRef(node);
  //   }
  // }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      children,
      foundation,
      // value,
      handleDisabled,
      setRippleCenter,
      ref,
      required,
      ...otherProps
      /* eslint-enable no-unused-vars */
    } = this.props;

    const isRequired: {[key: string]: string} = {};
    if (required) {
      isRequired['aria-required'] = required.toString();
    }

    return (
      <React.Fragment>
        <input type='hidden' name='enhanced-select' />
        <div
          className='mdc-select__selected-text'
          {...isRequired}
        ></div>
        <Menu className='mdc-select__menu' {...otherProps}>
          {children}
        </Menu>
      </React.Fragment>
    );
  }
}

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

export interface NativeControlProps extends React.HTMLProps<HTMLInputElement> {
  checked: boolean;
  disabled: boolean;
  id?: string;
  rippleActivatorRef: React.RefObject<HTMLInputElement>;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export class NativeControl extends React.Component<NativeControlProps, {}> {
  static defaultProps: Partial<NativeControlProps> = {
    checked: false,
    disabled: false,
    onChange: () => {},
  };

  render() {
    const {rippleActivatorRef, ...otherProps} = this.props;
    return (
      <input
        type='checkbox'
        className='mdc-checkbox__native-control'
        ref={rippleActivatorRef}
        {...otherProps}
      />
    );
  }
}

export default NativeControl;

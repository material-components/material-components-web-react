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

export default class ChipCheckmark extends React.Component<{}, {}> {
  width: number = 0;

  init = (element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    // The checkmark's width may initially be set to 0, so use the checkmark's height as a proxy since the
    // checkmark should always be square.
    this.width = element.getBoundingClientRect().height;
  };

  render() {
    return (
      <div className='mdc-chip__checkmark' ref={this.init}>
        <svg
          className='mdc-chip__checkmark-svg'
          viewBox='-2 -3 30 30'
          focusable='false'
        >
          <path
            className='mdc-chip__checkmark-path'
            fill='none'
            stroke='black'
            d='M1.73,12.91 8.1,19.28 22.79,4.59'
          />
        </svg>
      </div>
    );
  }
}

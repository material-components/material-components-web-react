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
import {MDCMenuFoundation} from '@material/menu/foundation';
import {MDCMenuAdapter} from '@material/menu/adapter';

export interface MenuProps extends React.HTMLProps<HTMLDivElement> {
 
};

export interface MenuState {
  
};

class MenuSurface extends React.Component<MenuProps, MenuState> {
  state: MenuState = {
    transformOrigin: '',
    maxHeight: undefined,
    styleLeft: undefined,
    styleRight: undefined,
    styleTop: undefined,
    styleBottom: undefined,
    classList: new Set(),
  };

  static defaultProps: Partial<MenuProps> = {
    className: '',
    styles: {},
    anchorCorner: 0,
    anchorMargin: {},
    onClose: () => {},
    onOpen: () => {},
    onKeyDown: () => {},
    quickOpen: false,
    open: false,
    fixed: false,
  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps: MenuProps) {
    
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }
  render() {

    return (
      <div
        className={this.classes}
        onKeyDown={this.handleKeydown}
        ref={this.menuSurfaceElement}
        style={this.styles}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

export default MenuSurface;
export {Corner};

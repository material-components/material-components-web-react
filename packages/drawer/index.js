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
import PropTypes from 'prop-types';
import {MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation, util} from '@material/drawer';

class Drawer extends React.Component {

  get adapter() {
    return {
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus_ && this.previousFocus_.focus;
        if (this.root_.contains(document.activeElement) && previousFocus) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.root_.querySelector(`.${MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => this.emit(strings.CLOSE_EVENT, {}, true /* shouldBubble */),
      notifyOpen: () => this.emit(strings.OPEN_EVENT, {}, true /* shouldBubble */),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate(),
    };
  }
  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}

export default Drawer;

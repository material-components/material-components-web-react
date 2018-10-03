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
import {MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation} from '@material/drawer';
import DrawerHeader from './Header';
import DrawerContent from './Content';
import DrawerSubtitle from './Subtitle';
import DrawerTitle from './Title';
import DrawerAppContent from './AppContent';
import FocusTrap from 'focus-trap-react';

class Drawer extends React.Component {
  previousFocus_ = null;
  state = {classList: new Set()};

  get classes() {
    const {classList} = this.state;
    const {className, dismissible, modal} = this.props;
    return classnames('mdc-drawer',
      Array.from(classList),
      className, {
        'mdc-drawer--dismissible': dismissible,
        'mdc-drawer--modal': modal,
      }
    );
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus_ && this.previousFocus_.focus;
        if (this.root_.contains(document.activeElement) && previousFocus) {
          previousFocus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.root_.querySelector(`.${MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: this.props.onClose,
      notifyOpen: this.props.onOpen,
      trapFocus: () => this.setState({activeTrap: true}),
      releaseFocus: () => this.setState({activeTrap: false}),
    };
  }
  render() {
    const {activeTrap} = this.state;
    const {
      /* eslint-disable no-unused-vars */
      onClose,
      onOpen,
      dismissible,
      children,
      /* eslint-enable no-unused-vars */
      drawerElement: DrawerElement,
      modal,
      ...otherProps
    } = this.props;

    return (
      <DrawerElement className={this.classes}>
        {activeTrap ? (
          <FocusTrap>
            {children}
          </FocusTrap>
        ): children}
        {modal ? <div className='mdc-drawer-scrim'></div> : null}
      </DrawerElement>
    );
  }
}


Drawer.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  drawerElement: PropTypes.string,
  dismissible: PropTypes.bool,
  modal: PropTypes.bool,
};

Drawer.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  drawerElement: 'aside',
  dismissible: false,
  modal: false,
};

export default Drawer;

export {DrawerHeader, DrawerSubtitle, DrawerTitle, DrawerContent, DrawerAppContent};

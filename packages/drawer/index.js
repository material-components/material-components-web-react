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
import {MDCListFoundation} from '@material/list';
import DrawerHeader from './Header';
import DrawerContent from './Content';
import DrawerSubtitle from './Subtitle';
import DrawerTitle from './Title';
import DrawerAppContent from './AppContent';
import FocusTrap from 'focus-trap-react';

const {cssClasses: listCssClasses} = MDCListFoundation;

class Drawer extends React.Component {
  previousFocus_ = null;
  foundation_ = null;
  drawerElement_ = React.createRef();

  state = {classList: new Set()};

  componentDidMount() {
    const {dismissible, modal, open} = this.props;
    if (dismissible) {
      this.foundation_ = new MDCDismissibleDrawerFoundation(this.adapter);
      this.foundation_.init();
    } else if (modal) {
      this.foundation_ = new MDCModalDrawerFoundation(this.adapter);
      this.foundation_.init();
    }

    if (open && this.foundation_) {
      this.foundation_.open();
    }
  }

  componentDidUpdate(prevProps) {
    const {dismissible, modal, open} = this.props;
    if (!(dismissible || modal)) return;

    if (open !== prevProps.open) {
      open ? this.foundation_.open() : this.foundation_.close();
    }
  }

  componentWillUnmount() {
    if (!this.foundation_) return;
    this.foundation_.destroy();
  }

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
        // const {classList} = this.state;
        // classList.add(className);
        // this.setState({classList});
        // TODO: revert this change after update to 0.40.x
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;

        if (!drawerElement) return;
        drawerElement.classList.add(className);
        this.forceUpdate();
      },
      removeClass: (className) => {
        // const {classList} = this.state;
        // classList.delete(className);
        // this.setState({classList});
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;

        if (!drawerElement) return;
        drawerElement.classList.remove(className);
        this.forceUpdate();
      },
      // TODO: revert once updated to 0.40.x
      hasClass: (className) => this.drawerElement_.current && this.drawerElement_.current.classList.contains(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      computeBoundingRect: () => {
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;
        if (!drawerElement) return;
        return drawerElement.getBoundingClientRect();
      },
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const hasPreviousFocus = this.previousFocus_ && this.previousFocus_.focus;
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;
        if (drawerElement && hasPreviousFocus && drawerElement.contains(document.activeElement)) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;
        if (!drawerElement) return;
        const activeNavItemEl = drawerElement.querySelector(`.${listCssClasses.LIST_ITEM_ACTIVATED_CLASS}`);
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

  handleKeyDown = (evt) => {
    this.props.onKeyDown(evt);
    if (!this.foundation_) return;
    this.foundation_.handleKeydown(evt);
  }

  handleTransitionEnd = (evt) => {
    this.props.onTransitionEnd(evt);
    if (!this.foundation_) return;
    this.foundation_.handleTransitionEnd(evt);
  }

  render() {
    const {activeTrap} = this.state;
    const {
      /* eslint-disable no-unused-vars */
      onClose,
      onOpen,
      onKeyDown,
      onTransitionEnd,
      dismissible,
      children,
      className,
      /* eslint-enable no-unused-vars */
      tag: Tag,
      modal,
      ...otherProps
    } = this.props;

    const focusTrapOptions = {
      clickOutsideDeactivates: true,
      initialFocus: false,
      escapeDeactivates: false,
      returnFocusOnDeactivate: false,
    };

    return (
      <React.Fragment>
        <Tag
          className={this.classes} ref={this.drawerElement_}
          onKeyDown={(evt) => this.handleKeyDown(evt)}
          onTransitionEnd={(evt) => this.handleTransitionEnd(evt)}
          {...otherProps}
        >
          {activeTrap ? (
            <FocusTrap focusTrapOptions={focusTrapOptions}>
              {children}
            </FocusTrap>
          ): children}
        </Tag>
        {modal ? this.renderScrim() : null}
      </React.Fragment>
    );
  }

  renderScrim() {
    return (
      <div
        className='mdc-drawer-scrim'
        onClick={() => this.foundation_.handleScrimClick()}
      ></div>
    );
  }
}


Drawer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  onKeyDown: PropTypes.func,
  tag: PropTypes.string,
  dismissible: PropTypes.bool,
  modal: PropTypes.bool,
};

Drawer.defaultProps = {
  className: '',
  children: null,
  open: false,
  onOpen: () => {},
  onClose: () => {},
  onTransitionEnd: () => {},
  onKeyDown: () => {},
  tag: 'aside',
  dismissible: false,
  modal: false,
};

export default Drawer;

export {DrawerHeader, DrawerSubtitle, DrawerTitle, DrawerContent, DrawerAppContent};

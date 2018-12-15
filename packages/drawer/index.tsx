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
import * as classnames from 'classnames';
import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation,
  util,
// @ts-ignore
} from '@material/drawer';
// @ts-ignore
import {MDCListFoundation} from '@material/list';
import DrawerHeader from './Header';
import DrawerContent from './Content';
import DrawerSubtitle from './Subtitle';
import DrawerTitle from './Title';
import DrawerAppContent from './AppContent';
import {FocusTrap} from 'focus-trap';

const {cssClasses: listCssClasses} = MDCListFoundation;

export interface DrawerProps {
  className: string,
  open: boolean,
  onOpen: () => void,
  onClose: () => void,
  onTransitionEnd: Pick<React.HTMLProps<HTMLElement>, 'onTransitionEnd'>,
  onKeyDown: Pick<React.HTMLProps<HTMLElement>, 'onKeyDown'>,
  tag: string,
  dismissible: boolean,
  modal: boolean
};

type DrawerState = {
  classList: Set<string>
};

class Drawer extends React.Component<DrawerProps & React.HTMLProps<HTMLElement>, DrawerState> {
  previousFocus_: HTMLElement | null = null;
  foundation_: MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation;
  focusTrap_?: FocusTrap;
  drawerElement_: React.RefObject<HTMLDivElement> = React.createRef();

  state = {classList: new Set()};

  static defaultProps = {
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

  componentDidMount() {
    const {open} = this.props;
    this.initFoundation();
    if (open && this.foundation_) {
      this.foundation_.open();
    }
  }

  initFoundation = () => {
    const {dismissible, modal} = this.props;
    if (this.foundation_) {
      this.foundation_.destroy();
    }
    if (dismissible) {
      this.foundation_ = new MDCDismissibleDrawerFoundation(this.adapter);
      this.foundation_.init();
    } else if (modal) {
      this.initializeFocusTrap();
      this.foundation_ = new MDCModalDrawerFoundation(this.adapter);
      this.foundation_.init();
    }
  };

  componentDidUpdate(prevProps: DrawerProps & React.HTMLProps<HTMLElement>) {
    const {dismissible, modal, open} = this.props;
    const changedToModal = prevProps.modal !== this.props.modal;
    const changedToDismissible =
      prevProps.dismissible !== this.props.dismissible;
    if (!dismissible && !modal) return;
    if (changedToModal || changedToDismissible) {
      this.initFoundation();
    }
    if (open !== prevProps.open) {
      open ? this.foundation_.open() : this.foundation_.close();
    }
  }

  componentWillUnmount() {
    if (!this.foundation_) return;
    this.foundation_.destroy();
  }

  initializeFocusTrap = () => {
    this.focusTrap_ = util.createFocusTrapInstance(this.drawerElement_.current);
  };

  get classes() {
    const {classList} = this.state;
    const {className, dismissible, modal} = this.props;
    return classnames('mdc-drawer', Array.from(classList), className, {
      'mdc-drawer--dismissible': dismissible,
      'mdc-drawer--modal': modal,
    });
  }

  get adapter() {
    return {
      addClass: (className: string) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      elementHasClass: (element: HTMLElement, className: string) =>
        element.classList.contains(className),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement as HTMLElement | null;
      },
      restoreFocus: () => {
        const drawerElement = this.drawerElement_ && this.drawerElement_.current;
        if (drawerElement &&
          this.previousFocus_ &&
          this.previousFocus_.focus &&
          drawerElement.contains(document.activeElement)) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const drawerElement =
          this.drawerElement_ && this.drawerElement_.current;
        if (!drawerElement) return;
        const activeNavItemEl
          = drawerElement.querySelector(`.${listCssClasses.LIST_ITEM_ACTIVATED_CLASS}`) as HTMLElement | null;
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: this.props.onClose,
      notifyOpen: this.props.onOpen,
      trapFocus: () => {
        if (this.focusTrap_) {
          this.focusTrap_.activate();
        }
      },
      releaseFocus: () => {
        if (this.focusTrap_) {
          this.focusTrap_.deactivate();
        }
      },
    };
  }

  handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown(evt);
    if (!this.foundation_) return;
    this.foundation_.handleKeydown(evt);
  };

  handleTransitionEnd = (evt: React.TransitionEvent<HTMLElement>) => {
    this.props.onTransitionEnd(evt);
    if (!this.foundation_) return;
    this.foundation_.handleTransitionEnd(evt);
  };

  render() {
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

    return (
      <React.Fragment>
        {/* https://github.com/Microsoft/TypeScript/issues/28892
          // @ts-ignore */}
        <Tag
          className={this.classes}
          ref={this.drawerElement_}
          onKeyDown={this.handleKeyDown}
          onTransitionEnd={this.handleTransitionEnd}
          {...otherProps}
        >
          {children}
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
      />
    );
  }
}

export default Drawer;
export {
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
  DrawerAppContent,
};

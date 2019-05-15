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
import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation,
  util,
} from '@material/drawer';
import {MDCListFoundation} from '@material/list/foundation';
import DrawerHeader from './Header';
import DrawerContent from './Content';
import DrawerSubtitle from './Subtitle';
import DrawerTitle from './Title';
import DrawerAppContent from './AppContent';
import {FocusTrap} from 'focus-trap';

const {cssClasses: listCssClasses} = MDCListFoundation;

type RefCallback<T> = (node: T) => void;

export interface DrawerProps extends React.HTMLProps<HTMLElement> {
  className?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  tag?: string;
  dismissible?: boolean;
  modal?: boolean;
  innerRef?: RefCallback<HTMLElement> | React.RefObject<HTMLElement>;
}

interface DrawerState {
  classList: Set<string>;
}

const isRefObject = function(
  ref: DrawerProps['innerRef']
): ref is React.RefObject<HTMLElement> {
  return typeof ref !== 'function';
};

class Drawer extends React.Component<DrawerProps, DrawerState> {
  previousFocus: HTMLElement | null = null;
  foundation?: MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation;
  focusTrap?: FocusTrap;
  drawerElement: React.RefObject<HTMLDivElement> = React.createRef();

  state: DrawerState = {classList: new Set()};

  static defaultProps: Partial<DrawerProps> = {
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
    if (open && this.foundation) {
      this.foundation.open();
    }
  }

  private initFoundation = () => {
    const {dismissible, modal} = this.props;
    if (this.foundation) {
      this.foundation.destroy();
    }
    if (dismissible) {
      this.foundation = new MDCDismissibleDrawerFoundation(this.adapter);
      this.foundation.init();
    } else if (modal) {
      this.initializeFocusTrap();
      this.foundation = new MDCModalDrawerFoundation(this.adapter);
      this.foundation.init();
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
    if (open !== prevProps.open && this.foundation) {
      open ? this.foundation.open() : this.foundation.close();
    }
  }

  componentWillUnmount() {
    if (!this.foundation) return;
    this.foundation.destroy();
  }

  private initializeFocusTrap = () => {
    this.focusTrap = util.createFocusTrapInstance(this.drawerElement.current!);
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
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      elementHasClass: (element: HTMLElement, className: string) =>
        element.classList.contains(className),
      saveFocus: () => {
        this.previousFocus = document.activeElement as HTMLElement | null;
      },
      restoreFocus: () => {
        const drawerElement = this.drawerElement && this.drawerElement.current;
        if (
          drawerElement &&
          this.previousFocus &&
          this.previousFocus.focus &&
          drawerElement.contains(document.activeElement)
        ) {
          this.previousFocus.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const drawerElement = this.drawerElement && this.drawerElement.current;
        if (!drawerElement) return;
        const activeNavItemEl = drawerElement.querySelector(
          `.${listCssClasses.LIST_ITEM_ACTIVATED_CLASS}`
        ) as HTMLElement | null;
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: this.props.onClose,
      notifyOpen: this.props.onOpen,
      trapFocus: () => {
        if (this.focusTrap) {
          this.focusTrap.activate();
        }
      },
      releaseFocus: () => {
        if (this.focusTrap) {
          this.focusTrap.deactivate();
        }
      },
    };
  }

  handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown!(evt);
    if (!this.foundation) return;
    this.foundation.handleKeydown(evt.nativeEvent);
  };

  handleTransitionEnd = (evt: React.TransitionEvent<HTMLElement>) => {
    this.props.onTransitionEnd!(evt);
    if (!this.foundation) return;
    this.foundation.handleTransitionEnd(evt.nativeEvent);
  };

  attachRef = (node: HTMLElement) => {
    const {innerRef} = this.props;

    // https://github.com/facebook/react/issues/13029#issuecomment-410002316
    // @ts-ignore this is acceptable according to the comment above
    this.drawerElement.current = node;

    if (!innerRef) {
      return;
    }

    if (isRefObject(innerRef)) {
      // @ts-ignore same as above
      innerRef.current = node;
    } else {
      innerRef(node);
    }
  };

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      onClose,
      onOpen,
      onKeyDown,
      onTransitionEnd,
      dismissible,
      children,
      className,
      innerRef,
      modal,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      tag: Tag,
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        {/* https://github.com/Microsoft/TypeScript/issues/28892
          // @ts-ignore */}
        <Tag
          className={this.classes}
          ref={this.attachRef}
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
        onClick={() =>
          (this.foundation as MDCModalDrawerFoundation).handleScrimClick()
        }
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

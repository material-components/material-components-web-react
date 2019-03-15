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
// @ts-ignore no .d.ts file
import {MDCMenuSurfaceFoundation, MDCMenuSurfaceAdapter, Corner} from '@material/menu-surface/dist/mdc.menuSurface';

export interface MenuSurfaceProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  anchorElement?: HTMLElement;
  anchorCorner?: number;
  anchorMargin?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  styles?: React.CSSProperties;
  coordinates?: {
    x: number;
    y: number;
  };
  onClose?: () => void;
  onOpen?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  quickOpen?: boolean;
  open?: boolean;
  fixed?: boolean;
};

export interface MenuSurfaceState {
  transformOrigin: string;
  maxHeight?: number;
  styleLeft?: number;
  styleRight?: number;
  styleTop?: number;
  styleBottom?: number;
  classList: Set<string>;
};

interface Position {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

class MenuSurface extends React.Component<MenuSurfaceProps, MenuSurfaceState> {
  menuSurfaceElement: React.RefObject<HTMLDivElement> = React.createRef();
  previousFocus: HTMLElement | null = null;
  foundation: MDCMenuSurfaceFoundation;
  handleWindowClick?: EventListener;
  registerWindowClickListener?: () => void;
  deregisterWindowClickListener?: () => void;
  firstFocusableElement: HTMLElement | null = null;
  lastFocusableElement: HTMLElement | null = null;

  state: MenuSurfaceState = {
    transformOrigin: '',
    maxHeight: undefined,
    styleLeft: undefined,
    styleRight: undefined,
    styleTop: undefined,
    styleBottom: undefined,
    classList: new Set(),
  };

  static defaultProps: Partial<MenuSurfaceProps> = {
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
    const {
      anchorCorner,
      anchorMargin,
      coordinates,
      fixed,
      open,
      quickOpen,
    } = this.props;
    this.handleWindowClick = (evt) => this.foundation.handleBodyClick(evt);
    this.registerWindowClickListener = () =>
      window.addEventListener('click', this.handleWindowClick!);
    this.deregisterWindowClickListener = () =>
      window.removeEventListener('click', this.handleWindowClick!);
    this.foundation = new MDCMenuSurfaceFoundation(this.adapter);
    this.foundation.init();
    this.hoistToBody();
    this.foundation.setFixedPosition(fixed);
    if (coordinates) {
      this.setCoordinates();
    }
    if (anchorCorner) {
      this.foundation.setAnchorCorner(anchorCorner);
    }
    if (anchorMargin) {
      this.foundation.setAnchorMargin(anchorMargin);
    }
    if (quickOpen) {
      this.foundation.setQuickOpen(quickOpen);
    }
    if (open) {
      this.open_();
    }
  }

  componentDidUpdate(prevProps: MenuSurfaceProps) {
    if (this.props.open !== prevProps.open) {
      this.open_();
    }
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setCoordinates();
    }
    if (this.props.anchorCorner !== prevProps.anchorCorner) {
      this.foundation.setAnchorCorner(this.props.anchorCorner);
    }
    if (this.props.anchorMargin !== prevProps.anchorMargin) {
      this.foundation.setAnchorMargin(this.props.anchorMargin);
    }
    if (this.props.quickOpen !== prevProps.quickOpen) {
      this.foundation.setQuickOpen(this.props.quickOpen);
    }
  }

  componentWillUnmount() {
    if (this.deregisterWindowClickListener) {
      this.deregisterWindowClickListener();
    }
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  private hoistToBody(): void {
    // this deviates from the mdc web version.
    // here we force the menu to hoist, and require either
    // this.props.(x,y) or this.props.anchorElement.
    const menuSurfaceElement = this.menuSurfaceElement.current;
    if (!menuSurfaceElement) return;
    if (!menuSurfaceElement.parentElement) return;
    document.body.appendChild(
      menuSurfaceElement.parentElement.removeChild(menuSurfaceElement)
    );
    this.foundation.setIsHoisted(true);
  }

  private setCoordinates(): void {
    if (!this.props.coordinates) return;
    const {x, y} = this.props.coordinates;
    this.foundation.setAbsolutePosition(x, y);
  }

  get classes(): string {
    const {fixed, className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-menu-surface', Array.from(classList), className, {
      'mdc-menu-surface--fixed': fixed,
    });
  }

  get styles(): React.CSSProperties {
    const {
      styleLeft,
      styleRight,
      styleTop,
      styleBottom,
      transformOrigin,
      maxHeight,
    } = this.state;
    return Object.assign({}, this.props.styles, {
      transformOrigin,
      maxHeight,
      left: styleLeft,
      right: styleRight,
      top: styleTop,
      bottom: styleBottom,
    });
  }

  get adapter(): MDCMenuSurfaceAdapter {
    const focusAdapterMethods = {
      isFocused: () =>
        this.menuSurfaceElement &&
        document.activeElement === this.menuSurfaceElement.current,
      saveFocus: () => {
        this.previousFocus = document.activeElement as HTMLElement | null;
      },
      restoreFocus: () => {
        const element = this.menuSurfaceElement;
        if (!element) return;
        if (!element.current) return;
        if (!element.current.contains(document.activeElement)) return;
        if (!this.previousFocus) return;
        if (!this.previousFocus.focus) return;
        this.previousFocus.focus();
      },
      isFirstElementFocused: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement === document.activeElement,
      isLastElementFocused: () =>
        this.lastFocusableElement &&
        this.lastFocusableElement === document.activeElement,
      focusFirstElement: () =>
        this.firstFocusableElement &&
        this.firstFocusableElement.focus &&
        this.firstFocusableElement.focus(),
      focusLastElement: () =>
        this.lastFocusableElement &&
        this.lastFocusableElement.focus &&
        this.lastFocusableElement.focus(),
    };

    const dimensionAdapterMethods = {
      getInnerDimensions: () => {
        const element = this.menuSurfaceElement.current;
        if (!element) return;
        return {width: element.offsetWidth, height: element.offsetHeight};
      },
      getAnchorDimensions: () =>
        this.props.anchorElement &&
        this.props.anchorElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return {width: window.innerWidth, height: window.innerHeight};
      },
      getBodyDimensions: () => {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        };
      },
      getWindowScroll: () => {
        return {x: window.pageXOffset, y: window.pageYOffset};
      },
      setPosition: (position: Position) => {
        this.setState((prevState) => Object.assign(prevState, {
          styleLeft: 'left' in position ? position.left : null,
          styleRight: 'right' in position ? position.right : null,
          styleTop: 'top' in position ? position.top : null,
          styleBottom: 'bottom' in position ? position.bottom : null,
        }));
      },
      setMaxHeight: (maxHeight: number) => this.setState({maxHeight}),
    };

    return Object.assign(
      {
        addClass: (className: string) => {
          const classList = new Set(this.state.classList);
          classList.add(className);
          this.setState({classList});
        },
        removeClass: (className: string) => {
          const classList = new Set(this.state.classList);
          classList.delete(className);
          this.setState({classList});
        },
        hasClass: (className: string) => this.classes.split(' ').includes(className),
        hasAnchor: () => !!this.props.anchorElement,
        notifyOpen: () => {
          if (this.registerWindowClickListener) {
            this.registerWindowClickListener();
          }
          this.props.onOpen!();
        },
        notifyClose: () => {
          if (this.deregisterWindowClickListener) {
            this.deregisterWindowClickListener();
          }
          this.props.onClose!();
        },
        isElementInContainer: (el: HTMLElement) => {
          if (!this.menuSurfaceElement.current) return false;
          if (this.menuSurfaceElement.current === el) {
            return true;
          }
          return this.menuSurfaceElement.current.contains(el);
        },
        isRtl: () => {
          if (!this.menuSurfaceElement) return false;
          if (!this.menuSurfaceElement.current) return false;
          return window
            .getComputedStyle(this.menuSurfaceElement.current)
            .getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: (transformOrigin: string) => this.setState({transformOrigin}),
      },
      focusAdapterMethods,
      dimensionAdapterMethods
    );
  }

  open_ = (): void => {
    if (this.props.open) {
      if (!this.menuSurfaceElement.current) return;
      const focusableElements = this.menuSurfaceElement.current.querySelectorAll(
        MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
      );
      this.firstFocusableElement =
        focusableElements.length > 0 ? focusableElements[0] : null;
      this.lastFocusableElement =
        focusableElements.length > 0
          ? focusableElements[focusableElements.length - 1]
          : null;
      this.foundation.open();
    } else {
      this.foundation.close();
    }
  };

  handleKeydown = (evt: React.KeyboardEvent) => {
    this.props.onKeyDown!(evt);
    this.foundation.handleKeydown(evt);
  };

  render() {
    const {
      /* eslint-disable */
      anchorCorner,
      anchorElement,
      anchorMargin,
      className,
      coordinates,
      fixed,
      onClose,
      onOpen,
      onKeyDown,
      styles,
      quickOpen,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;
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

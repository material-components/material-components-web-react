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
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {MDCMenuSurfaceFoundation} from '@material/menu-surface/foundation';
import {MDCMenuSurfaceAdapter} from '@material/menu-surface/adapter';
import {Corner} from '@material/menu-surface/index';
import {MDCMenuDistance} from '@material/menu-surface/types';

export interface MenuSurfaceProps extends React.HTMLProps<HTMLDivElement> {
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
  onMount?: (isMounted: boolean) => void;
  quickOpen?: boolean;
  open?: boolean;
  fixed?: boolean;
}

export interface MenuSurfaceState {
  transformOrigin: string;
  maxHeight?: string;
  styleLeft?: number;
  styleRight?: number;
  styleTop?: number;
  styleBottom?: number;
  classList: Set<string>;
  mounted: boolean;
}

class MenuSurface extends React.Component<MenuSurfaceProps, MenuSurfaceState> {
  menuSurfaceElement: React.RefObject<HTMLDivElement> = React.createRef();
  previousFocus: HTMLElement | null = null;
  foundation!: MDCMenuSurfaceFoundation;
  handleWindowClick?: (e: MouseEvent) => void;
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
    mounted: false,
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
      quickOpen,
    } = this.props;
    this.handleWindowClick = (evt: MouseEvent) =>
      this.foundation.handleBodyClick(evt);
    this.registerWindowClickListener = () =>
      window.addEventListener('click', this.handleWindowClick!);
    this.deregisterWindowClickListener = () =>
      window.removeEventListener('click', this.handleWindowClick!);
    this.foundation = new MDCMenuSurfaceFoundation(this.adapter);
    this.foundation.init();
    // this deviates from the mdc web version.
    // here we force the menu to hoist, and require either
    // this.props.(x,y) or this.props.anchorElement.
    this.foundation.setIsHoisted(true);
    this.foundation.setFixedPosition(fixed!);
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
    this.setState({mounted: true});
  }

  componentDidUpdate(prevProps: MenuSurfaceProps, prevState: MenuSurfaceState) {
    // if this.props.open was true for the initial render
    // then it will not be changed but the mounted state will be,
    // so this.open_() should also be called in that case.
    if (
      this.props.open !== prevProps.open ||
      (this.props.open && this.state.mounted !== prevState.mounted)
    ) {
      this.open_();
    }
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setCoordinates();
    }
    if (this.props.anchorCorner !== prevProps.anchorCorner) {
      this.foundation.setAnchorCorner(this.props.anchorCorner!);
    }
    if (this.props.anchorMargin !== prevProps.anchorMargin) {
      this.foundation.setAnchorMargin(this.props.anchorMargin!);
    }
    if (this.props.quickOpen !== prevProps.quickOpen) {
      this.foundation.setQuickOpen(this.props.quickOpen!);
    }
    if (this.state.mounted !== prevState.mounted) {
      this.props.onMount && this.props.onMount(this.state.mounted);
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
        this.firstFocusableElement === document.activeElement,
      isLastElementFocused: () =>
        this.lastFocusableElement === document.activeElement,
      focusFirstElement: () => {
        if (!this.firstFocusableElement) return false;
        return (
          this.firstFocusableElement.focus && this.firstFocusableElement.focus()
        );
      },
      focusLastElement: () =>
        this.lastFocusableElement &&
        this.lastFocusableElement.focus &&
        this.lastFocusableElement.focus(),
    };

    const dimensionAdapterMethods = {
      getInnerDimensions: () => {
        const element = this.menuSurfaceElement.current;
        if (!element) return {width: 0, height: 0};
        return {width: element.offsetWidth, height: element.offsetHeight};
      },
      getAnchorDimensions: () => {
        if (!this.props.anchorElement) return null;
        return this.props.anchorElement.getBoundingClientRect();
      },
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
      setPosition: (position: Partial<MDCMenuDistance>) => {
        this.setState((prevState) =>
          Object.assign(prevState, {
            styleLeft: 'left' in position ? position.left : null,
            styleRight: 'right' in position ? position.right : null,
            styleTop: 'top' in position ? position.top : null,
            styleBottom: 'bottom' in position ? position.bottom : null,
          })
        );
      },
      setMaxHeight: (maxHeight: string) => this.setState({maxHeight}),
    };

    return {
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
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      hasAnchor: () => !!this.props.anchorElement,
      notifyOpen: () => {
        this.handleOpen();
        this.props.onOpen!();
      },
      notifyClose: () => {
        this.handleClose();
        this.props.onClose!();
      },
      isElementInContainer: (el: HTMLElement) => {
        if (!this.menuSurfaceElement.current) return false;
        return this.menuSurfaceElement.current.contains(el);
      },
      isRtl: () => {
        if (!this.menuSurfaceElement) return false;
        if (!this.menuSurfaceElement.current) return false;
        return (
          window
            .getComputedStyle(this.menuSurfaceElement.current)
            .getPropertyValue('direction') === 'rtl'
        );
      },
      setTransformOrigin: (transformOrigin: string) =>
        this.setState({transformOrigin}),
      ...focusAdapterMethods,
      ...dimensionAdapterMethods,
    };
  }

  open_ = (): void => {
    if (this.props.open) {
      if (!this.menuSurfaceElement.current) return;
      const focusableElements = this.menuSurfaceElement.current.querySelectorAll(
        MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
      );
      this.firstFocusableElement =
        focusableElements.length > 0
          ? (focusableElements[0] as HTMLElement)
          : null;
      this.lastFocusableElement =
        focusableElements.length > 0
          ? (focusableElements[focusableElements.length - 1] as HTMLElement)
          : null;
      this.foundation.open();
    } else {
      this.foundation.close();
    }
  };

  handleKeydown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    this.props.onKeyDown!(evt);
    this.foundation.handleKeydown(evt.nativeEvent);
  };

  private handleOpen = () => {
    if (this.registerWindowClickListener) {
      this.registerWindowClickListener();
    }
  };

  private handleClose = () => {
    if (this.deregisterWindowClickListener) {
      this.deregisterWindowClickListener();
    }
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
      onMount,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;
    if (!this.state.mounted) return null;
    return ReactDOM.createPortal(
      <div
        className={this.classes}
        onKeyDown={this.handleKeydown}
        ref={this.menuSurfaceElement}
        style={this.styles}
        {...otherProps}
      >
        {children}
      </div>,
      document.body
    );
  }
}

export default MenuSurface;
export {Corner};

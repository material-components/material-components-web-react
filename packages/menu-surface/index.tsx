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
import * as React from "react";
import * as classnames from "classnames";
import { MDCMenuSurfaceFoundation, Corner } from "@material/menu-surface";

export interface MenuSurfaceProps {
  className: string,
  anchorElement: HTMLElement,
  anchorCorner: number,
  anchorMargin: object,
  styles: object,
  coordinates: {
    x?: number,
    y?: number
  },
  onClose: () => void,
  onOpen: () => void,
  onKeyDown: (event: React.KeyboardEvent) => void,
  quickOpen: boolean,
  open: boolean,
  fixed: boolean
};

type MenuSurfaceState = {
  transformOrigin: string,
  maxHeight?: number,
  styleLeft?: number,
  styleRight?: number,
  styleTop?: number,
  styleBottom?: number,
  classList: Set<string>
};

class MenuSurface extends React.Component<MenuSurfaceProps & React.HTMLProps<HTMLDivElement>, MenuSurfaceState> {
  menuSurfaceElement_: React.RefObject<HTMLDivElement> = React.createRef();
  previousFocus_: HTMLElement | null = null;
  foundation_: MDCMenuSurfaceFoundation;
  handleWindowClick_: EventListener;
  registerWindowClickListener_: () => void;
  deregisterWindowClickListener_: () => void;
  firstFocusableElement_: HTMLElement | null;
  lastFocusableElement_: HTMLElement | null;

  state = {
    transformOrigin: "",
    maxHeight: undefined,
    styleLeft: undefined,
    styleRight: undefined,
    styleTop: undefined,
    styleBottom: undefined,
    classList: new Set()
  };

  static defaultProps = {
    className: "",
    styles: {},
    anchorElement: undefined,
    anchorCorner: 0,
    anchorMargin: {},
    coordinates: {},
    onClose: () => {},
    onOpen: () => {},
    onKeyDown: () => {},
    quickOpen: false,
    open: false,
    fixed: false
  };

  componentDidMount() {
    const {
      anchorCorner,
      anchorMargin,
      coordinates,
      fixed,
      open,
      quickOpen
    } = this.props;
    this.handleWindowClick_ = evt => this.foundation_.handleBodyClick(evt);
    this.registerWindowClickListener_ = () =>
      window.addEventListener("click", this.handleWindowClick_);
    this.deregisterWindowClickListener_ = () =>
      window.removeEventListener("click", this.handleWindowClick_);
    this.foundation_ = new MDCMenuSurfaceFoundation(this.adapter);
    this.foundation_.init();
    this.hoistToBody();
    this.foundation_.setFixedPosition(fixed);
    if (coordinates) {
      this.setCoordinates();
    }
    if (anchorCorner) {
      this.foundation_.setAnchorCorner(anchorCorner);
    }
    if (anchorMargin) {
      this.foundation_.setAnchorMargin(anchorMargin);
    }
    if (quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    }
    if (open) {
      this.open_();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.open_();
    }
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setCoordinates();
    }
    if (this.props.anchorCorner !== prevProps.anchorCorner) {
      this.foundation_.setAnchorCorner(this.props.anchorCorner);
    }
    if (this.props.anchorMargin !== prevProps.anchorMargin) {
      this.foundation_.setAnchorMargin(this.props.anchorMargin);
    }
    if (this.props.quickOpen !== prevProps.quickOpen) {
      this.foundation_.setQuickOpen(this.props.quickOpen);
    }
  }

  componentWillUnmount() {
    this.deregisterWindowClickListener_();
    this.foundation_.destroy();
  }

  hoistToBody() {
    // this deviates from the mdc web version.
    // here we force the menu to hoist, and require either
    // this.props.(x,y) or this.props.anchorElement.
    const menuSurfaceElement = this.menuSurfaceElement_.current;
    if (!menuSurfaceElement) return;
    if (!menuSurfaceElement.parentElement) return;
    document.body.appendChild(
      menuSurfaceElement.parentElement.removeChild(menuSurfaceElement)
    );
    this.foundation_.setIsHoisted(true);
  }

  setCoordinates() {
    if (!this.props.coordinates) return;
    const { x, y } = this.props.coordinates;
    this.foundation_.setAbsolutePosition(x, y);
  }

  get classes() {
    const { fixed, className } = this.props;
    const { classList } = this.state;
    return classnames("mdc-menu-surface", Array.from(classList), className, {
      "mdc-menu-surface--fixed": fixed
    });
  }

  get styles() {
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
      bottom: styleBottom
    });
  }

  get adapter() {
    const focusAdapterMethods = {
      isFocused: () =>
        this.menuSurfaceElement_ &&
        document.activeElement === this.menuSurfaceElement_.current,
      saveFocus: () => {
        this.previousFocus_ = document.activeElement as HTMLElement | null;
      },
      restoreFocus: () => {
        const element = this.menuSurfaceElement_;
        if (!element) return;
        if (!element.current) return;
        if (!element.current.contains(document.activeElement)) return;
        if (!this.previousFocus_) return;
        if (!this.previousFocus_.focus) return;
        this.previousFocus_.focus();
      },
      isFirstElementFocused: () =>
        this.firstFocusableElement_ &&
        this.firstFocusableElement_ === document.activeElement,
      isLastElementFocused: () =>
        this.lastFocusableElement_ &&
        this.lastFocusableElement_ === document.activeElement,
      focusFirstElement: () =>
        this.firstFocusableElement_ &&
        this.firstFocusableElement_.focus &&
        this.firstFocusableElement_.focus(),
      focusLastElement: () =>
        this.lastFocusableElement_ &&
        this.lastFocusableElement_.focus &&
        this.lastFocusableElement_.focus()
    };

    const dimensionAdapterMethods = {
      getInnerDimensions: () => {
        const element = this.menuSurfaceElement_.current;
        if (!element) return;
        return { width: element.offsetWidth, height: element.offsetHeight };
      },
      getAnchorDimensions: () =>
        this.props.anchorElement &&
        this.props.anchorElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return { width: window.innerWidth, height: window.innerHeight };
      },
      getBodyDimensions: () => {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: () => {
        return { x: window.pageXOffset, y: window.pageYOffset };
      },
      setPosition: position => {
        this.setState({
          styleLeft: "left" in position ? position.left : null,
          styleRight: "right" in position ? position.right : null,
          styleTop: "top" in position ? position.top : null,
          styleBottom: "bottom" in position ? position.bottom : null
        });
      },
      setMaxHeight: maxHeight => this.setState({ maxHeight })
    };

    return Object.assign(
      {
        addClass: className => {
          const classList = new Set(this.state.classList);
          classList.add(className);
          this.setState({ classList });
        },
        removeClass: className => {
          const classList = new Set(this.state.classList);
          classList.delete(className);
          this.setState({ classList });
        },
        hasClass: className => this.classes.split(" ").includes(className),
        hasAnchor: () => !!this.props.anchorElement,
        notifyOpen: () => {
          this.registerWindowClickListener_();
          this.props.onOpen();
        },
        notifyClose: () => {
          this.deregisterWindowClickListener_();
          this.props.onClose();
        },
        isElementInContainer: (el) => {
          if (!this.menuSurfaceElement_.current) return false;
          if (this.menuSurfaceElement_.current === el) {
            return true;
          }
          return this.menuSurfaceElement_.current.contains(el);
        },
        isRtl: () => {
          if (!this.menuSurfaceElement_) return false;
          if (!this.menuSurfaceElement_.current) return false;
          return window
            .getComputedStyle(this.menuSurfaceElement_.current)
            .getPropertyValue("direction") === "rtl";
        },
        setTransformOrigin: transformOrigin => this.setState({ transformOrigin }),
      },
      focusAdapterMethods,
      dimensionAdapterMethods
    );
  }

  open_ = () => {
    if (this.props.open) {
      if (!this.menuSurfaceElement_.current) return;
      const focusableElements = this.menuSurfaceElement_.current.querySelectorAll(
        MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS
      );
      this.firstFocusableElement_ =
        focusableElements.length > 0 ? focusableElements[0] : null;
      this.lastFocusableElement_ =
        focusableElements.length > 0
          ? focusableElements[focusableElements.length - 1]
          : null;
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  };

  handleKeydown = evt => {
    this.props.onKeyDown(evt);
    this.foundation_.handleKeydown(evt);
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
        ref={this.menuSurfaceElement_}
        style={this.styles}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

export default MenuSurface;
export { Corner };

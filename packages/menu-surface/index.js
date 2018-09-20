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
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCMenuSurfaceFoundation, Corner} from '@material/menu-surface';

class MenuSurface extends React.Component {

  menuSurfaceElement_ = React.createRef();
  previousFocus_ = null;
  foundation_ = null;

  state = {
    transformOrigin: '',
    maxHeight: '',
    styleLeft: null,
    styleRight: null,
    styleTop: null,
    styleBottom: null,
    classList: new Set(),
  };

  componentDidMount() {
    const {anchorCorner, anchorMargin, coordinates, fixed, open, quickOpen} = this.props;
    this.handleWindowClick_ = (evt) => this.foundation_.handleBodyClick(evt);

    this.registerWindowClickListener_ = () => window.addEventListener('click', this.handleWindowClick_);
    this.deregisterWindowClickListener_ = () => window.removeEventListener('click', this.handleWindowClick_);

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
    // this deviatees from the mdc web version.
    // here we force the menu to hoist, and require either
    // this.props.(x,y) or this.props.anchorElement.
    document.body.appendChild(this.menuSurfaceElement_.current.parentElement.removeChild(this.menuSurfaceElement_.current));
    this.foundation_.setIsHoisted(true);
  }

  setCoordinates() {
    if (!this.props.coordinates) return;
    const {x, y} = this.props.coordinates;
    this.foundation_.setAbsolutePosition(x, y);
  }

  get classes() {
    const {fixed} = this.props;
    const {classList} = this.state;
    return classnames('mdc-menu-surface', Array.from(classList), {
      'mdc-menu-surface--fixed': fixed,
    });
  }

  get styles() {
    const {styleLeft, styleRight, styleTop, styleBottom, transformOrigin, maxHeight} = this.state;
    return Object.assign({}, this.props.styles, {
      transformOrigin,
      maxHeight,
      left: styleLeft,
      right: styleRight,
      top: styleTop,
      bottom: styleBottom,
    });
  }

  get adapter() {

    const focusAdapterMethods = {
      isFocused: () => document.activeElement === this.menuSurfaceElement_ && this.menuSurfaceElement_.current,
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        if (this.menuSurfaceElement_ && this.menuSurfaceElement_.current.contains(document.activeElement)) {
          if (this.previousFocus_ && this.previousFocus_.focus) {
            this.previousFocus_.focus();
          }
        }
      },
      isFirstElementFocused: () =>
        this.firstFocusableElement_ && this.firstFocusableElement_ === document.activeElement,
      isLastElementFocused: () =>
        this.lastFocusableElement_ && this.lastFocusableElement_ === document.activeElement,
      focusFirstElement: () =>
        this.firstFocusableElement_ && this.firstFocusableElement_.focus && this.firstFocusableElement_.focus(),
      focusLastElement: () =>
        this.lastFocusableElement_ && this.lastFocusableElement_.focus && this.lastFocusableElement_.focus(),
    };

    const dimensionAdapterMethods = {
      getInnerDimensions: () => {
        if (!this.menuSurfaceElement_) return;
        const element = this.menuSurfaceElement_.current;
        return {width: element.offsetWidth, height: element.offsetHeight};
      },
      getAnchorDimensions: () => this.props.anchorElement && this.props.anchorElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return {width: window.innerWidth, height: window.innerHeight};
      },
      getBodyDimensions: () => {
        return {width: document.body.clientWidth, height: document.body.clientHeight};
      },
      getWindowScroll: () => {
        return {x: window.pageXOffset, y: window.pageYOffset};
      },
      setPosition: (position) => {
        this.setState({
          styleLeft: 'left' in position ? position.left : null,
          styleRight: 'right' in position ? position.right : null,
          styleTop: 'top' in position ? position.top : null,
          styleBottom: 'bottom' in position ? position.bottom : null,
        });
      },
      setMaxHeight: (maxHeight) => this.setState({maxHeight}),
    };

    return Object.assign({
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      notifyOpen: this.registerWindowClickListener_,
      notifyClose: () => {
        this.deregisterWindowClickListener_();
        this.props.onClose();
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      hasAnchor: () => !!this.props.anchorElement,
      isElementInContainer: (el) => this.menuSurfaceElement_
        && this.menuSurfaceElement_.current === el || this.menuSurfaceElement_.current.contains(el),
      isRtl: () => this.menuSurfaceElement_ && window.getComputedStyle(this.menuSurfaceElement_.current).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: (transformOrigin) => this.setState({transformOrigin}),
    }, focusAdapterMethods, dimensionAdapterMethods);
  }

  open_() {
    if (this.props.open) {
      const focusableElements = this.menuSurfaceElement_.current.querySelectorAll(MDCMenuSurfaceFoundation.strings.FOCUSABLE_ELEMENTS);
      this.firstFocusableElement_ = focusableElements.length > 0 ? focusableElements[0] : null;
      this.lastFocusableElement_ = focusableElements.length > 0 ?
        focusableElements[focusableElements.length - 1] : null;
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  handleKeyDown(evt) {
    this.props.onKeyDown(evt);
    this.foundation_.handleKeydown(evt);
  }

  render() {
    const {
      /* eslint-disable */
      className,
      styles,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onKeyDown={this.handleKeyDown}
        ref={this.menuSurfaceElement_}
        style={this.styles}
      >
        {children}
      </div>
    );
  }
}

MenuSurface.propTypes = {
  className: PropTypes.string,
  anchorElement: PropTypes.object,
  styles: PropTypes.object,
  coordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onClose: PropTypes.func,
};

MenuSurface.defaultProps = {
  className: '',
  styles: {},
  anchorElement: null,
  coordinates: null,
  onClose: () => {},
};

export default MenuSurface;
export {
  Corner,
};

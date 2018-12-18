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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCRippleFoundation, util} from '@material/ripple/dist/mdc.ripple';
/* TODO: remove when converting from JSX to TSX */
/* eslint-disable */

const withRipple = (WrappedComponent) => {
  class RippledComponent extends Component {
    foundation_ = null;

    isMounted_ = true;

    state = {
      classList: new Set(),
      style: {},
    };

    componentDidMount() {
      if (!this.foundation_) {
        throw new Error('You must call initRipple from the element\'s ' +
          'ref prop to initialize the adapter for withRipple');
      }
    }

    componentWillUnmount() {
      if (this.foundation_) {
        this.isMounted_ = false;
        this.foundation_.destroy();
      }
    }

    // surface: This element receives the visual treatment (classes and style) of the ripple.
    // activator: This element is used to detect whether to activate the ripple. If this is not
    // provided, the ripple surface will be used to detect activation.
    initializeFoundation_ = (surface, activator) => {
      const adapter = this.createAdapter_(surface, activator);
      this.foundation_ = new MDCRippleFoundation(adapter);
      this.foundation_.init();
    }

    createAdapter_ = (surface, activator) => {
      const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

      return {
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => this.props.unbounded,
        isSurfaceActive: () => activator ? activator[MATCHES](':active') : surface[MATCHES](':active'),
        isSurfaceDisabled: () => this.props.disabled,
        addClass: (className) => {
          if (!this.isMounted_) {
            return;
          }
          this.setState({classList: this.state.classList.add(className)});
        },
        removeClass: (className) => {
          if (!this.isMounted_) {
            return;
          }

          const {classList} = this.state;
          classList.delete(className);
          this.setState({classList});
        },
        registerDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.addEventListener(evtType, handler, util.applyPassive()),
        deregisterDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.removeEventListener(evtType, handler, util.applyPassive()),
        registerResizeHandler: (handler) => window.addEventListener('resize', handler),
        deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        computeBoundingRect: () => {
          if (!this.isMounted_) {
            // need to return object since foundation expects it
            return {};
          }
          if (this.props.computeBoundingRect) {
            return this.props.computeBoundingRect(surface);
          }
          return surface.getBoundingClientRect();
        },
        getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
      };
    }

    handleFocus = (e) => {
      this.props.onFocus(e);
      this.foundation_.handleFocus();
    }

    handleBlur = (e) => {
      this.props.onBlur(e);
      this.foundation_.handleBlur();
    }

    handleMouseDown = (e) => {
      this.props.onMouseDown(e);
      this.activateRipple(e);
    }

    handleMouseUp = (e) => {
      this.props.onMouseUp(e);
      this.deactivateRipple(e);
    }

    handleTouchStart = (e) => {
      this.props.onTouchStart(e);
      this.activateRipple(e);
    }

    handleTouchEnd = (e) => {
      this.props.onTouchEnd(e);
      this.deactivateRipple(e);
    }

    handleKeyDown = (e) => {
      this.props.onKeyDown(e);
      this.activateRipple(e);
    }

    handleKeyUp = (e) => {
      this.props.onKeyUp(e);
      this.deactivateRipple(e);
    }

    activateRipple = (e) => {
      // https://reactjs.org/docs/events.html#event-pooling
      e.persist();
      requestAnimationFrame(() => {
        this.foundation_.activate(e);
      });
    }

    deactivateRipple = (e) => {
      this.foundation_.deactivate(e);
    }

    updateCssVariable = (varName, value) => {
      if (!this.isMounted_) {
        return;
      }

      const updatedStyle = Object.assign({}, this.state.style);
      updatedStyle[varName] = value;
      this.setState({style: updatedStyle});
    }

    get classes() {
      const {className: wrappedComponentClasses} = this.props;
      const {classList} = this.state;
      return classnames(Array.from(classList), wrappedComponentClasses);
    }

    get style() {
      const {style: wrappedStyle} = this.props;
      const {style} = this.state;
      return Object.assign({}, style, wrappedStyle);
    }

    render() {
      const {
        /* start black list of otherprops */
        /* eslint-disable */
        unbounded,
        style,
        className,
        onMouseDown,
        onMouseUp,
        onTouchStart,
        onTouchEnd,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        /* eslint-enable */
        /* end black list of otherprops */
        ...otherProps
      } = this.props;

      const updatedProps = Object.assign(otherProps, {
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        // call initRipple on ref on root element that needs ripple
        initRipple: this.initializeFoundation_,
        className: this.classes,
        style: this.style,
      });

      return <WrappedComponent {...updatedProps} />;
    }
  }

  WrappedComponent.propTypes = Object.assign({
    unbounded: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }, WrappedComponent.propTypes);

  WrappedComponent.defaultProps = Object.assign({
    unbounded: false,
    disabled: false,
    style: {},
    className: '',
    onMouseDown: () => {},
    onMouseUp: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  }, WrappedComponent.defaultProps);

  RippledComponent.propTypes = WrappedComponent.propTypes;
  RippledComponent.defaultProps = WrappedComponent.defaultProps;
  RippledComponent.displayName = `WithRipple(${getDisplayName(WrappedComponent)})`;

  return RippledComponent;
};

/* eslint-enable */

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withRipple;

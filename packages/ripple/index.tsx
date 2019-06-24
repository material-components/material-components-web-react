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
import {Subtract} from 'utility-types'; // eslint-disable-line @typescript-eslint/no-unused-vars

import {MDCRippleFoundation} from '@material/ripple/foundation';
import {MDCRippleAdapter} from '@material/ripple/adapter';
import {supportsCssVariables, applyPassive} from '@material/ripple/util';
import {EventType, SpecificEventListener} from '@material/base/types';
import {matches} from '@material/dom/ponyfill';

export interface RippledComponentProps<T> {
  unbounded?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: React.MouseEventHandler<T>;
  onMouseUp?: React.MouseEventHandler<T>;
  onTouchStart?: React.TouchEventHandler<T>;
  onTouchEnd?: React.TouchEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  computeBoundingRect?: (surface: T) => ClientRect;
}

export interface RippledComponentState {
  classList: Set<string>;
  style: React.CSSProperties;
}

// props to be injected by this HOC.
export interface InjectedProps<S, A = Element>
  extends RippledComponentProps<S> {
  initRipple?:
    | React.Ref<S>
    | ((surface: S | null, activator?: A | null) => void);
}

type ActivateEventTypes<S> =
  | React.MouseEvent<S>
  | React.TouchEvent<S>
  | React.KeyboardEvent<S>
  | React.FocusEvent<S>;

export interface RippledComponentInterface<Surface, Activator = Element> {
  foundation?: MDCRippleFoundation;
  isComponentMounted: boolean;
  isTouched: boolean;
  initializeFoundation: (surface: Surface, activator?: Activator) => void;
  handleFocus: React.FocusEventHandler<Surface>;
  handleBlur: React.FocusEventHandler<Surface>;
  handleMouseDown: React.MouseEventHandler<Surface>;
  handleMouseUp: React.MouseEventHandler<Surface>;
  handleTouchStart: React.TouchEventHandler<Surface>;
  handleTouchEnd: React.TouchEventHandler<Surface>;
  handleKeyDown: React.KeyboardEventHandler<Surface>;
  handleKeyUp: React.KeyboardEventHandler<Surface>;
  activateRipple: (e: ActivateEventTypes<Surface>) => void;
  deactivateRipple: () => void;
  classes: string;
  style: React.CSSProperties;
  displayName: string;
  createAdapter: (surface: Surface, activator?: Activator) => MDCRippleAdapter;
  updateCssVariable: (varName: string, value: string | null) => void;
  componentDidMount: () => void;
  componentWillUnmount: () => void;
  render: () => JSX.Element;
}

// This is an HOC that adds Ripple to the component passed as an argument
export function withRipple<
  P extends InjectedProps<Surface, Activator>,
  Surface extends Element = Element,
  Activator extends Element = Element
>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<
  Subtract<P, InjectedProps<Surface, Activator>> &
    RippledComponentProps<Surface>
> {
  return class RippledComponent
    extends React.Component<
      // Subtract removes any props "InjectedProps" if they are on "P"
      // This allows the developer to override any props
      // https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
      Subtract<P, InjectedProps<Surface, Activator>> &
        RippledComponentProps<Surface>,
      RippledComponentState
    >
    implements RippledComponentInterface<Surface, Activator> {
    foundation!: MDCRippleFoundation;
    isComponentMounted: boolean = true;
    isTouched: boolean = false;

    displayName = `WithRipple(${getDisplayName<P>(WrappedComponent)})`;

    state: RippledComponentState = {
      classList: new Set(),
      style: {},
    };

    static defaultProps: Partial<RippledComponentProps<HTMLElement>> = {
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
      ...WrappedComponent.defaultProps,
    };

    componentDidMount() {
      if (!this.foundation) {
        throw new Error(
          "You must call initRipple from the element's " +
            'ref prop to initialize the adapter for withRipple'
        );
      }
    }

    componentDidUpdate(prevProps: P) {
      if (this.props.disabled !== prevProps.disabled && this.props.disabled) {
        this.foundation.handleBlur();
      }
    }

    componentWillUnmount() {
      if (this.foundation) {
        this.isComponentMounted = false;
        this.foundation.destroy();
      }
    }

    // surface: This element receives the visual treatment (classes and style) of the ripple.
    // activator: This element is used to detect whether to activate the ripple. If this is not
    // provided, the ripple surface will be used to detect activation.
    initializeFoundation = (surface: Surface, activator?: Activator) => {
      const adapter = this.createAdapter(surface, activator);
      this.foundation = new MDCRippleFoundation(adapter);
      this.foundation.init();
    };

    createAdapter = (
      surface: Surface,
      activator?: Activator
    ): MDCRippleAdapter => {
      return {
        browserSupportsCssVars: () => supportsCssVariables(window),
        isUnbounded: () => this.props.unbounded! as boolean,
        isSurfaceActive: () => {
          if (activator) {
            return matches(activator, ':active');
          }

          return matches(surface, ':active');
        },
        isSurfaceDisabled: () => this.props.disabled as boolean,
        addClass: (className: string) => {
          if (!this.isComponentMounted) {
            return;
          }
          this.setState({classList: this.state.classList.add(className)});
        },
        removeClass: (className: string) => {
          if (!this.isComponentMounted) {
            return;
          }
          const {classList} = this.state;
          classList.delete(className);
          this.setState({classList});
        },
        registerDocumentInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) =>
          document.documentElement.addEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        deregisterDocumentInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) =>
          document.documentElement.removeEventListener(
            evtType,
            handler,
            applyPassive()
          ),
        registerResizeHandler: (handler: SpecificEventListener<'resize'>) =>
          window.addEventListener('resize', handler),
        deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) =>
          window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        computeBoundingRect: () => {
          if (!this.isComponentMounted) {
            // need to return object since foundation expects it
            // new DOMRect is not IE11 compatible
            const defaultDOMRect = {
              bottom: 0,
              height: 0,
              left: 0,
              right: 0,
              top: 0,
              width: 0,
              x: 0,
              y: 0,
            };
            return defaultDOMRect;
          }
          if (this.props.computeBoundingRect) {
            return this.props.computeBoundingRect(surface);
          }
          return surface.getBoundingClientRect();
        },
        containsEventTarget: (target: EventTarget | null) => {
          if (activator && target !== null) {
            return activator.contains(target as Node);
          }
          return false;
        },
        registerInteractionHandler: () => null,
        deregisterInteractionHandler: () => null,
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset,
        }),
      };
    };

    handleFocus = (e: React.FocusEvent<Surface>) => {
      this.props.onFocus && this.props.onFocus(e);
      this.foundation.handleFocus();
    };

    handleBlur = (e: React.FocusEvent<Surface>) => {
      this.props.onBlur && this.props.onBlur(e);
      this.foundation.handleBlur();
    };

    handleMouseDown = (e: React.MouseEvent<Surface>) => {
      this.props.onMouseDown && this.props.onMouseDown(e);
      if (!this.isTouched) {
        this.activateRipple(e);
      } else {
        this.isTouched = false;
      }
    };

    handleMouseUp = (e: React.MouseEvent<Surface>) => {
      this.props.onMouseUp && this.props.onMouseUp(e);
      this.deactivateRipple();
    };

    handleTouchStart = (e: React.TouchEvent<Surface>) => {
      this.isTouched = true;
      this.props.onTouchStart && this.props.onTouchStart(e);
      this.activateRipple(e);
    };

    handleTouchEnd = (e: React.TouchEvent<Surface>) => {
      this.props.onTouchEnd && this.props.onTouchEnd(e);
      this.deactivateRipple();
    };

    handleKeyDown = (e: React.KeyboardEvent<Surface>) => {
      this.props.onKeyDown && this.props.onKeyDown(e);
      this.activateRipple(e);
    };

    handleKeyUp = (e: React.KeyboardEvent<Surface>) => {
      this.props.onKeyUp && this.props.onKeyUp(e);
      this.deactivateRipple();
    };

    activateRipple = (e: ActivateEventTypes<Surface>) => {
      // https://reactjs.org/docs/events.html#event-pooling
      e.persist();
      this.foundation.activate(e.nativeEvent);
    };

    deactivateRipple = () => {
      this.foundation.deactivate();
    };

    updateCssVariable = (varName: string, value: string | null) => {
      if (!this.isComponentMounted) {
        return;
      }
      this.setState((prevState) => {
        const updatedStyle = Object.assign(
          {},
          this.state.style,
          prevState.style
        ) as React.CSSProperties;
        if (value === null) {
          delete updatedStyle[varName as keyof React.CSSProperties];
        } else {
          // @ts-ignore CSS values now strongly typed
          updatedStyle[varName as keyof React.CSSProperties] = value;
        }

        return Object.assign(prevState, {
          style: updatedStyle,
        });
      });
    };

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
        ...otherProps
      } = this.props as P;

      const updatedProps = {
        ...otherProps,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        initRipple: this.initializeFoundation,
        className: this.classes,
        style: this.style,
      };

      return (
        // this issue is only appearing in TS v3.2.x. I am not seeing this issue appear in v2.9.1
        // @ts-ignore
        <WrappedComponent {...updatedProps} />
      );
    }
    // there is explicit type provided for the return value of withRipple function
    // without type "any" typescript raises an error
    // The inferred type of ... cannot be named without a reference ...
  } as any;
}

function getDisplayName<P extends {}>(
  WrappedComponent: React.ComponentType<P>
): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

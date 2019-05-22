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
import {MDCTabScrollerFoundation} from '@material/tab-scroller/foundation';
import {MDCTabScrollerAdapter} from '@material/tab-scroller/adapter';
import {computeHorizontalScrollbarHeight} from '@material/tab-scroller/util';
import {matches} from '@material/dom/ponyfill';

const convertDashToCamelCase = (propName: string) =>
  propName.replace(/-(\w)/g, (_, v) => v.toUpperCase());

export interface TabScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  alignStart?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  className?: string;
}

interface TabScrollerState {
  classList: Set<string>;
  areaClassList: Set<string>;
  scrollAreaStyleProperty: React.CSSProperties;
  scrollContentStyleProperty: React.CSSProperties;
}

type ScrollerElementNames =
  | 'scrollAreaStyleProperty'
  | 'scrollContentStyleProperty';

export default class TabScroller extends React.Component<
  TabScrollerProps,
  TabScrollerState
> {
  areaElement: React.RefObject<HTMLDivElement> = React.createRef();
  contentElement: React.RefObject<HTMLDivElement> = React.createRef();
  foundation!: MDCTabScrollerFoundation;

  state: TabScrollerState = {
    classList: new Set(),
    areaClassList: new Set(),
    scrollAreaStyleProperty: {},
    scrollContentStyleProperty: {},
  };

  static defaultProps: Partial<TabScrollerProps> = {
    alignStart: false,
    alignEnd: false,
    alignCenter: false,
    className: '',
    children: null,
    onWheel: () => {},
    onTouchStart: () => {},
    onPointerDown: () => {},
    onMouseDown: () => {},
    onKeyDown: () => {},
    onTransitionEnd: () => {},
  };

  componentDidMount() {
    this.foundation = new MDCTabScrollerFoundation(this.adapter);
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get classes() {
    const {alignStart, alignEnd, alignCenter, className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-tab-scroller', Array.from(classList), className, {
      'mdc-tab-scroller--align-start': alignStart,
      'mdc-tab-scroller--align-end': alignEnd,
      'mdc-tab-scroller--align-center': alignCenter,
    });
  }

  setStyleToElement = (
    prop: string,
    value: string | boolean,
    elementStyleProperty: ScrollerElementNames
  ) => {
    const styleName = convertDashToCamelCase(prop);
    const updateElementStyleProperty = Object.assign(
      {},
      this.state[elementStyleProperty],
      {[styleName]: value}
    );
    this.setState((prevState) => {
      return Object.assign(prevState, {
        [elementStyleProperty]: updateElementStyleProperty,
      });
    });
  };

  get adapter(): MDCTabScrollerAdapter {
    return {
      eventTargetMatchesSelector: (
        evtTarget: HTMLDivElement,
        selector: string
      ) => {
        if (selector) {
          return matches(evtTarget, selector);
        }
        return false;
      },
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
      addScrollAreaClass: (className: string) => {
        const areaClassList = new Set(this.state.areaClassList);
        areaClassList.add(className);
        this.setState({areaClassList});
      },
      setScrollAreaStyleProperty: (prop: string, value: string) =>
        this.setStyleToElement(prop, value, 'scrollAreaStyleProperty'),
      setScrollContentStyleProperty: (prop: string, value: string) =>
        this.setStyleToElement(prop, value, 'scrollContentStyleProperty'),
      getScrollContentStyleValue: (propName: string) =>
        this.contentElement.current
          ? window
              .getComputedStyle(this.contentElement.current)
              .getPropertyValue(propName)
          : '',
      setScrollAreaScrollLeft: (scrollX: number) => {
        if (!this.areaElement.current) return;
        this.areaElement.current.scrollLeft = scrollX;
      },
      getScrollAreaScrollLeft: () =>
        this.areaElement.current ? this.areaElement.current.scrollLeft : 0,
      getScrollContentOffsetWidth: this.getScrollContentWidth,
      getScrollAreaOffsetWidth: () =>
        this.areaElement.current ? this.areaElement.current.offsetWidth : 0,
      computeScrollAreaClientRect: () => {
        return this.getBoundingClientRectOf(this.contentElement.current);
      },
      computeScrollContentClientRect: () => {
        return this.getBoundingClientRectOf(this.contentElement.current);
      },
      computeHorizontalScrollbarHeight: () =>
        computeHorizontalScrollbarHeight(document),
    };
  }

  getBoundingClientRectOf = (element: HTMLElement | null) => {
    if (!element) {
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
    return element.getBoundingClientRect();
  };

  getScrollPosition = () => {
    return this.foundation.getScrollPosition();
  };

  // needs to be public class method for react tab-bar
  getScrollContentWidth = () => {
    return this.contentElement.current
      ? this.contentElement.current.offsetWidth
      : 0;
  };

  incrementScroll = (scrollXIncrement: number) => {
    this.foundation.incrementScroll(scrollXIncrement);
  };

  scrollTo = (scrollX: number) => {
    this.foundation.scrollTo(scrollX);
  };

  handleWheel_ = (evt: React.WheelEvent<HTMLDivElement>) => {
    this.props.onWheel && this.props.onWheel(evt);
    this.foundation.handleInteraction();
  };

  handleTouchStart_ = (evt: React.TouchEvent<HTMLDivElement>) => {
    this.props.onTouchStart && this.props.onTouchStart(evt);
    this.foundation.handleInteraction();
  };

  handlePointerDown_ = (evt: React.PointerEvent<HTMLDivElement>) => {
    this.props.onPointerDown && this.props.onPointerDown(evt);
    this.foundation.handleInteraction();
  };

  handleMouseDown_ = (evt: React.MouseEvent<HTMLDivElement>) => {
    this.props.onMouseDown && this.props.onMouseDown(evt);
    this.foundation.handleInteraction();
  };

  handleKeyDown_ = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleInteraction();
  };

  handleTransitionEnd_ = (evt: React.TransitionEvent<HTMLDivElement>) => {
    this.props.onTransitionEnd && this.props.onTransitionEnd(evt);
    this.foundation.handleTransitionEnd(evt.nativeEvent);
  };

  render() {
    const {
      areaClassList,
      scrollAreaStyleProperty,
      scrollContentStyleProperty,
    } = this.state;
    const {
      children,
      /* eslint-disable */
      alignStart,
      alignEnd,
      alignCenter,
      className,
      onWheel,
      onTouchStart,
      onPointerDown,
      onMouseDown,
      onKeyDown,
      onTransitionEnd,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    const areaClasses = classnames(
      'mdc-tab-scroller__scroll-area',
      Array.from(areaClassList)
    );

    return (
      <div
        className={this.classes}
        onWheel={this.handleWheel_}
        onTouchStart={this.handleTouchStart_}
        onPointerDown={this.handlePointerDown_}
        onMouseDown={this.handleMouseDown_}
        onKeyDown={this.handleKeyDown_}
        onTransitionEnd={this.handleTransitionEnd_}
        {...otherProps}
      >
        <div
          className={areaClasses}
          style={scrollAreaStyleProperty}
          ref={this.areaElement}
        >
          <div
            className='mdc-tab-scroller__scroll-content'
            style={scrollContentStyleProperty}
            ref={this.contentElement}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

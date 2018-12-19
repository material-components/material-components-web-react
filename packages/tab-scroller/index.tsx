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
import {
  MDCTabScrollerFoundation,
  util,
// No mdc .d.ts files
// @ts-ignore
} from '@material/tab-scroller/dist/mdc.tabScroller';

const convertDashToCamelCase = (propName: string) =>
  propName.replace(/-(\w)/g, (_, v) => v.toUpperCase());

interface TabScrollerProps extends React.HTMLProps<HTMLDivElement> {
  alignStart?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  className?: string;
};

interface TabScrollerState {
  classList: Set<string>;
  areaClassList: Set<string>;
  scrollAreaStyleProperty: React.CSSProperties;
  scrollContentStyleProperty: React.CSSProperties;
};

type ScrollerElementNames = 'scrollAreaStyleProperty' | 'scrollContentStyleProperty';

const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

function isElement(element: any): element is Element {
  return element[MATCHES as 'matches'] !== undefined;
}

export default class TabScroller extends React.Component<
  TabScrollerProps,
  TabScrollerState
  > {
  areaElement_: React.RefObject<HTMLDivElement> = React.createRef();
  contentElement_: React.RefObject<HTMLDivElement> = React.createRef();
  foundation_?: MDCTabScrollerFoundation;

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
    this.foundation_ = new MDCTabScrollerFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
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
    prop: string, value: string | boolean, elementStyleProperty: ScrollerElementNames
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

  get adapter() {
    return {
      eventTargetMatchesSelector: (evtTarget: HTMLDivElement, selector: string) => {
        if (selector && isElement(evtTarget)) {
          return evtTarget[MATCHES as 'matches'](selector);
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
        this.contentElement_.current &&
        window
          .getComputedStyle(this.contentElement_.current)
          .getPropertyValue(propName),
      setScrollAreaScrollLeft: (scrollX: number) => {
        if (!this.areaElement_.current) return;
        this.areaElement_.current.scrollLeft = scrollX;
      },
      getScrollAreaScrollLeft: () =>
        this.areaElement_.current && this.areaElement_.current.scrollLeft,
      getScrollContentOffsetWidth: this.getScrollContentWidth,
      getScrollAreaOffsetWidth: () =>
        this.areaElement_.current && this.areaElement_.current.offsetWidth,
      computeScrollAreaClientRect: () =>
        this.areaElement_.current &&
        this.areaElement_.current.getBoundingClientRect(),
      computeScrollContentClientRect: () =>
        this.contentElement_.current &&
        this.contentElement_.current.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () =>
        util.computeHorizontalScrollbarHeight(document),
    };
  }

  getScrollPosition = () => {
    return this.foundation_.getScrollPosition();
  };

  // needs to be public class method for react tab-bar
  getScrollContentWidth = () => {
    return (
      this.contentElement_.current && this.contentElement_.current.offsetWidth
    );
  };

  incrementScroll = (scrollXIncrement: number) => {
    this.foundation_.incrementScroll(scrollXIncrement);
  };

  scrollTo = (scrollX: number) => {
    this.foundation_.scrollTo(scrollX);
  };

  handleWheel_ = (evt: React.WheelEvent<HTMLDivElement>) => {
    this.props.onWheel && this.props.onWheel(evt);
    this.foundation_.handleInteraction(evt);
  };

  handleTouchStart_ = (evt: React.TouchEvent<HTMLDivElement>) => {
    this.props.onTouchStart && this.props.onTouchStart(evt);
    this.foundation_.handleInteraction(evt);
  };

  handlePointerDown_ = (evt: React.PointerEvent<HTMLDivElement>) => {
    this.props.onPointerDown && this.props.onPointerDown(evt);
    this.foundation_.handleInteraction(evt);
  };

  handleMouseDown_ = (evt: React.MouseEvent<HTMLDivElement>) => {
    this.props.onMouseDown && this.props.onMouseDown(evt);
    this.foundation_.handleInteraction(evt);
  };

  handleKeyDown_ = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation_.handleInteraction(evt);
  };

  handleTransitionEnd_ = (evt: React.TransitionEvent<HTMLDivElement>) => {
    this.props.onTransitionEnd && this.props.onTransitionEnd(evt);
    this.foundation_.handleTransitionEnd(evt);
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
          ref={this.areaElement_}
        >
          <div
            className='mdc-tab-scroller__scroll-content'
            style={scrollContentStyleProperty}
            ref={this.contentElement_}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}


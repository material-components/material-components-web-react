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

import TabIndicator from '@material/react-tab-indicator';
import {MDCTabFoundation} from '@material/tab/foundation';
import {MDCTabAdapter} from '@material/tab/adapter';

import TabRipple, {TabRippleProps} from './TabRipple';

export interface TabProps
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  active?: boolean;
  focusOnActivate?: boolean;
  isFadingIndicator?: boolean;
  indicatorContent?: React.ReactNode;
  minWidth?: boolean;
  isMinWidthIndicator?: boolean;
  stacked?: boolean;
  tag?: 'button' | 'a';
  previousIndicatorClientRect?: ClientRect;
  onInteraction?: () => void;
}

interface MDCTabElementAttributes {
  'aria-selected'?: 'false' | 'true';
  tabIndex?: number;
}

interface TabState extends MDCTabElementAttributes {
  classList: Set<string>;
  activateIndicator: boolean;
  previousIndicatorClientRect?: ClientRect;
}

export default class Tab extends React.Component<TabProps, TabState> {
  foundation!: MDCTabFoundation;
  tabRef: React.RefObject<HTMLButtonElement> = React.createRef();
  tabContentRef: React.RefObject<HTMLSpanElement> = React.createRef();
  tabIndicatorRef: React.RefObject<TabIndicator> = React.createRef();
  tabRippleRef: React.RefObject<TabRipple> = React.createRef();

  static defaultProps: Partial<TabProps> = {
    active: false,
    focusOnActivate: true,
    className: '',
    isFadingIndicator: false,
    indicatorContent: null,
    minWidth: false,
    isMinWidthIndicator: false,
    stacked: false,
    tag: 'button',
    onInteraction: () => null,
  };

  state: TabState = {
    classList: new Set(),
    'aria-selected': 'false',
    activateIndicator: false,
    previousIndicatorClientRect: this.props.previousIndicatorClientRect,
    tabIndex: -1,
  };

  componentDidMount() {
    const {active, focusOnActivate} = this.props;
    this.foundation = new MDCTabFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setFocusOnActivate(focusOnActivate!);
    if (active) {
      this.foundation.activate();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: TabProps) {
    const {active, focusOnActivate, previousIndicatorClientRect} = this.props;
    if (focusOnActivate !== prevProps.focusOnActivate) {
      this.foundation.setFocusOnActivate(focusOnActivate!);
    }
    if (active !== prevProps.active) {
      if (active) {
        // If active state is updated through props, previousIndicatorClientRect must also be passed through props
        this.activate(previousIndicatorClientRect);
      } else {
        this.deactivate();
      }
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className, minWidth, stacked} = this.props;
    return classnames('mdc-tab', Array.from(classList), className, {
      'mdc-tab--min-width': minWidth,
      'mdc-tab--stacked': stacked,
    });
  }

  get adapter(): MDCTabAdapter {
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
      setAttr: (
        attr: keyof MDCTabElementAttributes,
        value?: string | boolean
      ) => this.setState((prevState) => ({...prevState, [attr]: value})),
      getOffsetLeft: () =>
        Number(this.tabRef.current && this.tabRef.current.offsetLeft),
      getOffsetWidth: () =>
        Number(this.tabRef.current && this.tabRef.current.offsetWidth),
      getContentOffsetLeft: () =>
        this.tabContentRef.current ? this.tabContentRef.current.offsetLeft : 0,
      getContentOffsetWidth: () =>
        this.tabContentRef.current ? this.tabContentRef.current.offsetWidth : 0,
      focus: () => this.tabRef.current && this.tabRef.current.focus(),
      notifyInteracted: this.props.onInteraction!,
      activateIndicator: (previousIndicatorClientRect: ClientRect) =>
        this.setState({
          activateIndicator: true,
          previousIndicatorClientRect,
        }),
      deactivateIndicator: () => this.setState({activateIndicator: false}),
    };
  }

  activate(computeIndicatorClientRect?: ClientRect) {
    this.foundation.activate(computeIndicatorClientRect);
  }

  deactivate() {
    this.foundation.deactivate();
  }

  computeIndicatorClientRect = () => {
    if (!this.tabIndicatorRef.current) return {} as ClientRect;
    return this.tabIndicatorRef.current.computeContentClientRect();
  };

  computeDimensions = () => {
    return this.foundation.computeDimensions();
  };

  focus = () => {
    this.tabRef.current && this.tabRef.current.focus();
  };

  onFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.tabRippleRef.current && this.tabRippleRef.current.handleFocus(e);
  };

  onBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    this.tabRippleRef.current && this.tabRippleRef.current.handleBlur(e);
  };

  render() {
    const {
      /* eslint-disable */
      active,
      focusOnActivate,
      previousIndicatorClientRect,
      className,
      isFadingIndicator,
      indicatorContent,
      minWidth,
      onInteraction,
      stacked,
      tag: Tag,
      /* eslint-enable */
      children,
      isMinWidthIndicator,
      ...otherProps
    } = this.props;
    const {tabIndex, ['aria-selected']: ariaSelected} = this.state;

    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag
        className={this.classes}
        role='tab'
        aria-selected={ariaSelected}
        tabIndex={tabIndex}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={this.tabRef}
        {...otherProps}
      >
        <span className='mdc-tab__content' ref={this.tabContentRef}>
          {children}
          {isMinWidthIndicator ? this.renderIndicator() : null}
        </span>
        {isMinWidthIndicator ? null : this.renderIndicator()}
        <TabRipple ref={this.tabRippleRef} />
      </Tag>
    );
  }

  renderIndicator() {
    const {isFadingIndicator, indicatorContent} = this.props;
    const {activateIndicator, previousIndicatorClientRect} = this.state;
    return (
      <TabIndicator
        icon={!!indicatorContent}
        fade={isFadingIndicator}
        active={activateIndicator}
        previousIndicatorClientRect={previousIndicatorClientRect}
        ref={this.tabIndicatorRef}
      >
        {indicatorContent}
      </TabIndicator>
    );
  }
}

export {TabRipple, Tab, TabRippleProps};

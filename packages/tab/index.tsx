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
import * as classnames from 'classnames';
import TabIndicator from '@material/react-tab-indicator';
// No mdc .d.ts files
// @ts-ignore
import {MDCTabFoundation} from '@material/tab/dist/mdc.tab';
import TabRipple, {TabRippleProps} from './TabRipple';

export {
  TabRipple,
  Tab,
  TabRippleProps,
};

export interface TabProps extends React.HTMLProps<HTMLButtonElement> {
  active?: boolean;
  className?: string;
  isFadingIndicator?: boolean;
  indicatorContent?: React.ReactNode;
  minWidth?: boolean;
  isMinWidthIndicator?: boolean;
  stacked?: boolean;
  previousIndicatorClientRect?: ClientRect;
}

interface TabAttributes {
  'aria-selected': boolean;
  tabIndex?: number;
}

interface TabState extends TabAttributes {
  classList: Set<string>;
  activateIndicator: boolean;
  previousIndicatorClientRect?: ClientRect;
}

export default class Tab extends React.Component<TabProps, TabState> {
  foundation?: MDCTabFoundation;
  tabElement: React.RefObject<HTMLButtonElement> = React.createRef();
  tabContentElement: React.RefObject<HTMLSpanElement> = React.createRef();
  tabIndicator: React.RefObject<TabIndicator> = React.createRef();
  tabRipple: React.RefObject<TabRipple> = React.createRef();

  static defaultProps: Partial<TabProps> = {
    active: false,
    className: '',
    isFadingIndicator: false,
    indicatorContent: null,
    minWidth: false,
    isMinWidthIndicator: false,
    stacked: false,
  };

  state: TabState = {
    'classList': new Set(),
    'aria-selected': false,
    'activateIndicator': false,
    'previousIndicatorClientRect': this.props.previousIndicatorClientRect,
  };

  componentDidMount() {
    this.foundation = new MDCTabFoundation(this.adapter);
    this.foundation.init();
    if (this.props.active) {
      this.foundation.activate();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: TabProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        // If active state is updated through props, previousIndicatorClientRect must also be passed through props
        this.activate(this.props.previousIndicatorClientRect);
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

  get adapter() {
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
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      setAttr: (attr: keyof TabAttributes, value?: string | boolean) => (
        this.setState((prevState) => ({...prevState, [attr]: value}))
      ),
      getOffsetLeft: () =>
        Number(this.tabElement.current && this.tabElement.current.offsetLeft),
      getOffsetWidth: () =>
        Number(this.tabElement.current && this.tabElement.current.offsetWidth),
      getContentOffsetLeft: () =>
        this.tabContentElement.current &&
        this.tabContentElement.current.offsetLeft,
      getContentOffsetWidth: () =>
        this.tabContentElement.current &&
        this.tabContentElement.current.offsetWidth,
      focus: () => this.tabElement.current && this.tabElement.current.focus(),
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
    if (!this.tabIndicator.current) return;
    return this.tabIndicator.current.computeContentClientRect();
  };

  computeDimensions = () => {
    return this.foundation.computeDimensions();
  };

  focus = () => {
    this.tabElement.current && this.tabElement.current.focus();
  };

  onFocus = (e: React.FocusEvent) => {
    if (this.tabRipple.current) {
      // https://github.com/material-components/material-components-web-react/issues/528
      // TODO: switch when ripple is converted to TSX
      // @ts-ignore
      this.tabRipple.current.handleFocus(e);
    }
  }

  onBlur = (e: React.FocusEvent) => {
    this.tabRipple.current && this.tabRipple.current.handleBlur(e);
  }

  render() {
    const {
      /* eslint-disable */
      active,
      previousIndicatorClientRect,
      className,
      isFadingIndicator,
      indicatorContent,
      minWidth,
      stacked,
      /* eslint-enable */
      children,
      isMinWidthIndicator,
      ...otherProps
    } = this.props;
    const {
      tabIndex,
      ['aria-selected']: ariaSelected,
    } = this.state;

    return (
      <button
        className={this.classes}
        role='tab'
        aria-selected={ariaSelected}
        tabIndex={tabIndex}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={this.tabElement}
        {...otherProps}
      >
        <span className='mdc-tab__content' ref={this.tabContentElement}>
          {children}
          {isMinWidthIndicator ? this.renderIndicator() : null}
        </span>
        {isMinWidthIndicator ? null : this.renderIndicator()}
        <TabRipple ref={this.tabRipple} />
      </button>
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
        ref={this.tabIndicator}
      >
        {indicatorContent}
      </TabIndicator>
    );
  }
}

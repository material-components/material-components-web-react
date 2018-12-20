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
// TODO: Come back and use .d.ts file
// @ts-ignore
import TabIndicator from '@material/react-tab-indicator';
// No mdc .d.ts files
// @ts-ignore
import {MDCTabFoundation} from '@material/tab/dist/mdc.tab';
import TabRipple, {TabRippleBase} from './TabRipple';

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

// https://github.com/material-components/material-components-web-react/issues/528
// TODO: switch when ripple is converted to TSX
function isElementTabRipple(element: any): element is TabRippleBase {
  return !!element;
}

export default class Tab extends React.Component<TabProps, TabState> {
  foundation_?: MDCTabFoundation;
  tabElement_: React.RefObject<HTMLButtonElement> = React.createRef();
  tabContentElement_: React.RefObject<HTMLSpanElement> = React.createRef();
  tabIndicator_: React.RefObject<TabIndicator> = React.createRef();
  // https://github.com/material-components/material-components-web-react/issues/528
  // TODO: switch when ripple is converted to TSX
  tabRipple_: React.RefObject<TabRippleBase> = React.createRef();

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
    this.foundation_ = new MDCTabFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.active) {
      this.foundation_.activate();
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
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
        Number(this.tabElement_.current && this.tabElement_.current.offsetLeft),
      getOffsetWidth: () =>
        Number(this.tabElement_.current && this.tabElement_.current.offsetWidth),
      getContentOffsetLeft: () =>
        this.tabContentElement_.current &&
        this.tabContentElement_.current.offsetLeft,
      getContentOffsetWidth: () =>
        this.tabContentElement_.current &&
        this.tabContentElement_.current.offsetWidth,
      focus: () => this.tabElement_.current && this.tabElement_.current.focus(),
      activateIndicator: (previousIndicatorClientRect: ClientRect) =>
        this.setState({
          activateIndicator: true,
          previousIndicatorClientRect,
        }),
      deactivateIndicator: () => this.setState({activateIndicator: false}),
    };
  }

  activate(computeIndicatorClientRect?: ClientRect) {
    this.foundation_.activate(computeIndicatorClientRect);
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  computeIndicatorClientRect = () => {
    if (!this.tabIndicator_.current) return;
    return this.tabIndicator_.current.computeContentClientRect();
  };

  computeDimensions = () => {
    return this.foundation_.computeDimensions();
  };

  focus = () => {
    this.tabElement_.current && this.tabElement_.current.focus();
  };

  onFocus = (e: React.FocusEvent) => {
    if (this.tabRipple_.current) {
      // https://github.com/material-components/material-components-web-react/issues/528
      // TODO: switch when ripple is converted to TSX
      // @ts-ignore
      this.tabRipple_.current.handleFocus(e);
    }
  }

  onBlur = (e: React.FocusEvent) => {
    if (isElementTabRipple(this.tabRipple_.current)) {
      // https://github.com/material-components/material-components-web-react/issues/528
      // TODO: switch when ripple is converted to TSX
      // @ts-ignore
      this.tabRipple_.current.handleBlur(e);
    }
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
        ref={this.tabElement_}
        {...otherProps}
      >
        <span className='mdc-tab__content' ref={this.tabContentElement_}>
          {children}
          {isMinWidthIndicator ? this.renderIndicator() : null}
        </span>
        {isMinWidthIndicator ? null : this.renderIndicator()}
        <TabRipple ref={this.tabRipple_} />
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
        ref={this.tabIndicator_}
      >
        {indicatorContent}
      </TabIndicator>
    );
  }
}

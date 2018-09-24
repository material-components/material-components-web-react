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

import TabIndicator from '@material/react-tab-indicator';
import {MDCTabFoundation} from '@material/tab/dist/mdc.tab';

import TabRipple from './TabRipple';

export default class Tab extends Component {
  foundation_ = null;
  tabElement_ = React.createRef();
  tabContentElement_ = React.createRef();
  tabIndicator_ = React.createRef();
  tabRipple_ = React.createRef();

  state = {
    'classList': new Set(),
    'aria-selected': undefined,
    'tabIndex': undefined,
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

  componentDidUpdate(prevProps) {
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
      hasClass: (className) => this.classes.split(' ').includes(className),
      setAttr: (attr, value) => this.setState({[attr]: value}),
      getOffsetLeft: () => this.tabElement_.current && this.tabElement_.current.offsetLeft,
      getOffsetWidth: () => this.tabElement_.current && this.tabElement_.current.offsetWidth,
      getContentOffsetLeft: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetLeft,
      getContentOffsetWidth: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetWidth,
      focus: () => this.tabElement_.current && this.tabElement_.current.focus(),
      activateIndicator: (previousIndicatorClientRect) => this.setState({
        activateIndicator: true,
        previousIndicatorClientRect,
      }),
      deactivateIndicator: () => this.setState({activateIndicator: false}),
      // computeIndicatorClientRect is redundant in mdc-tab and is going to be
      // removed in another release
    };
  }

  activate(computeIndicatorClientRect) {
    this.foundation_.activate(computeIndicatorClientRect);
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  computeIndicatorClientRect = () => {
    if (!this.tabIndicator_.current) return;
    return this.tabIndicator_.current.computeContentClientRect();
  }

  computeDimensions = () => {
    return this.foundation_.computeDimensions();
  }

  focus = () => {
    this.tabElement_.current && this.tabElement_.current.focus();
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
        onFocus={(e) => this.tabRipple_.current.handleFocus(e)}
        onBlur={(e) => this.tabRipple_.current.handleBlur(e)}
        ref={this.tabElement_}
        {...otherProps}
      >
        <span
          className='mdc-tab__content'
          ref={this.tabContentElement_}
        >
          {children}
          {isMinWidthIndicator ? this.renderIndicator() : null}
        </span>
        {isMinWidthIndicator ? null : this.renderIndicator()}
        <TabRipple ref={this.tabRipple_} />
      </button>
    );
  }

  renderIndicator() {
    const {
      isFadingIndicator,
      indicatorContent,
    } = this.props;

    const {
      activateIndicator,
      previousIndicatorClientRect,
    } = this.state;

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

Tab.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  isFadingIndicator: PropTypes.bool,
  indicatorContent: PropTypes.element,
  minWidth: PropTypes.bool,
  isMinWidthIndicator: PropTypes.bool,
  stacked: PropTypes.bool,
  previousIndicatorClientRect: PropTypes.object,
};

Tab.defaultProps = {
  active: false,
  className: '',
  isFadingIndicator: false,
  indicatorContent: null,
  minWidth: false,
  isMinWidthIndicator: false,
  stacked: false,
  previousIndicatorClientRect: {},
};

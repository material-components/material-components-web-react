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

import {MDCTabScrollerFoundation, util} from '@material/tab-scroller/dist/mdc.tabScroller';

const convertDashToCamelCase = (propName) => propName.replace(/-(\w)/g, (_, v) => v.toUpperCase());

export default class TabScroller extends Component {
  areaElement_ = React.createRef();
  contentElement_ = React.createRef();
  state = {
    classList: new Set(),
    areaClassList: new Set(),
    scrollAreaStyleProperty: {},
    scrollContentStyleProperty: {},
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

  setStyleToElement = (prop, value, elementStyleProperty) => {
    const styleName = convertDashToCamelCase(prop);
    const updateElementStyleProperty = Object.assign(
      this.state[elementStyleProperty],
      {[styleName]: value}
    );
    this.setState({[elementStyleProperty]: updateElementStyleProperty});
  }

  get adapter() {
    return {
      eventTargetMatchesSelector: (evtTarget, selector) => {
        const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
        return evtTarget[MATCHES](selector);
      },
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
      addScrollAreaClass: (className) => {
        const areaClassList = new Set(this.state.areaClassList);
        areaClassList.add(className);
        this.setState({areaClassList});
      },
      setScrollAreaStyleProperty: (prop, value) => this.setStyleToElement(prop, value, 'scrollAreaStyleProperty'),
      setScrollContentStyleProperty: (prop, value) => this.setStyleToElement(prop, value, 'scrollContentStyleProperty'),
      getScrollContentStyleValue: (propName) => this.contentElement_.current
        && window.getComputedStyle(this.contentElement_.current).getPropertyValue(propName),
      setScrollAreaScrollLeft: (scrollX) => {
        if (!this.areaElement_.current) return;
        this.areaElement_.current.scrollLeft = scrollX;
      },
      getScrollAreaScrollLeft: () => this.areaElement_.current && this.areaElement_.current.scrollLeft,
      getScrollContentOffsetWidth: this.getScrollContentWidth,
      getScrollAreaOffsetWidth: () => this.areaElement_.current && this.areaElement_.current.offsetWidth,
      computeScrollAreaClientRect: () => this.areaElement_.current && this.areaElement_.current.getBoundingClientRect(),
      computeScrollContentClientRect: () => this.contentElement_.current
        && this.contentElement_.current.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () => util.computeHorizontalScrollbarHeight(document),
    };
  }

  getScrollPosition = () => {
    return this.foundation_.getScrollPosition();
  }

  // needs to be public class method for react tab-bar
  getScrollContentWidth = () => {
    return this.contentElement_.current && this.contentElement_.current.offsetWidth;
  }

  incrementScroll = (scrollXIncrement) => {
    this.foundation_.incrementScroll(scrollXIncrement);
  }

  scrollTo = (scrollX) => {
    this.foundation_.scrollTo(scrollX);
  }

  handleWheel_ = (evt) => {
    this.props.onWheel(evt);
    this.foundation_.handleInteraction(evt);
  }

  handleTouchStart_ = (evt) => {
    this.props.onTouchStart(evt);
    this.foundation_.handleInteraction(evt);
  }

  handlePointerDown_ = (evt) => {
    this.props.onPointerDown(evt);
    this.foundation_.handleInteraction(evt);
  }

  handleMouseDown_ = (evt) => {
    this.props.onMouseDown(evt);
    this.foundation_.handleInteraction(evt);
  }

  handleKeyDown_ = (evt) => {
    this.props.onKeyDown(evt);
    this.foundation_.handleInteraction(evt);
  }

  handleTransitionEnd_ = (evt) => {
    this.props.onTransitionEnd(evt);
    this.foundation_.handleTransitionEnd(evt);
  }

  render() {
    const {areaClassList} = this.state;
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
    const areaClasses = classnames('mdc-tab-scroller__scroll-area', Array.from(areaClassList));

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
          ref={this.areaElement_}
        >
          <div
            className='mdc-tab-scroller__scroll-content'
            ref={this.contentElement_}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

TabScroller.propTypes = {
  alignStart: PropTypes.bool,
  alignEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onWheel: PropTypes.func,
  onTouchStart: PropTypes.func,
  onPointerDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onKeyDown: PropTypes.func,
  onTransitionEnd: PropTypes.func,
};

TabScroller.defaultProps = {
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

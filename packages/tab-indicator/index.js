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

import {
  MDCFadingTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation,
} from '@material/tab-indicator/dist/mdc.tabIndicator';

export default class TabIndicator extends Component {
  tabIndicatorElement_ = React.createRef();
  allowTransitionEnd_ = false;

  state = {
    classList: new Set(),
  };

  componentDidMount() {
    if (this.props.fade) {
      this.foundation_ = new MDCFadingTabIndicatorFoundation(this.adapter);
    } else {
      this.foundation_ = new MDCSlidingTabIndicatorFoundation(this.adapter);
    }
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
      this.allowTransitionEnd_ = true;
      if (this.props.active) {
        this.foundation_.activate(this.props.previousIndicatorClientRect);
      } else {
        this.foundation_.deactivate();
      }
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className, fade} = this.props;
    return classnames('mdc-tab-indicator', Array.from(classList), className, {
      'mdc-tab-indicator--fade': fade,
    });
  }

  get contentClasses() {
    const {icon} = this.props;
    return classnames('mdc-tab-indicator__content', {
      'mdc-tab-indicator__content--icon': icon,
      'mdc-tab-indicator__content--underline': !icon,
    });
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      computeContentClientRect: this.computeContentClientRect,
      // setContentStyleProperty was using setState, but due to the method's
      // async nature, its not condusive to the FLIP technique
      setContentStyleProperty: (prop, value) => {
        const contentElement = this.getNativeContentElement();
        if (!contentElement) return;
        contentElement.style[prop] = value;
      },
    };
  }

  getNativeContentElement = () => {
    if (!this.tabIndicatorElement_.current) return;
    // need to use getElementsByClassName since tabIndicator could be
    // a non-semantic element (span, i, etc.). This is a problem since refs to a non semantic elements
    // return the instance of the component.
    return this.tabIndicatorElement_.current.getElementsByClassName('mdc-tab-indicator__content')[0];
  }

  computeContentClientRect = () => {
    const contentElement = this.getNativeContentElement();
    if (!(contentElement && contentElement.getBoundingClientRect)) return;
    return contentElement.getBoundingClientRect();
  }

  render() {
    const {
      /* eslint-disable */
      active,
      children,
      className,
      fade,
      icon,
      onTransitionEnd,
      previousIndicatorClientRect,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <span
        className={this.classes}
        ref={this.tabIndicatorElement_}
        {...otherProps}
      >
        {this.renderContent()}
      </span>
    );
  }

  addContentClassesToChildren = () => {
    const child = React.Children.only(this.props.children);
    const className = classnames(child.props.className, this.contentClasses);
    const props = Object.assign({}, child.props, {className});
    return React.cloneElement(child, props);
  };

  renderContent() {
    if (this.props.children) {
      return this.addContentClassesToChildren();
    }
    return (
      <span className={this.contentClasses} />
    );
  }
}

TabIndicator.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
  fade: PropTypes.bool,
  icon: PropTypes.bool,
  previousIndicatorClientRect: PropTypes.object,
  onTransitionEnd: PropTypes.func,
};

TabIndicator.defaultProps = {
  active: false,
  className: '',
  children: null,
  fade: false,
  icon: false,
  previousIndicatorClientRect: {},
  onTransitionEnd: () => {},
};

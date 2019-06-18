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
import {MDCSlidingTabIndicatorFoundation} from '@material/tab-indicator/sliding-foundation';
import {MDCFadingTabIndicatorFoundation} from '@material/tab-indicator/fading-foundation';
import {MDCTabIndicatorAdapter} from '@material/tab-indicator/adapter';

export interface TabIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  className?: string;
  fade?: boolean;
  icon?: boolean;
  previousIndicatorClientRect?: ClientRect;
}

export default class TabIndicator extends React.Component<
  TabIndicatorProps,
  {}
> {
  private tabIndicatorElement: React.RefObject<
    HTMLSpanElement
  > = React.createRef();
  foundation!:
    | MDCFadingTabIndicatorFoundation
    | MDCSlidingTabIndicatorFoundation;

  static defaultProps: Partial<TabIndicatorProps> = {
    active: false,
    className: '',
    fade: false,
    icon: false,
  };

  componentDidMount() {
    if (this.props.fade) {
      this.foundation = new MDCFadingTabIndicatorFoundation(this.adapter);
    } else {
      this.foundation = new MDCSlidingTabIndicatorFoundation(this.adapter);
    }
    this.foundation.init();
    if (this.props.active) {
      this.foundation.activate();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: TabIndicatorProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        this.foundation.activate(this.props.previousIndicatorClientRect);
      } else {
        this.foundation.deactivate();
      }
    }
  }

  get classes() {
    const {className, fade} = this.props;
    return classnames('mdc-tab-indicator', className, {
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

  get adapter(): MDCTabIndicatorAdapter {
    return {
      addClass: (className: string) => {
        if (!this.tabIndicatorElement.current) return;
        // since the sliding indicator depends on the FLIP method,
        // our regular pattern of managing classes does not work here.
        // setState is async, which does not work well with the FLIP method
        // without a requestAnimationFrame, which was done in this PR:
        // https://github.com/material-components
        // /material-components-web/pull/3337/files#diff-683d792d28dad99754294121e1afbfb5L62
        this.tabIndicatorElement.current.classList.add(className);
        this.forceUpdate();
      },
      removeClass: (className: string) => {
        if (!this.tabIndicatorElement.current) return;
        this.tabIndicatorElement.current.classList.remove(className);
        this.forceUpdate();
      },
      computeContentClientRect: this.computeContentClientRect,
      // setContentStyleProperty was using setState, but due to the method's
      // async nature, its not condusive to the FLIP technique
      setContentStyleProperty: (prop: string, value: string) => {
        const contentElement = this.getNativeContentElement() as HTMLElement;
        // we need to cast prop from string (interface requirement) to CSSStyleDeclaration;
        const typedProp = prop as keyof CSSStyleDeclaration;
        // length and parentRule are readonly properties of CSSStyleDeclaration that
        // cannot be set
        if (
          !contentElement ||
          typedProp === 'length' ||
          typedProp === 'parentRule'
        ) {
          return;
        }
        // https://github.com/Microsoft/TypeScript/issues/11914
        contentElement.style[typedProp] = value;
      },
    };
  }

  private getNativeContentElement = () => {
    if (!this.tabIndicatorElement.current) return;
    // need to use getElementsByClassName since tabIndicator could be
    // a non-semantic element (span, i, etc.). This is a problem since refs to a non semantic elements
    // return the instance of the component.
    return this.tabIndicatorElement.current.getElementsByClassName(
      'mdc-tab-indicator__content'
    )[0];
  };

  computeContentClientRect = () => {
    const contentElement = this.getNativeContentElement();
    if (!(contentElement && contentElement.getBoundingClientRect)) {
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
    return contentElement.getBoundingClientRect();
  };

  render() {
    const {
      /* eslint-disable */
      active,
      children,
      className,
      fade,
      icon,
      previousIndicatorClientRect,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    return (
      <span
        className={this.classes}
        ref={this.tabIndicatorElement}
        {...otherProps}
      >
        {this.renderContent()}
      </span>
    );
  }

  addContentClassesToChildren = () => {
    const child = React.Children.only(
      this.props.children
    ) as React.ReactElement<any>;
    const className = classnames(child.props.className, this.contentClasses);
    const props = Object.assign({}, child.props, {className});
    return React.cloneElement(child, props);
  };

  renderContent() {
    if (this.props.children) {
      return this.addContentClassesToChildren();
    }
    return <span className={this.contentClasses} />;
  }
}

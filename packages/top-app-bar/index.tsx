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
import TopAppBarFixedAdjust, {TopAppbarFixedAdjustProps} from './FixedAdjust';
import {
  MDCFixedTopAppBarFoundation,
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
// no mdc .d.ts file
// @ts-ignore
} from '@material/top-app-bar/dist/mdc.topAppBar';

export type MDCTopAppBarFoundationTypes
  = MDCFixedTopAppBarFoundation | MDCTopAppBarFoundation | MDCShortTopAppBarFoundation;

export interface TopAppBarProps {
  actionItems?: React.ReactElement<any>[];
  className: string;
  dense: boolean;
  fixed: boolean;
  navigationIcon?: React.ReactElement<any>;
  prominent: boolean;
  short: boolean;
  shortCollapsed: boolean;
  style: React.CSSProperties;
  title: React.ReactNode;
}

interface TopAppBarState {
  classList: Set<string>;
  style: React.CSSProperties;
}

type Props = TopAppBarProps & React.HTMLProps<HTMLElement>;
export type VariantType = 'dense' | 'fixed' | 'prominent' | 'short' | 'shortCollapsed';
// function isElement(element: any): element is React.ReactElement<any> {
//   return typeof element !== 'string' ||
//   typeof element !== 'number' ||
//   typeof element !== 'boolean';
// }
export default class TopAppBar extends React.Component<
  Props,
  TopAppBarState
  > {
  topAppBarElement: React.RefObject<HTMLElement> = React.createRef();
  foundation?: MDCTopAppBarFoundationTypes;

  state: TopAppBarState = {
    classList: new Set(),
    style: {},
  };

  static defaultProps: Partial<Props> = {
    className: '',
    dense: false,
    fixed: false,
    prominent: false,
    short: false,
    shortCollapsed: false,
    style: {},
    title: '',
  };

  get classes() {
    const {classList} = this.state;
    const {
      className,
      dense,
      fixed,
      prominent,
      short,
      shortCollapsed,
    } = this.props;
    return classnames('mdc-top-app-bar', Array.from(classList), className, {
      'mdc-top-app-bar--fixed': fixed,
      'mdc-top-app-bar--short': shortCollapsed || short,
      'mdc-top-app-bar--short-collapsed': shortCollapsed,
      'mdc-top-app-bar--prominent': prominent,
      'mdc-top-app-bar--dense': dense,
    });
  }


  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: Props) {
    const foundationChanged = ['short', 'shortCollapsed', 'fixed'].some(
      (variant: string) => this.props[variant as VariantType] !== prevProps[variant as VariantType]
    );
    if (foundationChanged) {
      this.initializeFoundation();
    }
  }

  private initializeFoundation = () => {
    const {short, shortCollapsed, fixed} = this.props;
    if (this.foundation) {
      this.foundation.destroy();
    }
    if (short || shortCollapsed) {
      this.foundation = new MDCShortTopAppBarFoundation(this.adapter);
    } else if (fixed) {
      this.foundation = new MDCFixedTopAppBarFoundation(this.adapter);
    } else {
      this.foundation = new MDCTopAppBarFoundation(this.adapter);
    }
    this.foundation.init();
  };

  addClassesToElement(classes: string, element: React.ReactElement<any>) {
    const updatedProps = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, updatedProps);
  }

  getMergedStyles = () => {
    const {style} = this.state;
    return Object.assign({}, style, this.props.style);
  };

  get adapter() {
    const {actionItems} = this.props;
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      setStyle: (varName: keyof React.CSSProperties, value: string) => {
        const updatedStyle = Object.assign({}, this.state.style) as React.CSSProperties;
        updatedStyle[varName] = value;
        this.setState({style: updatedStyle});
      },
      getTopAppBarHeight: () => {
        if (this.topAppBarElement && this.topAppBarElement.current) {
          return this.topAppBarElement.current.clientHeight;
        }
        return 0;
      },
      registerScrollHandler: (handler: EventListener) =>
        window.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler: EventListener) =>
        window.removeEventListener('scroll', handler),
      getViewportScrollY: () => window.pageYOffset,
      getTotalActionItems: () => !!(actionItems && actionItems.length),
    };
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      actionItems,
      className,
      dense,
      fixed,
      title,
      navigationIcon,
      short,
      shortCollapsed,
      prominent,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <header
        {...otherProps}
        className={this.classes}
        style={this.getMergedStyles()}
        ref={this.topAppBarElement}
      >
        <div className='mdc-top-app-bar__row'>
          {this.renderTitleAndNavigationSection()}
          {this.renderActionItems()}
        </div>
      </header>
    );
  }

  renderTitleAndNavigationSection() {
    const {title} = this.props;
    const classes =
      'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';
    return (
      <section className={classes}>
        {this.renderNavigationIcon()}
        <span className='mdc-top-app-bar__title'>{title}</span>
      </section>
    );
  }

  renderNavigationIcon() {
    const {navigationIcon} = this.props;
    if (!navigationIcon) {
      return;
    }
    return this.addClassesToElement(
      'mdc-top-app-bar__navigation-icon',
      navigationIcon
    );
  }

  renderActionItems() {
    const {actionItems} = this.props;
    if (!actionItems) {
      return;
    }
    return (
      <section
        className='mdc-top-app-bar__section mdc-top-app-bar__section--align-end'
        role='toolbar'
      >
        {actionItems.map((item, key) => {
          const elementWithClasses = this.addClassesToElement(
            'mdc-top-app-bar__action-item',
            item
          );
          return React.cloneElement(elementWithClasses, {key});
        })}
      </section>
    );
  }
}

export {TopAppBarFixedAdjust, TopAppbarFixedAdjustProps};

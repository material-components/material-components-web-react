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
import TopAppBarFixedAdjust, {TopAppbarFixedAdjustProps} from './FixedAdjust';
import TopAppBarSection from './Section';
import TopAppBarRow from './Row';
import TopAppBarTitle from './Title';
import TopAppBarIcon from './Icon';
import {cssClasses} from './constants';
import {MDCFixedTopAppBarFoundation} from '@material/top-app-bar/fixed/foundation';
import {MDCTopAppBarAdapter} from '@material/top-app-bar/adapter';
import {MDCTopAppBarFoundation} from '@material/top-app-bar/standard/foundation';
import {MDCShortTopAppBarFoundation} from '@material/top-app-bar/short/foundation';
import {SpecificEventListener} from '@material/base/types';

export type MDCTopAppBarFoundationTypes
  = MDCFixedTopAppBarFoundation | MDCTopAppBarFoundation | MDCShortTopAppBarFoundation;

/**
 * @deprecated since 0.11.0. Will be deleted in 0.13.0
 */
interface DeprecatedProps {
  actionItems?: React.ReactElement<any>[];
  navigationIcon?: React.ReactElement<any>;
  title?: string;
}

export interface TopAppBarProps<T> extends React.HTMLProps<T>, DeprecatedProps {
  className?: string;
  dense?: boolean;
  fixed?: boolean;
  prominent?: boolean;
  short?: boolean;
  shortCollapsed?: boolean;
  style?: React.CSSProperties;
  scrollTarget?: React.RefObject<HTMLElement>;
  tag?: string;
  onNavIconClicked?: () => void;
}

interface TopAppBarState {
  classList: Set<string>;
  style: React.CSSProperties;
  scrollTarget?: React.RefObject<HTMLElement>;
}

export type VariantType = 'dense' | 'fixed' | 'prominent' | 'short' | 'shortCollapsed';

class TopAppBar<T extends HTMLElement = HTMLHeadingElement> extends React.Component<
  TopAppBarProps<T>,
  TopAppBarState
  > {
  topAppBarElement: React.RefObject<HTMLElement> = React.createRef();
  foundation!: MDCTopAppBarFoundationTypes;

  state: TopAppBarState = {
    classList: new Set(),
    style: {},
  };

  static defaultProps: Partial<TopAppBarProps<HTMLHeadingElement>> = {
    className: '',
    dense: false,
    fixed: false,
    prominent: false,
    short: false,
    shortCollapsed: false,
    style: {},
    tag: 'header',
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
    return classnames(cssClasses.BASE, Array.from(classList), className, {
      [cssClasses.FIXED]: fixed,
      [cssClasses.SHORT]: shortCollapsed || short,
      [cssClasses.SHORT_COLLAPSED]: shortCollapsed,
      [cssClasses.PROMINENT]: prominent,
      [cssClasses.DENSE]: dense,
    });
  }


  componentDidMount() {
    this.initializeFoundation();
    if (this.props.scrollTarget) {
      this.setState({scrollTarget: this.props.scrollTarget});
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: TopAppBarProps<T>, prevState: TopAppBarState) {
    const foundationChanged = ['short', 'shortCollapsed', 'fixed'].some(
      (variant: string) => this.props[variant as VariantType] !== prevProps[variant as VariantType]
    );
    if (foundationChanged) {
      // foundation.destroy() does not remove old variant className(s)
      this.setState({classList: new Set<string>()}, this.initializeFoundation);
    }

    if (prevProps.scrollTarget !== this.props.scrollTarget) {
      this.foundation.destroyScrollHandler();
      this.setState({scrollTarget: this.props.scrollTarget});
    }

    if (prevState.scrollTarget !== this.state.scrollTarget) {
      this.foundation.initScrollHandler();
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

  /**
   * @deprecated since 0.11.0. Will be deleted in 0.13.0
   */
  addClassesToElement/* istanbul ignore next */(classes: string, element: React.ReactElement<any>) {
    const updatedProps = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, updatedProps);
  }

  getMergedStyles = () => {
    const {style} = this.state;
    return Object.assign({}, style, this.props.style);
  };

  get adapter(): MDCTopAppBarAdapter {
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
      registerScrollHandler: (handler: SpecificEventListener<'scroll'>) => {
        if (this.state.scrollTarget && this.state.scrollTarget.current) {
          this.state.scrollTarget.current.addEventListener('scroll', handler);
        } else {
          window.addEventListener('scroll', handler);
        }
      },
      deregisterScrollHandler: (handler: SpecificEventListener<'scroll'>) => {
        if (this.state.scrollTarget && this.state.scrollTarget.current) {
          this.state.scrollTarget.current.removeEventListener('scroll', handler);
        } else {
          window.removeEventListener('scroll', handler);
        }
      },
      getViewportScrollY: () => {
        return (this.state.scrollTarget && this.state.scrollTarget.current)
          ? this.state.scrollTarget.current.scrollTop
          : window.pageYOffset;
      },
      getTotalActionItems: () => {
        if (this.topAppBarElement && this.topAppBarElement.current) {
          const actionItems = this.topAppBarElement.current.querySelectorAll(
            `.${cssClasses.ACTION_ITEM}`);
          return actionItems.length;
        }
        return 0;
      },
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) => {
        window.removeEventListener('resize', handler);
      },
      // onClick handler of navigation bar is used instead
      // see https://github.com/material-components/material-components-web/issues/2813
      registerNavigationIconInteractionHandler: () => null,
      deregisterNavigationIconInteractionHandler: () => null,
      notifyNavigationIconClicked: () => {
        if (this.props.onNavIconClicked) {
          this.props.onNavIconClicked();
        }
      },
    };
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      children,
      className,
      dense,
      fixed,
      short,
      shortCollapsed,
      prominent,
      scrollTarget,
      tag: Tag,
      actionItems,
      navigationIcon,
      title,
      ...otherProps
      /* eslint-enable no-unused-vars */
    } = this.props;

    /**
     * @deprecated since 0.11.0. Will be deleted in 0.13.0
     */
    /* istanbul ignore if */
    if (actionItems || navigationIcon || title) {
    // TODO(mgr34): remove all deprecated statements and istanbul ignore's for v0.13.0
      const warning = 'actionItems, navigationIcon, and title  are deprecated  ' +
      'since v0.11.0 and will be removed in v0.13.0. Please refer to ' +
      'https://github.com/material-components/material-components-web-react' +
      '/blob/master/packages/top-app-bar/README.md';
      console.warn(warning);
      return (
      // @ts-ignore Tag does not have any construct https://github.com/Microsoft/TypeScript/issues/28892
        <Tag
          {...otherProps}
          className={this.classes}
          style={this.getMergedStyles()}
          ref={this.topAppBarElement}
        >
          <div className='mdc-top-app-bar__row'>
            {this.renderTitleAndNavigationSection()}
            {this.renderActionItems()}
          </div>
        </Tag>
      );
    }

    return (
      // @ts-ignore Tag does not have any construct https://github.com/Microsoft/TypeScript/issues/28892
      <Tag
        {...otherProps}
        className={this.classes}
        style={this.getMergedStyles()}
        ref={this.topAppBarElement}
      >{children}</Tag>
    );
  }

  /**
   * @deprecated since 0.11.0. Will be deleted in 0.13.0
   */
  renderTitleAndNavigationSection/* istanbul ignore next */() {
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

  /**
   * @deprecated since 0.11.0. Will be deleted in 0.13.0
   */
  renderNavigationIcon/* istanbul ignore next */() {
    const {navigationIcon} = this.props;
    if (!navigationIcon) {
      return;
    }
    return this.addClassesToElement(
      'mdc-top-app-bar__navigation-icon',
      navigationIcon
    );
  }

  /**
   * @deprecated since 0.11.0. Will be deleted in 0.13.0
   */
  renderActionItems/* istanbul ignore next */() {
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

export default TopAppBar;

export {
  TopAppBarFixedAdjust,
  TopAppbarFixedAdjustProps,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
};

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
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TopAppBarFixedAdjust from './FixedAdjust';
import {
  MDCFixedTopAppBarFoundation,
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
} from '@material/top-app-bar/dist/mdc.topAppBar';

export default class TopAppBar extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  constructor(props) {
    super(props);
    this.topAppBarElement = React.createRef();
  }

  get classes() {
    const {classList} = this.state;
    const {
      className,
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
    });
  }

  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  initializeFoundation = () => {
    if (this.props.short) {
      this.foundation_ = new MDCShortTopAppBarFoundation(this.adapter);
    } else if (this.props.fixed) {
      this.foundation_ = new MDCFixedTopAppBarFoundation(this.adapter);
    } else {
      this.foundation_ = new MDCTopAppBarFoundation(this.adapter);
    }

    this.foundation_.init();
  }

  addClassesToElement(classes, element) {
    const updatedProps = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, updatedProps);
  }

  enableRippleOnElement(element) {
    // If `element` is a Native React Element, throw error to enforce
    // ripple
    if (typeof element.type === 'string') {
      const errorText = 'Material Design requires all Top App Bar Icons to ' +
        'have ripple. Please use @material/react-ripple HOC with your icons.';
      throw new Error(errorText);
    }

    return React.cloneElement(element, {hasRipple: true});
  }

  getMergedStyles = () => {
    const {style} = this.state;
    return Object.assign({}, style, this.props.style);
  }

  get adapter() {
    const {actionItems} = this.props;

    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      setStyle: (varName, value) => {
        const updatedStyle = Object.assign({}, this.state.style);
        updatedStyle[varName] = value;
        this.setState({style: updatedStyle});
      },
      getTopAppBarHeight: () => {
        if (this.topAppBarElement && this.topAppBarElement.current) {
          return this.topAppBarElement.current.clientHeight;
        }
      },
      registerScrollHandler: (handler) =>
        window.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler) =>
        window.removeEventListener('scroll', handler),
      getViewportScrollY: () => window.pageYOffset,
      getTotalActionItems: () => !!(actionItems && actionItems.length),
    };
  }

  get otherProps() {
    const {
      /* eslint-disable no-unused-vars */
      actionItems,
      className,
      fixed,
      title,
      navigationIcon,
      short,
      shortCollapsed,
      prominent,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return otherProps;
  }

  render() {
    return (
      <header
        {...this.otherProps}
        className={this.classes}
        style={this.getMergedStyles()}
        ref={this.topAppBarElement}>
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
        <span className="mdc-top-app-bar__title">
          {title}
        </span>
      </section>
    );
  }

  renderNavigationIcon() {
    const {navigationIcon} = this.props;

    if (!navigationIcon) {
      return;
    }

    const elementWithClasses = this.addClassesToElement('mdc-top-app-bar__navigation-icon', navigationIcon);
    return this.enableRippleOnElement(elementWithClasses);
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
        {/* to set key on the element, the element needs to be cloned */}
        {actionItems.map((item, key) => {
          const elementWithClasses = this.addClassesToElement(
            'mdc-top-app-bar__action-item', item);
          const elementWithRipple = this.enableRippleOnElement(elementWithClasses);
          return React.cloneElement(elementWithRipple, {key});
        })}
      </section>
    );
  }

}

TopAppBar.propTypes = {
  actionItems: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  fixed: PropTypes.bool,
  navigationIcon: PropTypes.element,
  prominent: PropTypes.bool,
  short: PropTypes.bool,
  shortCollapsed: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ]),
};

TopAppBar.defaultProps = {
  actionItems: null,
  className: '',
  fixed: false,
  navigationIcon: null,
  prominent: false,
  short: false,
  shortCollapsed: false,
  style: {},
  title: '',
};

export {TopAppBarFixedAdjust};

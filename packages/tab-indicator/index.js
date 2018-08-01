import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCFadingTabIndicatorFoundation, MDCSlidingTabIndicatorFoundation} from '@material/tab-indicator/dist/mdc.tabIndicator';

export default class TabIndicator extends Component {
  tabIndicatorContentElement_ = React.createRef();
  allowTransitionEnd_ = false;

  state = {
    classList: new Set(),
    contentStyle: {},
  };

  componentDidMount() {
    if (this.props.fade) {
      this.foundation_ = new MDCFadingTabIndicatorFoundation(this.adapter);
    } else {
      this.foundation_ = new MDCSlidingTabIndicatorFoundation(this.adapter);
    }
    this.foundation_.init();
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
    const {active, className, fade} = this.props;
    return classnames('mdc-tab-indicator', Array.from(classList), className, {
      'mdc-tab-indicator--fade': fade,
      'mdc-tab-indicator--active': active,
    });
  }

  get contentClasses() {
    const {contentClassName, icon, underline} = this.props;
    return classnames('mdc-tab-indicator__content', contentClassName, {
      'mdc-tab-indicator__content--icon	': icon,
      'mdc-tab-indicator__content--underline': underline,
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
      computeContentClientRect:
        () => this.tabIndicatorContentElement_.current
          && this.tabIndicatorContentElement_.current.getBoundingClientRect(),
      setContentStyleProperty: (prop, value) => this.setState({contentStyle: {[prop]: value}}),
    };
  }

  handleTransitionEnd = (e) => {
    this.props.onTransitionEnd(e);

    if (!this.allowTransitionEnd_) return;

    this.allowTransitionEnd_ = false;
    this.foundation_.handleTransitionEnd();
  }

  render() {
    const {contentStyle} = this.state;
    const {
      /* eslint-disable */
      active,
      className,
      contentClassName,
      fade,
      icon,
      underline,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;

    return (
      <span
        className={this.classes}
        onTransitionEnd={this.handleTransitionEnd}
        {...otherProps}
      >
        <span
          className={this.contentClasses}
          ref={this.tabIndicatorContentElement_}
          style={contentStyle}
        >
          {children}
        </span>
      </span>
    );
  }
}

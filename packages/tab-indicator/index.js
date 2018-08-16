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
    const {active, className, fade} = this.props;
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

  handleTransitionEnd = (e) => {
    this.props.onTransitionEnd(e);

    if (!this.allowTransitionEnd_) return;

    this.allowTransitionEnd_ = false;
    this.foundation_.handleTransitionEnd();
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
        onTransitionEnd={this.handleTransitionEnd}
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

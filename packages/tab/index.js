import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabIndicator from '@material/react-tab-indicator';
import {MDCTabFoundation} from '@material/tab/dist/mdc.tab';

export default class Tab extends Component {
  allowTransitionEnd_ = false;
  foundation_ = null;
  tabElement_ = React.createRef();
  tabContentElement_ = React.createRef();
  tabIndicatorElement_ = React.createRef();

  state = {
    'classList': new Set(),
    'aria-selected': undefined,
    'tabIndex': undefined,
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
        this.foundation_.activate(this.props.previousActiveClientRect);
      } else {
        this.foundation_.deactivate();
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

      registerEventHandler: () => this.allowTransitionEnd_ = true,
      deregisterEventHandler: () => this.allowTransitionEnd_ = false,
      getOffsetLeft: () => this.tabElement_.current && this.tabElement_.current.offsetLeft,
      getOffsetWidth: () => this.tabElement_.current && this.tabElement_.current.offsetWidth,
      getContentOffsetLeft: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetLeft,
      getContentOffsetWidth: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetWidth,
      focus: () => this.tabElement_.current && this.tabElement_.current.focus(),

      // activateIndicator, deactivateIndicator, and computeIndicatorClientRect
      // are not needed in the adapter. TabIndicator keeps calls foundation.active
      // and foundation.deactivate when this.props.activate updates.
      // computeIndicatorClientRect seems redundant in mdc-tab
    };
  }

  computeIndicatorClientRect = () => {
    if (!this.tabIndicatorElement_.current) return;
    return this.tabIndicatorElement_.current.computeContentClientRect();
  }

  computeDimensions = () => {
    return this.foundation_.computeDimensions();
  }

  handleTransitionEnd = (evt) => {
    this.props.onTransitionEnd(evt);

    if (!this.allowTransitionEnd_) return;

    this.foundation_.handleTransitionEnd_(evt);
  }

  render() {
    const {
      /* eslint-disable */
      active,
      previousActiveClientRect,
      className,
      fadeIndicator,
      indicator,
      minWidth,
      onTransitionEnd,
      stacked,
      /* eslint-enable */
      children,
      minWidthIndicator,
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
        ref={this.tabElement_}
        onTransitionEnd={this.handleTransitionEnd}
        {...otherProps}
      >
        <span
          className='mdc-tab__content'
          ref={this.tabContentElement_}
        >
          {children}
          {minWidthIndicator ? this.renderIndicator() : null}
        </span>
        {minWidthIndicator ? null : this.renderIndicator()}
        <span className='mdc-tab__ripple'></span>
      </button>
    );
  }

  renderIndicator() {
    const {
      active,
      fadeIndicator,
      indicator,
      previousActiveClientRect,
    } = this.props;

    if (indicator) {
      const indicatorProps = {
        active,
        previousIndicatorClientRect: previousActiveClientRect,
        ref: this.tabIndicatorElement_,
      };
      const Indicator = indicator(indicatorProps);
      if (Indicator.type !== TabIndicator) {
        throw new Error('this.props.indicator must be a function that returns an instance of TabIndicator');
      };
      return Indicator;
    }

    return (
      <TabIndicator
        active={active}
        fade={fadeIndicator}
        ref={this.tabIndicatorElement_}
        previousIndicatorClientRect={previousActiveClientRect}
      />
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  fadeIndicator: PropTypes.bool,
  indicator: PropTypes.func,
  minWidth: PropTypes.bool,
  minWidthIndicator: PropTypes.bool,
  stacked: PropTypes.bool,
  previousActiveClientRect: PropTypes.object,
  onTransitionEnd: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
  className: '',
  fadeIndicator: false,
  minWidth: false,
  minWidthIndicator: false,
  stacked: false,
  onTransitionEnd: () => {},
  previousActiveClientRect: {},
};

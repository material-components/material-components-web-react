import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabIndicator from '@material/react-tab-indicator';
import {MDCTabFoundation} from '@material/tab/dist/mdc.tab';

export default class Tab extends Component {
  foundation_ = null;
  tabElement_ = React.createRef();
  tabContentElement_ = React.createRef();
  tabIndicator_ = React.createRef();

  state = {
    'classList': new Set(),
    'aria-selected': undefined,
    'tabIndex': undefined,
    'activateIndicator': false,
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
      getOffsetLeft: () => this.tabElement_.current && this.tabElement_.current.offsetLeft,
      getOffsetWidth: () => this.tabElement_.current && this.tabElement_.current.offsetWidth,
      getContentOffsetLeft: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetLeft,
      getContentOffsetWidth: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetWidth,
      focus: () => this.tabElement_.current && this.tabElement_.current.focus(),
      activateIndicator: () => this.setState({activateIndicator: true}),
      deactivateIndicator: () => this.setState({activateIndicator: false}),
      // computeIndicatorClientRect is redundant in mdc-tab and is going to be
      // removed in another release
    };
  }

  computeIndicatorClientRect = () => {
    if (!this.tabIndicator_.current) return;
    return this.tabIndicator_.current.computeContentClientRect();
  }

  computeDimensions = () => {
    return this.foundation_.computeDimensions();
  }

  render() {
    const {
      /* eslint-disable */
      active,
      previousActiveClientRect,
      className,
      isFadingIndicator,
      isIconIndicator,
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
        <span className='mdc-tab__ripple'></span>
      </button>
    );
  }

  renderIndicator() {
    const {
      isFadingIndicator,
      indicatorContent,
      isIconIndicator,
      previousActiveClientRect,
    } = this.props;
    const {activateIndicator: active} = this.state;

    return (
      <TabIndicator
        icon={isIconIndicator}
        active={active}
        fade={isFadingIndicator}
        ref={this.tabIndicator_}
        previousIndicatorClientRect={previousActiveClientRect}
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
  previousActiveClientRect: PropTypes.object,
};

Tab.defaultProps = {
  active: false,
  className: '',
  isFadingIndicator: false,
  indicatorContent: null,
  minWidth: false,
  isMinWidthIndicator: false,
  stacked: false,
  previousActiveClientRect: {},
};

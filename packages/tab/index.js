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

  // constructor(props) {
  //   super(props);
    state = {
      classList: new Set(),
    };
  // }

  componentDidMount() {
    this.foundation_ = new MDCTabFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        //computeIndicatorClientRect
        this.foundation_.activate({});
      } else {
        this.foundation_.deactivate();
      }
    }
  }

  get classes() {
    const {classList} = this.state;
    const {active, className, minWidth, stacked} = this.props;
    return classnames('mdc-tab', Array.from(classList), className, {
      'mdc-tab--min-width	': minWidth,
      // 'mdc-tab--active': active,
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

      activateIndicator: (previousIndicatorClientRect) => this.previousIndicatorClientRect = previousIndicatorClientRect,
      // deactivateIndicator
      computeIndicatorClientRect: () => {debugger; this.tabIndicator_.computeContentClientRect()},
      // notifyInteracted: () => this.emit(MDCTabFoundation.strings.INTERACTED_EVENT, {tab: this}, true /* bubble */),
      registerEventHandler: () => this.allowTransitionEnd_ = true,
      deregisterEventHandler: () => this.allowTransitionEnd_ = false,
      getOffsetLeft: () => this.tabElement_.current && this.tabElement_.current.offsetLeft,
      getOffsetWidth: () => this.tabElement_.current && this.tabElement_.current.offsetWidth,
      getContentOffsetLeft: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetLeft,
      getContentOffsetWidth: () => this.tabContentElement_.current && this.tabContentElement_.current.offsetWidth,
      focus: () => this.tabElement_.current && this.tabElement_.current.focus(),
    };
  }

  handleTransitionEnd(evt) {
    this.props.onTransitionEnd(evt);

    if (!this.allowTransitionEnd_) return;

    this.foundation_.handleTransitionEnd_(evt);
  }

  render() {
    const {
      active,
      children,
      className,
      fadeIndicator,
      ...otherProps,
    } = this.props;

    return (
      <button
        className='mdc-tab'
        role='tab'
        aria-selected='true'
        ref={this.tabElement_}
        onTransitionEnd={this.handleTransitionEnd}
        {...otherProps}
      >
        <span
          className='mdc-tab__content'
          ref={this.tabContentElement_}
        >
          {children}
          {/* <span className='mdc-tab__icon'>heart</span>
          <span className='mdc-tab__text-label'>Favorites</span> */}
        </span>
        <TabIndicator
          active={active}
          fade={fadeIndicator}
          ref={this.tabIndicatorElement_}
          previousIndicatorClientRect={this.previousIndicatorClientRect}
        />
        <span className='mdc-tab__ripple'></span>
      </button>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  onTransitionEnd: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
  className: '',
  onTransitionEnd: () => {},
};

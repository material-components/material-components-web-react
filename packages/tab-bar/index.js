import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabScroller from '@material/react-tab-scroller';
import {MDCTabBarFoundation} from '@material/tab-bar/dist/mdc.tabBar';

export default class TabBar extends Component {
  tabBarElement_ = React.createRef();
  tabScroller_ = React.createRef();
  tabList_ = [];

  foundation_ = null;
  state = {
    previousActiveIndex: -1,
  }

  componentDidMount() {
    this.foundation_ = new MDCTabBarFoundation(this.adapter);
    this.foundation_.init();

    const {
      activeIndex,
      indexInView,
    } = this.props;
    if (this.tabList_[activeIndex]) {
      this.tabList_[activeIndex].activate({} /* previousIndicatorClientRect */);
    }
    this.foundation_.scrollIntoView(indexInView);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.foundation_.activateTab(this.props.activeIndex);
    }
    if (this.props.indexInView !== prevProps.indexInView) {
      this.foundation_.scrollIntoView(this.props.indexInView);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    return classnames('mdc-tab-bar', this.props.className);
  }

  get adapter() {
    return {
      scrollTo: (scrollX) => this.tabScroller_.current.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => this.tabScroller_.current.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.current.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller_.current.getScrollContentWidth(),
      getOffsetWidth: () => this.tabBarElement_.current.offsetWidth,
      isRTL: () => !!this.props.isRtl,
      setActiveTab: (index) => this.props.handleActiveIndexUpdate(index),
      activateTabAtIndex: (index, clientRect) => this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: (index) => this.tabList_[index].deactivate(),
      focusTabAtIndex: (index) => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: (index) => this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index) => this.tabList_[index].computeDimensions(),
      getPreviousActiveTabIndex: () => this.state.previousActiveIndex,
      getFocusedTabIndex: () => {
        const activeElement = document.activeElement;
        // cannot use findIndex, not supported in IE11
        // cannot use forEach, return statement inside the forEach loop will not return
        for (let i = 0; i < this.tabList_.length; i++) {
          if (this.tabList_[i].tabElement_.current === activeElement) {
            return i;
          }
        }
        return -1;
      },
      getIndexOfTab: (tabToFind) => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
    };
  }

  pushToTabList = (el) => {
    this.tabList_.push(el);
  }

  onKeyDown = (e) => {
    // Persist the synthetic event to access its `key`.
    e.persist();
    this.setState(
      {previousActiveIndex: this.props.activeIndex},
      () => this.foundation_.handleKeyDown(e));
    this.props.onKeyDown(e);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      indexInView,
      activeIndex,
      handleActiveIndexUpdate,
      onKeyDown,
      /* eslint-enable no-unused-vars */
      isRtl,
      children,
      ...otherProps
    } = this.props;

    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className={this.classes}
        role='tablist'
        onKeyDown={this.onKeyDown}
        ref={this.tabBarElement_}
        {...otherProps}
      >
        <TabScroller ref={this.tabScroller_}>
          {React.Children.map(children, this.renderTab)}
        </TabScroller>
      </div>
    );
  }

  renderTab = (tab, index) => {
    const {
      children,
      onClick, // eslint-disable-line no-unused-vars
      ...otherProps
    } = tab.props;

    const props = {
      onClick: (e) => {
        this.setState(
          {previousActiveIndex: this.props.activeIndex},
          () => this.adapter.setActiveTab(index));
        this.props.onClick(e);
      },
      ref: this.pushToTabList,
      ...otherProps,
    };

    return React.cloneElement(tab, props, children);
  }
}

TabBar.propTypes = {
  indexInView: PropTypes.number,
  activeIndex: PropTypes.number,
  handleActiveIndexUpdate: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  isRtl: PropTypes.bool,
};

TabBar.defaultProps = {
  indexInView: 0,
  activeIndex: 0,
  handleActiveIndexUpdate: () => {},
  className: '',
  children: [],
  onClick: () => {},
  onKeyDown: () => {},
  isRtl: false,
};

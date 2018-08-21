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

  componentDidMount() {
    this.foundation_ = new MDCTabBarFoundation(this.adapter);
    this.foundation_.init();
    this.activateTab(this.props.activeIndex);
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
      isRTL: () => !!this.props.isRTL,
      activateTabAtIndex: (index, clientRect) => this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: (index) => this.tabList_[index].deactivate(),
      focusTabAtIndex: (index) => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: (index) => this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index) => this.tabList_[index].computeDimensions(),
      getActiveTabIndex: () => this.props.activeIndex,
      getFocusedTabIndex: () => {
        const activeElement = document.activeElement;
        return this.tabList_.indexOf((tab) => tab.tabElement_.current === activeElement);
      },
      getIndexOfTab: (tabToFind) => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
      notifyTabActivated: (index) => this.props.handleActiveIndexUpdate(index),
    };
  }

  activateTab(index) {
    this.foundation_.activateTab(index);
  }

  scrollIntoView(index) {
    this.foundation_.scrollIntoView(index);
  }

  pushToTabList = (el) => {
    this.tabList_.push(el);
  }

  onKeyDown = (e) => {
    this.foundation_.handleKeyDown(e);
    this.props.onKeyDown(e);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      activeIndex,
      handleActiveIndexUpdate,
      onKeyDown,
      /* eslint-enable no-unused-vars */
      isRTL,
      children,
      ...otherProps
    } = this.props;

    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
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
      /* eslint-disable no-unused-vars */
      activeIndex,
      handleActiveIndexUpdate,
      /* eslint-enable no-unused-vars */
      children,
      onClick,
      ...otherProps
    } = tab.props;

    const props = {
      onClick: (e) => {
        this.foundation_.activateTab(index);
        this.props.onClick(e);
      },
      ref: this.pushToTabList,
      ...otherProps,
    };

    return React.cloneElement(tab, props, children);
  }
}

TabBar.propTypes = {
  activeIndex: PropTypes.number,
  handleActiveIndexUpdate: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  isRTL: PropTypes.bool,
};

TabBar.defaultProps = {
  activeIndex: 0,
  handleActiveIndexUpdate: () => {},
  className: '',
  children: [],
  onClick: () => {},
  onKeyDown: () => {},
  isRTL: false,
};

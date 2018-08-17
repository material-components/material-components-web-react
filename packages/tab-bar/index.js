import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tab from '@material/react-tab';
import TabScroller from '@material/react-tab-scroller';
import {MDCTabBarFoundation} from '@material/tab-bar/dist/mdc.tabBar';

export default class TabBar extends Component {
  tabBarElement_ = React.createRef();
  tabScroller_ = React.createRef();
  tabList_ = [];
  foundation_ = null;
  state = {
    activeIndex: this.props.activeIndex,
  }

  componentDidMount() {
    this.tabList_ = this.tabScroller_.props.children;

    this.foundation_ = new MDCTabBarFoundation(this.adapter);
    this.foundation_.init();

    this.activateTab(this.state.activeIndex);
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    return classnames('mdc-tab-bar', this.props.className);
  }

  get adapter() {
    return {
      scrollTo: (scrollX) => this.tabScroller_.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => this.tabScroller_.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller_.getScrollContentWidth(),
      getOffsetWidth: () => this.tabBarElement_.offsetWidth,
      isRTL: () => window.getComputedStyle(this.tabBarElement_).getPropertyValue('direction') === 'rtl',
      activateTabAtIndex: (index, clientRect) => this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: (index) => this.tabList_[index].deactivate(),
      focusTabAtIndex: (index) => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: (index) => this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index) => this.tabList_[index].computeDimensions(),
      getActiveTabIndex: () => this.state.activeIndex,
      getFocusedTabIndex: () => {
        const activeElement = document.activeElement;
        return this.tabList_.indexOf((tab) => tab.tabElement_.current === activeElement);
      },
      getIndexOfTab: (tabToFind) => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
      notifyTabActivated: (index) => this.setState({activeIndex: index}),
    };
  }

  activateTab(index) {
    this.foundation_.activateTab(index);
  }

  scrollIntoView(index) {
    this.foundation_.scrollIntoView(index);
  }

  render() {
    const {
      activeIndex, // eslint-disable-line no-unused-vars
      children,
      className, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    let index = 0;
    return (
      <div
        className={this.classes}
        role='tablist'
        ref={this.tabBarElement_}
        {...otherProps}
      >
        <TabScroller ref={this.tabScroller_}>
          {React.children.map(children, (tabChild) => {
            const tab = this.renderTab(tabChild, index++);
            this.tabList_.push(tab);
            return tab;
          })}
        </TabScroller>
      </div>
    );
  }

  renderTab(tab, index) {
    const {
      children,
      ...otherProps
    } = tab.props;

    return(
      <Tab
        active={index === this.state.activeIndex}
        onClick={(e) => this.foundation_.handleTabInteraction(e)}
        {...otherProps}
      >
        {children}
      </Tab>
    );
  }
}

TabBar.propTypes = {
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.element,
};

TabBar.defaultProps = {
  activeIndex: -1,
  className: '',
  children: null,
};

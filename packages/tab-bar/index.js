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
      scrollTo: (scrollX) => this.tabScroller_.current.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => this.tabScroller_.current.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.current.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller_.current.getScrollContentWidth(),
      getOffsetWidth: () => this.tabBarElement_.current.offsetWidth,
      isRTL: () => window.getComputedStyle(this.tabBarElement_.current).getPropertyValue('direction') === 'rtl',
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

  pushToTabList = (el) => {
    this.tabList_.push(el);
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
          {React.Children.map(children, (tab) => this.renderTab(tab, index++))}
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
        ref={this.pushToTabList}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ])
};

TabBar.defaultProps = {
  activeIndex: -1,
  className: '',
  children: [],
};

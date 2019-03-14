import * as React from 'react';
import classnames from 'classnames';
import TabScroller from '@material/react-tab-scroller';
import Tab, {TabProps} from '@material/react-tab'; // eslint-disable-line no-unused-vars
// @ts-ignore No mdc .d.ts files
import {MDCTabBarFoundation} from '@material/tab-bar/dist/mdc.tabBar';

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  indexInView?: number;
  activeIndex: number;
  handleActiveIndexUpdate?: (index: number) => void;
  className?: string;
  isRtl?: boolean;
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
};

interface TabBarState {
  previousActiveIndex: number;
};

class TabBar extends React.Component<
  TabBarProps, TabBarState
  > {
  tabBarRef: React.RefObject<HTMLDivElement> = React.createRef();
  tabScrollerRef: React.RefObject<TabScroller> = React.createRef();
  tabList: Tab[] = [];
  foundation?: MDCTabBarFoundation;

  constructor(props: TabBarProps) {
    super(props);
    this.state = {
      previousActiveIndex: props.activeIndex,
    };
  }

  static defaultProps: Partial<TabBarProps> = {
    indexInView: 0,
    activeIndex: 0,
    handleActiveIndexUpdate: () => {},
    className: '',
    children: [],
    isRtl: false,
  };

  componentDidMount() {
    this.foundation = new MDCTabBarFoundation(this.adapter);
    this.foundation.init();
    const {activeIndex, indexInView} = this.props;
    if (this.tabList[activeIndex]) {
      this.tabList[activeIndex].activate(new ClientRect() /* previousIndicatorClientRect */);
    }
    this.foundation.scrollIntoView(indexInView);
  }

  componentDidUpdate(prevProps: TabBarProps) {
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.setState({previousActiveIndex: prevProps.activeIndex}, () =>
        this.foundation.activateTab(this.props.activeIndex)
      );
    }
    if (this.props.indexInView !== prevProps.indexInView) {
      this.foundation.scrollIntoView(this.props.indexInView);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get classes() {
    return classnames('mdc-tab-bar', this.props.className);
  }

  get adapter() {
    return {
      scrollTo: (scrollX: number) => {
        this.tabScrollerRef.current && this.tabScrollerRef.current.scrollTo(scrollX);
      },
      incrementScroll: (scrollXIncrement: number) => {
        this.tabScrollerRef.current && this.tabScrollerRef.current.incrementScroll(scrollXIncrement);
      },
      getScrollPosition: () => {
        if (!this.tabScrollerRef.current) return;
        return this.tabScrollerRef.current.getScrollPosition();
      },
      getScrollContentWidth: () => {
        if (!this.tabScrollerRef.current) return;
        return this.tabScrollerRef.current.getScrollContentWidth();
      },
      getOffsetWidth: () => {
        if (this.tabBarRef.current === null) return;
        return this.tabBarRef.current.offsetWidth;
      },
      isRTL: () => !!this.props.isRtl,
      setActiveTab: (index: number) => {
        if (!this.props.handleActiveIndexUpdate) return;
        this.props.handleActiveIndexUpdate(index);
      },
      activateTabAtIndex: (index: number, clientRect: ClientRect) =>
        this.tabList[index].activate(clientRect),
      deactivateTabAtIndex: (index: number) => this.tabList[index].deactivate(),
      focusTabAtIndex: (index: number) => this.tabList[index].focus(),
      getTabIndicatorClientRectAtIndex: (index: number) =>
        this.tabList[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index: number) =>
        this.tabList[index].computeDimensions(),
      getPreviousActiveTabIndex: () => this.state.previousActiveIndex,
      getFocusedTabIndex: () => {
        const activeElement = document.activeElement;
        // cannot use findIndex, not supported in IE11
        // cannot use forEach, return statement inside the forEach loop will not return
        for (let i = 0; i < this.tabList.length; i++) {
          if (this.tabList[i].tabRef.current === activeElement) {
            return i;
          }
        }
        return -1;
      },
      getIndexOfTab: (tabToFind: Tab) => this.tabList.indexOf(tabToFind),
      getTabListLength: () => this.tabList.length,
    };
  }

  pushToTabList = (el: Tab) => {
    this.tabList.push(el);
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Persist the synthetic event to access its `key`.
    e.persist();
    this.setState({previousActiveIndex: this.props.activeIndex}, () =>
      this.foundation.handleKeyDown(e)
    );
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onClickTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    this.setState({previousActiveIndex: this.props.activeIndex}, () =>
      this.adapter.setActiveTab(index)
    );
    if (onClick) {
      onClick(e);
    }
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
        ref={this.tabBarRef}
        {...otherProps}
      >
        <TabScroller ref={this.tabScrollerRef}>
          {React.Children.map(children as React.ReactElement<TabProps>[], this.renderTab)}
        </TabScroller>
      </div>
    );
  }

  renderTab = (tab: React.ReactElement<TabProps>, index: number) => {
    const {
      children,
      onClick,
      ...otherProps
    } = tab.props;
    const props = {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => this.onClickTab(e, index, onClick),
      ref: this.pushToTabList,
      ...otherProps,
    } as TabProps;

    return React.cloneElement(tab, props, children);
  };
}

export {Tab};
export default TabBar;

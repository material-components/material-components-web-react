import * as React from 'react';
import classnames from 'classnames';
// https://github.com/material-components/material-components-web-react/issues/533
// @ts-ignore
import TabScroller from '@material/react-tab-scroller';
// https://github.com/material-components/material-components-web-react/issues/534
// @ts-ignore
import Tab from '@material/react-tab';
// No mdc .d.ts files
// @ts-ignore
import {MDCTabBarFoundation} from '@material/tab-bar/dist/mdc.tabBar';

export interface TabBarProps extends React.HTMLProps<HTMLDivElement> {
  indexInView?: number;
  activeIndex: number;
  handleActiveIndexUpdate?: (index: number) => void;
  className?: string;
  isRtl?: boolean;
};

interface TabBarState {
  previousActiveIndex: any;
};

export default class TabBar extends React.Component<
  TabBarProps, TabBarState
  > {
  tabBarElement_: React.RefObject<HTMLDivElement> = React.createRef();
  tabScroller_: React.RefObject<TabScroller> = React.createRef();
  tabList_: Tab[] = [];
  foundation_: MDCTabBarFoundation | null = null;

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
    this.foundation_ = new MDCTabBarFoundation(this.adapter);
    this.foundation_.init();
    const {activeIndex, indexInView} = this.props;
    if (this.tabList_[activeIndex]) {
      (this.tabList_[activeIndex] as Tab).activate({} /* previousIndicatorClientRect */);
    }
    this.foundation_.scrollIntoView(indexInView);
  }

  componentDidUpdate(prevProps: TabBarProps) {
    if (this.props.activeIndex !== prevProps.activeIndex) {
      this.setState({previousActiveIndex: prevProps.activeIndex}, () =>
        this.foundation_.activateTab(this.props.activeIndex)
      );
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
      scrollTo: (scrollX: number) => this.tabScroller_.current.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement: number) =>
        this.tabScroller_.current.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.current.getScrollPosition(),
      getScrollContentWidth: () =>
        this.tabScroller_.current.getScrollContentWidth(),
      getOffsetWidth: () => {
        if (this.tabBarElement_.current === null) return;
        return this.tabBarElement_.current.offsetWidth;
      },
      isRTL: () => !!this.props.isRtl,
      setActiveTab: (index: number) => {
        if (!this.props.handleActiveIndexUpdate) return;
        this.props.handleActiveIndexUpdate(index);
      },
      activateTabAtIndex: (index: number, clientRect: ClientRect) =>
        this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: (index: number) => this.tabList_[index].deactivate(),
      focusTabAtIndex: (index: number) => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: (index: number) =>
        this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index: number) =>
        this.tabList_[index].computeDimensions(),
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
      getIndexOfTab: (tabToFind: Tab) => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
    };
  }

  pushToTabList = (el: Tab) => {
    this.tabList_.push(el);
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Persist the synthetic event to access its `key`.
    e.persist();
    this.setState({previousActiveIndex: this.props.activeIndex}, () =>
      this.foundation_.handleKeyDown(e)
    );
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onClickTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number, onClick: React.MouseEventHandler<HTMLButtonElement>
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
        ref={this.tabBarElement_}
        {...otherProps}
      >
        <TabScroller ref={this.tabScroller_}>
          {React.Children.map(children, this.renderTab)}
        </TabScroller>
      </div>
    );
  }

  renderTab = (tab: Tab, index: number) => {
    const {
      children,
      onClick, // eslint-disable-line no-unused-vars
      ...otherProps
    } = tab.props;
    const props = {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => this.onClickTab(e, index, onClick),
      ref: this.pushToTabList,
      ...otherProps,
    };

    return React.cloneElement(tab, props, children);
  };
}

export {Tab};

import React from 'react';
import Tab, {TabProps} from '../../../packages/tab/index'; // eslint-disable-line @typescript-eslint/no-unused-vars
import TabBar from '../../../packages/tab-bar/index';
import './index.scss';

interface TabBarTestProps {
  activeIndex?: number;
  className?: string;
  indicatorContent?: React.ReactNode;
  isFadingIndicator?: boolean;
  numTabs: number;
  isRtl?: boolean;
  hasUpdateActiveIndexButton?: boolean;
}

interface TabBarTestState {
  activeIndex: number;
}

class TabBarTest extends React.Component<TabBarTestProps, TabBarTestState> {
  state = {
    activeIndex: this.props.activeIndex || 0,
  };

  handleActiveIndexUpdate = (activeIndex: number) =>
    this.setState({activeIndex});

  render() {
    const {
      className,
      indicatorContent,
      isFadingIndicator,
      numTabs,
      isRtl,
      hasUpdateActiveIndexButton,
    } = this.props;

    const renderTab: (
      num: number,
      index: number
    ) => React.ReactElement<TabProps> = (num, index) => {
      return (
        <Tab
          key={index}
          isFadingIndicator={isFadingIndicator}
          indicatorContent={indicatorContent}
        >
          <span className='mdc-tab__text-label'>Tab {num + 1}</span>
        </Tab>
      );
    };

    let tabList = new Array(numTabs);
    tabList = tabList.fill(null).map((_, i) => i);

    return (
      <React.Fragment>
        <TabBar
          isRtl={isRtl}
          className={className}
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
        >
          {tabList.map(renderTab)}
        </TabBar>
        {hasUpdateActiveIndexButton ? (
          <button onClick={() => this.setState({activeIndex: 1})}>
            Activate tab at index 1
          </button>
        ) : null}
      </React.Fragment>
    );
  }
}
const TabBarScreenshotTest = () => {
  return (
    <div>
      Sliding Underline - programatically update tab
      <div className='tab-bar-container'>
        <TabBarTest numTabs={3} hasUpdateActiveIndexButton />
      </div>
      Sliding Underline
      <div className='tab-bar-container'>
        <TabBarTest numTabs={3} />
      </div>
      Fading Underline
      <div className='tab-bar-container'>
        <TabBarTest numTabs={3} activeIndex={1} isFadingIndicator />
      </div>
      Sliding Icon
      <div className='tab-bar-container'>
        <TabBarTest
          numTabs={3}
          className='icon-indicator-tab-bar'
          activeIndex={2}
          indicatorContent={<i className='material-icons'>star_border</i>}
        />
      </div>
      Fading Icon
      <div className='tab-bar-container'>
        <TabBarTest
          numTabs={3}
          className='icon-indicator-tab-bar'
          isFadingIndicator
          indicatorContent={<i className='material-icons'>favorite</i>}
        />
      </div>
      Scrolling Tabs
      <div className='tab-bar-container'>
        <TabBarTest numTabs={20} />
      </div>
      Scrolling RTL Tabs
      <div className='tab-bar-container'>
        <TabBarTest numTabs={20} isRtl />
      </div>
    </div>
  );
};
export default TabBarScreenshotTest;

import React from 'react';
import Tab from '../../../packages/tab';
import TabBar from '../../../packages/tab-bar';

import './index.scss';

class TabBarTest extends React.Component {
  state = {
    activeIndex: this.props.activeIndex || 0, // eslint-disable-line react/prop-types
  };

  render() {
    const {
      /* eslint-disable react/prop-types */
      className,
      indicatorContent,
      isFadingIndicator,
      numTabs,
      isRTL,
      /* eslint-enable react/prop-types */
    } = this.props;

    const renderTab = (num, index) => {
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

    return (
      <TabBar
        isRTL={isRTL}
        className={className}
        activeIndex={this.state.activeIndex}
        handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
      >
        {[...Array(numTabs).keys()].map(renderTab)}
      </TabBar>
    );
  }
}

const TabBarScreenshotTest = () => {
  return (
    <div>
      Sliding Underline
      <TabBarTest numTabs={3} />

      Fading Underline
      <TabBarTest numTabs={3}
        activeIndex={1}
        isFadingIndicator />

      Sliding Icon
      <TabBarTest numTabs={3}
        className='icon-indicator-tab-bar'
        activeIndex={2}
        indicatorContent={<i className='material-icons'>star_border</i>} />

      Fading Icon
      <TabBarTest numTabs={3}
        className='icon-indicator-tab-bar'
        isFadingIndicator
        indicatorContent={<i className='material-icons'>favorite</i>} />

      Scrolling Tabs
      <TabBarTest numTabs={20} />

      Scrolling RTL Tabs
      <TabBarTest numTabs={20} isRTL />
    </div>
  );
};

export default TabBarScreenshotTest;

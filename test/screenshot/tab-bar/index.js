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
      isRtl,
      hasUpdateActiveIndexButton,
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
      <React.Fragment>
        <TabBar
          isRtl={isRtl}
          className={className}
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
        >
          {[...Array(numTabs).keys()].map(renderTab)}
        </TabBar>
        {hasUpdateActiveIndexButton ?
          <button onClick={() => this.setState({activeIndex: 1})}>Update active tab</button> : null}
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
        <TabBarTest numTabs={3}
          activeIndex={1}
          isFadingIndicator />
      </div>

      Sliding Icon
      <div className='tab-bar-container'>
        <TabBarTest numTabs={3}
          className='icon-indicator-tab-bar'
          activeIndex={2}
          indicatorContent={<i className='material-icons'>star_border</i>} />
      </div>

      Fading Icon
      <div className='tab-bar-container'>
        <TabBarTest numTabs={3}
          className='icon-indicator-tab-bar'
          isFadingIndicator
          indicatorContent={<i className='material-icons'>favorite</i>} />
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

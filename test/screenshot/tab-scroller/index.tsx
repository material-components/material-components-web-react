import React from 'react';
import TabScroller from '../../../packages/tab-scroller';
import '../../../packages/tab-scroller/index.scss';
import './index.scss';

const Tab: React.FunctionComponent<{number: number}> = ({number}) => {
  return <div className='tab'>Tab {number}</div>;
};

const Tabs = () => (
  <React.Fragment>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((tabNumber: number) => (
      <Tab key={tabNumber} number={tabNumber} />
    ))}
  </React.Fragment>
);

const TabScrollerScreenshotTest = () => {
  return (
    <div>
      <h3>Basic Scroller</h3>
      <TabScroller className='tab-scroller-screenshot'>
        <Tabs />
      </TabScroller>

      <h3>Start Aligned Scroller</h3>
      <TabScroller alignStart className='tab-scroller-screenshot'>
        <Tabs />
      </TabScroller>

      <h3>End Aligned Scroller</h3>
      <TabScroller alignEnd className='tab-scroller-screenshot'>
        <Tabs />
      </TabScroller>

      <h3>Center Aligned Scroller</h3>
      <TabScroller alignCenter className='tab-scroller-screenshot'>
        <Tabs />
      </TabScroller>
    </div>
  );
};
export default TabScrollerScreenshotTest;

import React from 'react';
import ReactDOM from 'react-dom';
import TabScroller from '../../../packages/tab-scroller';

import './index.scss';

const Tab = ({number}) => {
  return (
    <div className='tab'>
      Tab {number}
    </div>
  );
};

const Tabs = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((tabNumber) => (
    <Tab key={tabNumber} number={tabNumber} />
  ));
};
ReactDOM.render((
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
), document.getElementById('app'));

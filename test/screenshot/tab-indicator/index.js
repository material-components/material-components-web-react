import React from 'react';
import ReactDOM from 'react-dom';
import TabIndicator from '../../../packages/tab-indicator';

import './index.scss';

const Tab = ({
  index, active, icon, // eslint-disable-line react/prop-types
}) => {
  return (
    <div
      className='tab'>
      <span>Tab {index}</span>
      <TabIndicator
        active={active}
        icon={icon}
        contentClassName='material-icons'
      >
       {icon}
      </TabIndicator>
    </div>
  );
};

const Tabs = ({
  icon, activeIndex, // eslint-disable-line react/prop-types
}) => {
  return (
    <div className='tabs'>
      {[1, 2, 3].map((number, index) =>
        <Tab
          icon={icon}
          key={index}
          index={number}
          active={index === activeIndex}
        />)}
    </div>
  );
};

ReactDOM.render((
  <div>
    <Tabs icon='star' activeIndex={2}/>
    <Tabs activeIndex={1} />
  </div>
), document.getElementById('app'));

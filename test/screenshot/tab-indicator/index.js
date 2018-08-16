import React from 'react';
import ReactDOM from 'react-dom';
import TabIndicator from '../../../packages/tab-indicator';
import MaterialIcon from '../../../packages/material-icon';

import '../../../packages/tab-indicator/index';
import './index.scss';

const Tab = ({
  children, index, active, icon, // eslint-disable-line react/prop-types
}) => {
  return (
    <div
      className='tab'>
      <span>Tab {index}</span>
      <TabIndicator
        active={active}
        icon={icon}
      >
        {children}
      </TabIndicator>
    </div>
  );
};

const Tabs = ({
  children, activeIndex, // eslint-disable-line react/prop-types
}) => {
  return (
    <div className='tabs'>
      {[1, 2, 3].map((number, index) =>
        <Tab
          icon={!!children}
          key={index}
          index={number}
          active={index === activeIndex}
        >
          {children}
        </Tab>
      )}
    </div>
  );
};

export default () => {
  return (
    <div>
      <Tabs activeIndex={2}>
        <MaterialIcon icon='star' />
      </Tabs>
      <Tabs activeIndex={1} />
    </div>
  );
}

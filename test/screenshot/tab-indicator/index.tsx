import React from 'react';
import TabIndicator from '../../../packages/tab-indicator/index';
import MaterialIcon from '../../../packages/material-icon';
import '../../../packages/tab-indicator/index.scss';
import './index.scss';

const Tab: React.FunctionComponent<{
  children?: React.ReactElement<any>;
  index: number;
  active: boolean;
  icon: boolean;
}> = ({children, index, active, icon}) => {
  return (
    <div className='tab'>
      <span>Tab {index}</span>
      <TabIndicator active={active} icon={icon}>
        {children}
      </TabIndicator>
    </div>
  );
};

const Tabs: React.FunctionComponent<{
  children?: React.ReactElement<any>;
  activeIndex: number;
}> = ({children, activeIndex}) => {
  return (
    <div className='tabs'>
      {[1, 2, 3].map((number, index) => (
        <Tab
          icon={!!children}
          key={index}
          index={number}
          active={index === activeIndex}
        >
          {children}
        </Tab>
      ))}
    </div>
  );
};

const TabIndicatorScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <Tabs activeIndex={2}>
        <MaterialIcon icon='star' />
      </Tabs>
      <Tabs activeIndex={1} />
    </div>
  );
};
export default TabIndicatorScreenshotTest;

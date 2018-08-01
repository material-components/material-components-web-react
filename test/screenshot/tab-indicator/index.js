import React from 'react';
import ReactDOM from 'react-dom';
import TabIndicator from '../../../packages/tab-indicator';

import './index.scss';

const Tab = (props)  => {
  return (
    <div
      className='tab'>
      <span>Tab {props.index}</span>
      <TabIndicator
        active={props.active}
        icon={props.icon}
        underline={props.underline}
        contentClassName='material-icons'
      >
       {props.icon}
      </TabIndicator>
    </div>
  );
}

const Tabs = ({underline, icon, activeIndex}) => {
  return (
    <div className='tabs'>
      {[1, 2, 3].map((number, index) =>
        <Tab
          underline={underline}
          icon={icon}
          key={index}
          index={number}
          active={index === activeIndex}
        />)}
    </div>
  );
}

ReactDOM.render((
  <div>
    <Tabs icon='star' activeIndex={2}/>
    <Tabs underline activeIndex={1} />
  </div>
), document.getElementById('app'));

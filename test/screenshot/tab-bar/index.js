import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../../../packages/tab-bar';
import TabBar from '../../../packages/tab-bar';

import './index.scss';

ReactDOM.render((
  <div>
    <TabBar activeIndex={0}>
      <Tab>
        <span className='mdc-tab__text-label'>One</span>
      </Tab>
      <Tab>
        <span className='mdc-tab__text-label'>Two</span>
      </Tab>
      ))}
    </TabBar>
  </div>
), document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import TabBar from '../../../packages/tab-bar';

import './index.scss';

const Tab = ({
  number, // eslint-disable-line react/prop-types
}) => {
  return (
    <div className='tab'>
      Tab {number}
    </div>
  );
};

ReactDOM.render((
  <div>
    <TabBar>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((tabNumber) => (
        <Tab key={tabNumber} number={tabNumber} />
      ))}
    </TabBar>
  </div>
), document.getElementById('app'));

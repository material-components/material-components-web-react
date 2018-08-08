import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../../../packages/tab';
import MaterialIcon from '../../../packages/material-icon';

import './index.scss';
const Tabs = ({
  children, activeIndex, // eslint-disable-line react/prop-types
}) => {
  return (
    <div className='tabs'>
      {children}
    </div>
  );
};

class TabsController extends React.Component {
  state = {activeIndex: 0};

  render() {
    const {activeIndex} = this.state;
    return (
      <Tabs activeIndex={activeIndex}>
        {[1, 2, 3].map((num, index) => (
          <Tab
            active={index === activeIndex}
            key={index}
            onClick={() => this.setState({activeIndex: index})}
          >
            <span className='mdc-tab__text-label'>Tab {num}</span>
          </Tab>
        ))}
      </Tabs>
    );
  }
};

ReactDOM.render((
  <div>
    <TabsController />
  </div>
), document.getElementById('app'));

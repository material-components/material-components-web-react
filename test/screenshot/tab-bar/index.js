import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../../../packages/tab-bar';
import TabBar from '../../../packages/tab-bar';

import './index.scss';

class TabBarTest extends React.Component {
  state = {
    activeIndex: 0,
  };

  render() {
    return (
      <TabBar activeIndex={this.state.activeIndex} handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex}, console.log(activeIndex))}>
        <Tab>
          <span className='mdc-tab__text-label'>One</span>
        </Tab>
        <Tab>
          <span className='mdc-tab__text-label'>Two</span>
        </Tab>
        <Tab>
          <span className='mdc-tab__text-label'>Three</span>
        </Tab>
    </TabBar>
    );
  }
}

ReactDOM.render((
  <TabBarTest />
), document.getElementById('app'));

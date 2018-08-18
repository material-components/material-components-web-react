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
    const {
      className,
      indicatorContent
    } = this.props;

    return (
      <TabBar
        className={className}
        activeIndex={this.state.activeIndex}
        handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
      >
        <Tab indicatorContent={indicatorContent}>
          <span className='mdc-tab__text-label'>One</span>
        </Tab>
        <Tab indicatorContent={indicatorContent}>
          <span className='mdc-tab__text-label'>Two</span>
        </Tab>
        <Tab indicatorContent={indicatorContent}>
          <span className='mdc-tab__text-label'>Three</span>
        </Tab>
      </TabBar>
    );
  }
}

ReactDOM.render((
  <div>
    Sliding Underline
    <TabBarTest />
    Sliding Icon
    <TabBarTest className='custom-tab-bar' indicatorContent={<i className='material-icons light-border'>star_border</i>} />
  </div>
), document.getElementById('app'));

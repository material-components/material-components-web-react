import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../../../packages/tab-bar';
import TabBar from '../../../packages/tab-bar';

import './index.scss';

class TabBarTest extends React.Component {
  state = {
    activeIndex: this.props.activeIndex || 0,
  };

  render() {
    const {
      className,
      indicatorContent,
      isFadingIndicator
    } = this.props;

    const renderTab = (text) => {
      return(
        <Tab isFadingIndicator={isFadingIndicator} indicatorContent={indicatorContent}>
          <span className='mdc-tab__text-label'>{text}</span>
        </Tab>
      );
    }

    return (
      <TabBar
        className={className}
        activeIndex={this.state.activeIndex}
        handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
      >
        {renderTab('One')}
        {renderTab('Two')}
        {renderTab('Three')}
      </TabBar>
    );
  }
}

ReactDOM.render((
  <div>
    Sliding Underline
    <TabBarTest />

    Fading Underline
    <TabBarTest 
      activeIndex={1}
      isFadingIndicator />

    Sliding Icon
    <TabBarTest
      className='icon-indicator-tab-bar'
      activeIndex={2}
      indicatorContent={<i className='material-icons'>star_border</i>} />

    Fading Icon
    <TabBarTest
      className='icon-indicator-tab-bar'
      isFadingIndicator
      indicatorContent={<i className='material-icons'>favorite</i>} />
  </div>
), document.getElementById('app'));

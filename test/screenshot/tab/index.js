import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../../../packages/tab';
import TabIndicator from '../../../packages/tab-indicator';
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
  tabBoundingRects = [];
  state = {activeIndex: 0, previousActiveIndex: 0};

  render() {
    const {tabContent, minWidth, stacked, fadeIndicator} = this.props;
    const {activeIndex, previousActiveIndex} = this.state;
    return (
      <Tabs activeIndex={activeIndex}>
        {[1, 2, 3].map((num, index) => (
          <Tab
            active={index === activeIndex}
            key={index}
            minWidth={minWidth}
            fadeIndicator={fadeIndicator}
            stacked={stacked}
            previousActiveClientRect={this.tabBoundingRects[previousActiveIndex]}
            ref={ tabEl => {if(tabEl) {this.tabBoundingRects.push(tabEl.computeIndicatorClientRect())}} }
            onClick={() => this.setState({previousActiveIndex: activeIndex, activeIndex: index})}
            indicator={this.props.indicator ? (props) => this.props.indicator(props) : null}
          >
            {tabContent(num)}
          </Tab>
        ))}
      </Tabs>
    );
  }
};

const TabContent = ({num}) => (
  <React.Fragment>
    <MaterialIcon className='mdc-tab__icon' icon='favorite' />
    <span className='mdc-tab__text-label'>{num}</span>
  </React.Fragment>
)

ReactDOM.render((
  <div>
    <h3>Basic Tabs</h3>
    <TabsController
      tabContent={(num) => <TabContent num={num}/>}
    />

    <h3>Tabs w/ Icon</h3>
    <TabsController
      tabContent={() => (<span>Tab</span>)}
      indicator={({active, previousIndicatorClientRect, ref}) => (
        <TabIndicator
          icon
          active={active}
          ref={ref}
          previousIndicatorClientRect={previousIndicatorClientRect}
        >
          <MaterialIcon className='light-border' icon='star_border' />
        </TabIndicator>
      )}
    />

    <h3>Tabs Min Width</h3>
    <TabsController
      minWidth
      tabContent={(num) => <TabContent num={num}/>}
    />

    <h3>Tabs Stacked</h3>
    <TabsController
      stacked
      tabContent={(num) => <TabContent num={num}/>}
    />

    <h3>Tabs w/ Fading Tab Indicator</h3>
    <TabsController
      fadeIndicator
      tabContent={(num) => <TabContent num={num}/>}
    />
  </div>
), document.getElementById('app'));

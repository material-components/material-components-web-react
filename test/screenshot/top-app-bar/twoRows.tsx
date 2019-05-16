import React from 'react';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '../../../packages/top-app-bar';
import Tab from '../../../packages/tab';
import TabBar from '../../../packages/tab-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';
import {actionItems} from './actionItems';
import {mapActionItem} from './index';

const title: string = 'Miami, FL';
class TopAppBarTwoRows extends React.Component<{}, {activeIndex: number}> {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex: number) =>
    this.setState({activeIndex});

  render() {
    return (
      <div className='top-app-bar-container'>
        <TopAppBar className='top-app-bar--tabs'>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon='menu' />
              </TopAppBarIcon>
              <TopAppBarTitle>{title}</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              {actionItems.map(mapActionItem)}
            </TopAppBarSection>
          </TopAppBarRow>
          <TopAppBarRow>
            <TopAppBarSection>
              <TabBar
                activeIndex={this.state.activeIndex}
                handleActiveIndexUpdate={this.handleActiveIndexUpdate}
              >
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
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <MainTopAppBarContent prominent />
      </div>
    );
  }
}

export default TopAppBarTwoRows;

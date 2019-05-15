import React from 'react';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';
import {mapActionItem} from './index';
import {actionItems} from './actionItems';

interface TopAppBarProminentToShortCollapsedScreenshotTestState {
  isPhone: boolean;
}

const title: string = 'Miami, FL';
class TopAppBarProminentToShortCollapsedScreenshotTest extends React.Component<
  {},
  TopAppBarProminentToShortCollapsedScreenshotTestState
> {
  state = {
    isPhone: window.innerWidth < 599,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateTopAppBarVariant);
  }

  shouldComponentUpdate(
    _: {},
    nextState: TopAppBarProminentToShortCollapsedScreenshotTestState
  ) {
    return nextState.isPhone !== this.state.isPhone;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTopAppBarVariant);
  }

  updateTopAppBarVariant = () => {
    const isPhone = window.innerWidth < 599;
    this.setState({isPhone});
  };

  render() {
    const {isPhone} = this.state;
    return (
      <div>
        <TopAppBar prominent={!isPhone} shortCollapsed={isPhone}>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon='menu' />
              </TopAppBarIcon>
              <TopAppBarTitle>{title}</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              {isPhone ? (
                <TopAppBarIcon actionItem tabIndex={0}>
                  <MaterialIcon hasRipple icon='more_vert' />
                </TopAppBarIcon>
              ) : (
                actionItems.map(mapActionItem)
              )}
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <MainTopAppBarContent prominent={!isPhone} short={isPhone} />
      </div>
    );
  }
}

export default TopAppBarProminentToShortCollapsedScreenshotTest;

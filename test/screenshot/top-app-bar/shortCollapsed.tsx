import React from 'react';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const title: string = 'Miami, FL';
const TopAppBarShortCollapsedScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <TopAppBar shortCollapsed>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon='menu' />
            </TopAppBarIcon>
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='end' role='toolbar'>
            <TopAppBarIcon actionItem tabIndex={0}>
              <MaterialIcon hasRipple icon='more_vert' />
            </TopAppBarIcon>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <MainTopAppBarContent short />
    </div>
  );
};

export default TopAppBarShortCollapsedScreenshotTest;

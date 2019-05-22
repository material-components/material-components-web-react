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
const TopAppBarStandardNoActionItemsScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon='menu' />
            </TopAppBarIcon>
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <MainTopAppBarContent />
    </div>
  );
};

export default TopAppBarStandardNoActionItemsScreenshotTest;

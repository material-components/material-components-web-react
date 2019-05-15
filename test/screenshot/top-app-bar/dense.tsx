import React from 'react';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';
import {actionItems} from './actionItems';
import {mapActionItem} from './index';

const title: string = 'Miami, FL';
const TopAppBarDenseScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar dense>
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
      </TopAppBar>
      <MainTopAppBarContent dense />
    </div>
  );
};

export default TopAppBarDenseScreenshotTest;

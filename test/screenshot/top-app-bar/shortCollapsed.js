import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarShortCollapsedScreenshotTest = () => {
  return (
    <div>
      <TopAppBar
        shortCollapsed
        navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('shortCollapsed click')}
        />}
      />
      <MainTopAppBarContent short/>
    </div>
  );
};

export default TopAppBarShortCollapsedScreenshotTest;

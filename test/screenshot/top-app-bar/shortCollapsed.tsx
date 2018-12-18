import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
// TODO: fix with #513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarShortCollapsedScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <TopAppBar
        shortCollapsed
        navigationIcon={
          <MaterialIcon
            icon='menu'
            onClick={() => console.log('shortCollapsed click')}
          />
        }
      />
      <MainTopAppBarContent short />
    </div>
  );
};

export default TopAppBarShortCollapsedScreenshotTest;

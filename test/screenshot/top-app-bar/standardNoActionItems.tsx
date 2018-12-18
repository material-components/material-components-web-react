import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
// TODO: fix with #513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarStandardNoActionItemsScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        title='Miami, FL'
        navigationIcon={
          <MaterialIcon icon='menu' onClick={() => console.log('click')} />
        }
      />
      <MainTopAppBarContent />
    </div>
  );
};

export default TopAppBarStandardNoActionItemsScreenshotTest;

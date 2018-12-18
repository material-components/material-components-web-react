import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
// TODO: fix with #513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarShortScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        short
        title='Miami, FL'
        navigationIcon={
          <MaterialIcon
            icon='menu'
            onClick={() => console.log('short click')}
          />
        }
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
      <MainTopAppBarContent short />
    </div>
  );
};

export default TopAppBarShortScreenshotTest;

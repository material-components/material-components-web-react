import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
// TODO: fix with #513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarProminentScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        prominent
        title='Miami, FL'
        navigationIcon={
          <MaterialIcon
            icon='menu'
            onClick={() => console.log('prominent click')}
          />
        }
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
      <MainTopAppBarContent prominent />
    </div>
  );
};

export default TopAppBarProminentScreenshotTest;

import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

const TopAppBarDenseScreenshotTest: React.FunctionComponent = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        dense
        title='Miami, FL'
        navigationIcon={
          <MaterialIcon
            icon='menu'
            onClick={() => console.log('dense click')}
          />
        }
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
      <MainTopAppBarContent dense />
    </div>
  );
};

export default TopAppBarDenseScreenshotTest;

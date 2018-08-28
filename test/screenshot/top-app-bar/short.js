import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

const TopAppBarShortScreenshotTest = () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        short
        title='Miami, FL'
        navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('short click')}
        />}
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
    </div>
  );
};

export default TopAppBarShortScreenshotTest;

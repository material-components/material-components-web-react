import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

export default () => {
  return (
    <div className='top-app-bar-container'>
      <TopAppBar
        title='Miami, FL'
        navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('click')}
        />}
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
    </div>
  );
}

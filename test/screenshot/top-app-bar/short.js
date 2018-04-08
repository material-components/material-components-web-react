import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

export default class Short extends React.Component {
  render() {
    return (
      <TopAppBar
        short
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('short click')}/>}
        actionItems={[<MaterialIcon key='item' icon='bookmark'/>]}
      />
    );
  }
};

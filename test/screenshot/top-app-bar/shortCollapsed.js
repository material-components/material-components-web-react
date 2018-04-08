import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

export default class ShortCollapsed extends React.Component {
  render() {
    return (
      <TopAppBar
        shortCollapsed
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('click')}/>}
      />
    );
  }
};

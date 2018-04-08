import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

export default class Prominent extends React.Component {
  render() {
    return (
      <TopAppBar
        prominent
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('prominent click')}/>}
        actionItems={[<MaterialIcon key='item' icon='bookmark'/>]}
      />
    );
  }
};

import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';

import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

export default class StandardNoActionItems extends React.Component {
  render() {
    return (
      <TopAppBar
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('click')}/>}
      />
    );
  }
};

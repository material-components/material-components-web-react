import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

export default class Standard extends React.Component {
  render() {
    return (
      <TopAppBar
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('click')}/>}
        actionItems={[<MaterialIcon key='item' icon='bookmark'/>]}
      />
    );
  }
};

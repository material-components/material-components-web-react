import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import classnames from 'classnames/bind';

import styles from './test1.scss';
const cx = classnames.bind(styles);

export default class Standard extends React.Component {
  render() {
    return (
      <TopAppBar
        className={cx('demo')}
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('click')}/>}
        actionItems={[<MaterialIcon key='item' icon='bookmark'/>]}
      />
    );
  }
};

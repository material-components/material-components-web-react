import React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import classnames from 'classnames/bind';

import styles from './test2.scss';
const cx = classnames.bind(styles);

export default class StandardNoActionItems extends React.Component {
  render() {
    return (
      <TopAppBar
        className={cx('demo')}
        title='Miami, FL'
        navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('click')}/>}
      />
    );
  }
};

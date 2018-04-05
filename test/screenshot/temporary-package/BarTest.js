import styles from './bar-test.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import React from 'react';

export default class BarTest extends React.Component {

  render() {
    return (
      <div className={cx('test-color')}>
        bar
      </div>
    );
  }

}

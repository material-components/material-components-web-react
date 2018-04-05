import styles from './foo-test.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import React from 'react';

export default class FooTest extends React.Component {

  render() {
    return (
      <div className={cx('test-color')}>
        foo
      </div>
    );
  }

}

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from '../chip';

export default class ChipSet extends Component {
  foundation_ = null;

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, choice, filter} = this.props;
    return classnames('mdc-chip-set', className);
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  render() {
    return (
      <div className={this.classes}>
        {this.props.children}
      </div>
    );
  }
}

ChipSet.propTypes = {
  className: PropTypes.string,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
};

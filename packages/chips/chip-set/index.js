import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from '../chip';

export default class ChipSet extends Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.maxId = 0;
    this.state = {
      chips: props.labels.map((label) => {
        return {
          label,
          id: this.maxId++,
        };
      }),
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className} = this.props;
    return classnames('mdc-chip-set', className);
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  renderChip(chip) {
    return (
      <Chip key={chip.id}>{chip.label}</Chip>
    );
  }

  render() {
    return (
      <div className={this.classes}>
        {this.state.chips.map(this.renderChip)}
      </div>
    );
  }
}

ChipSet.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.array.isRequired,
};

ChipSet.defaultProps = {
  className: '',
};

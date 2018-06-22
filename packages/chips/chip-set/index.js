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
      classList: new Set(),
      chips: this.props.chipLabels.map((label) => {
        return {
          label: label,
          id: this.maxId++
        }
      })
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
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-chip-set', Array.from(classList), className);
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  renderInputChip(chip) {
    return (
      <Chip key={chip.id} label={chip.label}/>
    );
  }

  render() {
    return (
      <div className={this.classes}>
        {this.state.chips.map(this.renderInputChip.bind(this))}
      </div>
    );
  }
}

ChipSet.propTypes = {
  className: PropTypes.string,
  chipLabels: PropTypes.array.isRequired,
};

ChipSet.defaultProps = {
  className: '',
};

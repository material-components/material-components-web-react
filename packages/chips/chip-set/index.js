import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from '../chip';

export default class ChipSet extends Component {
  foundation_ = null;
  preSelectedChipFoundations_ = [];

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
    this.preSelectedChipFoundations_.forEach(
      chipFoundation => this.foundation_.select(chipFoundation));
    this.preSelectedChipFoundations_ = [];
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, choice, filter} = this.props;
    return classnames('mdc-chip-set', className, {
      'mdc-chip-set--choice': choice,
      'mdc-chip-set--filter': filter,
    });
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  handleChipInteration(e) {
    // TODO: add toggleSelection(chipFoundation) method to MDC Web Chip Set
    this.foundation_.chipInteractionHandler_(e);
  }

  handlePreSelect(chipFoundation) {
    if (this.foundation_) {
      // This case occurs when input chips are added to an existing chip set.
      this.foundation_.select(chipFoundation);
    } else {
      this.preSelectedChipFoundations_.push(chipFoundation);
    }
  }

  renderChip(chip) {
    return (
      <Chip
        handleChipInteration={this.handleChipInteration.bind(this)}
        handlePreSelect={this.handlePreSelect.bind(this)}
        {...chip.props}
      />
    );
  }

  render() {
    return (
      <div className={this.classes}>
        {React.Children.map(this.props.children, (chip) => this.renderChip(chip))}
      </div>
    );
  }
}

ChipSet.propTypes = {
  className: PropTypes.string,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
};

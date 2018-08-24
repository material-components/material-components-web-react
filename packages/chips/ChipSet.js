import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import ChipCheckmark from './ChipCheckmark';

export default class ChipSet extends Component {
  checkmarkWidth_ = 0;
  selectedChipIds_ = this.props.selectedChipIds || new Set();

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, filter, choice, input} = this.props;
    return classnames('mdc-chip-set', className, {
      'mdc-chip-set--filter': filter,
      'mdc-chip-set--choice': choice,
      'mdc-chip-set--input': input,
    });
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
      setSelected: (chipId, selected) => {
        const index = this.selectedChipIds_.indexOf(chipId);
        if (selected && index < 0) {
          this.selectedChipIds_.push(chipId);
        } else if (!selected && index > 0) {
          this.selectedChipIds_.splice(index, 1);
        }
      }
    };
  }

  handleSelect = (chipId) => {
    if (this.props.filter || this.props.choice) {
      this.foundation_.toggleSelect(chipId);
    }
    this.props.handleSelect(this.selectedChipIds_);
  }

  handleRemove = (chipId) => {
    if (this.props.input) {
      this.foundation_.deselect(chipId);
    }
    this.props.handleRemove(chipId);
  }

  setCheckmarkWidth = (checkmark) => {
    if (!!this.checkmarkWidth_) {
      return;
    }
    this.checkmarkWidth_ = checkmark.width;
  }

  computeBoundingRect = (chipElement) => {
    const height = chipElement.getBoundingClientRect().height;
    const width = chipElement.getBoundingClientRect().width + this.checkmarkWidth_;
    return {height, width};
  }

  renderChip = (chip) => {
    const props = {
      selected: this.state.selectedChipIds.has(chip.id),
      handleSelect: this.handleSelect,
      handleRemove: this.handleRemove,
      chipCheckmark: this.props.filter ? <ChipCheckmark ref={this.setCheckmarkWidth}/> : null,
      computeBoundingRect: this.props.filter ? this.computeBoundingRect : null,
      ...chip.props,
    };

    return React.cloneElement(chip, props);
  }

  render() {
    return (
      <div className={this.classes}>
        {React.Children.map(this.props.children, this.renderChip)}
      </div>
    );
  }
}

ChipSet.propTypes = {
  className: PropTypes.string,
  selectedChipIds: PropTypes.Set,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
  input: PropTypes.bool,
  children: PropTypes.node,
};

ChipSet.defaultProps = {
  className: '',
  selectedChipIds: {},
  handleSelect: () => {},
  handleRemove: () => {},
  choice: false,
  filter: false,
  input: false,
  children: null,
};

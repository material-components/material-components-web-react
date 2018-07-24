import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ChipCheckmark from './ChipCheckmark';
import Chip from './Chip';

export default class ChipSet extends Component {
  checkmarkWidth_ = 0;

  get classes() {
    const {className, input} = this.props;
    return classnames('mdc-chip-set', className, {
      'mdc-chip-set--input': input,
    });
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
    return (
      <Chip
        chipCheckmark={this.props.filter ? <ChipCheckmark ref={this.setCheckmarkWidth}/> : null}
        computeBoundingRect={this.props.filter ? this.computeBoundingRect : null}
        {...chip.props} />
    );
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
  filter: PropTypes.bool,
  input: PropTypes.bool,
  children: PropTypes.node,
};

ChipSet.defaultProps = {
  className: '',
  filter: false,
  input: false,
  children: null,
};

// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCChipSetFoundation} from '@material/chips';

import ChipCheckmark from './ChipCheckmark';

export default class ChipSet extends Component {
  checkmarkWidth_ = 0;
  foundation_ = null;
  state = {
    selectedChipIds: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
    this.updateChipSelection();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedChipIds !== prevProps.selectedChipIds) {
      this.updateChipSelection();
    }
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
        const {selectedChipIds} = this.state;
        if (selected) {
          selectedChipIds.add(chipId);
        } else {
          selectedChipIds.delete(chipId);
        }
        this.setState({selectedChipIds});
      }
    };
  }

  updateChipSelection = () => {
    React.Children.forEach(this.props.children, (child) => {
      const {id} = child.props;
      const childIsSelected = this.props.selectedChipIds.indexOf(id) > -1;
      if (childIsSelected) {
        this.foundation_.select(id);
      } else {
        this.foundation_.deselect(id);
      }
    });
  }

  handleSelect = (chipId) => {
    const {handleSelect, choice, filter} = this.props;
    if (filter || choice) {
      this.foundation_.toggleSelect(chipId);
    }
    handleSelect(this.foundation_.getSelectedChipIds());
  }

  handleRemove = (chipId) => {
    const {input, handleRemove} = this.props;
    if (input) {
      // this should be calling foundation_.handleChipRemoval, but we would
      // need to pass evt.detail.chipId
      this.foundation_.deselect(chipId);
    }
    handleRemove(chipId);
  }

  setCheckmarkWidth = (checkmark) => {
    if (!!this.checkmarkWidth_) {
      return;
    }
    this.checkmarkWidth_ = checkmark.width;
  }

  computeBoundingRect = (chipElement) => {
    const {height, width: chipWidth} = chipElement.getBoundingClientRect();
    const width = chipWidth + this.checkmarkWidth_;
    return {height, width};
  }

  renderChip = (chip) => {
    const {filter} = this.props;
    const {selectedChipIds} = this.state;

    const props = Object.assign({
      selected: selectedChipIds.has(chip.props.id),
      handleSelect: this.handleSelect,
      handleRemove: this.handleRemove,
      chipCheckmark: filter ? <ChipCheckmark ref={this.setCheckmarkWidth}/> : null,
      computeBoundingRect: filter ? this.computeBoundingRect : null,
    }, ...chip.props);

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
  selectedChipIds: PropTypes.array,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
  input: PropTypes.bool,
  children: PropTypes.node,
};

ChipSet.defaultProps = {
  className: '',
  selectedChipIds: [],
  handleSelect: () => {},
  handleRemove: () => {},
  choice: false,
  filter: false,
  input: false,
  children: null,
};

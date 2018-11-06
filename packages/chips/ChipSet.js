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

  state = {
    selectedChipIds: new Set(this.props.selectedChipIds),
    foundation: null,
  };

  componentDidMount() {
    const foundation = new MDCChipSetFoundation(this.adapter);
    this.setState({foundation});
    foundation.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedChipIds !== prevProps.selectedChipIds) {
      const selectedChipIds = new Set(this.props.selectedChipIds);
      this.setState({selectedChipIds});
      this.updateChipSelection(selectedChipIds);
    }
    if (this.state.foundation !== prevState.foundation) {
      this.updateChipSelection(this.state.selectedChipIds);
    }
  }

  componentWillUnmount() {
    this.state.foundation.destroy();
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
      },
      removeChip: this.removeChip,
    };
  }

  updateChipSelection(ids) {
    React.Children.forEach(this.props.children, (child) => {
      const {id} = child.props;
      if (ids.has(id)) {
        this.state.foundation.select(id);
      }
    });
  }

  handleInteraction = (chipId) => {
    const {handleSelect} = this.props;
    this.state.foundation.handleChipInteraction(chipId);
    handleSelect(this.state.foundation.getSelectedChipIds());
  }

  handleSelect = (chipId) => {
    const {handleSelect} = this.props;
    this.state.foundation.handleChipSelection(chipId);
    handleSelect(this.state.foundation.getSelectedChipIds());
  }


  handleRemove = (chipId) => {
    if (this.props.input) {
      this.state.foundation.handleChipRemoval(chipId);
    }
  }

  removeChip = (chipId) => {
    const {updateChips, children} = this.props;
    if (!children) return;

    const chips = React.Children.toArray(children).slice();
    for (let i = 0; i < chips.length; i ++) {
      const chip = chips[i];
      if (chip.props.id === chipId) {
        chips.splice(i, 1);
        break;
      }
    }
    const chipsArray = chips.length ? chips.map((chip) => chip.props) : [];
    updateChips(chipsArray);
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
      handleInteraction: this.handleInteraction,
      handleRemove: this.handleRemove,
      chipCheckmark: filter ? <ChipCheckmark ref={this.setCheckmarkWidth}/> : null,
      computeBoundingRect: filter ? this.computeBoundingRect : null,
    }, ...chip.props);

    return React.cloneElement(chip, props);
  }

  render() {
    // need foundation on state, because Chip calls a foundation method
    // before ChipSet mounts
    if (!this.state.foundation) return null;
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
  updateChips: PropTypes.func,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
  input: PropTypes.bool,
  children: PropTypes.node,
};

ChipSet.defaultProps = {
  className: '',
  selectedChipIds: [],
  handleSelect: () => {},
  updateChips: () => {},
  choice: false,
  filter: false,
  input: false,
  children: null,
};

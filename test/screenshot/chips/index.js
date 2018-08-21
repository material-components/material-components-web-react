import React from 'react';
import './index.scss';
import '../../../packages/chips/index.scss';

import {Chip, ChipSet} from '../../../packages/chips';

class ShirtSizes extends React.Component {
  state = {
    selectedChipId: 0,
  };

  isSelected = (id) => {
    return this.state.selectedChipId === id;
  }

  handleSelect = (id) => {
    if (this.isSelected(id)) {
      this.setState({selectedChipId: -1});
    } else {
      this.setState({selectedChipId: id});
    }
  }

  render() {
    return (
      <ChipSet>
        <Chip selected={this.isSelected(0)} id={0} label='Small' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Medium' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Large' handleSelect={this.handleSelect}/>
      </ChipSet>
    );
  }
}

class ShoppingFilters extends React.Component {
  state = {
    selectedChipIds: new Set([0, 1]),
  };

  isSelected = (id) => {
    return this.state.selectedChipIds.has(id);
  }

  handleSelect = (id) => {
    const selectedChipIds = new Set(this.state.selectedChipIds);
    if (this.isSelected(id)) {
      selectedChipIds.delete(id);
    } else {
      selectedChipIds.add(id);
    }
    this.setState({selectedChipIds});
  }

  render() {
    return (
      <ChipSet filter>
        <Chip selected={this.isSelected(0)} id={0} label='Tops' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Bottoms' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Shoes' handleSelect={this.handleSelect}/>
      </ChipSet>
    );
  }
}

const ChipsScreenshotTest = () => {
  return (
    <div>
      Choice chips
      <ShirtSizes />
      Filter chips
      <ShoppingFilters />
    </div>
  );
};

export default ChipsScreenshotTest;

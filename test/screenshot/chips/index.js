import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Chip, ChipSet} from '../../../packages/chips';

class ShirtSizes extends React.Component {
  state = {
    selectedChipIds: new Set([1]),
  };

  handleSelect = (selectedChipIds) => {
    this.setState(selectedChipIds);
  }

  render() {
    return (
      <ChipSet
        choice
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={this.handleSelect}
      >
        <Chip id={'chip1'} label='Small' />
        <Chip id={'chip2'} label='Medium' />
        <Chip id={'chip3'} label='Large' />
      </ChipSet>
    );
  }
}

class ShoppingFilters extends React.Component {
  state = {
    selectedChipIds: new Set([0, 1]),
  };

  handleSelect = (selectedChipIds) => {
    this.setState(selectedChipIds);
  }

  render() {
    return (
      <ChipSet
        filter
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={this.handleSelect}
      >
        <Chip id={'chip1'} label='Tops' />
        <Chip id={'chip2'} label='Bottoms' />
        <Chip id={'chip3'} label='Shoes' />
      </ChipSet>
    );
  }
}

ReactDOM.render((
  <div>
    Choice chips
    <ShirtSizes />
    Filter chips
    <ShoppingFilters />
  </div>
), document.getElementById('app'));

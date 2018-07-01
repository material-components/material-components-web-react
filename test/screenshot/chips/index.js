import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Chip} from '../../../packages/chips';
import ChipSet from '../../../packages/chips';

class ShoppingPage extends React.Component {
  state = {
    selectedChipId: 0,
  }

  isSelected = (id) => {
    return this.state.selectedChipId == id;
  }

  handleSelect = (id) => {
    if (this.isSelected(id)) {
      this.setState({selectedChipId: -1});
    } else {
      this.setState({selectedChipId: id});
    }

    // Do something, like update page based on selected size
  }

  render() {
    return (
      <ChipSet>
        <Chip selected={this.isSelected(0)} id={0} label='Small' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Medium' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Large' handleSelect={this.handleSelect}/>
      </ChipSet>
    )
  }
}

class SearchPage extends React.Component {
  state = {
    selectedChipIds: [0, 1],
  }

  isSelected = (id) => {
    return this.state.selectedChipIds.indexOf(id) > -1;
  }

  handleSelect = (id) => {
    const selectedChipIds = [...this.state.selectedChipIds];
    if (this.isSelected(id)) {
      const index = selectedChipIds.indexOf(id);
      selectedChipIds.splice(index, 1);
    } else {
      selectedChipIds.push(id);
    }
    this.setState({selectedChipIds});

    // Do something, like filter page by selected results
  }

  render() {
    return (
      <ChipSet>
        <Chip selected={this.isSelected(0)} id={0} label='Tops' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Bottoms' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Shoes' handleSelect={this.handleSelect}/>
      </ChipSet>
    )
  }
}

ReactDOM.render((
  <div>
    Choice chips
    <ShoppingPage />
    Filter chips
    <SearchPage />
  </div>
), document.getElementById('app'));

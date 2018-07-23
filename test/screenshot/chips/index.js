import React from 'react';
import ReactDOM from 'react-dom';
import MaterialIcon from '../../../packages/material-icon/index';
import './index.scss';

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

class ContactsEntry extends React.Component {
  state = {
    chips: [{
      label: 'Jane Smith',
      id: 0
     }, {
      label: 'John Doe',
      id: 1
     }],
  };

  removeChip = (id) => {
    const chips = [...this.state.chips];
    const index = chips.findIndex(chip => chip.id === id);
    chips.splice(index, 1);
    this.setState({chips});
  }

  render() {
    return (
      <ChipSet>
        {this.state.chips.map((chip) =>
          <Chip
            // The chip's key cannot be its index, because its index may change due to adding/removing other chips.
            key={chip.id}
            id={chip.id}
            label={chip.label}
            leadingIcon={<MaterialIcon icon='face' />}
            removeIcon={<MaterialIcon icon='cancel' />}
            handleRemove={this.removeChip}
          />
        )}
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
    Input chips
    <ContactsEntry />
  </div>
), document.getElementById('app'));

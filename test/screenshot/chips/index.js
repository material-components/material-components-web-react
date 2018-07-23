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
        <Chip selected={this.isSelected(0)} label='Small' handleSelect={() => this.handleSelect(0)}/>
        <Chip selected={this.isSelected(1)} label='Medium' handleSelect={() => this.handleSelect(1)}/>
        <Chip selected={this.isSelected(2)} label='Large' handleSelect={() => this.handleSelect(2)}/>
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
        <Chip selected={this.isSelected(0)} label='Tops' handleSelect={() => this.handleSelect(0)}/>
        <Chip selected={this.isSelected(1)} label='Bottoms' handleSelect={() => this.handleSelect(1)}/>
        <Chip selected={this.isSelected(2)} label='Shoes' handleSelect={() => this.handleSelect(2)}/>
      </ChipSet>
    );
  }
}

class ContactsEntry extends React.Component {
  state = {
    chips: [
      {label: 'Jane Smith', id: 0},
      {label: 'John Doe', id: 1}
    ],
    nextId: 2,
  };

  addChip(label) {
    const id = this.state.nextId;
    const newChip = {label, id};

    const chips = [...this.state.chips];
    chips.push(newChip);
    this.setState({
      chips,
      nextId: id + 1,
    });
  }

  handleKeyDown = (e) => {
    if (!(e.key === 'Enter') || !e.target.value) {
      return;
    }
    this.addChip(e.target.value);
    e.target.value = '';
  }

  handleRemoveChip = (id) => {
    const chips = [...this.state.chips];
    const index = chips.findIndex(chip => chip.id === id);
    chips.splice(index, 1);
    this.setState({chips});
  }

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <ChipSet input>
          {this.state.chips.map((chip) =>
            <Chip
              key={chip.id} // The chip's key cannot be its index, because its index may change.
              label={chip.label}
              leadingIcon={<MaterialIcon icon='face' />}
              removeIcon={<MaterialIcon icon='cancel' />}
              handleRemove={() => this.handleRemoveChip(chip.id)}
            />
          )}
        </ChipSet>
      </div>
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

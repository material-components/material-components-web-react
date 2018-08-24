import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import MaterialIcon from '../../../packages/material-icon';
import {Chip, ChipSet} from '../../../packages/chips';

class ShirtSizes extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds,
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
        {this.props.children}
      </ChipSet>
    );
  }
}

class ShoppingFilters extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds,
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
        {this.props.children}
      </ChipSet>
    );
  }
}

class ContactList extends React.Component {
  state = {
    chips: this.props.chips,
  };
  
  addChip(label) {
    const id = label.replace(/\s/g,'');
    // Create a new chips array to ensure that a re-render occurs.
    // See: https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
    const chips = [...this.state.chips]; 
    chips.push({label, id});
    this.setState({chips});
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.addChip(e.target.value);
      e.target.value = '';
    }
  }

  handleRemove = (id) => {
    const chips = [...this.state.chips]; 
    const index = chips.findIndex((chip) => chip.id === id);
    chips.splice(index, 1);
    this.setState({chips});
  }
  
  render() {
    return (
      <div>
        <input
          type="text"
          onKeyDown={this.handleKeyDown}
        />
        <ChipSet
          input
          handleRemove={this.handleRemove}
        >
          {this.state.chips.map((chip) =>
            <Chip
              key={chip.id} // The chip's key cannot be its index, because its index may change.
              label={chip.label}
              leadingIcon={<MaterialIcon icon='face' />}
              removeIcon={<MaterialIcon icon='cancel' />}
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
    <ShirtSizes selectedChipIds={['chip2']}>
      <Chip id={'chip1'} label='Small' />
      <Chip id={'chip2'} label='Medium' />
      <Chip id={'chip3'} label='Large' />
    </ShirtSizes>

    Filter chips
    <ShoppingFilters selectedChipIds={['chip1', 'chip2']}>
      <Chip id={'chip1'} label='Tops' />
      <Chip id={'chip2'} label='Bottoms' />
      <Chip id={'chip3'} label='Shoes' />
    </ShoppingFilters>

    Input chips
    <ContactList chips={[
      {label: 'Jane Smith', id: 'janesmith'},
      {label: 'John Doe', id: 'johndoe'},
    ]}/>
  </div>
), document.getElementById('app'));

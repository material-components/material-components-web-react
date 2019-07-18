import React from 'react';
import {Chip, ChipSet} from '@material/react-chips';
import MaterialIcon from '@material/react-material-icon';

class ChoiceChips extends React.Component {
  state = {
    selectedChipIds: ['choice2'],
  };

  setSelectedChipIds = (selectedChipIds: string[]) => {
    this.setState({selectedChipIds});
  };

  render() {
    return (
      <ChipSet
        choice
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={this.setSelectedChipIds}
      >
        <Chip id='choice1' label='choice1' />
        <Chip id='choice2' label='choice2' />
        <Chip id='choice3' label='choice3' />
      </ChipSet>
    );
  }
}

class FilterChips extends React.Component {
  state = {
    selectedChipIds: ['filter1', 'filter2'],
  };

  setSelectedChipIds = (selectedChipIds: string[]) => {
    this.setState({selectedChipIds});
  };

  render() {
    return (
      <ChipSet
        filter
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={this.setSelectedChipIds}
      >
        <Chip id='filter1' label='filter1' />
        <Chip id='filter2' label='filter2' />
        <Chip id='filter3' label='filter3' />
      </ChipSet>
    );
  }
}

class InputChips extends React.Component {
  state = {
    chips: [
      {label: 'Jane Smith', id: this.getUUID('Jane Smith')},
      {label: 'John Doe', id: this.getUUID('John Doe')},
    ],
  };

  getUUID(label: string) {
    return (
      label.replace(/\s/g, '') +
      Math.random().toString().slice(2)
    );
  }

  handleKeyDown = (e: any) => {
    const input = e.target;
    const label = input.value;
    if (!!label && e.key === 'Enter') {
      this.setState({
        chips: this.state.chips.concat({
          label,
          id: this.getUUID(label),
        }),
      });
      input.value = '';
    }
  };

  render() {
    return (
      <div>
        <label>
          <input type='text' onKeyDown={this.handleKeyDown} />
          <span>type & enter & add</span>
        </label>
        <ChipSet input updateChips={(chips) => this.setState({chips})}>
          {this.state.chips.map((chip) => (
            <Chip
              id={chip.id}
              key={chip.id}
              label={chip.label}
              trailingIcon={<MaterialIcon icon='cancel' />}
            />
          ))}
        </ChipSet>
      </div>
    );
  }
}

export const ChipsExample = () => (
  <React.Fragment>
    <div>
      <ChoiceChips />
    </div>
    <div>
      <FilterChips />
    </div>
    <div>
      <InputChips />
    </div>
  </React.Fragment>
);

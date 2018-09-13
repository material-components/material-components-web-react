import React from 'react';
import './index.scss';
import '../../../packages/chips/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import {Chip, ChipSet} from '../../../packages/chips/index';
import uuidv1 from 'uuid/v1';

class ChoiceChipsTest extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds, // eslint-disable-line
  };

  render() {
    const {children} = this.props; // eslint-disable-line
    return (
      <div>
        <ChipSet
          choice
          selectedChipIds={this.state.selectedChipIds}
          handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
        >
          {children}
        </ChipSet>
      </div>
    );
  }
}

class FilterChipsTest extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds, // eslint-disable-line
  };

  render() {
    const {children} = this.props; // eslint-disable-line
    return (
      <div>
        <ChipSet
          filter
          selectedChipIds={this.state.selectedChipIds}
          handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
        >
          {children}
        </ChipSet>
        <button onClick={() => this.setState({selectedChipIds: ['2chip', '0chip']})}>
          Select first and last
        </button>
      </div>
    );
  }
}

class InputChipsTest extends React.Component {
  state = {
    chips: this.props.labels.map((label) => {
      return {label: label, id: uuidv1()}
    }),
  };

  addChip(label) {
    // Create a new chips array to ensure that a re-render occurs.
    // See: https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
    const chips = [...this.state.chips];
    chips.push({label, id: uuidv1()});
    this.setState({chips});
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.addChip(e.target.value);
      e.target.value = '';
    }
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
          handleRemove={(chipId) => {
            const {chips} = this.state;
            const chip = chips.find((chip) => chip.id === chipId);
            const index = chips.indexOf(chip);
            chips.splice(index, 1);
            this.setState(chips);
          }}>
          {this.state.chips.map((chip) =>
            <Chip
              id={chip.id}
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

const sizes = ['Small', 'Medium', 'Large'];
const clothes = ['Tops', 'Bottoms', 'Shoes'];
const contacts = ['Jane Smith', 'John Doe'];

const renderChips = (list) => {
  return list.map((label, index) => (
    <Chip id={`${index}chip`} key={index} label={label} />
  ));
};

const ChipsScreenshotTest = () => {
  return (
    <div>
      Choice chips
      <ChipSet choice>
        {renderChips(sizes)}
      </ChipSet>

      Choice chips (preselected)
      <ChoiceChipsTest selectedChipIds={['2chip']}>
        {renderChips(sizes)}
      </ChoiceChipsTest>

      Filter Chips
      <ChipSet filter>
        {renderChips(clothes)}
      </ChipSet>

      Filter chips (preselected)
      <FilterChipsTest selectedChipIds={['1chip', '2chip']}>
        {renderChips(clothes)}
      </FilterChipsTest>

      Input chips
      <InputChipsTest labels={contacts}/>
    </div>
  );
};

export default ChipsScreenshotTest;

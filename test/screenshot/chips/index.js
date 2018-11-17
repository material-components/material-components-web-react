import React from 'react';
import './index.scss';
import '../../../packages/chips/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import {Chip, ChipSet} from '../../../packages/chips/index';
import uuidv1 from 'uuid/v1';

class ChipsTest extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds, // eslint-disable-line react/prop-types
  };

  render() {
    const {children, variant} = this.props; // eslint-disable-line react/prop-types
    const isChoice = variant === 'choice';
    const isFilter = variant === 'filter';
    return (
      <div>
        <ChipSet
          choice={isChoice}
          filter={isFilter}
          selectedChipIds={this.state.selectedChipIds}
          handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
        >
          {children}
        </ChipSet>
        <button onClick={() => this.setState({selectedChipIds: ['2chip', '0chip']})}>
          {isChoice ? 'Select first' : 'Select first and last'}
        </button>
      </div>
    );
  }
}

class InputChipsTest extends React.Component {
  state = {
    chips: this.props.labels.map((label) => { // eslint-disable-line react/prop-types
      return {label: label, id: uuidv1()};
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
          updateChips={(chips) => this.setState({chips})}
        >
          {this.state.chips.map((chip) =>
            <Chip
              id={chip.id}
              key={chip.id} // The chip s key cannot be its index, because its index may change
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

const seasons = ['Winter', 'Summer', 'Spring', 'Autumn'];
const sizes = ['Small', 'Medium', 'Large'];
const clothes = ['Tops', 'Bottoms', 'Shoes'];
const contacts = ['Jane Smith', 'John Doe'];

const renderChips = (list, hasLeadingIcon = false) => {
  return list.map((label, index) => (
    <Chip
      id={`${index}chip`}
      key={index}
      label={label}
      leadingIcon={hasLeadingIcon ? <MaterialIcon icon='shopping_basket' /> : null}
    />
  ));
};

const ChipsScreenshotTest = () => {
  return (
    <div>
      Default Chips
      <ChipSet>
        {renderChips(seasons)}
      </ChipSet>

      Choice Chips
      <ChipsTest variant='choice' selectedChipIds={['2chip']}>
        {renderChips(sizes)}
      </ChipsTest>

      Filter Chips with Leading Icon
      <ChipsTest variant='filter' selectedChipIds={['1chip', '2chip']}>
        {renderChips(clothes, true)}
      </ChipsTest>

      <InputChipsTest labels={contacts}/>
    </div>
  );
};

export default ChipsScreenshotTest;

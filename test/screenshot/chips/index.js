import React from 'react';
import './index.scss';
import '../../../packages/chips/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import {Chip, ChipSet} from '../../../packages/chips/index';
import uuidv1 from 'uuid/v1';

class ShirtSizes extends React.Component {
  state = {
    selectedChipIds: this.props.selectedChipIds, // eslint-disable-line
  };

  render() {
    const {children} = this.props; // eslint-disable-line
    const {selectedChipIds} = this.state;
    return (
      <div>
        <ChipSet
          choice
          selectedChipIds={selectedChipIds}
          handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
        >
          {children}
        </ChipSet>
        <div>
          {selectedChipIds}
        </div>
      </div>
    );
  }
}

class ShoppingFilters extends React.Component {
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

class ContactList extends React.Component {
  state = {
    chips: this.props.chips, // eslint-disable-line
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
        <ChipSet input>
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

const sizes = ['Small', 'Medium', 'Large'];
const clothes = ['Tops', 'Bottoms', 'Shoes'];

const renderChips = (list) => {
  return list.map((size, index) => (
    <Chip id={`${index}chip`} key={index} label={size} />
  ));
};

const ChipsScreenshotTest = () => {
  return (
    <div>
      Choice chips
      <ChipSet choice>
        {renderChips(sizes)}
      </ChipSet>

      Filter Chips
      <ChipSet filter>
        {renderChips(clothes)}
      </ChipSet>

      Choice chips (preselected)
      <ShirtSizes selectedChipIds={['2chip']}>
        {renderChips(sizes)}
      </ShirtSizes>

      Filter chips (preselected)
      <ShoppingFilters selectedChipIds={['1chip', '2chip']}>
        {renderChips(clothes)}
      </ShoppingFilters>

      Input chips
      <ContactList chips={[
        {label: 'Jane Smith', id: 'janesmith'},
        {label: 'John Doe', id: 'johndoe'},
      ]}/>
    </div>
  );
};

export default ChipsScreenshotTest;

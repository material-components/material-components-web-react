import React from 'react';
import './index.scss';
import '../../../packages/chips/index.scss';
import MaterialIcon from '../../../packages/material-icon';
import {ChipProps, Chip, ChipSet} from '../../../packages/chips/index'; // eslint-disable-line @typescript-eslint/no-unused-vars
import uuidv1 from 'uuid/v1';

interface ChipsTestProps {
  selectedChipIds: string[];
  variant: 'filter' | 'choice';
  children: React.ReactElement<ChipProps>[];
}

interface ChipsTestState {
  selectedChipIds: string[];
}

class ChipsTest extends React.Component<ChipsTestProps, ChipsTestState> {
  state = {
    selectedChipIds: this.props.selectedChipIds,
  };

  handleSelect = (selectedChipIds: string[]) =>
    this.setState({selectedChipIds});

  render() {
    const {children, variant} = this.props;
    const isChoice = variant === 'choice';
    const isFilter = variant === 'filter';
    return (
      <div>
        <ChipSet
          choice={isChoice}
          filter={isFilter}
          selectedChipIds={this.state.selectedChipIds}
          handleSelect={this.handleSelect}
        >
          {children}
        </ChipSet>
        <button
          onClick={() => this.setState({selectedChipIds: ['2chip', '0chip']})}
        >
          {isChoice ? 'Select first' : 'Select first and last'}
        </button>
      </div>
    );
  }
}
type InputChipsTestProps = {
  labels: string[];
};

type InputChip = {
  label: string;
  id: string;
};

type InputChipsTestState = {
  chips: InputChip[];
};

class InputChipsTest extends React.Component<
  InputChipsTestProps,
  InputChipsTestState
> {
  state = {
    chips: this.props.labels.reduce(
      (a, label) => [...a, {label, id: uuidv1()}],
      [{label: 'Name Chips (dont remove)', id: uuidv1()}]
    ),
  };

  addChip(label: string) {
    // Create a new chips array to ensure that a re-render occurs.
    // See: https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
    const chips = [...this.state.chips];
    chips.push({label, id: uuidv1()});
    this.setState({chips});
  }

  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
      this.addChip((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  updateChips: (chips: Partial<ChipProps>[]) => void = (chips) =>
    this.setState((prevState) => Object.assign(prevState, {chips}));

  render() {
    return (
      <div>
        <input type='text' onKeyDown={this.handleKeyDown} />
        <ChipSet input updateChips={this.updateChips}>
          {this.state.chips.map((chip, i: number) => (
            <Chip
              id={chip.id}
              key={chip.id} // The chip s key cannot be its index, because its index may change
              label={chip.label}
              leadingIcon={i === 0 ? undefined : <MaterialIcon icon='face' />}
              trailingIcon={
                <MaterialIcon icon={i === 0 ? 'announcement' : 'cancel'} />
              }
              shouldRemoveOnTrailingIconClick={i !== 0}
            />
          ))}
        </ChipSet>
      </div>
    );
  }
}

const seasons = ['Winter', 'Summer', 'Spring', 'Autumn'];
const sizes = ['Small', 'Medium', 'Large'];
const clothes = ['Tops', 'Bottoms', 'Shoes'];
const contacts = ['Jane Smith', 'John Doe'];

const renderChips = (list: string[], hasLeadingIcon: boolean = false) => {
  return list.map((label: string, index: number) => (
    <Chip
      id={`${index}chip`}
      key={index}
      label={label}
      leadingIcon={
        hasLeadingIcon ? <MaterialIcon icon='shopping_basket' /> : undefined
      }
    />
  ));
};

const ChipsScreenshotTest = () => {
  return (
    <div>
      Default Chips
      <ChipSet>{renderChips(seasons)}</ChipSet>
      Choice Chips
      <ChipsTest variant='choice' selectedChipIds={['2chip']}>
        {renderChips(sizes)}
      </ChipsTest>
      Filter Chips with Leading Icon
      <ChipsTest variant='filter' selectedChipIds={['1chip', '2chip']}>
        {renderChips(clothes, true)}
      </ChipsTest>
      <InputChipsTest labels={contacts} />
    </div>
  );
};

export default ChipsScreenshotTest;

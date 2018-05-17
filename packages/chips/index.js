import React from 'react';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from './chip';

class ChipSet extends React.Component {
  constructor(props) {
    super(props);
    this.chipSetEl = React.createRef();
    this.chipSetInputEl = React.createRef();

    this.state = {
      chipNames: ['Jane Smith', 'John Doe']
    };
    this.chips = [];
    this.removeChip = this.removeChip.bind(this);
  }

  componentDidMount() {
    this.foundation_ = new MDCChipSetFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  handleInputKeyDown() {
    if ((e.key === 'Enter' || e.keyCode === 13) || (e.key === 'Tab' || e.keyCode === 9)
      && this.chipSetInputEl.value !== '') {
        e.preventDefault();
        this.addInputChip();
    } else if ((e.key === 'Backspace' || e.keyCode === 8)&& this.chipSetInputEl.value === '') {
      const chipName = this.state.chipNames[this.state.chipNames.length - 1];
      this.removeChip(chipName);
    }
  }

  addInputChip() {
    const inputValue = this.chipSetInputEl.value;
    this.setState({chipNames: this.state.chipNames.add(inputValue)});
    this.chipSetInputEl.value = '';
  }

  removeChip(chipName) {
    const {chipNames} = this.state;
    chipNames.delete(chipName);
    this.setState({chipNames});
  }

  renderChip(name, index) {
    return (
      <Chip
        index={index}
        name={name}
        removeChip={this.removeChip}
      />
    );
  }

  render() {
    return (
      <div className='catalog-input-chips'>
        <div className='mdc-chip-set mdc-chip-set--input' ref={this.chipSetEl}>
          {this.state.chipNames.map(this.renderChip)}
          <input className='catalog-input' onKeyDown={this.handleInputKeyDown} ref={this.chipSetInputEl} />
        </div>
      </div>
    );
  }
}

export default ChipSet;

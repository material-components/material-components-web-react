import React from 'react';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from './chip';

class ChipSet extends React.Component {
  constructor(props) {
    super(props);
    this.chipSetEl = React.createRef();

    this.state = {
      inputValue: '',
      chipNames: ['Jane Smith', 'John Doe']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.addInputChip = this.addInputChip.bind(this);
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

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleInputKeyDown(e) {
    if ((e.key === 'Enter' || e.keyCode === 13) || (e.key === 'Tab' || e.keyCode === 9)
      && this.state.inputValue !== '') {
        this.addInputChip();
    } else if ((e.key === 'Backspace' || e.keyCode === 8) && this.state.inputValue == '') {
      const chipName = this.state.chipNames[this.state.chipNames.length - 1];
      this.removeChip(chipName);
    }
  }

  addInputChip() {
    const {chipNames} = this.state;
    chipNames.push(this.state.inputValue);
    this.setState({
      inputValue: '',
      chipNames: chipNames
    });
  }

  removeChip(chipName) {
    const {chipNames} = this.state;
    const index = chipNames.indexOf(chipName);
    chipNames.splice(index, 1);
    this.setState({chipNames});
  }

  renderInputChip(name, index) {
    return (
      <Chip key={index} name={name} />
    );
  }

  render() {
    return (
      <div className='catalog-input-chips'>
        <div className='mdc-chip-set mdc-chip-set--input' ref={this.chipSetEl}>
          {this.state.chipNames.map(this.renderInputChip)}
          <input type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyDown={this.handleInputKeyDown} />
        </div>
      </div>
    );
  }
}

export default ChipSet;

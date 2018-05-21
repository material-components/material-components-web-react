import React from 'react';
import {MDCChipSetFoundation} from '@material/chips';

import Chip from './chip';

class ChipSet extends React.Component {
  constructor(props) {
    super(props);
    this.chipSetEl = React.createRef();
    this.maxId = 0;

    this.state = {
      'classList': new Set(),
      inputValue: '',
      chips: this.props.chips.map((chip) => {
        return {
          name: chip.name,
          class: chip.class,
          id: this.maxId++
        }
      })
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

  get classes() {
    const classList = [...this.state.classList];
    const {className, selected} = this.props;
    return classnames('mdc-chip', Array.from(classList), className, {
      'mdc-chip--selected': selected,
    });
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
    if (((e.key === 'Enter' || e.keyCode === 13) || (e.key === 'Tab' || e.keyCode === 9))
      && this.state.inputValue !== '') {
        this.addInputChip();
    } else if ((e.key === 'Backspace' || e.keyCode === 8) && this.state.inputValue == '') {
      const chip = this.state.chips[this.state.chips.length - 1];
      this.exitChip(chip);
    }
  }

  addInputChip() {
    const chips = [...this.state.chips];
    const newChip = {
      name: this.state.inputValue,
      id: this.maxId++
    }
    chips.push(newChip);
    this.setState({
      inputValue: '',
      chips: chips
    });
  }

  exitChip(chip) {
    const chips = [...this.state.chips];
    const index = chips.indexOf(chip);
    chips.splice(index, 1, {
      name: chip.name,
      id: chip.id,
      class: 'mdc-chip--exit'
    });
    this.setState({chips});
  }

  removeChip(chip) {
    const chips = [...this.state.chips];
    const index = chips.indexOf(chip);
    chips.splice(index, 1);
    this.setState({chips});
  }

  renderInputChip(chip) {
    return (
      <Chip key={chip.id} chip={chip} className={chip.class} removeChip={this.removeChip}/>
    );
  }

  render() {
    return (
      <div className='catalog-input-chips'>
        <div className='mdc-chip-set mdc-chip-set--input' ref={this.chipSetEl}>
          {this.state.chips.map(this.renderInputChip.bind(this))}
          <input type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyDown={this.handleInputKeyDown} />
        </div>
      </div>
    );
  }
}

export default ChipSet;

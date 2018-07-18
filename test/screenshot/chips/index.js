import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Chip, ChipSet} from '../../../packages/chips';

const svgIcon = (<svg
  width="24px" height="24px"
  xmlns="http://www.w3.org/2000/svg"
  className="material-icons"
  viewBox="0 0 24 24"
  fill="#fff">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path d="M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11
  11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3 12c0-2.13.76-4.08
  2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12
  14.53L8.24 7h7.53L12 14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64
  2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
  4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z"/>
</svg>);

// const removeIcon = (<i className="material-icons">cancel</i>);

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
        <Chip selected={this.isSelected(0)} id={0} label='Small' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Medium' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Large' handleSelect={this.handleSelect}/>
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
        <Chip selected={this.isSelected(0)} id={0} label='Tops' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Bottoms' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Shoes' handleSelect={this.handleSelect}/>
      </ChipSet>
    );
  }
}

class ContactsEntry extends React.Component {
  render() {
    return (
      <ChipSet filter>
        <Chip leadingIcon={svgIcon} id={0} label='Jane Smith' removeIcon={true} />
        <Chip leadingIcon={svgIcon} id={1} label='John Doe' removeIcon={true} />
        <Chip leadingIcon={svgIcon} id={2} label='Minnie Mouse' removeIcon={true} />
        <Chip leadingIcon={svgIcon} id={3} label='Mickey Mouse' removeIcon={true} />
      </ChipSet>
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

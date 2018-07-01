import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Chip} from '../../../packages/chips';
import ChipSet from '../../../packages/chips';

class TestChoiceChips extends React.Component {
  state = {
    selectedChipId: -1,
  }

  componentDidMount() {
    React.Children.map(this.props.children, chip => {
      if (chip.props.selected) {
        this.setState({selectedChipId: chip.props.id});
      }
    });
  }

  handleSelect = (id) => {
    if (this.state.selectedChipId == id) {
      this.setState({selectedChipId: -1});
    } else {
      this.setState({selectedChipId: id});
    }
  }

  renderChip = (chip) => {
    const {
      selected,
      id,
      ...otherProps
    } = chip.props;

    if (this.state.selectedChipId == id) {
      return <Chip selected id={id} {...otherProps} handleSelect={this.handleSelect} />;
    } else {
      return <Chip id={id} {...otherProps} handleSelect={this.handleSelect} />;
    }
  }

  render() {
    return (
      <ChipSet choice>
        {React.Children.map(this.props.children, chip => this.renderChip(chip))}
      </ChipSet>
    )
  }
}

ReactDOM.render((
  <div>
    Choice chips
    <TestChoiceChips choice>
      <Chip
        label='Jane Smith'
        id={0}
      />
      <Chip
        label='John Doe'
        id={1}
        selected
      />
      <Chip
        label='Mary Smith'
        id={2}
      />
    </TestChoiceChips>
  </div>
), document.getElementById('app'));

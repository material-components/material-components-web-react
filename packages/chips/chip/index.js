import React from 'react';
import PropTypes from 'prop-types';
import {MDCChipFoundation} from '@material/chips';
// import withRipple from '@material/react-ripple';

export class Chip extends React.Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.state = {
      'classList': new Set(['mdc-chip']),
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  handleRemove() {
    this.props.removeChip(this.props.name);
  }

  get classes() {
    return this.state.classList;
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      eventTargetHasClass: (target, className) => this.classes.split(' ').includes(className), // Assume for now that the target is always the chip.
      notifyRemoval: () => this.handleRemove(),
    };
  }

  render() {
    return (
      <div className={this.classes} key={this.props.index} tabindex='0'>
        <div className='mdc-chip__text'>{this.props.name}</div>
      </div>
    );
  }
}

Chip.propTypes = {
};

Chip.defaultProps = {
  'index': 0,
  'className': '',
  'name': '',
  'removeChip': null,
};

export default Chip;

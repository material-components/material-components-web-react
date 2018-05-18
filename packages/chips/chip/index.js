import React from 'react';
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
    return 'mdc-chip'; // to be replaced with classnames
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
      <div className={this.classes} tabIndex='0'>
        <div className='mdc-chip__text'>{this.props.name}</div>
      </div>
    );
  }
}

export default Chip;

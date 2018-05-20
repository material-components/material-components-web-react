import React from 'react';
import classnames from 'classnames';
import {MDCChipFoundation} from '@material/chips';
// import withRipple from '@material/react-ripple';

export class Chip extends React.Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.state = {
      'classList': new Set()
    };
    this.chipElement = React.createRef();
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTrailingIcon = this.handleTrailingIcon.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  handleTrailingIcon(e) {
    this.foundation_.handleTrailingIconInteraction_(e);
  }

  handleTransitionEnd(e) {
    this.foundation_.handleTransitionEnd_(e);
  }

  handleRemove() {
    this.props.removeChip(this.props.chip);
  }

  get classes() {
    const {classList} = this.state;
    const {className, selected} = this.props;
    return classnames('mdc-chip', Array.from(classList), className, {
      'mdc-chip--selected': selected,
    });
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
      getComputedStyleValue: (propertyName) => window.getComputedStyle(this.chipElement.current).getPropertyValue(propertyName),
      setStyleProperty: (propertyName, value) => this.chipElement.current.style.setProperty(propertyName, value),
    };
  }

  render() {
    return (
      <div className={this.classes} tabIndex='0' onTransitionEnd={this.handleTransitionEnd} ref={this.chipElement}>
        <div className='mdc-chip__text'>{this.props.chip.name}</div>
        <i className='material-icons mdc-chip__icon mdc-chip__icon--trailing' tabIndex='0' role='button'
          onClick={this.handleTrailingIcon}>
          cancel</i>
      </div>
    );
  }
}

export default Chip;

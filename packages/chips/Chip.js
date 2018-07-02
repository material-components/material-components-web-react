import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';
import {MDCChipFoundation} from '@material/chips';

export class Chip extends Component {
  foundation_ = null;
  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
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
    };
  }

  handleInteraction = () => {
    this.props.handleSelect(this.props.id);
  }

  renderCheckmark = () => {
    return (
      <div className='mdc-chip__checkmark'>
        <svg className='mdc-chip__checkmark-svg' viewBox='-2 -3 30 30'>
          <path
            className='mdc-chip__checkmark-path'
            fill='none'
            stroke='black'
            d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
        </svg>
      </div>
    );
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      label,
      handleSelect,
      hasFilterCheckmark,
      initRipple,
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.handleInteraction}
        ref={initRipple}
        {...otherProps}
      >
        {hasFilterCheckmark ? this.renderCheckmark() : null}
        <div className='mdc-chip__text'>{label}</div>
      </div>
    );
  }
}

Chip.propTypes = {
  className: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  label: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  hasFilterCheckmark: PropTypes.bool,
};

export default withRipple(Chip);

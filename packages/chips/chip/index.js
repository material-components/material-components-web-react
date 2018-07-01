import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';
import {MDCChipFoundation} from '@material/chips';

export class Chip extends Component {
  foundation_ = null;

  constructor(props) {
    super(props);
    this.state = {
      classList: new Set(props.selected ? ['mdc-chip--selected'] : []),
    }
  }

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.selected) {
      this.props.handlePreSelect(this.foundation_);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className, selected} = this.props;
    return classnames('mdc-chip', Array.from(classList), className);
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
    this.props.handleChipInteration({
      detail: {
        chip: {
          foundation: this.foundation_,
        }
      }
    });
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      label,
      handleChipInteration,
      handlePreSelect,
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
};

export default withRipple(Chip);

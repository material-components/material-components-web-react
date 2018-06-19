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
      classList: new Set(),
      selected: this.props.selected,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected !== prevState.selected) {
      this.foundation_.setSelected(this.state.selected);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  /**
  * getters
  */

  get classes() {
    const {classList, selected} = this.state;
    const {className} = this.props;
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

  render() {
    const {
      label,
      initRipple,
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={(e) => this.foundation_ && this.foundation_.handleInteraction_(e)}
        onKeyDown={(e) => this.foundation_ && this.foundation_.handleInteraction_(e)}
        // key={'mdc-chip ' + label}
        ref={initRipple}
      >
        <div className='mdc-chip__text'>{label}</div>
      </div>
    );
  }
}

Chip.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  initRipple: PropTypes.func,
};

Chip.defaultProps = {
  className: '',
  selected: false,
  initRipple: () => {},
};

export default withRipple(Chip);

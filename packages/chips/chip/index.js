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
      classList: new Set()
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  /**
  * getters
  */

  get classes() {
    const {classList} = this.state;
    const {className} = this.props.chip;
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
      eventTargetHasClass: (target, className) => target.classList.contains(className),
    };
  }

  render() {
    const {
      className,
      unbounded,
      chip,
      key,
      initRipple,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={(e) => this.foundation_ && this.foundation_.handleInteraction_(e)}
        onKeyDown={(e) => this.foundation_ && this.foundation_.handleInteraction_(e)}
        key={key}
        ref={initRipple}
        {...otherProps}
      >
        <div className='mdc-chip__text'>{chip.label}</div>
      </div>
    );
  }
}

Chip.propTypes = {
  className: PropTypes.string,
  chip: PropTypes.object.isRequired,
  initRipple: PropTypes.func,
};

Chip.defaultProps = {
  className: '',
  initRipple: () => {},
};

export default withRipple(Chip);

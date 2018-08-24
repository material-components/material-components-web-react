import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '../ripple';
import {MDCChipFoundation} from '@material/chips/dist/mdc.chips';

export class Chip extends Component {
  foundation_ = null;
  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSelected(this.props.selected);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.foundation_.setSelected(this.props.selected);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-chip', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
    };
  }

  handleClick = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
    this.props.handleSelect(this.props.id);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      selected,
      handleSelect,
      onClick,
      computeBoundingRect,
      unbounded,
      /* eslint-enable no-unused-vars */
      initRipple,
      chipCheckmark,
      label,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.handleClick}
        ref={initRipple}
        {...otherProps}
      >
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
      </div>
    );
  }
}

Chip.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  onClick: PropTypes.func,
  // The following props are handled by withRipple and do not require defaults.
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  chipCheckmark: PropTypes.node,
  computeBoundingRect: PropTypes.func,
};

Chip.defaultProps = {
  id: '',
  label: '',
  className: '',
  selected: false,
  handleSelect: () => {},
};

export default withRipple(Chip);

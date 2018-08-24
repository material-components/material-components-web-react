import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '../ripple';
import {MDCChipFoundation} from '@material/chips/dist/mdc.chips';

export class Chip extends Component {
  chipElement_ = null;
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

  init = (el) => {
    this.chipElement_ = el;
    this.props.initRipple(el);
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
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getComputedStyleValue: (propertyName) => window.getComputedStyle(this.chipElement_).getPropertyValue(propertyName),
      setStyleProperty: (propertyName, value) => this.chipElement_.style.setProperty(propertyName, value),
      notifyRemoval: () => this.props.handleRemove(this.props.id),
    };
  }

  handleClick = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
    this.props.handleSelect(this.props.id);
  }

  handleRemoveIconClick = (e) => this.foundation_.handleTrailingIconInteraction(e);

  handleTransitionEnd = (e) => this.foundation_.handleTransitionEnd(e);

  renderLeadingIcon = (leadingIcon) => {
    const {
      className,
      ...otherProps
    } = leadingIcon.props;

    const props = {
      className: classnames(
        className,
        'mdc-chip__icon',
        'mdc-chip__icon--leading',
      ),
      ...otherProps,
    };

    return React.cloneElement(leadingIcon, props);
  };

  renderRemoveIcon = (removeIcon) => {
    const {
      className,
      ...otherProps
    } = removeIcon.props;

    const props = {
      className: classnames(
        className,
        'mdc-chip__icon',
        'mdc-chip__icon--trailing',
      ),
      ...otherProps,
    };

    return React.cloneElement(removeIcon, props);
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      id,
      className,
      selected,
      handleSelect,
      handleRemove,
      onClick,
      computeBoundingRect,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      chipCheckmark,
      leadingIcon,
      removeIcon,
      label,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.handleClick}
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.init}
        {...otherProps}
      >
        {leadingIcon ? this.renderLeadingIcon(leadingIcon) : null}
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
        {removeIcon ? this.renderRemoveIcon(removeIcon) : null}
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
  handleRemove: PropTypes.func,
  onClick: PropTypes.func,
  // The following props are handled by withRipple and do not require defaults.
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  chipCheckmark: PropTypes.node,
  leadingIcon: PropTypes.element,
  removeIcon: PropTypes.element,
  computeBoundingRect: PropTypes.func,
};

Chip.defaultProps = {
  id: '',
  label: '',
  className: '',
  selected: false,
  handleSelect: () => {},
  handleRemove: () => {},
};

export default withRipple(Chip);

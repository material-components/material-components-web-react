import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '../ripple';
import {MDCChipFoundation} from '@material/chips';

export class ChipBase extends Component {
  root_ = null;
  foundation_ = null;
  state = {
    classList: new Set(),
  };

  init = (el) => {
    this.root_ = el;
    this.props.initRipple(el);
  }

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
      getComputedStyleValue: (propertyName) => window.getComputedStyle(this.root_).getPropertyValue(propertyName),
      setStyleProperty: (propertyName, value) => this.root_.style.setProperty(propertyName, value),
      notifyRemoval: () => this.handleRemove(),
    };
  }

  handleRemove = () => {
    this.props.handleRemove();
  }

  handleClick = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
    this.props.handleSelect();
  }

  handleRemoveIconClick = (e) => {
    this.foundation_.trailingIconInteractionHandler_(e); // TODO: Update with public MDCChipFoundation handler.
  }

  handleTransitionEnd = (e) => {
    this.foundation_.transitionEndHandler_(e); // TODO: Update with public MDCChipFoundation handler.
  }

  renderLeadingIcon = (leadingIcon) => {
    if (!leadingIcon) {
      return null;
    }
    const className = classnames(
      leadingIcon.props.className,
      'mdc-chip__icon',
      'mdc-chip__icon--leading');
    const props = Object.assign({},
      leadingIcon.props,
      {className});
    return React.cloneElement(leadingIcon, props);
  };

  renderRemoveIcon = (removeIcon) => {
    if (!removeIcon) {
      return null;
    }
    const className = classnames(
      removeIcon.props.className,
      'mdc-chip__icon',
      'mdc-chip__icon--trailing');
    const props = Object.assign({},
      removeIcon.props,
      {className},
      {'onClick': this.handleRemoveIconClick});
    return React.cloneElement(removeIcon, props);
  };

  render() {
    const {
      label,
      chipCheckmark,
      leadingIcon,
      removeIcon,
      /* eslint-disable no-unused-vars */
      className,
      onClick,
      handleSelect,
      handleRemove,
      initRipple,
      unbounded,
      computeBoundingRect,
      /* eslint-enable no-unused-vars */
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
        {this.renderLeadingIcon(leadingIcon)}
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
        {this.renderRemoveIcon(removeIcon)}
      </div>
    );
  }
}

ChipBase.propTypes = {
  label: PropTypes.string,
  leadingIcon: PropTypes.element,
  removeIcon: PropTypes.element,
  className: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  onClick: PropTypes.func,
  // The following props are handled by withRipple and do not require defaults.
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  chipCheckmark: PropTypes.node,
  computeBoundingRect: PropTypes.func,
};

ChipBase.defaultProps = {
  label: '',
  leadingIcon: null,
  removeIcon: null,
  className: '',
  selected: false,
  handleSelect: () => {},
  handleRemove: () => {},
};

export default withRipple(ChipBase);

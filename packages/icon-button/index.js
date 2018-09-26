import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';
import {MDCIconButtonToggleFoundation} from '@material/icon-button/dist/mdc.iconButton';
import IconToggle from './IconToggle';

const {strings} = MDCIconButtonToggleFoundation;

class IconButtonBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classList: new Set(),
      [strings.ARIA_PRESSED]: props[strings.ARIA_PRESSED],
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-icon-button', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      setAttr: (attr, value) => this.setState({[attr]: value}),
    };
  }

  handleClick_ = (e) => {
    this.props.onClick(e);
    this.foundation_.handleClick();
  }

  render() {
    const {
      children,
      initRipple,
      isLink,
      /* eslint-disable no-unused-vars */
      className,
      onClick,
      unbounded,
      [strings.ARIA_PRESSED]: ariaPressed,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    const props = {
      className: this.classes,
      ref: initRipple,
      [strings.ARIA_PRESSED]: this.state[strings.ARIA_PRESSED],
      onClick: this.handleClick_,
      ...otherProps,
    };

    if (isLink) {
      return (
        <a {...props}>
          {children}
        </a>
      );
    }

    return (
      <button {...props}>
        {children}
      </button>
    );
  }
}

IconButtonBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  isLink: PropTypes.bool,
  onClick: PropTypes.func,
  unbounded: PropTypes.bool,
};

IconButtonBase.defaultProps = {
  children: '',
  className: '',
  initRipple: () => {},
  isLink: false,
  onClick: () => {},
  unbounded: true,
};

export default withRipple(IconButtonBase);
export {IconToggle, IconButtonBase};

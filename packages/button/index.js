import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';

export class Button extends Component {
  render() {
    const {
      className,
      raised,
      unelevated,
      outlined,
      icon,
      children,
      initRipple,
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-button', className, {
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'mdc-button--outlined': outlined,
    });

    return (
      <button
        className={classes}
        ref={initRipple}
        {...otherProps}
      >
        {icon ? this.renderIcon() : null}
        {children}
      </button>
    );
  }

  addClassesToElement(classes, element) {
    const propsWithClasses = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, propsWithClasses);
  }

  renderIcon() {
    const {icon} = this.props;
    return this.addClassesToElement('mdc-button__icon', icon);
  }
}

Button.propTypes = {
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  unbounded: PropTypes.bool,
  initRipple: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string,
};

Button.defaultProps = {
  raised: false,
  unelevated: false,
  outlined: false,
  disabled: false,
  unbounded: false,
  initRipple: () => {},
  className: '',
  icon: null,
  children: '',
};

export default withRipple(Button);

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';

export class MDCButton extends Component {
  render() {
    const {
      className,
      raised,
      unelevated,
      stroked,
      dense,
      icon,
      children,
      initRipple,
      // dismiss warning for converting to a string (for ripple)
      unbounded, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-button', className, {
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'mdc-button--stroked': stroked,
      'mdc-button--dense': dense,
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

MDCButton.propTypes = {
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  stroked: PropTypes.bool,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  unbounded: PropTypes.bool,
  initRipple: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string,
};

MDCButton.defaultProps = {
  raised: false,
  unelevated: false,
  stroked: false,
  dense: false,
  disabled: false,
  unbounded: false,
  className: '',
  icon: null,
  children: '',
};

export default withRipple(MDCButton);

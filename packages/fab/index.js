import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withRipple from '@material/react-ripple';

export class Fab extends React.Component {

  state = {
    classList: new Set(),
  };

  get classes() {
    const {classList} = this.state;
    const {
      mini,
      className,
    } = this.props;

    return classnames('mdc-fab', Array.from(classList), className, {
      'mdc-fab--mini': mini,
    });
  }

  renderIcon() {
    const {icon} = this.props;

    if (!icon) {
      return;
    }

    return this.addClassesToElement('mdc-fab__icon', icon);
  }

  render() {
    const {
      /* eslint-disable */
      children,
      className,
      unbounded,
      mini,
      /* eslint-enable */
      initRipple,
      ...otherProps
    } = this.props;

    return (
        <button
          className={this.classes}
          ref={initRipple}
          {...otherProps}>
          {this.renderIcon()}
        </button>
    );
  }

  addClassesToElement(classes, element) {
    const updatedProps = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, updatedProps);
  }
}

Fab.propTypes = {
  mini: PropTypes.bool,
  icon: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  initRipple: PropTypes.func,
};

Fab.defaultProps = {
  mini: false,
  icon: null,
  className: '',
  initRipple: () => {},
};

export default withRipple(Fab);

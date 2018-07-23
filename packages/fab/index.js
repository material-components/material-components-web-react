import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withRipple from '@material/react-ripple';

export class Fab extends React.Component {

  get classes() {
    const {
      mini,
      textLabel,
      className,
    } = this.props;

    const extended = textLabel.length > 0;

    return classnames('mdc-fab', className, {
      'mdc-fab--mini': mini,
      'mdc-fab--extended': extended,
    });
  }

  renderIcon() {
    const {icon} = this.props;

    if (!icon) {
      return;
    }

    const updatedProps = {
      className: classnames('mdc-fab__icon', icon.props.className),
    };
    return React.cloneElement(icon, updatedProps);
  }

  renderTextLabel() {
    const {textLabel} = this.props;

    if (textLabel.length === 0) {
      return;
    }

    return (
      <span className='mdc-fab__label'>
        {textLabel}
      </span>
    );
  }

  render() {
    const {
      /* eslint-disable */
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
          {this.renderTextLabel()}
        </button>
    );
  }
}

Fab.propTypes = {
  mini: PropTypes.bool,
  icon: PropTypes.element,
  textLabel: PropTypes.string,
  className: PropTypes.string,
  initRipple: PropTypes.func,
};

Fab.defaultProps = {
  mini: false,
  icon: null,
  textLabel: '',
  className: '',
  initRipple: () => {},
};

export default withRipple(Fab);

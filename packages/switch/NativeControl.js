import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class NativeControl extends React.Component {
  get classes() {
    return classnames('mdc-switch__native-control', this.props.className);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      /* eslint-enable no-unused-vars */
      setRippleActivator,
      ...otherProps
    } = this.props;

    return (
      <input
        type='checkbox'
        role='switch'
        className={this.classes}
        ref={setRippleActivator}
        {...otherProps}
      />
    );
  }
}

NativeControl.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  setRippleActivator: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

NativeControl.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  id: null,
  onChange: () => {},
  setRippleActivator: () => {},
};

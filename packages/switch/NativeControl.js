import React from 'react';
import PropTypes from 'prop-types';

export default class NativeControl extends React.Component {
  render() {
    const {
      setRippleActivator,
      ...otherProps
    } = this.props;

    return (
      <input
        type='checkbox'
        role='switch'
        className='mdc-switch__native-control'
        ref={setRippleActivator}
        {...otherProps}
      />
    );
  }
}

NativeControl.propTypes = {
  checked: PropTypes.bool,
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
  disabled: false,
  id: null,
  onChange: () => {},
  setRippleActivator: () => {},
};

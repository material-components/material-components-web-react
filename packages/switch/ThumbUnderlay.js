import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withRipple from '@material/react-ripple';

import NativeControl from './NativeControl';

export class ThumbUnderlay extends React.Component {
  rippleActivator = React.createRef();

  init = (el) => {
    this.props.initRipple(el, this.rippleActivator.current);
  }

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  handleChange = (e) => {
    const {handleChange} = this.props;
    const {checked} = e.target;
    handleChange(checked);
  }

  render() {
    const {
      /* eslint-disable */
      className,
      handleChange,
      initRipple,
      unbounded,
      /* eslint-enable */
      checked,
      disabled,
      nativeControlId,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        ref={this.init}
        {...otherProps}
      >
        <div className='mdc-switch__thumb'>
          <NativeControl
            id={nativeControlId}
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
            setRippleActivator={this.rippleActivator}
          />
        </div>
      </div>
    );
  }
}

ThumbUnderlay.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  nativeControlId: PropTypes.string,
  handleChange: PropTypes.func,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
};

ThumbUnderlay.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  nativeControlId: null,
  handleChange: () => {},
  initRipple: () => {},
  unbounded: true,
};

export default withRipple(ThumbUnderlay);

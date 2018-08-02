import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withRipple from '../ripple';
import NativeControl from './NativeControl';


export class ThumbUnderlay extends React.Component {
  rippleActiveEl = null;

  init = (el) => {
    this.props.initRipple(el, this.rippleActiveEl);
  }

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      initRipple,
      id,
      unbounded, // eslint-disable-line no-unused-vars
      syncChecked,
      setDisabled,
      checked,
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
            id={id}
            checked={checked}
            syncChecked={syncChecked}
            setDisabled={setDisabled}
            setRippleActiveEl={(el) => {
              this.rippleActiveEl = el;
            }}
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
  id: PropTypes.string,
  setDisabled: PropTypes.func,
  syncChecked: PropTypes.func,
  unbounded: PropTypes.bool,
};

ThumbUnderlay.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  id: null,
  setDisabled: () => {},
  syncChecked: () => {},
  unbounded: true,
};

export default withRipple(ThumbUnderlay);

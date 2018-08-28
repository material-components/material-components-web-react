import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCSwitchFoundation} from '@material/switch/dist/mdc.switch';

import ThumbUnderlay from './ThumbUnderlay';
import NativeControl from './NativeControl';

export default class Switch extends Component {
  rippleActivator = React.createRef();
  foundation_ = null;
  state = {
    checked: this.props.checked,
    classList: new Set(),
    disabled: this.props.disabled,
    nativeControlChecked: this.props.checked,
    nativeControlDisabled: this.props.disabled,
  };

  componentDidMount() {
    this.foundation_ = new MDCSwitchFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setChecked(this.props.checked);
    this.foundation_.setDisabled(this.props.disabled);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checked !== prevState.checked) {
      this.foundation_.setChecked(this.state.checked);
    }
    if (this.state.disabled !== prevState.disabled) {
      this.foundation_.setDisabled(this.state.disabled);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-switch', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setNativeControlChecked: (nativeControlChecked) => { 
        console.log('nativeControlChecked ' + nativeControlChecked);
        this.setState({nativeControlChecked: nativeControlChecked});
      },
      setNativeControlDisabled: (nativeControlDisabled) => {
        this.setState({nativeControlDisabled: nativeControlDisabled});
      },
    };
  }

  render() {
    const {
      /* eslint-disable */
      className,
      checked,
      disabled,
      /* eslint-enable */
      nativeControlId,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        {...otherProps}
      >
        <div className='mdc-switch__track' />
        <ThumbUnderlay
          rippleActivator={this.rippleActivator}>
          <NativeControl
            id={nativeControlId}
            checked={this.state.nativeControlChecked}
            disabled={this.state.nativeControlDisabled}
            onChange={(evt) => {
              console.log(evt.target.checked);
              this.foundation_ && this.foundation_.handleChange(evt)
            }}
            rippleActivatorRef={this.rippleActivator}
          />
        </ThumbUnderlay>
      </div>
    );
  }
}

Switch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  nativeControlId: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  nativeControlId: null,
};

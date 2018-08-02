import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCSwitchFoundation} from '@material/switch/dist/mdc.switch';

import ThumbUnderlay from './ThumbUnderlay';

export class Switch extends Component {
  foundation_ = null;
  state = {
    checked: this.props.checked,
    classList: new Set(),
    disabled: this.props.disabled,
  };

  componentDidMount() {
    this.foundation_ = new MDCSwitchFoundation(this.adapter);
    this.foundation_.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checked !== prevState.checked) {
      this.foundation_.handleChange();
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className, disabled} = this.props;
    return classnames('mdc-switch', Array.from(classList), className, {
      'mdc-switch--disabled': disabled,
    });
  }

  get adapter() {
    return {
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      isNativeControlChecked: () => this.state.checked,
    };
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      disabled,
      id,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        {...otherProps}
      >
        <div className='mdc-switch__track' />
        <ThumbUnderlay
          checked={this.state.checked}
          disabled={disabled}
          id={id}
          handleChange={(checked) => this.setState({checked})}
          handleDisabled={(disabled) => this.setState({disabled})}/>
      </div>
    );
  }
}

Switch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  id: null,
};

export default Switch;

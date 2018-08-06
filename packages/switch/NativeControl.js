import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class NativeControl extends React.Component {
  componentDidMount() {
    this.props.handleChange(this.props.checked);
    this.props.handleDisabled(this.props.disabled);
  }

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.props.handleDisabled(this.props.disabled);
    }

    if (this.props.checked !== prevProps.checked) {
      this.props.handleChange(this.props.checked);
    }
  }

  get classes() {
    return classnames('mdc-switch__native-control', this.props.className);
  }

  handleChange = (e) => {
    const {handleChange, onChange} = this.props;
    const {checked} = e.target;
    handleChange(checked);
    onChange(e);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      handleChange,
      handleDisabled,
      onChange,
      /* eslint-enable no-unused-vars */
      checked,
      disabled,
      setrippleActivatorEl,
      ...otherProps
    } = this.props;

    return (
      <input
        type='checkbox'
        role='switch'
        onChange={this.handleChange}
        disabled={disabled}
        checked={checked}
        className={this.classes}
        ref={setrippleActivatorEl}
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
  handleDisabled: PropTypes.func,
  handleChange: PropTypes.func,
};

NativeControl.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  id: null,
  onChange: () => {},
  handleDisabled: () => {},
  handleChange: () => {},
};

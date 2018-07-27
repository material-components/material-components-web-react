import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class NativeControl extends React.Component {

  componentDidMount() {
    this.props.handleValueChange(this.props.value);
    this.props.setDisabled(this.props.disabled);
  }

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      const {disabled, setDisabled} = this.props;
      setDisabled(disabled);
    }

    if (this.props.value !== prevProps.value) {
      this.props.handleValueChange(this.props.value);
    }
  }

  get classes() {
    return classnames('mdc-select__native-control', this.props.className);
  }

  handleFocus = (e) => {
    const {foundation, onFocus} = this.props;
    foundation.handleFocus(e);
    onFocus(e);
  }

  handleBlur = (e) => {
    const {foundation, onBlur} = this.props;
    foundation.handleBlur(e);
    onBlur(e);
  }

  handleChange = (e) => {
    const {foundation, handleValueChange, onChange} = this.props;
    const {value} = e.target;
    handleValueChange(value);
    onChange(e);
  }

  render() {
    const {
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      children,
      foundation,
      value,
      handleValueChange,
      setDisabled,
      onFocus,
      onBlur,
      onChange,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    return (
      <select
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        disabled={disabled}
        value={value}
        className={this.classes}
        {...otherProps}
      >
        {children}
      </select>
    );
  }
}

NativeControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  handleValueChange: PropTypes.func,
  foundation: PropTypes.shape({
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
  }),
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  setDisabled: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

NativeControl.defaultProps = {
  className: '',
  children: null,
  disabled: false,
  foundation: {
    handleFocus: () => {},
    handleBlur: () => {},
  },
  handleValueChange: () => {},
  id: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  setDisabled: () => {},
  value: '',
};

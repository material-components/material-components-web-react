import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {VALIDATION_ATTR_WHITELIST} from '@material/textfield/constants';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    this.props.handleValueChange(this.props.value);
    if (this.props.id) {
      this.props.setInputId(this.props.id);
    }
    if (this.props.disabled) {
      this.props.setDisabled(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {foundation} = nextProps;
    this.handleValidationAttributeUpdate(nextProps);

    if (this.props.disabled !== nextProps.disabled) {
      nextProps.setDisabled(nextProps.disabled);
      foundation.setDisabled(nextProps.disabled);
    }

    if (this.props.id !== nextProps.id) {
      nextProps.setInputId(nextProps.id);
    }
  }

  get classes() {
    return classnames('mdc-text-field__input', this.props.className);
  }

  handleFocus = (e) => {
    const {foundation, handleFocusChange, onFocus} = this.props;
    foundation.activateFocus();
    handleFocusChange(true);
    onFocus(e);
  }

  handleBlur = (e) => {
    const {foundation, handleFocusChange, onBlur} = this.props;
    foundation.deactivateFocus();
    handleFocusChange(false);
    onBlur(e);
  }

  handleMouseDown = (e) => {
    const {foundation, onMouseDown} = this.props;
    foundation.setTransformOrigin(e);
    onMouseDown(e);
  }

  handleTouchStart = (e) => {
    const {foundation, onTouchStart} = this.props;
    foundation.setTransformOrigin(e);
    onTouchStart(e);
  }

  // To stay in sync with the MDC React Text Field Component, handleValueChange()
  // is called to update MDC React Text Field's state. That state variable
  // is used to let other subcomponents and the foundation know what the current
  // value of the input is.
  handleChange = (e) => {
    const {foundation, handleValueChange, onChange} = this.props;
    const {value} = e.target;

    foundation.autoCompleteFocus();
    handleValueChange(value);
    onChange(e);
  }

  handleValidationAttributeUpdate = (nextProps) => {
    const {foundation} = nextProps;
    VALIDATION_ATTR_WHITELIST.some((attributeName) => {
      let attr = attributeName;
      if (attributeName === 'minlength') {
        attr = 'minLength';
      } else if (attributeName === 'maxlength') {
        attr = 'maxLength';
      }
      if (this.props[attr] !== nextProps[attr]) {
        foundation.handleValidationAttributeChange([attributeName]);
        return true;
      }
    });
  }

  isBadInput = () => this.inputElement.current.validity.badInput;
  isValid = () => this.inputElement.current.validity.valid;

  render() {
    const {
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      foundation,
      value,
      handleFocusChange,
      handleValueChange,
      setDisabled,
      setInputId,
      onFocus,
      onBlur,
      onMouseDown,
      onTouchStart,
      onChange,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    return (
      <input
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        onChange={this.handleChange}
        disabled={disabled}
        value={value}
        ref={this.inputElement}
        className={this.classes}
        {...otherProps}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  foundation: PropTypes.shape({
    activateFocus: PropTypes.func,
    deactivateFocus: PropTypes.func,
    autoCompleteFocus: PropTypes.func,
    setTransformOrigin: PropTypes.func,
    setTransformOrigin: PropTypes.func,
    handleValidationAttributeMutation_: PropTypes.func,
  }),
  handleValueChange: PropTypes.func,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  setDisabled: PropTypes.func,
  setInputId: PropTypes.func,
  handleFocusChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Input.defaultProps = {
  className: '',
  disabled: false,
  foundation: {
    activateFocus: () => {},
    deactivateFocus: () => {},
    autoCompleteFocus: () => {},
    setTransformOrigin: () => {},
    handleValidationAttributeMutation_: () => {},
  },
  handleValueChange: () => {},
  id: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onMouseDown: () => {},
  onTouchStart: () => {},
  setDisabled: () => {},
  setInputId: () => {},
  handleFocusChange: () => {},
  value: '',
};

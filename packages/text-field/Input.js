import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// under section: `Validation-related attributes`
const VALIDATION_ATTR_WHITELIST = [
  'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
];

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

  componentDidUpdate(prevProps) {
    this.handleValidationAttributeUpdate(prevProps);

    if (this.props.disabled !== prevProps.disabled) {
      const {disabled} = this.props;
      this.props.setDisabled(disabled);
      this.props.foundation.setDisabled(disabled);
    }

    if (this.props.id !== prevProps.id) {
      this.props.setInputId(this.props.id);
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

  handleValidationAttributeUpdate = (prevProps) => {
    VALIDATION_ATTR_WHITELIST.some((attr) => {
      if (this.props[attr] !== prevProps[attr]) {
        // TODO: Update this when issue is fixed:
        // https://github.com/material-components/material-components-web/issues/2716
        this.props.foundation.handleValidationAttributeMutation_([{
          // TODO: Update this when issue is fixed:
          // https://github.com/material-components/material-components-web/issues/2717
          attributeName: VALIDATION_ATTR_WHITELIST[0],
        }]);
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
    setDisabled: PropTypes.func,
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
    setDisabled: () => {},
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

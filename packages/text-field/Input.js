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
    props.setBadInputHandler(() => this.inputElement.validity.badInput);
    props.setIsValidHandler(() => this.inputElement.validity.valid);
  }

  componentWillReceiveProps(nextProps) {
    const {foundation} = nextProps;
    VALIDATION_ATTR_WHITELIST.some(attr => {
      if (this.props[attr] !== nextProps[attr]) {
        // TODO: change this to public in MDC Web / create issue on Web
        foundation.handleValidationAttributeMutation_([{
          // TODO: MDC Web should be accepting an array of attrs (not a mutationObserver)
          attributeName: VALIDATION_ATTR_WHITELIST[0]
        }]);
        return true;
      }
    });

    if (this.props.disabled !== nextProps.disabled) {
      foundation.setDisabled(nextProps.disabled);
    }
  }

  handleFocus = (e) => {
    const {foundation, updateFocus, onFocus} = this.props;
    foundation.activateFocus();
    updateFocus(true);
    onFocus(e);
  }

  handleBlur = (e) => {
    const {foundation, updateFocus, onBlur} = this.props;
    foundation.deactivateFocus();
    updateFocus(false);
    onBlur(e);
  }

  handleMouseDown = (e) => {
    const {foundation, updateFocus, onMouseDown} = this.props;
    foundation.setTransformOrigin();
    onMouseDown(e);
  }

  handleTouchStart = (e) => {
    const {foundation, updateFocus, onTouchStart} = this.props;
    foundation.setTransformOrigin();
    onTouchStart(e);
  }

  handleChange = (e) => {
    const {foundation, handleValueChange, onChange} = this.props;
    const value = e.target.value;
    foundation.autoCompleteFocus();
    handleValueChange(value);
    onChange(e);
  }

  render() {
    const {
      disabled,
      foundation,
      value,
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
        {...otherProps}
      />
    );
  }
}

Input.propTypes = {
  disabled: PropTypes.bool,
  foundation: PropTypes.shape({
    activateFocus: PropTypes.function,
    deactivateFocus: PropTypes.function,
    autoCompleteFocus: PropTypes.function,
    setTransformOrigin: PropTypes.function,
    setTransformOrigin: PropTypes.function,
    handleValidationAttributeMutation_: PropTypes.function,
  }),
  onBlur: PropTypes.function,
  onChange: PropTypes.function,
  onFocus: PropTypes.function,
  onMouseDown: PropTypes.function,
  onTouchStart: PropTypes.function,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validationAttributeChangeHandler: PropTypes.function,
};

Input.defaultProps = {
  disabled: false,
  foundation: {
    activateFocus: () => {},
    deactivateFocus: () => {},
    autoCompleteFocus: () => {},
    setTransformOrigin: () => {},
    setTransformOrigin: () => {},
    handleValidationAttributeMutation_: () => {},
  },
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onMouseDown: () => {},
  onTouchStart: () => {},
  value: '',
  validationAttributeChangeHandler: () => {},
};

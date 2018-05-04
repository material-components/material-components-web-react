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
    props.setBadInputHandler(() => this.inputElement.current.validity.badInput);
    props.setIsValidHandler(() => this.inputElement.current.validity.valid);
  }

  componentWillMount() {
    this.props.handleValueChange(this.props.value);
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
      updateFocus, // eslint-
      handleValueChange, // eslint-
      setBadInputHandler, // eslint-
      setIsValidHandler, // eslint-
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
    activateFocus: PropTypes.func,
    deactivateFocus: PropTypes.func,
    autoCompleteFocus: PropTypes.func,
    setTransformOrigin: PropTypes.func,
    setTransformOrigin: PropTypes.func,
    handleValidationAttributeMutation_: PropTypes.func,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
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
};

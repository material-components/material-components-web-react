import React from 'react';
import PropTypes from 'prop-types';

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
    this.state = {
      value: props.value,
    };
  }

  componentDidMount() {
    const dir = window.getComputedStyle(this.inputElement.current).getPropertyValue('direction');
    this.props.setDir(dir);
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
    VALIDATION_ATTR_WHITELIST.some((attr) => {
      if (this.props[attr] !== nextProps[attr]) {
        // TODO: change this to public in MDC Web / create issue on Web
        foundation.handleValidationAttributeMutation_([{
          // TODO: MDC Web should be accepting an array of attrs (not a mutationObserver)
          attributeName: VALIDATION_ATTR_WHITELIST[0],
        }]);
        return true;
      }
    });

    if (this.props.disabled !== nextProps.disabled) {
      nextProps.setDisabled(nextProps.disabled);
      foundation.setDisabled(nextProps.disabled);
    }

    if (this.props.id !== nextProps.id) {
      nextProps.setInputId(nextProps.id);
    }

    this.updateValue(nextProps);
  }

  // There are 2 sources that can update the input's value. 1) The end developer
  // 2) the mdc.textfield.foundation through `this.getNativeInput().value = value`.
  // Because of this, the input's value needs to be on this.state. If
  // The end developer and the foundation change the value at the same time,
  // the end developer's value should always win.
  updateValue = (nextProps) => {
    const valueChanged = this.props.value !== nextProps.value;
    const foundationValueChanged = this.props.foundationValue !== nextProps.foundationValue;

    if (foundationValueChanged) {
      this.setState({value: nextProps.foundationValue});
    }
    if (valueChanged) {
      this.setState({value: nextProps.value});
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

  render() {
    const {
      disabled,
      foundation, // eslint-disable-line no-unused-vars
      value: _value, // eslint-disable-line no-unused-vars
      foundationValue, // eslint-disable-line no-unused-vars
      updateFocus, // eslint-disable-line no-unused-vars
      handleValueChange, // eslint-disable-line no-unused-vars
      setBadInputHandler, // eslint-disable-line no-unused-vars
      setIsValidHandler, // eslint-disable-line no-unused-vars
      setDisabled, // eslint-disable-line no-unused-vars
      setInputId, // eslint-disable-line no-unused-vars
      setDir, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    const {value} = this.state;
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
  foundationValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleValueChange: PropTypes.func,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  setBadInputHandler: PropTypes.func,
  setDir: PropTypes.func,
  setDisabled: PropTypes.func,
  setInputId: PropTypes.func,
  setIsValidHandler: PropTypes.func,
  updateFocus: PropTypes.func,
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
  foundationValue: '',
  handleValueChange: () => {},
  id: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onMouseDown: () => {},
  onTouchStart: () => {},
  setBadInputHandler: () => {},
  setDir: () => {},
  setDisabled: () => {},
  setInputId: () => {},
  setIsValidHandler: () => {},
  updateFocus: () => {},
  value: '',
};

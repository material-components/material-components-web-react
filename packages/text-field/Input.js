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
    props.setBadInputHandler(this.badInputHandler);
    props.setIsValidHandler(this.isValidHandler);
    this.state = {
      value: props.value,
    };
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

    this.updateValue(nextProps);
  }

  get classes() {
    return classnames('mdc-text-field__input', this.props.className);
  }

  // There are 2 sources that can update the input's value. 1) The end developer
  // 2) the mdc.textfield.foundation through `this.getNativeInput().value = value`.
  // Because of this, the input's value needs to be on this.state. If
  // The end developer and the foundation change the value at the same time,
  // the end developer's value should always win.
  updateValue = (nextProps) => {
    const valueChanged = this.props.value !== nextProps.value;
    const foundationValueChanged = this.props.foundationValue !== nextProps.foundationValue;

    if (valueChanged) {
      this.setState({value: nextProps.value});
      return;
    }
    if (foundationValueChanged) {
      this.setState({value: nextProps.foundationValue});
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

  handleValidationAttributeUpdate = (nextProps) => {
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
  }

  badInputHandler = () => this.inputElement.current.validity.badInput;
  isValidHandler = () => this.inputElement.current.validity.valid;

  render() {
    const {
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      foundation,
      value: _value,
      foundationValue,
      updateFocus,
      handleValueChange,
      setBadInputHandler,
      setIsValidHandler,
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
  className: '',
  disabled: false,
  foundation: {
    activateFocus: () => {},
    deactivateFocus: () => {},
    autoCompleteFocus: () => {},
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
  setDisabled: () => {},
  setInputId: () => {},
  setIsValidHandler: () => {},
  updateFocus: () => {},
  value: '',
};

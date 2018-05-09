import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextFieldFoundation} from '@material/textfield';

import Input from './Input';
import Icon from './icon';
import HelperText from './helper-text';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

class TextField extends React.Component {

  foundation_ = null;
  getBadInput = () => {};
  getIsValid = () => {};

  constructor(props) {
    super(props);
    this.floatingLabelElement = React.createRef();
    this.textFieldElement = React.createRef();

    this.state = {
      // line ripple state
      activeLineRipple: false,

      // root state
      value: null,
      classList: new Set(),
      inputId: props.children.props.id,
      isFocused: false,
      isBadInput: false,
      dir: 'ltr',
      disabled: false,

      // floating label state
      shouldFloatLabel: false,
      labelWidth: 0,

      // line ripple state
      lineRippleCenter: null,

      // notched outline state
      shouldNotchOutline: false,

      // helper text state
      helperTextShowToScreenReader: false,
      isValid: true,
    };
  }

  componentDidMount() {
    const foundationMap = {
      helperText: this.helperTextAdapter,
    };
    this.foundation_ = new MDCTextFieldFoundation(this.adapter, foundationMap);
    this.foundation_.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.foundation_.setValue(this.state.value);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  /**
  * getters
  */

  get classes() {
    const {classList, disabled} = this.state;
    const {className, box, dense, outlined, fullWidth, textarea, trailingIcon, leadingIcon} = this.props;
    return classnames('mdc-text-field', Array.from(classList), className, {
      'mdc-text-field--outlined': outlined,
      'mdc-text-field--textarea': textarea,
      'mdc-text-field--fullwidth': fullWidth,
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--with-trailing-icon': trailingIcon,
      'mdc-text-field--with-leading-icon': leadingIcon,
      'mdc-text-field--box': box,
      'mdc-text-field--dense': dense,
    });
  }

  get adapter() {
    const rootAdapterMethods = {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      isFocused: () => this.state.isFocused,
      isRtl: this.getIsRtl,
    };

    return Object.assign({},
      rootAdapterMethods,
      this.inputAdapter,
      this.labelAdapter,
      this.lineRippleAdapter,
      this.notchedOutlineAdapter,
    );
  }

  get inputAdapter() {
    // value: string,
    // disabled: boolean, --> doesn't need to be implemented since the <INPUT> handles it
    // also the `get disabled` isn't actually used, except in the vanilla component
    // validity: {
    //   badInput: boolean,
    //   valid: boolean,
    // },

    return {
      getNativeInput: () => {
        const input = {
          validity: {
            badInput: this.getBadInput(),
            valid: this.getIsValid(),
          },
        };

        // https://stackoverflow.com/a/44913378
        Object.defineProperty(input, 'value', {
          get: () => this.state.value,
          // set value doesn't need to be done, since value is set via <Input>
          // needs setter here so it browser doesn't throw error
          set: () => {},
        });

        return input;
      },
    };
  }

  get labelAdapter() {
    return {
      shakeLabel: (shakeLabel) => {
        const {floatingLabelElement: floatingLabel} = this;
        if (shakeLabel && floatingLabel && floatingLabel.current) {
          floatingLabel.current.shake();
        }
      },
      floatLabel: (shouldFloatLabel) => this.setState({shouldFloatLabel}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.labelWidth,
    };
  }

  get lineRippleAdapter() {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
      setLineRippleTransformOrigin: (rippleCenter) => this.setState({rippleCenter}),
    };
  }

  get notchedOutlineAdapter() {
    return {
      notchOutline: () => this.setState({shouldNotchOutline: true}),
      closeOutline: () => this.setState({shouldNotchOutline: false}),
      hasOutline: () => !!this.props.outlined,
    };
  }

  get helperTextAdapter() {
    return {
      showToScreenReader: () =>
        this.setState({helperTextShowToScreenReader: !this.state.helperTextShowToScreenReader}),
      setValidity: (isValid) => this.setState({isValid}),
    };
  }

  getIsRtl = () => {
    if (this.textFieldElement.current) {
      const dir = window.getComputedStyle(this.textFieldElement.current).getPropertyValue('direction');
      return dir === 'rtl';
    }
  }

  inputProps(props) {
    return Object.assign({}, props, {
      foundation: this.foundation_,
      handleFocusChange: (isFocused) => this.setState({isFocused}),
      handleValueChange: (value) => this.setState({value}),
      // These are callbacks for Input, which set validity.badInput &
      // validity.valid.
      setBadInputHandler: (getBadInput) => this.getBadInput = getBadInput,
      setIsValidHandler: (getIsValid) => this.getIsValid = getIsValid,
      setDisabled: (disabled) => this.setState({disabled}),
      setInputId: (id) => this.setState({inputId: id}),
    });
  }

  /**
  * render methods
  */

  render() {
    const {
      label,
      fullWidth,
      helperText,
      outlined,
      leadingIcon,
      trailingIcon,
      textarea,
    } = this.props;

    const textField = (
      <div
        className={this.classes}
        onClick={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
        onKeyDown={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
        key='text-field-container'
        ref={this.textFieldElement}
      >
        {leadingIcon ? this.renderIcon(leadingIcon) : null}
        {this.renderInput()}
        {label && !fullWidth ? this.renderLabel() : null}
        {outlined ? this.renderNotchedOutline() : null}
        {!fullWidth && !textarea && !outlined ? this.renderLineRipple() : null}
        {trailingIcon ? this.renderIcon(trailingIcon) : null}
      </div>
    );

    if (helperText) {
      return ([
        textField, this.renderHelperText(),
      ]);
    }
    return textField;
  }

  renderInput() {
    const child = React.Children.only(this.props.children);
    const props = this.inputProps(child.props);
    return React.cloneElement(child, props);
  }

  renderLabel() {
    const {label, floatingLabelClassName} = this.props;
    const {inputId} = this.state;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.shouldFloatLabel}
        handleWidthChange={
          (labelWidth) => this.setState({labelWidth})}
        ref={this.floatingLabelElement}
        htmlFor={inputId}
      >
        {label}
      </FloatingLabel>
    );
  }

  renderLineRipple() {
    const {lineRippleClassName} = this.props;
    const {activeLineRipple, lineRippleCenter} = this.state;
    return (
      <LineRipple
        rippleCenter={lineRippleCenter}
        className={lineRippleClassName}
        active={activeLineRipple}
      />
    );
  }

  renderNotchedOutline() {
    const {notchedOutlineClassName} = this.props;
    const {shouldNotchOutline, labelWidth} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        isRtl={this.getIsRtl()}
        notch={shouldNotchOutline}
        notchWidth={labelWidth}
      />
    );
  }

  renderHelperText() {
    const {helperTextAriaHidden, helperTextIsValidationMessage, helperText,
      helperTextClassName, helperTextPersistent, helperTextRole} = this.props;
    const {isValid, helperTextShowToScreenReader} = this.state;
    return (
      <HelperText
        className={helperTextClassName}
        showToScreenReader={helperTextShowToScreenReader}
        isValid={isValid}
        role={helperTextRole}
        key='text-field-helper-text'
        aria-hidden={helperTextAriaHidden}
        persistent={helperTextPersistent}
        isValidationMessage={helperTextIsValidationMessage}
      >
        {helperText}
      </HelperText>
    );
  }

  renderIcon(icon) {
    const {disabled} = this.state;
    // Toggling disabled will trigger icon.foundation.setDisabled()
    return (
      <Icon disabled={disabled}>
        {icon}
      </Icon>
    );
  }
}

TextField.propTypes = {
  'box': PropTypes.bool,
  'children.props': PropTypes.shape(Input.propTypes),
  'children': PropTypes.element,
  'className': PropTypes.string,
  'dense': PropTypes.bool,
  'floatingLabelClassName': PropTypes.string,
  'fullWidth': PropTypes.bool,
  'helperText': PropTypes.string,
  'helperTextAriaHidden': PropTypes.bool,
  'helperTextClassName': PropTypes.string,
  'helperTextIsValidationMessage': PropTypes.bool,
  'helperTextPersistent': PropTypes.bool,
  'helperTextRole': PropTypes.string,
  'label': PropTypes.string.isRequired,
  'leadingIcon': PropTypes.element,
  'lineRippleClassName': PropTypes.string,
  'notchedOutlineClassName': PropTypes.string,
  'outlined': PropTypes.bool,
  'textarea': PropTypes.bool,
  'trailingIcon': PropTypes.element,
};

TextField.defaultProps = {
  box: false,
  className: '',
  dense: false,
  floatingLabelClassName: '',
  fullWidth: false,
  helperText: null,
  helperTextAriaHidden: false,
  helperTextClassName: '',
  helperTextIsValidationMessage: false,
  helperTextPersistent: false,
  herlpTextRole: null,
  leadingIcon: null,
  lineRippleClassName: '',
  notchedOutlineClassName: '',
  outlined: false,
  textarea: false,
  trailingIcon: null,
};


export {Input};
export default TextField;

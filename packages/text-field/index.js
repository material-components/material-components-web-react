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

export default class TextField extends React.Component {

  foundation_ = null;
  getBadInput = () => {};
  getIsValid = () => {};

  constructor(props) {
    super(props);
    this.floatingLabelElement = React.createRef();

    this.state = {
      // line ripple state
      activeLineRipple: false,

      // root state
      classList: new Set(),
      inputId: props.children.props.id, // need to generate one if not provided
      isFocused: false,
      isBadInput: false,
      isValid: true,

      // floating label state
      shouldFloatLabel: false, // needs to read off of props if should float
      labelWidth: 0,

      // line ripple state
      lineRippleCenter: null,

      // notched outline state
      shouldNotchOutline: false,

      // helper text state
      helperTextShowToScreenReader: false,
      helperTextValid: false, // This should be the same as this.state.isValid?

      // icon state
      iconDisabled: false, // this should be the same as this.state.disabled?
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCTextFieldFoundation(this.adapter);
    this.foundation_.init();

    const {notch, notchWidth, isRtl} = this.props;
    if (notch) {
      this.foundation_.notch(notchWidth, isRtl);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className, box, dense, outlined, fullWidth, textarea, trailingIcon, leadingIcon} = this.props;
    return classnames('mdc-text-field', Array.from(classList), className, {
      'mdc-text-field--outlined': outlined,
      'mdc-text-field--textarea': textarea,
      'mdc-text-field--fullwidth': fullWidth,
      // 'mdc-text-field--disabled': disabled,
      'mdc-text-field--with-trailing-icon': trailingIcon,
      'mdc-text-field--with-leading-icon': leadingIcon,
      'mdc-text-field--box': box,
      'mdc-text-field--dense': dense,
    });
  }

  /**
  * adapter methods
  */

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
      isRtl: () => this.props.isRtl,
    };

    return Object.assign({},
      rootAdapterMethods,
      this.inputAdapter,
      this.labelAdapter,
      this.lineRippleAdapter,
      this.notchedOutlineAdapter,
      this.helperTextAdapter,
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
      getNativeInput: () => ({
        value: () => this.state.value,
        validity: {
          badInput: this.getBadInput(),
          valid: this.getIsValid(),
        },
      })
    };
  }

  get labelAdapter() {
    return {
      shakeLabel: () => {
        const {floatingLabelElement: floatingLabel} = this;
        if (floatingLabel && floatingLabel.current) {
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
      setLineRippleTransformOrigin: (lineRippleCenter) => this.setState({rippleCenter: lineRippleCenter})
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
      setValidity: (isValid) => this.setState({helperTextValid: isValid}),
    };
  }

  get iconAdapter() {
    return {
      setDisabled: (disabled) => this.setState({iconDisabled: disabled})
    };
  }


  /**
  * render methods
  */

  render() {
    const {
      label,
      fullWidth,
      outlined,
      leadingIcon,
      trailingIcon,
      textarea,
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
        onKeyDown={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
      >
        {leadingIcon ? this.renderIcon(leadingIcon) : null}
        {this.renderInput()}
        {label && !fullWidth ? this.renderLabel() : null}
        {outlined ? this.renderNotchedOutline() : null}
        {!fullWidth && !textarea && !outlined ? this.renderLineRipple() : null}
        {trailingIcon ? this.renderIcon(trailingIcon) : null}
      </div>
    );
  }

  renderInput() {
    const child = React.Children.only(this.props.children);
    const className = classnames('mdc-text-field__input', child.props.className);
    const props = Object.assign({}, child.props, {
      className,
      foundation: this.foundation_,
      updateFocus: (isFocused) => this.setState({isFocused}),
      handleValueChange: (value) => this.setState({value}),
      setBadInputHandler: (getBadInput) => this.getBadInput = getBadInput,
      setIsValidHandler: (getIsValid) => this.getIsValid = getIsValid,
    });
    return React.cloneElement(child, props);
  }

  renderLabel() {
    const {label, floatingLabelClassName} = this.props;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.shouldFloatLabel}
        handleWidthChange={
          (labelWidth) => this.setState({labelWidth})}
        ref={this.floatingLabelElement}
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
    const {notchedOutlineClassName, isRtl} = this.props;
    const {shouldNotchOutline, labelWidth} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        isRtl={isRtl}
        notch={shouldNotchOutline}
        notchWidth={labelWidth}
      />
    );
  }

  renderHelperText() {
    const {helperTextAriaHidden, helperText, helperTextClassName, helperTextPersistent, helperTextRole} = this.props;
    const {helperTextValid, helperTextShowToScreenReader} = this.state;
    return (
      <HelperText
        className={helperTextClassName}
        showToScreenReader={helperTextShowToScreenReader}
        isValid={helperTextValid}
        role={helperTextRole}
        aria-hidden={helperTextAriaHidden}
        persistent={helperTextPersistent}
      >
        {helperText}
      </HelperText>
    );
  }

  renderIcon(icon) {
    const {iconDisabled} = this.state;
    return (
      <Icon disabled={iconDisabled}>
        {icon}
      </Icon>
    );
  }
}

TextField.propTypes = {
  isRtl: PropTypes.bool,
  leadingIcon: PropTypes.element,
  trailingIcon: PropTypes.element,
  label: PropTypes.string,
  helperTextAriaHidden: PropTypes.bool,
  helperTextClassName: PropTypes.string,
  helperTextRole: PropTypes.string,
  helperTextPersistent: PropTypes.bool,
  helperTextValidation: PropTypes.bool,
  lineRippleClassName: PropTypes.string,
  floatingLabelClassName: PropTypes.string,
  notchedOutlineClassName: PropTypes.string,
};

TextField.defaultProps = {
  isRtl: false,
  leadingIcon: null,
  trailingIcon: null,
  helperTextAriaHidden: false,
  helperTextClassName: '',
  herlpTextRole: null,
  helperTextPersistent: false,
  helperTextValidation: false,
  label: '',
  lineRippleClassName: '',
  floatingLabelClassName: '',
  notchedOutlineClassName: '',
};


export {Input};

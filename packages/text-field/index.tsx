// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import * as React from 'react';
import * as classnames from 'classnames';
import {MDCTextFieldFoundation} from '@material/textfield';
import Input, {InputProps} from './Input';
import Icon from './icon/index';
import HelperText from './helper-text/index';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

export type TextFieldProps = {
  'children.props'?: InputProps<object>,
  children: JSX.Element,
  className: string,
  dense: boolean,
  floatingLabelClassName: string,
  fullWidth: boolean,
  helperText?: JSX.Element,
  isRtl: boolean,
  label: React.ReactNode,
  leadingIcon?: JSX.Element,
  lineRippleClassName: string,
  notchedOutlineClassName: string,
  outlined: boolean,
  textarea: boolean,
  trailingIcon?: JSX.Element
};

type TextFieldState = {
  foundation: MDCTextFieldFoundation | null,
  value: null,
  classList: Set<any>,
  inputId: string,
  isFocused: boolean,
  dir: string,
  disabled: boolean,
  labelIsFloated: boolean,
  initialLabelWidth: number,
  notchedLabelWidth: number,
  activeLineRipple: boolean,
  lineRippleCenter: number,
  outlineIsNotched: boolean,
  showHelperTextToScreenReader: boolean,
  isValid: boolean
};

class TextField extends React.Component<TextFieldProps, TextFieldState> {
  floatingLabelElement: React.RefObject<FloatingLabel>;
  inputComponent_: null | Input;

  static defaultProps = {
    className: '',
    dense: false,
    floatingLabelClassName: '',
    fullWidth: false,
    isRtl: false,
    leadingIcon: null,
    lineRippleClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    textarea: false,
    trailingIcon: null,
  };

  constructor(props) {
    super(props);
    this.floatingLabelElement = React.createRef();
    this.inputComponent_ = null;
    this.state = {
      // root state
      value: null,
      classList: new Set(),
      inputId: props.children.props.id,
      isFocused: false,
      dir: 'ltr',
      disabled: false,
      // floating label state
      labelIsFloated: false,
      initialLabelWidth: 0,
      notchedLabelWidth: 0,
      // line ripple state
      activeLineRipple: false,
      lineRippleCenter: 0,
      // notched outline state
      outlineIsNotched: false,
      // helper text state
      showHelperTextToScreenReader: false,
      isValid: true,
      // foundation is on state,
      // so that the Input renders after this component
      foundation: null,
    };
  }

  componentDidMount() {
    const foundationMap: object = {
      helperText: this.helperTextAdapter,
    };
    const foundation = new MDCTextFieldFoundation(this.adapter, foundationMap);
    this.setState({foundation});
    foundation.init();
  }

  componentWillUnmount() {
    this.state.foundation.destroy();
  }
  /**
   * getters
   */
  get classes() {
    const {classList, disabled} = this.state;
    const {
      className,
      dense,
      outlined,
      fullWidth,
      textarea,
      trailingIcon,
      leadingIcon,
    } = this.props;

    return classnames('mdc-text-field', Array.from(classList), className, {
      'mdc-text-field--outlined': outlined,
      'mdc-text-field--textarea': textarea,
      'mdc-text-field--fullwidth': fullWidth,
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--with-trailing-icon': trailingIcon,
      'mdc-text-field--with-leading-icon': leadingIcon,
      'mdc-text-field--dense': dense,
    });
  }

  get otherProps() {
    const {
      /* eslint-disable no-unused-vars */
      children,
      className,
      dense,
      floatingLabelClassName,
      fullWidth,
      helperText,
      isRtl,
      label,
      leadingIcon,
      lineRippleClassName,
      notchedOutlineClassName,
      outlined,
      textarea,
      trailingIcon,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    return otherProps;
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
      isRtl: () => this.props.isRtl,
    };

    return Object.assign(
      {},
      rootAdapterMethods,
      this.inputAdapter,
      this.labelAdapter,
      this.lineRippleAdapter,
      this.notchedOutlineAdapter
    );
  }

  get inputAdapter() {
    // For reference: This is the shape of what the vanilla component `getNativeInput` returns
    // {
    //  value: string,
    //  disabled: boolean, --> doesn't need to be implemented since the <INPUT> handles it
    //  also the `get disabled` isn't actually used, except in the vanilla component
    //  validity: {
    //    badInput: boolean,
    //    valid: boolean,
    //  },
    // }
    return {
      getNativeInput: () => {
        let badInput;
        let valid;
        if (this.inputComponent_) {
          badInput = this.inputComponent_.isBadInput();
          valid = this.inputComponent_.isValid();
        }
        const input = {
          validity: {badInput, valid},
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
        if (!shakeLabel) return;
        if (floatingLabel && floatingLabel.current) {
          floatingLabel.current.shake();
        }
      },
      floatLabel: (labelIsFloated) => this.setState({labelIsFloated}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.initialLabelWidth,
    };
  }

  get lineRippleAdapter() {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
      setLineRippleTransformOrigin: (lineRippleCenter) =>
        this.setState({lineRippleCenter}),
    };
  }

  get notchedOutlineAdapter() {
    return {
      notchOutline: (notchedLabelWidth) =>
        this.setState({outlineIsNotched: true, notchedLabelWidth}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };
  }

  get helperTextAdapter() {
    return {
      showToScreenReader: () =>
        this.setState({showHelperTextToScreenReader: true}),
      setValidity: (isValid) => this.setState({isValid}),
    };
  }

  inputProps(child) {
    const {props, ref} = child;
    return Object.assign({}, props, {
      foundation: this.state.foundation,
      handleFocusChange: (isFocused) => this.setState({isFocused}),
      handleValueChange: (value, cb) => this.setState({value}, cb),
      setDisabled: (disabled) => this.setState({disabled}),
      setInputId: (id) => this.setState({inputId: id}),
      ref: (input) => {
        if (typeof ref === 'function') {
          ref(input);
        }
        this.inputComponent_ = input;
      },
      inputType: this.props.textarea ? 'textarea' : 'input',
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
    const {foundation} = this.state;
    const textField = (
      <div
        {...this.otherProps}
        className={this.classes}
        onClick={() => foundation && foundation.handleTextFieldInteraction()}
        onKeyDown={() => foundation && foundation.handleTextFieldInteraction()}
        key='text-field-container'
      >
        {leadingIcon ? this.renderIcon(leadingIcon) : null}
        {foundation ? this.renderInput() : null}
        {label && !fullWidth ? this.renderLabel() : null}
        {outlined ? this.renderNotchedOutline() : null}
        {!fullWidth && !textarea && !outlined ? this.renderLineRipple() : null}
        {trailingIcon ? this.renderIcon(trailingIcon) : null}
      </div>
    );
    if (helperText) {
      return [textField, this.renderHelperText()];
    }
    return textField;
  }

  renderInput() {
    const child = React.Children.only(this.props.children);
    const props = this.inputProps(child);
    return React.cloneElement(child, props);
  }

  renderLabel() {
    const {label, floatingLabelClassName} = this.props;
    const {inputId} = this.state;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.labelIsFloated}
        handleWidthChange={(initialLabelWidth) =>
          this.setState({initialLabelWidth})
        }
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
    const {isRtl, notchedOutlineClassName} = this.props;
    const {outlineIsNotched, notchedLabelWidth} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        isRtl={isRtl}
        notch={outlineIsNotched}
        notchWidth={notchedLabelWidth}
      />
    );
  }

  renderHelperText() {
    const {helperText} = this.props;
    if (!helperText) return;
    const {
      isValid,
      showHelperTextToScreenReader: showToScreenReader,
    } = this.state;
    const props = Object.assign(
      {
        showToScreenReader,
        isValid,
        key: 'text-field-helper-text',
      },
      helperText.props
    );
    return React.cloneElement(helperText, props);
  }

  renderIcon(icon) {
    const {disabled} = this.state;
    // Toggling disabled will trigger icon.foundation.setDisabled()
    return <Icon disabled={disabled}>{icon}</Icon>;
  }
}

export {Icon, HelperText, Input};
export default TextField;

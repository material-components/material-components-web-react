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
import classnames from 'classnames';
// @ts-ignore no .d.ts file
import {MDCTextFieldFoundation, MDCTextFieldAdapter} from '@material/textfield/dist/mdc.textfield';
import Input, {InputProps} from './Input';
import Icon, {IconProps} from './icon/index';
import HelperText, {HelperTextProps} from './helper-text/index';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

export interface Props<T extends HTMLElement = HTMLInputElement> {
  // InputProps<T> includes the prop `id`, which we use below in the constructor
  'children.props'?: InputProps<T>;
  children: React.ReactElement<Input<T>>;
  className?: string;
  dense?: boolean;
  floatingLabelClassName?: string;
  fullWidth?: boolean;
  helperText?: React.ReactElement<any>;
  isRtl?: boolean;
  label?: React.ReactNode;
  leadingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
  lineRippleClassName?: string;
  notchedOutlineClassName?: string;
  outlined?: boolean;
  onLeadingIconSelect?: () => void;
  onTrailingIconSelect?: () => void;
  textarea?: boolean;
  trailingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
};

type TextFieldProps<T extends HTMLElement = HTMLInputElement> = Props<T> & React.HTMLProps<HTMLDivElement>;

interface TextFieldState {
  foundation?: MDCTextFieldFoundation;
  value?: string | string[] | number;
  classList: Set<string>;
  inputId: string;
  isFocused: boolean;
  dir: string;
  disabled: boolean;
  labelIsFloated: boolean;
  initialLabelWidth: number;
  notchedLabelWidth: number;
  activeLineRipple: boolean;
  lineRippleCenter: number;
  outlineIsNotched: boolean;
  showHelperTextToScreenReader: boolean;
  isValid: boolean;
};

class TextField<T extends HTMLElement = HTMLInputElement> extends React.Component<TextFieldProps<T>, TextFieldState> {
  floatingLabelElement: React.RefObject<FloatingLabel> = React.createRef();
  inputComponent_: null | Input<T> = null;

  static defaultProps = {
    className: '',
    dense: false,
    floatingLabelClassName: '',
    fullWidth: false,
    isRtl: false,
    lineRippleClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    textarea: false,
  };

  constructor(props: TextFieldProps<T>) {
    super(props);
    let inputId;
    if (props.children && React.Children.only(props.children)) {
      inputId = props.children.props.id;
    }

    this.state = {
      // root state
      value: undefined,
      classList: new Set(),
      inputId,
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
      foundation: undefined,
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
    if (this.state.foundation) {
      this.state.foundation.destroy();
    }
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
      onLeadingIconSelect,
      onTrailingIconSelect,
      outlined,
      textarea,
      trailingIcon,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    return otherProps;
  }

  get adapter(): MDCTextFieldAdapter {
    const rootAdapterMethods = {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
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

  get inputAdapter(): Partial<MDCTextFieldAdapter> {
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

  get labelAdapter(): Partial<MDCTextFieldAdapter> {
    return {
      shakeLabel: (shakeLabel: boolean) => {
        const {floatingLabelElement: floatingLabel} = this;
        if (!shakeLabel) return;
        if (floatingLabel && floatingLabel.current) {
          floatingLabel.current.shake();
        }
      },
      floatLabel: (labelIsFloated: boolean) => this.setState({labelIsFloated}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.initialLabelWidth,
    };
  }

  get lineRippleAdapter(): Partial<MDCTextFieldAdapter> {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
      setLineRippleTransformOrigin: (lineRippleCenter: number) =>
        this.setState({lineRippleCenter}),
    };
  }

  get notchedOutlineAdapter(): Partial<MDCTextFieldAdapter> {
    return {
      notchOutline: (notchedLabelWidth: number) =>
        this.setState({outlineIsNotched: true, notchedLabelWidth}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };
  }

  get helperTextAdapter(): Partial<MDCTextFieldAdapter> {
    return {
      showToScreenReader: () =>
        this.setState({showHelperTextToScreenReader: true}),
      setValidity: (isValid: boolean) => this.setState({isValid}),
    };
  }

  inputProps(child: React.ReactElement<InputProps<T>>) {
    // ref does exist on React.ReactElement<InputProps<T>>
    // @ts-ignore
    const {props, ref} = child;
    return Object.assign({}, props, {
      foundation: this.state.foundation,
      handleFocusChange: (isFocused: boolean) => this.setState({isFocused}),
      handleValueChange: (value: string | number, cb: () => void) => this.setState({value}, cb),
      setDisabled: (disabled: boolean) => this.setState({disabled}),
      setInputId: (id: string) => this.setState({inputId: id}),
      ref: (input: Input<T>) => {
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
      onLeadingIconSelect,
      onTrailingIconSelect,
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
        {leadingIcon ? this.renderIcon(leadingIcon, onLeadingIconSelect) : null}
        {this.renderInput()}
        {label && !fullWidth ? this.renderLabel() : null}
        {outlined ? this.renderNotchedOutline() : null}
        {!fullWidth && !textarea && !outlined ? this.renderLineRipple() : null}
        {trailingIcon ? this.renderIcon(trailingIcon, onTrailingIconSelect) : null}
      </div>
    );

    if (helperText) {
      return (
        <React.Fragment>
          {textField}
          {this.renderHelperText()}
        </React.Fragment>
      );
    }
    return textField;
  }

  renderInput() {
    const child: React.ReactElement<InputProps<T>> = React.Children.only(this.props.children);
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
      helperText.props,
    );
    return React.cloneElement(helperText, props);
  }

  renderIcon(icon: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>,
    onSelect?: () => void) {
    const {disabled} = this.state;
    // Toggling disabled will trigger icon.foundation.setDisabled()
    return <Icon disabled={disabled} onSelect={onSelect}>{icon}</Icon>;
  }
}

export {Icon, HelperText, Input, IconProps, HelperTextProps, InputProps};
export default TextField;

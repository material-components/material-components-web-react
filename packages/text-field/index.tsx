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
import React from 'react';
import classnames from 'classnames';
import {
  MDCTextFieldAdapter,
  MDCTextFieldRootAdapter,
  MDCTextFieldLabelAdapter,
  MDCTextFieldInputAdapter,
  MDCTextFieldOutlineAdapter,
  MDCTextFieldLineRippleAdapter,
} from '@material/textfield/adapter';
import {MDCTextFieldFoundation} from '@material/textfield/foundation';
import Input, {InputProps} from './Input';
import Icon, {IconProps} from './icon';
import HelperText, {HelperTextProps} from './helper-text';
import CharacterCounter, {CharacterCounterProps} from './character-counter';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

const cssClasses = MDCTextFieldFoundation.cssClasses;

export interface Props<T extends HTMLElement = HTMLInputElement> {
  // InputProps<T> includes the prop `id`, which we use below in the constructor
  'children.props'?: InputProps<T>;
  children: React.ReactElement<Input<T>>;
  className?: string;
  dense?: boolean;
  floatingLabelClassName?: string;
  fullWidth?: boolean;
  helperText?: React.ReactElement<HelperTextProps>;
  characterCounter?: React.ReactElement<CharacterCounterProps>;
  label?: React.ReactNode;
  leadingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
  lineRippleClassName?: string;
  notchedOutlineClassName?: string;
  outlined?: boolean;
  onLeadingIconSelect?: () => void;
  onTrailingIconSelect?: () => void;
  textarea?: boolean;
  trailingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
  noLabel?: boolean;
}

type TextFieldProps<T extends HTMLElement = HTMLInputElement> = Props<T> &
  React.HTMLProps<HTMLDivElement>;

interface TextFieldState {
  foundation?: MDCTextFieldFoundation;
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
  isValid: boolean;
}

class TextField<
  T extends HTMLElement = HTMLInputElement
> extends React.Component<TextFieldProps<T>, TextFieldState> {
  textFieldElement: React.RefObject<HTMLDivElement> = React.createRef();
  floatingLabelElement: React.RefObject<FloatingLabel> = React.createRef();
  inputComponent_: null | Input<T> = null;

  static defaultProps = {
    className: '',
    dense: false,
    floatingLabelClassName: '',
    fullWidth: false,
    lineRippleClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    textarea: false,
    noLabel: false,
  };

  constructor(props: TextFieldProps<T>) {
    super(props);
    let inputId;
    if (props.children && React.Children.only(props.children)) {
      inputId = props.children.props.id;
    }

    this.state = {
      // root state
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
      isValid: true,
      // foundation is on state,
      // so that the Input renders after this component
      foundation: undefined,
    };
  }

  componentDidMount() {
    const foundation = new MDCTextFieldFoundation(this.adapter);
    this.setState({foundation});
    foundation.init();
  }

  componentWillUnmount() {
    this.state.foundation && this.state.foundation.destroy();
  }
  /**
   * getters
   */
  get classes() {
    const {classList, disabled, isFocused, isValid} = this.state;
    const {
      className,
      dense,
      fullWidth,
      textarea,
      trailingIcon,
      leadingIcon,
      noLabel,
    } = this.props;

    return classnames(cssClasses.ROOT, Array.from(classList), className, {
      [cssClasses.DENSE]: dense,
      [cssClasses.DISABLED]: disabled,
      [cssClasses.FOCUSED]: isFocused,
      [cssClasses.INVALID]: !isValid,
      [cssClasses.OUTLINED]:
        this.notchedOutlineAdapter.hasOutline() && !fullWidth,
      [cssClasses.TEXTAREA]: textarea,
      [cssClasses.WITH_LEADING_ICON]: leadingIcon,
      // TODO change literal to constant
      'mdc-text-field--fullwidth': fullWidth,
      'mdc-text-field--with-trailing-icon': trailingIcon,
      'mdc-text-field--no-label': !this.labelAdapter.hasLabel() || noLabel,
    });
  }

  get otherProps() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      children,
      className,
      dense,
      floatingLabelClassName,
      fullWidth,
      helperText,
      characterCounter,
      label,
      leadingIcon,
      lineRippleClassName,
      notchedOutlineClassName,
      onLeadingIconSelect,
      onTrailingIconSelect,
      outlined,
      textarea,
      trailingIcon,
      noLabel,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;

    return otherProps;
  }

  get adapter(): MDCTextFieldAdapter {
    const rootAdapterMethods: MDCTextFieldRootAdapter = {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      // Please manage handler though JSX
      registerTextFieldInteractionHandler: () => undefined,
      deregisterTextFieldInteractionHandler: () => undefined,
      registerValidationAttributeChangeHandler: (): any => undefined,
      deregisterValidationAttributeChangeHandler: () => undefined,
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

  get inputAdapter(): MDCTextFieldInputAdapter {
    return {
      isFocused: () => this.state.isFocused,
      getNativeInput: () => {
        const component = this.inputComponent_;
        if (!component) {
          throw Error('MDCReactTextField: The input did not render properly');
        } else {
          return {
            disabled: component.isDisabled(),
            value: component.getValue(),
            maxLength: component.getMaxLength(),
            type: component.getInputType(),
            validity: {
              badInput: !!component.isBadInput(),
              valid: !!component.isValid(),
            },
          };
        }
      },
      // Please manage handler though JSX
      registerInputInteractionHandler: () => undefined,
      deregisterInputInteractionHandler: () => undefined,
    };
  }

  get labelAdapter(): MDCTextFieldLabelAdapter {
    return {
      shakeLabel: (shakeLabel: boolean) => {
        const {floatingLabelElement: floatingLabel} = this;
        if (!shakeLabel) return;
        if (floatingLabel && floatingLabel.current) {
          floatingLabel.current.shake();
        }
      },
      floatLabel: (labelIsFloated: boolean) => this.setState({labelIsFloated}),
      hasLabel: () => !!this.props.label && !this.props.fullWidth,
      getLabelWidth: () => this.state.initialLabelWidth,
    };
  }

  get lineRippleAdapter(): MDCTextFieldLineRippleAdapter {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
      setLineRippleTransformOrigin: (lineRippleCenter: number) =>
        this.setState({lineRippleCenter}),
    };
  }

  get notchedOutlineAdapter(): MDCTextFieldOutlineAdapter {
    return {
      notchOutline: (notchedLabelWidth: number) =>
        this.setState({outlineIsNotched: true, notchedLabelWidth}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined || !!this.props.textarea,
    };
  }

  get inputProps() {
    // ref does exist on React.ReactElement<InputProps<T>>
    // @ts-ignore
    const {props} = React.Children.only(this.props.children);

    return Object.assign({}, props, {
      foundation: this.state.foundation,
      handleFocusChange: (isFocused: boolean) => {
        this.setState({isFocused});
        if (!this.state.foundation) return;
        if (isFocused) {
          this.state.foundation.activateFocus();
        } else {
          this.state.foundation.deactivateFocus();
        }
      },
      setDisabled: (disabled: boolean) => this.setState({disabled}),
      setInputId: (id: string) => this.setState({inputId: id}),
      syncInput: (input: Input<T>) => (this.inputComponent_ = input),
      inputType: this.props.textarea ? 'textarea' : 'input',
      placeholder: this.props.noLabel ? this.props.label : null,
    });
  }

  get characterCounterProps() {
    const {value, maxLength} = this.inputProps;
    return {
      count: value ? value.length : 0,
      maxLength: maxLength ? parseInt(maxLength) : 0,
    };
  }

  /**
   * render methods
   */
  render() {
    const {
      fullWidth,
      helperText,
      characterCounter,
      onLeadingIconSelect,
      onTrailingIconSelect,
      leadingIcon,
      trailingIcon,
      textarea,
      noLabel,
    } = this.props;
    const {foundation} = this.state;

    return (
      <React.Fragment>
        <div
          {...this.otherProps}
          className={this.classes}
          onClick={() => foundation!.handleTextFieldInteraction()}
          onKeyDown={() => foundation!.handleTextFieldInteraction()}
          ref={this.textFieldElement}
          key='text-field-container'
        >
          {leadingIcon
            ? this.renderIcon(leadingIcon, onLeadingIconSelect)
            : null}
          {textarea &&
            characterCounter &&
            this.renderCharacterCounter(characterCounter)}
          {this.renderInput()}
          {this.notchedOutlineAdapter.hasOutline() ? (
            this.renderNotchedOutline()
          ) : (
            <React.Fragment>
              {this.labelAdapter.hasLabel() && !noLabel
                ? this.renderLabel()
                : null}
              {!textarea && !fullWidth ? this.renderLineRipple() : null}
            </React.Fragment>
          )}
          {trailingIcon
            ? this.renderIcon(trailingIcon, onTrailingIconSelect)
            : null}
        </div>
        {helperText || characterCounter
          ? this.renderHelperLine(helperText, characterCounter)
          : null}
      </React.Fragment>
    );
  }

  renderInput() {
    const child = React.Children.only(
      this.props.children
    ) as React.ReactElement<InputProps<T>>;
    return React.cloneElement(child, this.inputProps);
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
    const {notchedOutlineClassName} = this.props;
    const {notchedLabelWidth, outlineIsNotched} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        notchWidth={notchedLabelWidth}
        notch={outlineIsNotched}
      >
        {this.labelAdapter.hasLabel() ? this.renderLabel() : null}
      </NotchedOutline>
    );
  }

  renderHelperLine(
    helperText?: React.ReactElement<HelperTextProps>,
    characterCounter?: React.ReactElement<CharacterCounterProps>
  ) {
    return (
      <div className={cssClasses.HELPER_LINE}>
        {helperText && this.renderHelperText(helperText)}
        {characterCounter &&
          !this.props.textarea &&
          this.renderCharacterCounter(characterCounter)}
      </div>
    );
  }

  renderHelperText(helperText: React.ReactElement<HelperTextProps>) {
    const {isValid} = this.state;
    const props = Object.assign(
      {
        isValid,
        key: 'text-field-helper-text',
      },
      helperText.props
    );
    return React.cloneElement(helperText, props);
  }

  renderIcon(
    icon: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>,
    onSelect?: () => void
  ) {
    const {disabled} = this.state;
    // Toggling disabled will trigger icon.foundation.setDisabled()
    return (
      <Icon disabled={disabled} onSelect={onSelect}>
        {icon}
      </Icon>
    );
  }

  renderCharacterCounter(
    characterCounter: React.ReactElement<CharacterCounterProps>
  ) {
    return React.cloneElement(
      characterCounter,
      Object.assign(this.characterCounterProps, characterCounter.props)
    );
  }
}

export {
  Icon,
  HelperText,
  CharacterCounter,
  Input,
  IconProps,
  HelperTextProps,
  CharacterCounterProps,
  InputProps,
};
export default TextField;

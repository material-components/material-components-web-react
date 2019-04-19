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
import {MDCTextFieldFoundation} from '@material/textfield/foundation';

export interface InputProps<T extends HTMLElement = HTMLInputElement> {
  className?: string;
  inputType?: 'input' | 'textarea';
  isValid?: boolean;
  foundation?: MDCTextFieldFoundation;
  handleValueChange?: (value: string | number | string[] | undefined, cb: () => void) => void;
  ref?: (inputInstance: Input<T>) => void,
  onBlur?: Pick<React.HTMLProps<T>, 'onBlur'>;
  onChange?: Pick<React.HTMLProps<T>, 'onChange'>;
  onFocus?: Pick<React.HTMLProps<T>, 'onFocus'>;
  onMouseDown?: Pick<React.HTMLProps<T>, 'onMouseDown'>;
  onTouchStart?: Pick<React.HTMLProps<T>, 'onTouchStart'>;
  setDisabled?: (disabled: boolean) => void;
  setInputId?: (id: string | number) => void;
  handleFocusChange?: (isFocused: boolean) => void;
};

type InputElementProps = Exclude<React.HTMLProps<HTMLInputElement>, 'ref'>;
type TextareaElementProps = Exclude<React.HTMLProps<HTMLTextAreaElement>, 'ref'>;
type Props<T extends HTMLElement = HTMLInputElement>
  = InputProps<T> & (T extends HTMLInputElement ? InputElementProps : TextareaElementProps);

interface InputState {
  wasUserTriggeredChange: boolean;
};

declare type ValidationAttrWhiteList =
  'pattern' | 'min' | 'max' | 'required' | 'step' | 'minlength' | 'maxlength';
declare type ValidationAttrWhiteListReact =
  Exclude<ValidationAttrWhiteList, 'minlength' | 'maxlength'> | 'minLength' | 'maxLength';

const VALIDATION_ATTR_WHITELIST: ValidationAttrWhiteList[] = [
  'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
];


export default class Input<T extends HTMLElement = HTMLInputElement> extends React.Component<Props<T>, InputState> {
  inputElement_: React.RefObject<
    T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement
  > = React.createRef();

  static defaultProps = {
    className: '',
    inputType: 'input',
    disabled: false,
    id: '',
    handleValueChange: () => {},
    setDisabled: () => {},
    setInputId: () => {},
    handleFocusChange: () => {},
    value: '',
  };

  state = {wasUserTriggeredChange: false};

  componentDidMount() {
    const {
      id,
      disabled,
      value,
      setInputId,
      setDisabled,
      handleValueChange,
      foundation,
      isValid,
    } = this.props;
    if (setInputId && id) {
      setInputId(id!);
    }
    if (setDisabled && disabled) {
      setDisabled(true);
    }
    if (handleValueChange && value) {
      handleValueChange(value, () => foundation && foundation.setValue(this.valueToString(value)));
    }
    if (foundation && isValid !== undefined) {
      foundation.setUseNativeValidation(false);
      foundation.setValid(!!isValid);
    }
  }

  componentDidUpdate(prevProps: Props<T>) {
    const {
      id,
      foundation,
      value,
      disabled,
      isValid,
      handleValueChange,
      setInputId,
      setDisabled,
    } = this.props;

    this.handleValidationAttributeUpdate(prevProps);

    if (disabled !== prevProps.disabled) {
      setDisabled && setDisabled(disabled!);
      foundation && foundation.setDisabled(!!disabled);
    }

    if (id !== prevProps.id) {
      setInputId && setInputId(id!);
    }

    if (value !== prevProps.value) {
      handleValueChange && handleValueChange(value, () => {
        // only call #foundation.setValue on programatic changes;
        // not changes by the user.
        if (this.state.wasUserTriggeredChange) {
          this.setState({wasUserTriggeredChange: false});
        } else if (this.props.value !== undefined && foundation) {
          foundation.setValue(this.valueToString(value));
        }
      });
    }

    if (isValid !== prevProps.isValid && foundation) {
      if (isValid === undefined) {
        foundation.setUseNativeValidation(true);
      } else {
        foundation.setUseNativeValidation(false);
        foundation.setValid(!!isValid);
      }
    }
  }

  valueToString(value?: string | string[] | number) {
    let str = '';
    if (typeof value === 'object') {
      str = value.join('');
    } else if (typeof value === 'number') {
      str = value.toString();
    } else if (typeof value === 'string') {
      str = value;
    }
    return str;
  }

  get classes() {
    return classnames('mdc-text-field__input', this.props.className);
  }

  get inputElement() {
    const element = this.inputElement_.current;
    return element ? element : null;
  }

  handleFocus = (evt: React.FocusEvent<T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement>) => {
    const {foundation, handleFocusChange, onFocus = () => {}} = this.props;
    foundation && foundation.activateFocus();
    handleFocusChange && handleFocusChange(true);
    onFocus(evt);
  };

  handleBlur = (evt: React.FocusEvent<T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement>) => {
    const {foundation, handleFocusChange, onBlur = () => {}} = this.props;
    foundation && foundation.deactivateFocus();
    handleFocusChange && handleFocusChange(false);
    onBlur(evt);
  };

  handleMouseDown = (evt: React.MouseEvent<T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement>) => {
    const {foundation, onMouseDown = () => {}} = this.props;
    foundation && foundation.setTransformOrigin(evt.nativeEvent);
    onMouseDown(evt);
  };

  handleTouchStart = (evt: React.TouchEvent<T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement>) => {
    const {foundation, onTouchStart = () => {}} = this.props;
    foundation && foundation.setTransformOrigin(evt.nativeEvent);
    onTouchStart(evt);
  };

  // To stay in sync with the MDC React Text Field Component, handleValueChange()
  // is called to update MDC React Text Field's state. That state variable
  // is used to let other subcomponents and the foundation know what the current
  // value of the input is.
  handleChange = (evt: React.FormEvent<T extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement>) => {
    const {foundation, onChange = () => {}} = this.props;
    // autoCompleteFocus runs on `input` event in MDC Web. In React, onChange and
    // onInput are the same event
    // https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput
    foundation && foundation.autoCompleteFocus();
    this.setState({wasUserTriggeredChange: true});
    onChange(evt);
  };

  handleValidationAttributeUpdate = (nextProps: Props<T>) => {
    const {foundation} = nextProps;
    VALIDATION_ATTR_WHITELIST.some((attributeName: ValidationAttrWhiteList) => {
      let attr: ValidationAttrWhiteListReact;
      if (attributeName === 'minlength') {
        attr = 'minLength';
      } else if (attributeName === 'maxlength') {
        attr = 'maxLength';
      } else {
        attr = attributeName;
      }
      if (this.props[attr] !== nextProps[attr]) {
        foundation!.handleValidationAttributeChange([attributeName]);
        return true;
      }
      return false;
    });
  };

  isBadInput = () => {
    if (!this.inputElement) return false;
    return this.inputElement.validity.badInput;
  }

  isValid = () => {
    if (!this.inputElement || this.props.isValid !== undefined) {
      return this.props.isValid;
    }
    return this.inputElement.validity.valid;
  };

  isDisabled = () => !!this.props.disabled;

  getMaxLength = () => (typeof this.props.maxLength === 'number' ? this.props.maxLength : -1);

  getInputType = () => (this.props.inputType ? this.props.inputType.toString() : 'input');

  getValue = () => this.valueToString(this.props.value);

  render() {
    const {
      inputType,
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      foundation,
      isValid,
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

    const props = Object.assign({}, {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart,
      onChange: this.handleChange,
      disabled: disabled,
      value: value,
      ref: this.inputElement_,
      className: this.classes,
    }, otherProps);

    if (inputType === 'input') {
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      return (<input {...props} />);
    }
    return (<textarea {...props} />);
  }
}

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
import {MDCTextFieldHelperTextAdapter} from '@material/textfield/helper-text/adapter';
import {MDCTextFieldHelperTextFoundation} from '@material/textfield/helper-text/foundation';

const cssClasses = MDCTextFieldHelperTextFoundation.cssClasses;

export interface HelperTextProps {
  'aria-hidden'?: boolean;
  children: React.ReactNode;
  className?: string;
  isValid?: boolean;
  isValidationMessage?: boolean;
  persistent?: boolean;
  role?: string;
  showToScreenReader?: boolean;
  validation?: boolean;
}

interface HelperTextState {
  'aria-hidden': boolean;
  role?: string;
  classList: Set<string>;
}

export default class HelperText extends React.Component<
  HelperTextProps,
  HelperTextState
> {
  foundation!: MDCTextFieldHelperTextFoundation;

  static defaultProps = {
    ['aria-hidden']: false,
    className: '',
    isValid: true,
    isValidationMessage: false,
    persistent: false,
    showToScreenReader: false,
    validation: false,
  };

  constructor(props: HelperTextProps) {
    super(props);
    this.state = {
      ['aria-hidden']: props['aria-hidden']!,
      role: props.role,
      classList: new Set(),
    };
  }

  componentDidMount() {
    this.foundation = new MDCTextFieldHelperTextFoundation(this.adapter);
    this.foundation.init();
    if (this.props.showToScreenReader) {
      this.foundation.showToScreenReader();
    }
    if (!this.props.isValid) {
      this.foundation.setValidity(false);
    }
    if (this.props.isValidationMessage) {
      this.foundation.setValidation(true);
    }
  }

  componentDidUpdate(prevProps: HelperTextProps) {
    if (
      this.props.showToScreenReader !== prevProps.showToScreenReader &&
      this.props.showToScreenReader
    ) {
      this.foundation.showToScreenReader();
    }
    if (this.props.isValid !== prevProps.isValid) {
      this.foundation.setValidity(!!this.props.isValid);
    }
    if (
      this.props.isValidationMessage !== prevProps.isValidationMessage &&
      this.props.isValidationMessage
    ) {
      this.foundation.setValidation(this.props.isValidationMessage);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get classes() {
    const {className, persistent, validation} = this.props;
    return classnames(cssClasses.ROOT, className, {
      [cssClasses.HELPER_TEXT_PERSISTENT]: persistent,
      [cssClasses.HELPER_TEXT_VALIDATION_MSG]: validation,
    });
  }

  get adapter(): MDCTextFieldHelperTextAdapter {
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
      setAttr: (attr: keyof HelperTextState, value: string) =>
        this.setState((prevState) => ({...prevState, [attr]: value})),
      removeAttr: (attr: keyof HelperTextState) =>
        this.setState((prevState) => ({...prevState, [attr]: null})),
      // Please manage content through JSX
      setContent: () => undefined,
    };
  }

  render() {
    return (
      <p
        className={this.classes}
        role={this.state.role}
        aria-hidden={this.state['aria-hidden']}
      >
        {this.props.children}
      </p>
    );
  }
}

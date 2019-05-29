// The MIT License
//
// Copyright (c) 2019 Google, Inc.
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
import {MDCSelectHelperTextAdapter} from '@material/select/helper-text/adapter';
import {MDCSelectHelperTextFoundation} from '@material/select/helper-text/foundation';

export interface SelectHelperTextProps
  extends React.HTMLProps<HTMLParagraphElement> {
  persistent?: boolean;
  setHelperTextFoundation?: (
    foundation?: MDCSelectHelperTextFoundation
  ) => void;
}

interface ElementAttributes {
  'aria-hidden'?: boolean | 'false' | 'true';
  role?: string;
}

interface SelectHelperTextState extends ElementAttributes {
  classList: Set<string>;
}

export class SelectHelperText extends React.Component<
  SelectHelperTextProps,
  SelectHelperTextState
> {
  foundation?: MDCSelectHelperTextFoundation;

  state: SelectHelperTextState = {
    'aria-hidden': undefined,
    role: undefined,
    classList: new Set(),
  };

  componentDidMount() {
    const {setHelperTextFoundation} = this.props;
    this.foundation = new MDCSelectHelperTextFoundation(this.adapter);
    this.foundation.init();
    setHelperTextFoundation && setHelperTextFoundation(this.foundation);
  }

  componentWillUnmount() {
    const {setHelperTextFoundation} = this.props;
    if (this.foundation) {
      this.foundation.destroy();
      setHelperTextFoundation && setHelperTextFoundation(undefined);
    }
  }

  get classes() {
    const {className, persistent} = this.props;
    const {classList} = this.state;
    return classnames(
      'mdc-select-helper-text',
      Array.from(classList),
      className,
      {
        'mdc-select-helper-text--persistent': persistent,
      }
    );
  }

  get adapter(): MDCSelectHelperTextAdapter {
    return {
      addClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => {
        return this.classes.split(' ').includes(className);
      },
      setAttr: (
        attr: keyof ElementAttributes,
        value: ElementAttributes[keyof ElementAttributes]
      ) => {
        this.setState((prevState) => ({
          ...prevState,
          [attr]: value,
        }));
      },
      removeAttr: (attr: keyof ElementAttributes) => {
        this.setState((prevState) => ({...prevState, [attr]: null}));
      },
      setContent: () => {
        // not implmenting because developer should would never call `setContent()`
      },
    };
  }

  render() {
    const {
      children,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      persistent,
      className,
      setHelperTextFoundation,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;
    const {'aria-hidden': ariaHidden, role} = this.state;

    return (
      <p
        className={this.classes}
        aria-hidden={ariaHidden}
        role={role}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}

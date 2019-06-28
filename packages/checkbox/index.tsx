// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import classnames from 'classnames';
import {MDCCheckboxFoundation} from '@material/checkbox/foundation';
import {MDCCheckboxAdapter} from '@material/checkbox/adapter';
import {cssClasses} from '@material/checkbox/constants';
import {
  withRipple,
  InjectedProps,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@material/react-ripple';

import NativeControl from './NativeControl';

export interface CheckboxProps
  extends InjectedProps<HTMLDivElement, HTMLInputElement> {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  nativeControlId?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  initRipple: (surface: HTMLDivElement, activator?: HTMLInputElement) => void;
  children?: React.ReactNode;
  unbounded: boolean;
}

interface CheckboxState {
  checked?: boolean;
  indeterminate?: boolean;
  classList: Set<string>;
  'aria-checked': string;
  disabled: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  inputElement: React.RefObject<HTMLInputElement> = React.createRef();
  foundation!: MDCCheckboxFoundation;

  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: props.checked,
      indeterminate: props.indeterminate,
      classList: new Set(),
      'aria-checked': 'false',
      disabled: props.disabled!,
    };
  }

  static defaultProps: Partial<CheckboxProps> = {
    checked: false,
    className: '',
    disabled: false,
    indeterminate: false,
    onChange: () => {},
    unbounded: true,
  };

  componentDidMount() {
    this.foundation = new MDCCheckboxFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setDisabled(this.props.disabled!);
    // indeterminate property on checkboxes is not supported:
    // https://github.com/facebook/react/issues/1798#issuecomment-333414857
    if (this.inputElement.current) {
      this.inputElement.current.indeterminate = this.state.indeterminate!;
    }
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    const {checked, indeterminate, disabled} = this.props;
    if (
      checked !== prevProps.checked ||
      indeterminate !== prevProps.indeterminate
    ) {
      this.handleChange(checked!, indeterminate!);
    }
    if (disabled !== prevProps.disabled) {
      this.foundation.setDisabled(disabled!);
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  init = (el: HTMLDivElement) => {
    if (!this.inputElement.current) return;
    this.props.initRipple(el, this.inputElement.current);
  };

  handleChange = (checked: boolean, indeterminate: boolean) => {
    this.setState({checked, indeterminate}, () => {
      this.foundation.handleChange();
      if (this.inputElement.current) {
        this.inputElement.current.indeterminate = indeterminate;
      }
    });
  };

  get classes(): string {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames(
      'mdc-checkbox',
      Array.from(classList),
      this.state.disabled ? cssClasses.DISABLED : null,
      className
    );
  }

  updateState = (key: keyof CheckboxState, value: string | boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  removeState = (key: keyof CheckboxState) => this.updateState(key, false);

  get adapter(): MDCCheckboxAdapter {
    return {
      addClass: (className: string) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasNativeControl: () => true,
      // isAttachedToDOM will likely be removed
      // https://github.com/material-components/material-components-web/issues/3691
      isAttachedToDOM: () => true,
      isChecked: () => this.state.checked!,
      isIndeterminate: () => this.state.indeterminate!,
      setNativeControlAttr: this.updateState,
      setNativeControlDisabled: (disabled) => {
        this.updateState('disabled', disabled);
      },
      removeNativeControlAttr: this.removeState,
      forceLayout: () => null,
    };
  }

  onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    const {checked, indeterminate} = evt.target;
    this.handleChange(checked, indeterminate);
    onChange!(evt);
  };

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      checked,
      indeterminate,
      initRipple,
      onChange,
      unbounded,
      disabled,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      nativeControlId,
      name,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onAnimationEnd={() => this.foundation.handleAnimationEnd()}
        ref={this.init}
        {...otherProps}
      >
        <NativeControl
          id={nativeControlId}
          checked={this.state.checked}
          disabled={this.state.disabled}
          aria-checked={
            (this.state['aria-checked'] || this.state.checked!.toString()) as (
              | 'true'
              | 'false')
          }
          name={name}
          onChange={this.onChange}
          rippleActivatorRef={this.inputElement}
        />
        <div className='mdc-checkbox__background'>
          <svg
            className='mdc-checkbox__checkmark'
            viewBox='0 0 24 24'
            focusable='false'
          >
            <path
              className='mdc-checkbox__checkmark-path'
              fill='none'
              d='M1.73,12.91 8.1,19.28 22.79,4.59'
            />
          </svg>
          <div className='mdc-checkbox__mixedmark' />
        </div>
      </div>
    );
  }
}

export default withRipple<CheckboxProps, HTMLDivElement, HTMLInputElement>(
  Checkbox
);

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
import {MDCRadioFoundation} from '@material/radio/foundation';
import {MDCRadioAdapter} from '@material/radio/adapter';
import {
  withRipple,
  InjectedProps,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@material/react-ripple';
import NativeControl, {NativeControlProps} from './NativeControl'; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface RadioProps
  extends InjectedProps<HTMLDivElement, HTMLInputElement>,
    React.HTMLProps<HTMLDivElement> {
  label?: string;
  initRipple: (
    surface: HTMLDivElement,
    rippleActivatorRef?: HTMLInputElement
  ) => void;
  wrapperClasses?: string;
  children: React.ReactElement<NativeControlProps>;
}

interface RadioState {
  nativeControlId: string;
  classList: Set<string>;
  disabled: boolean;
}

class Radio extends React.Component<RadioProps, RadioState> {
  foundation: MDCRadioFoundation;
  private radioElement: React.RefObject<HTMLDivElement> = React.createRef();
  rippleActivatorRef: React.RefObject<HTMLInputElement> = React.createRef();

  state: RadioState = {
    classList: new Set(),
    disabled: false,
    nativeControlId: '',
  };

  constructor(props: RadioProps) {
    super(props);
    this.foundation = new MDCRadioFoundation(this.adapter);
  }

  static defaultProps: Partial<RadioProps> = {
    label: '',
    initRipple: () => {},
    className: '',
    wrapperClasses: '',
    unbounded: true,
  };

  componentDidMount() {
    this.foundation.init();
    const childProps = this.props.children.props;
    if (childProps.disabled) {
      this.foundation.setDisabled(childProps.disabled);
    }
    if (childProps.id) {
      this.setState({nativeControlId: childProps.id});
    }
    if (this.rippleActivatorRef && this.rippleActivatorRef.current) {
      this.props.initRipple(
        this.radioElement.current as HTMLDivElement,
        this.rippleActivatorRef.current
      );
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  componentDidUpdate(prevProps: RadioProps) {
    const {children} = this.props;
    if (!children) {
      React.Children.only(children);
      return;
    }
    const childProps = children.props;
    if (childProps.disabled !== prevProps.children.props.disabled) {
      this.foundation.setDisabled(childProps.disabled);
    }
    if (childProps.id !== prevProps.children.props.id) {
      this.setState({nativeControlId: childProps.id});
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-radio', Array.from(classList), className);
  }

  get adapter(): MDCRadioAdapter {
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
      setNativeControlDisabled: (disabled: boolean) =>
        this.setState({disabled}),
    };
  }

  render() {
    const {nativeControlId} = this.state;
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      label,
      initRipple,
      unbounded,
      className,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      wrapperClasses,
      ...otherProps
    } = this.props;
    return (
      <div className={classnames('mdc-form-field', wrapperClasses)}>
        <div className={this.classes} ref={this.radioElement} {...otherProps}>
          {this.renderNativeControl()}
          <div className='mdc-radio__background'>
            <div className='mdc-radio__outer-circle' />
            <div className='mdc-radio__inner-circle' />
          </div>
        </div>
        {label ? <label htmlFor={nativeControlId}>{label}</label> : null}
      </div>
    );
  }

  renderNativeControl() {
    const children = React.Children.only(this.props.children);
    const updatedProps = Object.assign({}, children.props, {
      disabled: this.state.disabled,
      rippleActivatorRef: this.rippleActivatorRef,
    });
    return React.cloneElement(children, updatedProps);
  }
}

export default withRipple<RadioProps, HTMLDivElement, HTMLInputElement>(Radio);
export {Radio, NativeControl as NativeRadioControl};

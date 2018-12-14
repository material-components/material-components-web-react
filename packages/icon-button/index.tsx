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
// @ts-ignore
import withRipple from '@material/react-ripple';
// @ts-ignore
import {MDCIconButtonToggleFoundation} from '@material/icon-button/dist/mdc.iconButton';
// @ts-ignore
import IconToggle from './IconToggle.tsx';
const ARIA_PRESSED = 'aria-pressed';

export interface IconButtonBaseProps<T> {
  className: string;
  initRipple: (surface: T) => void;
  isLink: boolean;
  onClick: (event: React.MouseEvent) => void;
  unbounded: boolean;
  [ARIA_PRESSED]?: Pick<React.HTMLProps<HTMLElement>, 'aria-pressed'>;
}

type IconButtonBaseState = {
  classList: Set<string>;
  [ARIA_PRESSED]?: Pick<React.HTMLProps<HTMLElement>, 'aria-pressed'>;
}

export type AnchorProps = React.HTMLProps<HTMLAnchorElement> & IconButtonBaseProps<HTMLAnchorElement>;
export type ButtonProps = React.HTMLProps<HTMLButtonElement> & IconButtonBaseProps<HTMLButtonElement>;
export type IconButtonProps<T> = T extends ButtonProps ? ButtonProps : AnchorProps;

class IconButtonBase<T extends {}> extends React.Component<
  IconButtonProps<T>;
  IconButtonBaseState
  > {
  foundation_ = MDCIconButtonToggleFoundation;

  constructor(props: IconButtonProps<T>) {
    super(props);
    this.state = {
      classList: new Set(),
      [ARIA_PRESSED]: props[ARIA_PRESSED],
    };
  }

  static defaultProps = {
    className: '',
    initRipple: () => {},
    isLink: false,
    onClick: () => {},
    unbounded: true,
  };

  componentDidMount() {
    this.foundation_ = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-icon-button', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      setAttr: this.updateState,
    };
  }

  updateState = (key: keyof IconButtonProps<T>, value: string | boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  handleClick_ = (e: React.MouseEvent) => {
    this.props.onClick(e);
    this.foundation_.handleClick();
  };

  render() {
    const {
      children,
      initRipple,
      isLink,
      /* eslint-disable no-unused-vars */
      className,
      onClick,
      unbounded,
      [ARIA_PRESSED]: ariaPressed,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    const props = {
      className: this.classes,
      ref: initRipple,
      [ARIA_PRESSED]: this.state[ARIA_PRESSED],
      onClick: this.handleClick_,
      ...otherProps,
    };
    if (isLink) {
      return <a {...props}>{children}</a>;
    }
    return <button {...props}>{children}</button>;
  }
}

export default withRipple(IconButtonBase);
export {IconToggle, IconButtonBase};

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
import * as Ripple from '@material/react-ripple';
// @ts-ignore no mdc .d.ts file
import {MDCIconButtonToggleFoundation} from '@material/icon-button/foundation';
import IconToggle from './IconToggle';
const ARIA_PRESSED = 'aria-pressed';

interface ElementAttributes {
  // from HTMLAttributes
  [ARIA_PRESSED]?: boolean | 'false' | 'mixed' | 'true';
}

type IconButtonTypes = HTMLButtonElement | HTMLAnchorElement;
export interface IconButtonBaseProps extends ElementAttributes {
  isLink?: boolean;
};

interface IconButtonBaseState extends ElementAttributes {
  classList: Set<string>;
};

export interface IconButtonProps<T extends IconButtonTypes>
  extends Ripple.InjectedProps<T>, IconButtonBaseProps, React.HTMLProps<T> {};

class IconButtonBase<T extends IconButtonTypes> extends React.Component<
  IconButtonProps<T>,
  IconButtonBaseState
  > {
  foundation = MDCIconButtonToggleFoundation;

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
    this.foundation = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation.init();
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

  updateState = (key: keyof IconButtonBaseState, value: string | boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  handleClick_ = (e: React.MouseEvent<T>) => {
    this.props.onClick!(e);
    this.foundation.handleClick();
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
      return <a {...props as IconButtonProps<HTMLAnchorElement>}>{children}</a>;
    }
    return <button {...props as IconButtonProps<HTMLButtonElement>}>{children}</button>;
  }
}

const IconButton = Ripple.withRipple<IconButtonProps<IconButtonTypes>, IconButtonTypes>(IconButtonBase);

export default IconButton;
export {IconToggle, IconButtonBase};

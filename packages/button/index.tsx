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

const BUTTON_CLASS_NAME = 'mdc-button__icon';

type ButtonTypes = HTMLAnchorElement | HTMLButtonElement;

export interface ButtonProps<T extends ButtonTypes>
  extends Ripple.InjectedProps<T>, React.AnchorHTMLAttributes<T>, React.ButtonHTMLAttributes<T> {
    raised?: boolean;
    unelevated?: boolean;
    outlined?: boolean;
    dense?: boolean;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
    href?: string;
    trailingIcon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
}

export const Button = <T extends ButtonTypes>(
  {
    className = '',
    raised = false,
    unelevated = false,
    outlined = false,
    dense = false,
    disabled = false,
    icon,
    href,
    children,
    initRipple,
    trailingIcon,
    // eslint disabled since we do not want to include
    // this in ...otherProps.
    // if unbounded is passed to the <button> element, it will throw
    // a warning.
    unbounded = false, // eslint-disable-line no-unused-vars
    ...otherProps
  }: ButtonProps<T>
) => {
  const props = {
    className: classnames('mdc-button', className, {
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'mdc-button--outlined': outlined,
      'mdc-button--dense': dense,
    }),
    ref: initRipple,
    disabled,
    ...otherProps,
  };

  if (href) {
    return (
      <a {...props as React.HTMLProps<HTMLAnchorElement>} href={href}>
        {!trailingIcon ? renderIcon(icon) : null}
        <span className='mdc-button__label'>
          {children}
        </span>
        {trailingIcon ? renderIcon(trailingIcon) : null}
      </a>
    );
  }

  return (
    <button {...props as React.HTMLProps<HTMLButtonElement>}>
      {!trailingIcon ? renderIcon(icon) : null}
      <span className='mdc-button__label'>
        {children}
      </span>
      {trailingIcon ? renderIcon(trailingIcon) : null}
    </button>
  );
};

const renderIcon = (icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>) => (
  icon ?
    React.cloneElement(icon, {
      className: classnames(BUTTON_CLASS_NAME, icon.props.className),
    }) :
    null
);

Button.defaultProps = {
  initRipple: () => {},
};

export default Ripple.withRipple<ButtonProps<ButtonTypes>, ButtonTypes>(Button);


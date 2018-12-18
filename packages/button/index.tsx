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
import * as classnames from 'classnames';
// TODO: fix with https://github.com/material-components/material-components-web-react/issues/528
// This is being ignored because the react ripple is not yet converted to typescript.
// this is a temporary work around until the react ripple PR is merged into the feature branch.
// @ts-ignore
import withRipple from '@material/react-ripple';

const BUTTON_CLASS_NAME = 'mdc-button__icon';

export interface ButtonProps<T> {
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  unbounded?: boolean;
  initRipple?: (surface: T) => void;
  className?: string;
  icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
  href?: string;
}

export type AnchorAttributesAndProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps<HTMLAnchorElement>;
export type ButtonAttributesAndProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps<HTMLButtonElement>;

export const Button = <T extends HTMLAnchorElement | HTMLButtonElement>(
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
    // eslint disabled since we do not want to include
    // this in ...otherProps.
    // if unbounded is passed to the <button> element, it will throw
    // a warning.
    unbounded = false, // eslint-disable-line no-unused-vars
    ...otherProps
  }: T extends HTMLAnchorElement ? AnchorAttributesAndProps : ButtonAttributesAndProps
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
      <a {...props} href={href}>
        {renderIcon(icon)}
        {children}
      </a>
    );
  }

  return (
    <button {...props}>
      {renderIcon(icon)}
      {children}
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

export default withRipple(Button);

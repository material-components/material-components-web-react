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
// @ts-ignore
import withRipple from '@material/react-ripple';

export interface ButtonProps<T> {
  raised?: boolean,
  unelevated?: boolean,
  outlined?: boolean,
  dense?: boolean,
  disabled?: boolean,
  unbounded?: boolean,
  initRipple?: (surface: T) => void,
  className?: string,
  icon?: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>,
  href?: string
}

type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps<HTMLAnchorElement>;
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps<HTMLButtonElement>;

export const Button = <T extends {}>(
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
    initRipple = () => {},
    unbounded = false, // eslint-disable-line no-unused-vars
    ...otherProps
  }: T extends HTMLAnchorElement ? AnchorElementProps : ButtonElementProps
) => {
  const classes = classnames('mdc-button', className, {
    'mdc-button--raised': raised,
    'mdc-button--unelevated': unelevated,
    'mdc-button--outlined': outlined,
    'mdc-button--dense': dense,
  });

  const props = Object.assign({
    className: classes,
    ref: initRipple,
    disabled,
  }, otherProps);

  if (href) {
    return (
      <a {...props} href={href}>
        {icon ? renderIcon(icon) : null}
        {children}
      </a>
    );
  }

  return (
    <button {...props}>
      {icon ? renderIcon(icon) : null}
      {children}
    </button>
  );
};

const addClassesToElement = (classes: string, element: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>) => {
  const propsWithClasses = {
    className: classnames(classes, element.props.className),
  };
  return React.cloneElement(element, propsWithClasses);
};

const renderIcon = (icon: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>) => (
  addClassesToElement('mdc-button__icon', icon)
);

export default withRipple(Button);

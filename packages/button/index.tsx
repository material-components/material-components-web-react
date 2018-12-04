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
import withRipple from '@material/react-ripple';

export type ButtonProps<T> = {
  raised?: boolean,
  unelevated?: boolean,
  outlined?: boolean,
  dense?: boolean,
  disabled?: boolean,
  unbounded?: boolean,
  initRipple?: (surface: HTMLAnchorElement | HTMLButtonElement) => void,
  className?: string,
  icon?: JSX.Element,
  href?: string
} & React.HTMLProps<T>;

export const Button: React.SFC<ButtonProps<HTMLAnchorElement | HTMLButtonElement>> = (props) => {
  const {
    className,
    raised,
    unelevated,
    outlined,
    dense,
    icon,
    children,
    initRipple,
    unbounded, // eslint-disable-line no-unused-vars
    ...otherProps
  } = props;

  const classes = classnames('mdc-button', className, {
    'mdc-button--raised': raised,
    'mdc-button--unelevated': unelevated,
    'mdc-button--outlined': outlined,
    'mdc-button--dense': dense,
  });

  const SemanticButton = props.href ? 'a' : 'button';

  return (
    <SemanticButton className={classes} ref={initRipple} {...otherProps}>
      {icon ? renderIcon(icon) : null}
      {children}
    </SemanticButton>
  );
};

const addClassesToElement = (classes, element) => {
  const propsWithClasses = {
    className: classnames(classes, element.props.className),
  };
  return React.cloneElement(element, propsWithClasses);
};

const renderIcon = (icon) => addClassesToElement('mdc-button__icon', icon);

Button.defaultProps = {
  raised: false,
  unelevated: false,
  outlined: false,
  dense: false,
  disabled: false,
  unbounded: false,
  initRipple: () => {},
  className: '',
};

export default withRipple(Button);

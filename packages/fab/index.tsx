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
import {
  withRipple,
  InjectedProps,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@material/react-ripple';

import {CSS_CLASSES} from './constant';

export interface FabProps
  extends InjectedProps<HTMLButtonElement>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  exited?: boolean;
  mini?: boolean;
  icon?: React.ReactElement<HTMLElement>;
  textLabel?: string;
  className?: string;
  initRipple?: React.Ref<HTMLButtonElement>;
  unbounded?: boolean;
}

const Icon: React.FunctionComponent<{
  icon?: React.ReactElement<HTMLElement>;
}> = ({icon}) => {
  if (!icon) {
    return null;
  }
  const updatedProps = {
    className: classnames(CSS_CLASSES.ICON, icon.props.className),
  };
  return React.cloneElement(icon, updatedProps);
};

const TextLabel: React.FunctionComponent<{textLabel: string}> = ({
  textLabel,
}) => {
  if (textLabel.length === 0) {
    return null;
  }
  return <span className={CSS_CLASSES.LABEL}>{textLabel}</span>;
};

export const Fab: React.FunctionComponent<
  FabProps & React.HTMLProps<HTMLButtonElement>
> = ({
  exited = false,
  mini = false,
  icon,
  textLabel = '',
  className = '',
  initRipple = () => {},
  unbounded, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  const extended = textLabel.length > 0;
  const classes = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.MINI]: mini,
    [CSS_CLASSES.EXTENDED]: extended,
    [CSS_CLASSES.EXITED]: exited,
  });

  return (
    <button className={classes} ref={initRipple} {...otherProps}>
      <Icon icon={icon} />
      <TextLabel textLabel={textLabel} />
    </button>
  );
};

export default withRipple<FabProps, HTMLButtonElement>(Fab);

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
import {withRipple, InjectedProps} from '@material/react-ripple';

export interface FabProps extends InjectedProps<HTMLButtonElement>,
  React.ButtonHTMLAttributes<HTMLButtonElement> {
    exited?: boolean;
    mini?: boolean;
    icon?: React.ReactElement<HTMLElement>;
    textLabel?: string;
    className?: string;
    initRipple?: React.Ref<HTMLButtonElement>;
    unbounded?: boolean;
}

const Icon: React.FunctionComponent<{icon?: React.ReactElement<HTMLElement>}> = ({icon}) => {
  if (!icon) {
    return null;
  }
  const updatedProps = {
    className: classnames('mdc-fab__icon', icon.props.className),
  };
  return React.cloneElement(icon, updatedProps);
};

const TextLabel: React.FunctionComponent<{textLabel: string}> = ({
  textLabel, // eslint-disable-line react/prop-types
}) => {
  if (textLabel.length === 0) {
    return null;
  }
  return <span className='mdc-fab__label'>{textLabel}</span>;
};

export const Fab: React.FunctionComponent<FabProps & React.HTMLProps<HTMLButtonElement>> = ({
  /* eslint-disable react/prop-types */
  exited = false,
  mini = false,
  icon,
  textLabel = '',
  className = '',
  initRipple = () => {},
  unbounded,
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const extended = textLabel.length > 0;
  const classes = classnames('mdc-fab', className, {
    'mdc-fab--mini': mini,
    'mdc-fab--extended': extended,
    'mdc-fab--exited': exited,
  });

  return (
    <button className={classes} ref={initRipple} {...otherProps}>
      <Icon icon={icon} />
      <TextLabel textLabel={textLabel} />
    </button>
  );
};

export default withRipple<FabProps, HTMLButtonElement>(Fab);

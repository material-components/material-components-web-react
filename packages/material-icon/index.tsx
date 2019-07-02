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

export interface MaterialIconDefaultProps
  extends React.HTMLAttributes<HTMLElement> {
  icon?: string;
  className?: string;
  hasRipple?: boolean;
  unbounded?: boolean;
}

export interface MaterialIconProps
  extends MaterialIconDefaultProps,
    InjectedProps<HTMLElement> {}

const MaterialIconDefault: React.FunctionComponent<MaterialIconProps> = ({
  className,
  icon,
  initRipple,
  hasRipple,
  unbounded, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  const classes = classnames('material-icons', className, {
    'material-icons--ripple-surface': hasRipple,
  });
  return (
    <i className={classes} ref={initRipple} {...otherProps}>
      {icon}
    </i>
  );
};

export const RippleMaterialIcon = withRipple<MaterialIconProps, HTMLElement>(
  MaterialIconDefault
);

export default class MaterialIcon extends React.Component<
  MaterialIconProps,
  {}
> {
  static defaultProps: Partial<MaterialIconProps> = {
    icon: '',
    className: '',
    hasRipple: false,
    unbounded: false,
  };

  render() {
    const {icon, hasRipple, unbounded, ...otherProps} = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars
    if (hasRipple) {
      return (
        <RippleMaterialIcon unbounded hasRipple icon={icon} {...otherProps} />
      );
    }
    return <MaterialIconDefault icon={icon} {...otherProps} />;
  }
}

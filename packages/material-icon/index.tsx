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

export interface MaterialIconDefaultProps extends React.HTMLAttributes<HTMLElement> {
  icon?: string;
  className?: string;
  hasRipple?: boolean;
  unbounded?: boolean;
  tag?: string;
};

export interface MaterialIconProps extends MaterialIconDefaultProps, Ripple.InjectedProps<HTMLElement> {};

const MaterialIconDefault: React.FunctionComponent<MaterialIconProps> = ({
  /* eslint-disable react/prop-types */
  className,
  icon,
  initRipple,
  hasRipple,
  unbounded,
  tag: Tag,
  ...otherProps
  /* eslint-enable react/prop-types */
}) => {
  const classes = classnames('material-icons', className, {
    'material-icons--ripple-surface': hasRipple,
  });
  return (
    // @ts-ignore  https://github.com/Microsoft/TypeScript/issues/28892
    <Tag
      className={classes}
      ref={initRipple}
      {...otherProps}
    >
      {icon}
    </Tag>
  );
};

export const RippleMaterialIcon = Ripple.withRipple<MaterialIconProps, HTMLElement>(MaterialIconDefault);

export default class MaterialIcon extends React.Component<
  MaterialIconProps, {}
  > {
  static defaultProps: Partial<MaterialIconProps> = {
    icon: '',
    className: '',
    hasRipple: false,
    unbounded: false,
    tag: 'i',
  };

  render() {
    const {icon, hasRipple, unbounded, tag, ...otherProps} = this.props; // eslint-disable-line no-unused-vars
    if (hasRipple) {
      return (
        <RippleMaterialIcon
          unbounded
          hasRipple
          icon={icon}
          tag={tag}
          {...otherProps}
        />
      );
    }
    return (
      <MaterialIconDefault
        icon={icon}
        tag={tag}
        {...otherProps}
      />
    );
  }
}

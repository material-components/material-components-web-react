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
// https://github.com/material-components/material-components-web-react/issues/528
// @ts-ignore
import withRipple from '@material/react-ripple';

export interface MaterialIconBaseProps {
  icon?: string;
  hasRipple?: boolean;
  unbounded?: boolean;
};

export type MaterialIconProps = MaterialIconBaseProps & React.HTMLProps<HTMLElement>;

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
    const {icon, hasRipple, unbounded, ...otherProps} = this.props; // eslint-disable-line no-unused-vars
    if (hasRipple) {
      return (
        <RippleMaterialIcon unbounded hasRipple icon={icon} {...otherProps} />
      );
    }
    return <MaterialIconDefault icon={icon} {...otherProps} />;
  }
}

interface MaterialIconDefaultProps {
  icon?: string;
  className?: string;
  initRipple?: (surface: HTMLElement) => void;
  hasRipple?: boolean;
  unbounded?: boolean;
};

const MaterialIconDefault: React.FunctionComponent<MaterialIconDefaultProps & React.HTMLProps<HTMLElement>> = ({
  className, icon, initRipple, hasRipple, unbounded, ...otherProps // eslint-disable-line react/prop-types
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

export const RippleMaterialIcon = withRipple(MaterialIconDefault);

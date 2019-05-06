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

import {CSS_CLASSES} from './constant';

export interface PrimaryContentBaseProps extends React.HTMLProps<HTMLDivElement>, InjectedProps<HTMLDivElement>{
  className: string;
  unbounded?: boolean;
};

export const PrimaryContentBase: React.FunctionComponent<PrimaryContentBaseProps> = ({
  /* eslint-disable react/prop-types */
  className = '',
  initRipple,
  children,
  unbounded, // eslint-disable-line no-unused-vars
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const classes = classnames(CSS_CLASSES.PRIMARY_ACTION, className);

  return (
    <div className={classes} ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

export default withRipple<PrimaryContentBaseProps, HTMLDivElement>(PrimaryContentBase);

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
import PropTypes from 'prop-types';

import withRipple from '@material/react-ripple';

export const PrimaryContentBase = (props) => {
  const {
    className,
    initRipple,
    children,
    unbounded, // eslint-disable-line no-unused-vars
    ...otherProps
  } = props;

  const classes = classnames('mdc-card__primary-action', className);
  return (
    <div
      className={classes}
      ref={initRipple}
      {...otherProps}
    >
      {children}
    </div>
  );
};


PrimaryContentBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  // The following props are handled by withRipple and do not require defaults.
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
};

PrimaryContentBase.defaultProps = {
  className: '',
  children: null,
};

export default withRipple(PrimaryContentBase);

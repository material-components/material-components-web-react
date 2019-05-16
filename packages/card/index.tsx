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

import ActionButtons from './ActionButtons';
import ActionIcons from './ActionIcons';
import Actions from './Actions';
import PrimaryContent from './PrimaryContent';
import Media from './Media';

import {CSS_CLASSES} from './constant';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  outlined?: boolean;
}

const Card: React.FunctionComponent<CardProps> = ({
  children,
  className = '',
  outlined = false,
  ...otherProps
}) => {
  const classes = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.OUTLINED]: outlined,
  });
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
};

export {
  ActionButtons as CardActionButtons,
  ActionIcons as CardActionIcons,
  Actions as CardActions,
  PrimaryContent as CardPrimaryContent,
  Media as CardMedia,
};

export default Card;

// The MIT License
//
// Copyright (c) 2019 Google, Inc.
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
import {cssClasses} from './constants';

export interface DialogContentProps<T> extends React.HTMLProps<T> {
  className?: string;
  tag?: string;
  id?: string;
}

const DialogContent: <T extends HTMLElement = HTMLDivElement>(
  props: DialogContentProps<T>
) => React.ReactElement<T> = ({
  className = '',
  children,
  tag: Tag = 'div',
  ...otherProps
}) => (
  // @ts-ignore  https://github.com/Microsoft/TypeScript/issues/28892
  <Tag className={classnames(className, cssClasses.CONTENT)} {...otherProps}>
    {children}
  </Tag>
);

type DialogContent<T> = React.ReactElement<T>;
export default DialogContent;

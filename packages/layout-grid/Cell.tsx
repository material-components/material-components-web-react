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

import {CSS_CLASSES, DEVICE_TYPE} from './constant';

export type TwelveColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type FourColumn = 1 | 2 | 3 | 4;
export type EightColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Alignment = 'bottom' | 'middle' | 'top';

export interface CellProps<T> extends React.HTMLProps<T> {
  align?: Alignment;
  className?: string;
  columns?: TwelveColumn;
  desktopColumns?: TwelveColumn;
  order?: TwelveColumn;
  phoneColumns?: FourColumn;
  tabletColumns?: EightColumn;
  tag?: string;
}

const Cell: <T extends {} = HTMLDivElement>(
  props: CellProps<T>
) => React.ReactElement<any> = ({
  align,
  children,
  className = '',
  columns,
  desktopColumns,
  order,
  phoneColumns,
  tabletColumns,
  tag: Tag = 'div',
  ...otherProps
}) => {
  const classes = classnames(CSS_CLASSES.CELL, className, {
    [`${CSS_CLASSES.CELL_ALIGN}-${align}`]: !!align,
    [`${CSS_CLASSES.CELL_ORDER}-${order}`]: !!order,
    [`${CSS_CLASSES.CELL_SPAN}-${columns}`]: !!columns,
    [`${CSS_CLASSES.CELL_SPAN}-${desktopColumns}-${DEVICE_TYPE.DESKTOP}`]: !!desktopColumns,
    [`${CSS_CLASSES.CELL_SPAN}-${phoneColumns}-${DEVICE_TYPE.PHONE}`]: !!phoneColumns,
    [`${CSS_CLASSES.CELL_SPAN}-${tabletColumns}-${DEVICE_TYPE.TABLET}`]: !!tabletColumns,
  });

  return (
    // https://github.com/Microsoft/TypeScript/issues/28892
    // @ts-ignore
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Cell;

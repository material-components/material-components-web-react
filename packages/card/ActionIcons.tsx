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

import {CSS_CLASSES} from './constant';

type ChildType = React.ReactElement<
  React.HTMLProps<HTMLImageElement | HTMLOrSVGElement>
>;

export interface ActionIconsProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  children?: ChildType | ChildType[];
}

const addIconClassToChildren = (children: ChildType | ChildType[]) => {
  return React.Children.map(children as ChildType | ChildType[], (item) => {
    const className = classnames(
      (item as ChildType).props.className,
      CSS_CLASSES.ACTION,
      CSS_CLASSES.ACTION_ICON
    );
    const props = Object.assign({}, (item as ChildType).props, {className});
    return React.cloneElement(item as ChildType, props);
  });
};

const ActionIcons: React.FunctionComponent<ActionIconsProps> = ({
  className = '',
  children,
  ...otherProps
}) => {
  const classes = classnames(CSS_CLASSES.ACTION_ICONS, className);
  if (!children) return null;
  return (
    <div className={classes} {...otherProps}>
      {addIconClassToChildren(children)}
    </div>
  );
};

export default ActionIcons;

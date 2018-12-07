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

export interface ActionButtonsProps {
  className?: string,
};

const addButtonClassToChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (item: React.ReactElement<React.HTMLProps<Element>>) => {
    const className = classnames(
      item.props.className,
      'mdc-card__action',
      'mdc-card__action--button'
    );
    const props = Object.assign({}, item.props, {className});
    return React.cloneElement(item, props);
  });
};

const ActionButtons: React.SFC<ActionButtonsProps & React.HTMLProps<HTMLDivElement>> = ({
  className = '', children, ...otherProps // eslint-disable-line react/prop-types
}) => {
  const classes = classnames('mdc-card__action-buttons', className);
  return (
    <div className={classes} {...otherProps}>
      {addButtonClassToChildren(children)}
    </div>
  );
};

export default ActionButtons;

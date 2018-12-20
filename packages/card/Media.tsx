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

export interface MediaProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  square?: boolean;
  wide?: boolean;
  contentClassName?: string;
  imageUrl?: string;
  style?: React.CSSProperties;
}

interface MediaChildren {
  children?: React.ReactNode;
  contentClassName?: string;
};

interface StyleValues {
  imageUrl: string;
  style: React.CSSProperties;
};

const renderChildren: (mediaChildren: MediaChildren) => React.ReactElement<HTMLDivElement> | undefined = ({
  children, contentClassName, // eslint-disable-line react/prop-types
}) => {
  if (!children) {
    return;
  }
  const classes = classnames('mdc-card__media-content', contentClassName);
  return <div className={classes}>{children}</div>;
};

const getStyles: (styleValues: StyleValues) => React.CSSProperties = ({imageUrl, style}) => {
  return Object.assign({},
    {backgroundImage: `url(${imageUrl})`},
    style
  );
};

const Media: React.FunctionComponent<MediaProps> = ({
  /* eslint-disable react/prop-types */
  className = '',
  contentClassName = '',
  children,
  square = false,
  wide = false,
  imageUrl = '',
  style = {},
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const classes = classnames('mdc-card__media', className, {
    'mdc-card__media--square': square,
    'mdc-card__media--16-9': wide,
  });

  return (
    <div className={classes} style={getStyles({imageUrl, style})} {...otherProps}>
      {renderChildren({children, contentClassName})}
    </div>
  );
};

export default Media;

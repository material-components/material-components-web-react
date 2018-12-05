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
import React from "react";
import classnames from "classnames";
type MediaProps = {
  className?: string,
  square?: boolean,
  wide?: boolean,
  contentClassName?: string,
  imageUrl?: string,
  style?: object
};
export default class Media extends React.Component<MediaProps, {}> {
  getStyles = () => {
    const { imageUrl, style } = this.props;
    return Object.assign(
      {},
      {
        backgroundImage: `url(${imageUrl})`
      },
      style
    );
  };
  render() {
    const {
      className,
      children, // eslint-disable-line no-unused-vars
      contentClassName, // eslint-disable-line no-unused-vars
      square,
      imageUrl, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      wide,
      ...otherProps
    } = this.props;
    const classes = classnames("mdc-card__media", className, {
      "mdc-card__media--square": square,
      "mdc-card__media--16-9": wide
    });
    return (
      <div className={classes} style={this.getStyles()} {...otherProps}>
        {this.renderChildren()}
      </div>
    );
  }
  renderChildren() {
    const { children, contentClassName } = this.props;
    if (!children) {
      return;
    }
    const classes = classnames("mdc-card__media-content", contentClassName);
    return <div className={classes}>{children}</div>;
  }
}
Media.defaultProps = {
  className: "",
  contentClassName: "",
  children: null,
  square: false,
  wide: false,
  imageUrl: "",
  style: {}
};

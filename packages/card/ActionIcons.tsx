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
type ActionIconsProps = {
  className?: string
};
export default class ActionIcons extends React.Component<ActionIconsProps, {}> {
  addIconClassToChildren = () => {
    return React.Children.map(this.props.children, item => {
      const className = classnames(
        item.props.className,
        "mdc-card__action",
        "mdc-card__action--icon"
      );
      const props = Object.assign({}, item.props, { className });
      return React.cloneElement(item, props);
    });
  };
  render() {
    const {
      className,
      children, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    const classes = classnames("mdc-card__action-icons", className);
    return (
      <div className={classes} {...otherProps}>
        {this.addIconClassToChildren()}
      </div>
    );
  }
}
ActionIcons.defaultProps = {
  className: "",
  children: null
};

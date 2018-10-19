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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ListItemText extends Component {
  get classes() {
    const {className} = this.props;
    return classnames('mdc-list-item__text', className);
  }

  render() {
    const {
      primaryText,
      secondaryText,
      tabbableOnListItemFocus,
      tabIndex,
      className,
      ...otherProps,
    } = this.props;

    if (!secondaryText) {
      return this.renderText(primaryText, 'mdc-list-item__text');
    }

    return (
      <span
        className={this.classes}
        tabIndex={tabbableOnListItemFocus ? tabIndex : -1}
        {...otherProps}
      >
        {this.renderText(primaryText, 'mdc-list-item__primary-text')}
        {this.renderText(secondaryText, 'mdc-list-item__secondary-text')}
      </span>
    );
  }

  renderText(text, className) {
    if (typeof text === 'string') {
      return <span className={className} tabIndex={-1}>{text}</span>;
    }
    const {className: textClassName, ...otherProps} = text.props;
    const props = Object.assign({
      className: classnames(className, textClassName)
    }, ...otherProps);
    return React.cloneElement(text, props);
  }
}

ListItemText.propTypes = {
  tabbableOnListItemFocus: PropTypes.bool,
  className: PropTypes.string,
  primaryText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  secondaryText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
};

ListItemText.defaultProps = {
  tabbableOnListItemFocus: false,
  className: '',
  primaryText: '',
  secondaryText: '',
};

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

export default class ListItemMeta extends Component {
  get classes() {
    const {className, meta} = this.props;
    return classnames('mdc-list-item__meta', className, meta.className);
  }

  render() {
    const {
      meta,
      tabIndex,
      className,
      tabbableOnListItemFocus,
      ...otherProps,
    } = this.props;

    let metaElement = null;
    if (typeof meta === 'string') {
      metaElement = <span>{meta}</span>;
    } else {
      metaElement = meta;
    }

    const metaProps = {
      className: this.classes,
      tabIndex: tabbableOnListItemFocus ? this.props.tabIndex : -1,
      ...otherProps,
    };

    return React.cloneElement(metaElement, metaProps);
  }
}

ListItemMeta.propTypes = {
  tabbableOnListItemFocus: PropTypes.bool,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  meta: PropTypes.element,
};

ListItemMeta.defaultProps = {
  tabbableOnListItemFocus: false,
  className: '',
  tabIndex: -1,
  meta: null,
};

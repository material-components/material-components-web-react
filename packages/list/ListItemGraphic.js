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

export default class ListItemGraphic extends Component {
  get classes() {
    const {className} = this.props;
    return classnames('mdc-list-item__graphic', className);
  }

  render() {
    const {
      graphic,
      tabIndex,
      tabbableOnListItemFocus,
      className,
      ...otherProps,
    } = this.props;

    const graphicProps = {
      className: this.classes,
      role: 'presentation',
      tabIndex: tabbableOnListItemFocus ? this.props.tabIndex : -1,
      ...otherProps,
    };

    return React.cloneElement(graphic, graphicProps);
  }
}

ListItemGraphic.propTypes = {
  tabbableOnListItemFocus: PropTypes.bool,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
};

ListItemGraphic.defaultProps = {
  tabbableOnListItemFocus: false,
  className: '',
  tabIndex: -1,
};

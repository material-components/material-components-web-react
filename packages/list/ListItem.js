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

export default class ListItem extends Component {
  listItemElement_ = React.createRef();

  get classes() {
    const {className} = this.props;
    return classnames('mdc-list-item', className);
  }

  focus() {
    const element = this.listItemElement_.current;
    if (element) {
      element.focus();
    }
  }

  followHref() {
    const element = this.listItemElement_.current;
    if (element && element.href) {
      element.click();
    }
  }

  toggleCheckbox() {
    // TODO(bonniez): implement
  }

  render() {
    const {
      /* eslint-disable */
      className,
      childrenTabIndex,
      /* eslint-enable */
      children,
      ...otherProps
    } = this.props;

    return (
      <li
        className={this.classes}
        ref={this.listItemElement_}
        {...otherProps}
      >
        {React.Children.map(children, this.renderChild)}
      </li>
    );
  }

  renderChild = (child) => {
    const props = Object.assign({},
      child.props,
      {tabIndex: this.props.childrenTabIndex}
    );
    return React.cloneElement(child, props);
  }
}

ListItem.propTypes = {
  childrenTabIndex: PropTypes.number,
  className: PropTypes.string,
};

ListItem.defaultProps = {
  childrenTabIndex: -1,
  className: '',
};

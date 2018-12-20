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
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {withRipple} from '@material/react-ripple';
import {MDCIconButtonToggleFoundation} from '@material/icon-button/dist/mdc.iconButton';
import IconToggle from './IconToggle';

const {strings} = MDCIconButtonToggleFoundation;

class IconButtonBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: new Set(),
      [strings.ARIA_PRESSED]: props[strings.ARIA_PRESSED],
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-icon-button', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      setAttr: (attr, value) => this.setState({[attr]: value}),
    };
  }

  handleClick_ = (e) => {
    this.props.onClick(e);
    this.foundation_.handleClick();
  }

  render() {
    const {
      children,
      initRipple,
      isLink,
      /* eslint-disable no-unused-vars */
      className,
      onClick,
      unbounded,
      [strings.ARIA_PRESSED]: ariaPressed,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;

    const props = {
      className: this.classes,
      ref: initRipple,
      [strings.ARIA_PRESSED]: this.state[strings.ARIA_PRESSED],
      onClick: this.handleClick_,
      ...otherProps,
    };

    if (isLink) {
      return (
        <a {...props}>
          {children}
        </a>
      );
    }

    return (
      <button {...props}>
        {children}
      </button>
    );
  }
}

IconButtonBase.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  isLink: PropTypes.bool,
  onClick: PropTypes.func,
  unbounded: PropTypes.bool,
};

IconButtonBase.defaultProps = {
  children: '',
  className: '',
  initRipple: () => {},
  isLink: false,
  onClick: () => {},
  unbounded: true,
};

export default withRipple(IconButtonBase);
export {IconToggle, IconButtonBase};

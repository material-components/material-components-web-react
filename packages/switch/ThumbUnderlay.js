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
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withRipple from '@material/react-ripple';

export class ThumbUnderlay extends React.Component {
  init = (el) => {
    this.props.initRipple(el, this.props.rippleActivator.current);
  }

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  render() {
    const {
      children,
      /* eslint-disable */
      className,
      initRipple,
      unbounded,
      rippleActivator,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        ref={this.init}
        {...otherProps}
      >
        <div className='mdc-switch__thumb'>
          {children}
        </div>
      </div>
    );
  }
}

ThumbUnderlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  rippleActivator: PropTypes.object,
};

ThumbUnderlay.defaultProps = {
  className: '',
  onChange: () => {},
  initRipple: () => {},
  unbounded: true,
};

export default withRipple(ThumbUnderlay);

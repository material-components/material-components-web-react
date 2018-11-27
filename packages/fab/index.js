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

export class Fab extends React.Component {

  get classes() {
    const {
      mini,
      textLabel,
      className,
    } = this.props;

    const extended = textLabel.length > 0;

    return classnames('mdc-fab', className, {
      'mdc-fab--mini': mini,
      'mdc-fab--extended': extended,
    });
  }

  renderIcon() {
    const {icon} = this.props;

    if (!icon) {
      return;
    }

    const updatedProps = {
      className: classnames('mdc-fab__icon', icon.props.className),
    };
    return React.cloneElement(icon, updatedProps);
  }

  renderTextLabel() {
    const {textLabel} = this.props;

    if (textLabel.length === 0) {
      return;
    }

    return (
      <span className='mdc-fab__label'>
        {textLabel}
      </span>
    );
  }

  render() {
    const {
      /* eslint-disable */
      className,
      unbounded,
      mini,
      textLabel,
      /* eslint-enable */
      initRipple,
      ...otherProps
    } = this.props;

    return (
        <button
          className={this.classes}
          ref={initRipple}
          {...otherProps}>
          {this.renderIcon()}
          {this.renderTextLabel()}
        </button>
    );
  }
}

Fab.propTypes = {
  mini: PropTypes.bool,
  icon: PropTypes.element,
  textLabel: PropTypes.string,
  className: PropTypes.string,
  initRipple: PropTypes.func,
};

Fab.defaultProps = {
  mini: false,
  icon: null,
  textLabel: '',
  className: '',
  initRipple: () => {},
};

export default withRipple(Fab);

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
import {MDCNotchedOutlineFoundation} from '@material/notched-outline/dist/mdc.notchedOutline';

export default class NotchedOutline extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  constructor(props) {
    super(props);

    this.outlineElement_ = React.createRef();
    this.pathElement_ = React.createRef();
    this.idleElement_ = React.createRef();
  }

  componentDidMount() {
    this.foundation_ = new MDCNotchedOutlineFoundation(this.adapter);
    this.foundation_.init();

    const {notch, notchWidth, isRtl} = this.props;
    if (notch) {
      this.foundation_.notch(notchWidth, isRtl);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps) {
    const hasToggledNotch = this.props.notch !== prevProps.notch;
    const hasToggleRtl = this.props.isRtl !== prevProps.isRtl;
    const notchWidthUpdated = this.props.notchWidth !== prevProps.notchWidth;
    const shouldUpdateNotch = notchWidthUpdated || hasToggleRtl || hasToggledNotch;

    if (!shouldUpdateNotch) {
      return;
    }

    if (this.props.notch) {
      const {notchWidth, isRtl} = this.props;
      this.foundation_.notch(notchWidth, isRtl);
    } else {
      this.foundation_.closeNotch();
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-notched-outline', Array.from(classList), className);
  }

  get adapter() {
    return {
      getWidth: () => this.outlineElement_.current.offsetWidth,
      getHeight: () => this.outlineElement_.current.offsetHeight,
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setOutlinePathAttr: (value) => this.pathElement_.current.setAttribute('d', value),
      getIdleOutlineStyleValue: (propertyName) =>
        window.getComputedStyle(this.idleElement_.current).getPropertyValue(propertyName),
    };
  }

  render() {
    return ([
      <div
        className={this.classes}
        key='notched-outline'
        ref={this.outlineElement_}>
        <svg>
          <path ref={this.pathElement_}
            className='mdc-notched-outline__path' />
        </svg>
      </div>,
      <div
        ref={this.idleElement_}
        className='mdc-notched-outline__idle'
        key='notched-outline-idle'></div>,
    ]);
  }
}

NotchedOutline.propTypes = {
  className: PropTypes.string,
  isRtl: PropTypes.bool,
  notch: PropTypes.bool,
  notchWidth: PropTypes.number,
};

NotchedOutline.defaultProps = {
  className: '',
  isRtl: false,
  notch: false,
  notchWidth: 0,
};

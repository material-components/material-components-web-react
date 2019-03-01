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
import * as React from 'react';
import classnames from 'classnames';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline/foundation';
import {MDCNotchedOutlineAdapter} from '@material/notched-outline/adapter';

export interface NotchedOutlineProps {
  className?: string,
  isRtl?: boolean,
  notch?: boolean,
  notchWidth?: number
};

interface NotchedOutlineState {
  classList: Set<string>
  actualWidth: number | null,
};

export default class NotchedOutline extends React.Component<
  NotchedOutlineProps,
  NotchedOutlineState
  > {
  foundation_!: MDCNotchedOutlineFoundation;
  outlineElement_: React.RefObject<HTMLDivElement> = React.createRef();
  pathElement_: React.RefObject<SVGPathElement> = React.createRef();
  idleElement_: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps: Partial<NotchedOutlineProps> = {
    className: '',
    isRtl: false,
    notch: false,
    notchWidth: 0,
  };

  state: NotchedOutlineState = {
    classList: new Set(),
    actualWidth: null,
  };

  componentDidMount() {
    this.foundation_ = new MDCNotchedOutlineFoundation(this.adapter);
    this.foundation_.init();
    const {notch, notchWidth} = this.props;
    if (notch) {
      this.foundation_.notch(notchWidth);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps: NotchedOutlineProps) {
    const hasToggledNotch = this.props.notch !== prevProps.notch;
    const hasToggleRtl = this.props.isRtl !== prevProps.isRtl;
    const notchWidthUpdated = this.props.notchWidth !== prevProps.notchWidth;
    const shouldUpdateNotch =
      notchWidthUpdated || hasToggleRtl || hasToggledNotch;
    if (!shouldUpdateNotch) {
      return;
    }
    if (this.props.notch) {
      const {notchWidth} = this.props;
      this.foundation_.notch(notchWidth);
    } else {
      this.foundation_.closeNotch();
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-notched-outline', Array.from(classList), className);
  }

  get adapter(): MDCNotchedOutlineAdapter {
    return {
      addClass: (className: string) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setNotchWidthProperty: (width: number) => {
        this.setState({
          actualWidth: width,
        });
      },
      removeNotchWidthProperty: () => {
        this.setState({
          actualWidth: null,
        });
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={this.classes}
          key='notched-outline'
          style={ {width: this.state.actualWidth ? `${this.state.actualWidth}px`: undefined} }
          ref={this.outlineElement_}
        >
          <svg focusable='false'>
            <path ref={this.pathElement_} className='mdc-notched-outline__path' />
          </svg>
        </div>
        <div
          ref={this.idleElement_}
          className='mdc-notched-outline__idle'
          key='notched-outline-idle'
        />
      </React.Fragment>
    );
  }
}

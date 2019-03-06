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
  notch: boolean,
  notchWidth: number,
  children?: React.ReactNode,
  style?: React.StyleHTMLAttributes<HTMLDivElement>
};

interface NotchedOutlineState {
  classList: Set<string>
  actualWidth: number | null,
};

export default class NotchedOutline extends React.Component<
  NotchedOutlineProps,
  NotchedOutlineState
  > {
  outlineElement_: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps: Partial<NotchedOutlineProps> = {
    className: '',
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
    const notchWidthUpdated = this.props.notchWidth !== prevProps.notchWidth;
    const shouldUpdateNotch =
      notchWidthUpdated || hasToggledNotch;
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
    const style = {...this.props.style, width: this.state.actualWidth ? `${this.state.actualWidth}px`: undefined};
    return (
      <div
        className={this.classes}
        style={style}
        ref={this.outlineElement_}
      >
        <div className='mdc-notched-outline__leading'></div>
        {this.props.children ?
          <div className='mdc-notched-outline__notch'>
            {this.props.children}
          </div>
          : null }
        <div className='mdc-notched-outline__trailing'></div>
      </div>
    );
  }
}

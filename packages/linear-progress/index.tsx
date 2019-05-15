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

import classnames from 'classnames';
import React from 'react';
import {MDCLinearProgressFoundation} from '@material/linear-progress/foundation';
import {MDCLinearProgressAdapter} from '@material/linear-progress/adapter';

export interface LinearProgressProps<T> extends React.HTMLProps<T> {
  buffer?: number;
  bufferingDots?: boolean;
  className?: string;
  closed?: boolean;
  indeterminate?: boolean;
  progress?: number;
  reversed?: boolean;
  tag?: string;
}

interface LinearProgressState {
  classList: Set<string>;
}

class LinearProgress<T extends {} = HTMLDivElement> extends React.Component<
  LinearProgressProps<T>,
  LinearProgressState
> {
  isComponentMounted: boolean = false;
  bufferElement: React.RefObject<HTMLDivElement> = React.createRef();
  primaryBarElement: React.RefObject<HTMLDivElement> = React.createRef();
  foundation: MDCLinearProgressFoundation;

  constructor(props: LinearProgressProps<T>) {
    super(props);
    this.foundation = new MDCLinearProgressFoundation(this.adapter);
    this.state = {
      classList: new Set(),
    };
  }

  static defaultProps: LinearProgressProps<HTMLDivElement> = {
    buffer: 0,
    bufferingDots: true,
    className: '',
    closed: false,
    indeterminate: false,
    progress: 0,
    reversed: false,
    tag: 'div',
  };

  componentDidMount() {
    const {buffer, closed, indeterminate, progress, reversed} = this.props;
    this.isComponentMounted = true;
    this.foundation.init();
    this.foundation.setBuffer(buffer!);
    this.foundation.setDeterminate(!indeterminate);
    this.foundation.setProgress(progress!);
    this.foundation.setReverse(reversed!);
    if (closed) {
      this.foundation.close();
    }
  }

  componentDidUpdate(prevProps: LinearProgressProps<T>) {
    const {
      buffer: prevBuffer,
      closed: prevClosed,
      indeterminate: prevIndeterminate,
      progress: prevProgress,
      reversed: prevReversed,
    } = prevProps;
    const {buffer, closed, indeterminate, progress, reversed} = this.props;
    if (buffer !== prevBuffer) {
      this.foundation.setBuffer(buffer!);
    }
    if (closed && !prevClosed) {
      this.foundation.close();
    }
    if (!closed && prevClosed) {
      this.foundation.open();
    }
    if (indeterminate !== prevIndeterminate) {
      this.foundation.setDeterminate(!indeterminate);
    }
    if (progress !== prevProgress) {
      this.foundation.setProgress(progress!);
    }
    if (reversed !== prevReversed) {
      this.foundation.setReverse(reversed!);
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    this.foundation.destroy();
  }

  get adapter(): MDCLinearProgressAdapter {
    return {
      addClass: (className: string) => {
        if (this.isComponentMounted) {
          const {classList} = this.state;
          classList.add(className);
          this.setState({classList});
        }
      },
      getBuffer: () => {
        return this.bufferElement.current;
      },
      getPrimaryBar: () => {
        return this.primaryBarElement.current;
      },
      hasClass: (className: string) => {
        return this.state.classList.has(className);
      },
      removeClass: (className: string) => {
        if (this.isComponentMounted) {
          const {classList} = this.state;
          classList.delete(className);
          this.setState({classList});
        }
      },
      setStyle: (element: HTMLElement, propertyName: string, value: string) => {
        if (this.isComponentMounted) {
          element.style.setProperty(propertyName, value);
        }
      },
    };
  }

  get classes() {
    const {className, indeterminate, reversed} = this.props;
    const {classList} = this.state;
    return classnames('mdc-linear-progress', Array.from(classList), className, {
      'mdc-linear-progress--indeterminate': indeterminate,
      'mdc-linear-progress--reversed': reversed,
    });
  }

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      buffer,
      bufferingDots,
      className,
      closed,
      indeterminate,
      progress,
      reversed,
      tag: Tag,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;
    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag className={this.classes} role='progressbar' {...otherProps}>
        {bufferingDots && (
          <div className='mdc-linear-progress__buffering-dots' />
        )}
        <div className='mdc-linear-progress__buffer' ref={this.bufferElement} />
        <div
          className='mdc-linear-progress__bar mdc-linear-progress__primary-bar'
          ref={this.primaryBarElement}
        >
          <span className='mdc-linear-progress__bar-inner' />
        </div>
        <div className='mdc-linear-progress__bar mdc-linear-progress__secondary-bar'>
          <span className='mdc-linear-progress__bar-inner' />
        </div>
      </Tag>
    );
  }
}

export default LinearProgress;

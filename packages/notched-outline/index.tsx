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
import classnames from 'classnames';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline/foundation';
import {MDCNotchedOutlineAdapter} from '@material/notched-outline/adapter';
import {MDCFloatingLabelFoundation} from '@material/floating-label/foundation';
const {cssClasses} = MDCNotchedOutlineFoundation;

export interface NotchedOutlineProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  notchWidth?: number;
  notch?: boolean;
}

interface NotchedOutlineState {
  classList: Set<string>;
  foundationNotchWidth?: number;
}

export default class NotchedOutline extends React.Component<
  NotchedOutlineProps,
  NotchedOutlineState
> {
  foundation?: MDCNotchedOutlineFoundation;
  notchedEl = React.createRef<HTMLDivElement>();

  static defaultProps: Partial<NotchedOutlineProps> = {
    className: '',
    notchWidth: 0,
    notch: false,
  };

  state: NotchedOutlineState = {
    classList: new Set(),
    foundationNotchWidth: undefined,
  };

  componentDidMount() {
    this.foundation = new MDCNotchedOutlineFoundation(this.adapter);
    this.foundation.init();
    this.notch();

    if (this.label) {
      this.label.style.transitionDuration = '0s';
      this.addClass(cssClasses.OUTLINE_UPGRADED);
      requestAnimationFrame(() => {
        if (this.label) {
          this.label.style.transitionDuration = '';
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  componentDidUpdate(prevProps: NotchedOutlineProps) {
    if (
      this.props.notchWidth !== prevProps.notchWidth ||
      this.props.notch !== prevProps.notch
    ) {
      this.notch();
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-notched-outline', Array.from(classList), className, {
      [cssClasses.NO_LABEL]: !this.label,
    });
  }

  get label() {
    if (!this.notchedEl.current) {
      return null;
    }
    return this.notchedEl.current.querySelector<HTMLElement>(
      `.${MDCFloatingLabelFoundation.cssClasses.ROOT}`
    );
  }

  get adapter(): MDCNotchedOutlineAdapter {
    return {
      addClass: this.addClass,
      removeClass: (className: string) => {
        this.setState((prevState: NotchedOutlineState) => {
          const classList = new Set(prevState.classList);
          classList.delete(className);
          return {classList};
        });
      },
      setNotchWidthProperty: (foundationNotchWidth) =>
        this.setState({foundationNotchWidth}),
      removeNotchWidthProperty: () =>
        this.setState({foundationNotchWidth: undefined}),
    };
  }

  addClass = (className: string) => {
    this.setState((prevState: NotchedOutlineState) => {
      const classList = new Set(prevState.classList);
      classList.add(className);
      return {classList};
    });
  };

  notch = () => {
    const {notchWidth, notch} = this.props;
    if (!this.foundation) return;
    if (notch) {
      this.foundation.notch(notchWidth!);
    } else {
      this.foundation.closeNotch();
    }
  };

  render() {
    const {
      children,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      notchWidth,
      notch,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;
    const {foundationNotchWidth} = this.state;

    const notchStyle = {
      width: foundationNotchWidth ? `${foundationNotchWidth}px` : undefined,
    };

    return (
      <div className={this.classes} ref={this.notchedEl} {...otherProps}>
        <div className='mdc-notched-outline__leading' />
        {children ? (
          <div className='mdc-notched-outline__notch' style={notchStyle}>
            {React.Children.only(children)}
          </div>
        ) : null}
        <div className='mdc-notched-outline__trailing' />
      </div>
    );
  }
}

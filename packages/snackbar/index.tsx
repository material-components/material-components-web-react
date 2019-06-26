// The MIT License
//
// Copyright (c) 2019 Google, Inc.
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

import {MDCSnackbarFoundation} from '@material/snackbar/foundation';
import {MDCSnackbarAdapter} from '@material/snackbar/adapter';

export interface Props {
  message: string;
  className?: string;
  timeoutMs?: number;
  closeOnEscape?: boolean;
  actionText?: string;
  leading?: boolean;
  stacked?: boolean;
  open?: boolean;
  reason?: string;
  onOpening?: () => void;
  onOpen?: () => void;
  onClosing?: (reason: string) => void;
  onClose?: (reason: string) => void;
  onAnnounce?: () => void;
}

type State = {
  classes: Set<string>;
};

export class Snackbar extends React.Component<Props, State> {
  foundation: MDCSnackbarFoundation;

  static defaultProps: Partial<Props> = {
    open: true,
    stacked: false,
    leading: false,
  };

  constructor(props: Props) {
    super(props);
    const {timeoutMs, closeOnEscape, leading, stacked} = this.props;
    const classes = new Set<string>();
    if (leading) {
      classes.add('mdc-snackbar--leading');
    }

    if (stacked) {
      classes.add('mdc-snackbar--stacked');
    }

    this.state = {
      classes,
    };

    this.foundation = new MDCSnackbarFoundation(this.adapter);
    if (timeoutMs) {
      this.foundation.setTimeoutMs(timeoutMs);
    }

    if (closeOnEscape) {
      this.foundation.setCloseOnEscape(closeOnEscape);
    }
  }
  get adapter(): MDCSnackbarAdapter {
    return {
      addClass: (className: string) => {
        const {classes} = this.state;
        classes.add(className);
        this.setState({
          classes,
        });
      },
      removeClass: (className: string) => {
        const {classes} = this.state;
        classes.delete(className);
        this.setState({
          classes,
        });
      },
      announce: () => {
        // Usually it works automatically if this component uses conditional rendering
        this.props.onAnnounce && this.props.onAnnounce();
      },
      notifyOpening: () => {
        const {onOpening} = this.props;
        if (onOpening) {
          onOpening();
        }
      },
      notifyOpened: () => {
        const {onOpen} = this.props;
        if (onOpen) {
          onOpen();
        }
      },
      notifyClosing: (reason: string) => {
        const {onClosing} = this.props;
        if (onClosing) {
          onClosing(reason);
        }
      },
      notifyClosed: (reason: string) => {
        const {onClose} = this.props;
        if (onClose) {
          onClose(reason);
        }
      },
    };
  }
  close(action: string) {
    this.foundation.close(action);
  }
  getTimeoutMs() {
    return this.foundation.getTimeoutMs();
  }
  getCloseOnEscape() {
    return this.foundation.getCloseOnEscape();
  }
  isOpen() {
    return this.foundation.isOpen();
  }
  handleKeyDown = (e: React.KeyboardEvent) => {
    this.foundation.handleKeyDown(e.nativeEvent);
  };
  handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.foundation.handleActionButtonClick(e.nativeEvent);
  };
  componentDidMount() {
    this.foundation.init();
    if (this.props.open) {
      this.foundation.open();
    }
  }
  componentDidUpdate(prevProps: Props) {
    const {open, reason} = this.props;
    if (prevProps.open !== open) {
      if (open) {
        this.foundation.open();
      } else {
        this.foundation.close(reason ? reason : '');
      }
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get classes() {
    return classnames(
      this.props.className,
      'mdc-snackbar',
      ...Array.from(this.state.classes)
    );
  }
  render() {
    return (
      <div className={this.classes} onKeyDown={this.handleKeyDown}>
        <div className='mdc-snackbar__surface'>
          <div className='mdc-snackbar__label' role='status' aria-live='polite'>
            {this.props.message}
          </div>
          {this.props.actionText ? (
            <div className='mdc-snackbar__actions'>
              <button
                type='button'
                onClick={this.handleActionClick}
                className='mdc-button mdc-snackbar__action'
              >
                {this.props.actionText}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

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
import createFocusTrap = require('focus-trap');
import classnames from 'classnames';
import { MDCDialogFoundation, MDCDialogAdapter } from '@material/dialog';
import { IMDCDialogAdapter } from './types';

type Props = {
  className?: string,
  children: React.ReactChild,
  title?: string | null,
  actions?: React.ReactChild,
  onClose?: () => void,
  onBeforeClose?: () => void,
  onOpen?: () => void,
  onBeforeOpen?: () => void,
};

type State = {
  bodyClassList: Set<string>,
  classList: Set<string>,
  focusTrap: any,
  ref: HTMLDivElement | null,
  resizeListener?: (e: Event) => void,
  keydownListener?: (e: Event) => void,
}


export class Dialog extends React.Component<Props, State> {
  dialog: any
  focusTrapFactory_: any
  constructor(props: Props) {
      super(props);
      this.focusTrapFactory_ = createFocusTrap;
      this.state = {
          classList: new Set(),
          bodyClassList: new Set(),
          ref: null,
          focusTrap: null,
      };
  }
  dialogRef = (ref: HTMLDivElement) => {
      this.setState({
          ref,
          focusTrap: this.focusTrapFactory_(ref, {
              initialFocus: null,
              escapeDeactivates: false,
              clickOutsideDeactivates: true,
          }),
      });
  }
  componentDidMount() {
      this.dialog = new MDCDialogFoundation(this.adapter as unknown as MDCDialogAdapter);
      this.dialog.init();
      this.dialog.open();
      const keydownListener: EventListener = (e: Event) => this.dialog.handleDocumentKeydown(e);
      const resizeListener: EventListener = (e: Event) => this.dialog.layout(e);
      document.addEventListener('keydown', keydownListener);
      window.addEventListener('resize', resizeListener);
      this.setState({
          keydownListener,
          resizeListener,
      });
  }
  componentWillUnmount() {
      const { keydownListener, resizeListener } = this.state;
      if (keydownListener)
          document.removeEventListener('keydown', keydownListener);
      if (resizeListener)
          window.removeEventListener('resize', resizeListener);
      this.dialog.destroy();
  }
  handleDialogClick = (e: React.SyntheticEvent) => {
      this.dialog.handleInteraction(e.nativeEvent);
  }
  get adapter():IMDCDialogAdapter {
      return {
          addClass: (className: string) => {
              const classList = new Set(this.state.classList);
              classList.add(className);
              this.setState({ classList });
          },
          removeClass: (className: string) => {
              const classList = new Set(this.state.classList);
              classList.delete(className);
              this.setState({ classList });
          },
          trapFocus: () => this.state.focusTrap.activate(),
          releaseFocus: () => this.state.focusTrap.deactivate(),
          eventTargetMatches: (target: HTMLElement, selector: string) => {
              return target.matches(selector);
          },
          isContentScrollable() {
            // TODO
            return false;
          },
          areButtonsStacked() {
            // TODO
            return false;
          },
          reverseButtons() {
            // TODO
          },
          clickDefaultButton() {
            // TODO
          },
          notifyOpening() {
            const { onBeforeOpen } = this.props;
            if (onBeforeOpen) {
              onBeforeOpen();
            }
          },
          notifyOpened() {
            const { onOpen } = this.props;
            if (onOpen) {
              onOpen();
            }
          },
          notifyClosing() {
            const { onBeforeClose } = this.props;
            if (onBeforeClose) {
              onBeforeClose();
            }
          },
          getActionFromEvent() {
            // TODO
            return 'unknown';
          },
          notifyClosed: () => {
            const { onClose } = this.props;
            if (onClose) {
              onClose();
            }
          },
          addBodyClass: (className: string) => {
              document.body && document.body.classList.add(className);

          },
          removeBodyClass: (className: string) => {
              document.body && document.body.classList.remove(className);
          },
          hasClass: (className: string) => this.classes.split(' ').includes(className),
      };
  }
  get classes() {
      const { classList } = this.state;
      return classnames('mdc-dialog', Array.from(classList));
  }
  get bodyClasses() {
      const { bodyClassList } = this.state;
      return classnames('mdc-dialog__content', Array.from(bodyClassList));
  }
  render() {
      return(<div className={this.classes} onClick={this.handleDialogClick}
          role="alertdialog"
          aria-modal="true"
          ref={this.dialogRef}>
          <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                  {this.props.title ? <h2 className="mdc-dialog__title">{this.props.title}</h2> : null }
                  <div className={this.bodyClasses}>
                      {this.props.children}
                  </div>
                  <footer className="mdc-dialog__actions">
                      {this.props.actions}
                  </footer>
              </div>
          </div>
          <div className="mdc-dialog__scrim" onClick={this.handleDialogClick}></div>
      </div>);
  }
}

export default Dialog;

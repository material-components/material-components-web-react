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

import * as React from 'react';
import classnames from 'classnames';

// @ts-ignore no .d.ts file
import {MDCDialogFoundation, MDCDialogAdapter, util} from '@material/dialog/dist/mdc.dialog';
// @ts-ignore no .d.ts file
import {ponyfill} from '@material/dom/dist/mdc.dom';
import {cssClasses, LAYOUT_EVENTS} from './constants';
import {FocusTrap} from 'focus-trap';

import DialogContent from './DialogContent';
import DialogFooter from './DialogFooter';
import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';

export type ChildTypes<T> = DialogTitle<T> | DialogContent<T>| DialogFooter<T>;

export interface DialogProps extends React.HTMLProps<HTMLElement> {
  autoStackButtons?: boolean;
  children?: ChildTypes<HTMLElement>;
  className?: string;
  id?: string;
  onClose?: (action: string) => void;
  onClosing?: (action: string) => void;
  onOpen?: () => void;
  onOpening?: () => void;
  open?: boolean;
  tag?: string;
};

interface DialogState {
  classList: Set<string>;
}

class Dialog extends React.Component<DialogProps, DialogState> {
  focusTrap?: FocusTrap;
  foundation: MDCDialogFoundation;
  dialogElement: React.RefObject<HTMLElement> = React.createRef();
  labelledBy?: undefined | string;
  describedBy?: undefined | string;

  static defaultProps: Partial<DialogProps> = {
    autoStackButtons: true,
    className: '',
    onOpening: () => {},
    onClosing: () => {},
    tag: 'div',
    id: 'mdc-dialog',
    open: false,
  };

  state: DialogState = {classList: new Set()};

  componentDidMount() {
    const {open, autoStackButtons} = this.props;
    this.foundation = new MDCDialogFoundation(this.adapter);
    this.foundation.init();
    this.initializeFocusTrap();

    if (open) {
      this.foundation.open();
    }
    if (!autoStackButtons) {
      this.foundation.setAutoStackButtons(autoStackButtons);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: DialogProps) {
    const {open, autoStackButtons} = this.props;

    if (prevProps.autoStackButtons !== autoStackButtons) {
      this.foundation.setAutoStackButtons(autoStackButtons);
    }


    if (prevProps.open !== open) {
      return open ? this.foundation.open() : this.foundation.close();
    }
  }

  get classes(): string {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames(cssClasses.BASE, Array.from(classList), className);
  }

  get buttons_(): DialogButton[] | null {
    return this.dialogElement.current &&
       [].slice.call(this.dialogElement.current.getElementsByClassName(cssClasses.BUTTON));
  }

  get content_(): DialogContent {
    return this.dialogElement.current &&
        this.dialogElement.current.querySelector(`.${cssClasses.CONTENT}`);
  }

  get defaultButton_(): DialogButton {
    return this.dialogElement.current &&
        this.dialogElement.current.querySelector(`.${cssClasses.DEFAULT_BUTTON}`);
  }

  private initializeFocusTrap = () => {
    this.focusTrap = util.createFocusTrapInstance(this.dialogElement.current);
  }

  get adapter(): Partial<MDCDialogAdapter> {
    const strings = MDCDialogFoundation.strings;
    const {closest, matches} = ponyfill;
    const {isScrollable, areTopsMisaligned} = util;
    return {
      addClass: (className: string) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      addBodyClass: (className: string) => document.body.classList.add(className),
      removeBodyClass: (className: string) => document.body.classList.remove(className),
      eventTargetMatches: (target: HTMLElement, selector: string) => matches(target, selector),
      trapFocus: () => this.focusTrap && this.focusTrap.activate(),
      releaseFocus: () => this.focusTrap && this.focusTrap.deactivate(),
      isContentScrollable: () => {
        const content = this.content_;
        return (!!content) ? isScrollable(content) : false;
      },
      areButtonsStacked: () => areTopsMisaligned(this.buttons_),
      getActionFromEvent: (evt: any) => {
        const elem = closest(evt.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return elem && elem.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        const defaultButton = this.defaultButton_;
        if (defaultButton) {
          defaultButton.click();
        }
      },
      reverseButtons: () => {
        const buttons = this.buttons_;
        return buttons &&
          buttons.reverse().forEach((button: HTMLElement) =>
            button.parentElement && button.parentElement.appendChild(button)
          );
      },
      notifyOpening: () => this.handleOpening(),
      notifyOpened: () => this.props.onOpen && this.props.onOpen(),
      notifyClosing: (action: string) => this.handleClosing(action),
      notifyClosed: (action: string) => this.props.onClose && this.props.onClose(action),
    };
  }

  handleOpening = (): void => {
    this.props.onOpening!();
    LAYOUT_EVENTS.forEach((evt: string) =>
      window.addEventListener(evt, this.handleLayout)
    );
    document.addEventListener(
      'keydown', this.handleDocumentKeyDown
    );
  }

  handleClosing = (action: string): void => {
    this.props.onClosing!(action);
    LAYOUT_EVENTS.forEach((evt: string) =>
      window.removeEventListener(evt, this.handleLayout)
    );
    document.removeEventListener(
      'keydown', this.handleDocumentKeyDown
    );
  }

  handleInteraction = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void =>
    this.foundation.handleInteraction(e);
  handleDocumentKeyDown = (e: Event): void =>
    this.foundation.handleDocumentKeydown(e);
  // @ts-ignore parameter never used
  handleLayout = (evt: Event): void => this.foundation.layout();


  render() {
    const {
      /* eslint-disable no-unused-vars */
      autoStackButtons,
      className,
      children,
      id,
      onOpening,
      onOpen,
      onClosing,
      onClose,
      open,
      tag: Tag,
      ...otherProps
      /* eslint-enable no-unused-vars */
    } = this.props;

    const container = this.renderContainer(children);
    return (
      // @ts-ignore
      <Tag
        {...otherProps}
        aria-labelledby={this.labelledBy}
        aria-describedby={this.describedBy}
        aria-modal
        className={this.classes}
        id={id}
        role='alertdialog'
        onKeyDown={this.handleInteraction}
        onClick={this.handleInteraction}
        ref={this.dialogElement}
      >{container}
        <div className={cssClasses.SCRIM}/>
      </Tag>
    );
  }


  renderContainer = (children: ChildTypes<HTMLElement>) => !children ? undefined : (
    <div className={cssClasses.CONTAINER}>
      <div className={cssClasses.SURFACE}>
        {React.Children.map(children, this.renderChild)}
      </div>
    </div>
  );

  // @ts-ignore parameter 'i' declared but never read
  renderChild = (child: ChildTypes<HTMLElement>, i?: number ): ChildTypes<HTMLElement> =>
    ['DialogTitle', 'DialogContent'].indexOf(child.type.displayName) >= 0
      ? React.cloneElement(child, {
        key: child.type.displayName,
        ...child.props,
        id: this.setId(child.type.displayName, child.props.id)})
      : React.cloneElement(
        child, {key: child.type.name || child.type.displayName, ...child.props}
      )


  setId = (name: string, componentId?: string | undefined): string => {
    const {id} = this.props;
    if (name === 'DialogTitle') {
      const labelledBy = componentId || id + '-title';
      this.labelledBy = labelledBy;
      return labelledBy;
    }

    const describedBy = componentId || id + '-content';
    this.describedBy = describedBy;
    return describedBy;
  }
}

export default Dialog;
export {
  DialogTitle, DialogContent, DialogFooter, DialogButton,
};

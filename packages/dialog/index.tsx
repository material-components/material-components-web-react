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

import {MDCDialogFoundation} from '@material/dialog/foundation';
import {MDCDialogAdapter} from '@material/dialog/adapter';
import {
  createFocusTrapInstance,
  isScrollable,
  areTopsMisaligned,
} from '@material/dialog/util';
import {strings} from '@material/dialog/constants';
import {ponyfill} from '@material/dom';
/* eslint-disable @typescript-eslint/no-unused-vars */
import DialogContent, {DialogContentProps} from './DialogContent';
import DialogFooter, {DialogFooterProps} from './DialogFooter';
import DialogTitle, {DialogTitleProps} from './DialogTitle';
/* eslint-enable @typescript-eslint/no-unused-vars */
import DialogButton from './DialogButton';
import {cssClasses, LAYOUT_EVENTS} from './constants';
import {FocusTrap} from 'focus-trap';

export type ChildTypes =
  | DialogTitle<DialogTitleProps<{}>>
  | DialogContent<DialogContentProps<{}>>
  | DialogFooter<DialogFooterProps<{}>>;

export interface DialogProps<
  T,
  TitleProps extends {} = DialogTitleProps<HTMLHeadingElement>,
  ContentProps extends {} = DialogContentProps<HTMLDivElement>,
  FooterProps extends {} = DialogFooterProps<HTMLElement>
> extends React.HTMLProps<T> {
  autoStackButtons?: boolean;
  children?:
    | (
        | React.ReactElement<TitleProps>
        | React.ReactElement<ContentProps>
        | React.ReactElement<FooterProps>)[]
    | React.ReactElement<FooterProps>
    | React.ReactElement<ContentProps>
    | React.ReactElement<TitleProps>;
  className?: string;
  escapeKeyAction?: string;
  id?: string;
  onClose?: (action: string) => void;
  onClosing?: (action: string) => void;
  onOpen?: () => void;
  onOpening?: () => void;
  open?: boolean;
  role?: 'alertdialog' | 'dialog';
  scrimClickAction?: string;
  tag?: string;
}

interface DialogState {
  classList: Set<string>;
}

function isDialogTitle(element: any): element is DialogTitle<any> {
  return element.type === DialogTitle;
}

function isDialogContent(element: any): element is DialogContent<any> {
  return element.type === DialogContent;
}

class Dialog<T extends HTMLElement = HTMLElement> extends React.Component<
  DialogProps<T>,
  DialogState
> {
  focusTrap?: FocusTrap;
  foundation!: MDCDialogFoundation;
  dialogElement: React.RefObject<HTMLElement> = React.createRef();
  labelledBy?: string;
  describedBy?: string;

  static defaultProps: Partial<DialogProps<HTMLElement>> = {
    autoStackButtons: true,
    className: '',
    onOpening: () => {},
    onClosing: () => {},
    tag: 'div',
    id: 'mdc-dialog',
    open: false,
    role: 'alertdialog',
    escapeKeyAction: strings.CLOSE_ACTION,
    scrimClickAction: strings.CLOSE_ACTION,
  };

  state: DialogState = {classList: new Set()};

  componentDidMount() {
    const {
      open,
      autoStackButtons,
      escapeKeyAction,
      scrimClickAction,
    } = this.props;
    this.foundation = new MDCDialogFoundation(this.adapter);
    this.foundation.init();

    if (open) {
      this.open();
    }
    if (!autoStackButtons) {
      this.foundation.setAutoStackButtons(autoStackButtons!);
    }

    if (typeof escapeKeyAction === 'string') {
      // set even if empty string
      this.foundation.setEscapeKeyAction(escapeKeyAction);
    }

    if (typeof scrimClickAction === 'string') {
      // set even if empty string
      this.foundation.setScrimClickAction(scrimClickAction);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps: DialogProps<T>) {
    const {
      open,
      autoStackButtons,
      escapeKeyAction,
      scrimClickAction,
    } = this.props;

    if (prevProps.autoStackButtons !== autoStackButtons) {
      this.foundation.setAutoStackButtons(autoStackButtons!);
    }

    if (prevProps.escapeKeyAction !== escapeKeyAction) {
      this.foundation.setEscapeKeyAction(escapeKeyAction!);
    }

    if (prevProps.scrimClickAction !== scrimClickAction) {
      this.foundation.setScrimClickAction(scrimClickAction!);
    }

    if (prevProps.open !== open) {
      return open ? this.open() : this.foundation.close();
    }
  }

  get classes(): string {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames(cssClasses.BASE, Array.from(classList), className);
  }

  get buttons(): HTMLButtonElement[] {
    const buttons =
      this.dialogElement.current &&
      [].slice.call(
        this.dialogElement.current.getElementsByClassName(cssClasses.BUTTON)
      );
    return buttons ? buttons : [];
  }

  get content(): HTMLElement | null {
    return (
      this.dialogElement.current &&
      this.dialogElement.current.querySelector(`.${cssClasses.CONTENT}`)
    );
  }

  get defaultButton(): HTMLButtonElement | null {
    return (
      this.dialogElement.current &&
      this.dialogElement.current.querySelector(`.${cssClasses.DEFAULT_BUTTON}`)
    );
  }

  private open = (): void => {
    // focusTrap will not initialize if no children present.
    this.initializeFocusTrap();
    this.foundation.open();
  };

  private initializeFocusTrap = (): void => {
    this.focusTrap =
      this.props.children &&
      createFocusTrapInstance(this.dialogElement.current!);
  };

  get adapter(): MDCDialogAdapter {
    const strings = MDCDialogFoundation.strings;
    const {closest, matches} = ponyfill;
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
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      addBodyClass: (className: string) =>
        document.body.classList.add(className),
      removeBodyClass: (className: string) =>
        document.body.classList.remove(className),
      eventTargetMatches: (target: HTMLElement, selector: string) =>
        matches(target, selector),
      trapFocus: () => this.focusTrap && this.focusTrap.activate(),
      releaseFocus: () => this.focusTrap && this.focusTrap.deactivate(),
      isContentScrollable: () => {
        const content = this.content;
        return !!content ? isScrollable(content) : false;
      },
      areButtonsStacked: () => {
        const buttons = this.buttons;
        return !!buttons ? areTopsMisaligned(this.buttons) : false;
      },
      getActionFromEvent: (evt: any) => {
        const elem = closest(evt.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return elem && elem.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        const defaultButton = this.defaultButton;
        if (defaultButton) {
          defaultButton.click();
        }
      },
      reverseButtons: () => {
        const buttons = this.buttons;
        return (
          buttons &&
          buttons
            .reverse()
            .forEach(
              (button: HTMLButtonElement) =>
                button.parentElement && button.parentElement.appendChild(button)
            )
        );
      },
      notifyOpening: () => this.handleOpening(),
      notifyOpened: () => this.props.onOpen && this.props.onOpen(),
      notifyClosing: (action: string) => this.handleClosing(action),
      notifyClosed: (action: string) =>
        this.props.onClose && this.props.onClose(action),
    };
  }

  handleOpening = (): void => {
    this.props.onOpening!();
    LAYOUT_EVENTS.forEach((evt: string) =>
      window.addEventListener(evt, this.handleLayout)
    );
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  };

  handleClosing = (action: string): void => {
    this.props.onClosing!(action);
    LAYOUT_EVENTS.forEach((evt: string) =>
      window.removeEventListener(evt, this.handleLayout)
    );
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  };

  handleInteraction = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ): void => this.foundation.handleInteraction(e.nativeEvent);
  handleDocumentKeyDown = (e: KeyboardEvent): void =>
    this.foundation.handleDocumentKeydown(e);
  handleLayout = (): void => this.foundation.layout();

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      autoStackButtons,
      className,
      children,
      escapeKeyAction,
      id,
      onOpening,
      onOpen,
      onClick,
      onClosing,
      onClose,
      onKeyDown,
      open,
      scrimClickAction,
      tag: Tag,
      ...otherProps
      /* eslint-enable @typescript-eslint/no-unused-vars */
    } = this.props;

    const container:
      | React.ReactElement<HTMLDivElement>
      | undefined = this.renderContainer(children as ChildTypes[]);
    return (
      // @ts-ignore Tag does not have any construct https://github.com/Microsoft/TypeScript/issues/28892
      <Tag
        {...otherProps}
        aria-labelledby={this.labelledBy}
        aria-describedby={this.describedBy}
        aria-modal
        className={this.classes}
        id={id}
        onKeyDown={this.handleInteraction}
        onClick={this.handleInteraction}
        ref={this.dialogElement}
      >
        {container}
        <div className={cssClasses.SCRIM} />
      </Tag>
    );
  }

  renderContainer = (
    children?: ChildTypes[]
  ): React.ReactElement<HTMLDivElement> | undefined =>
    !children ? (
      undefined
    ) : (
      <div className={cssClasses.CONTAINER}>
        <div className={cssClasses.SURFACE}>
          {React.Children.map(children as ChildTypes[], this.renderChild)}
        </div>
      </div>
    );

  renderChild = (child: ChildTypes, i: number): ChildTypes =>
    isDialogTitle(child) || isDialogContent(child)
      ? React.cloneElement(child, {
          key: `child-${i}`,
          ...child.props,
          id: this.setId(child, child.props.id),
        })
      : child;

  setId = (child: ChildTypes, componentId?: string): string => {
    const {id} = this.props;
    if (isDialogTitle(child)) {
      const labelledBy = componentId || id + '-title';
      this.labelledBy = labelledBy;
      return labelledBy;
    }

    const describedBy = componentId || id + '-content';
    this.describedBy = describedBy;
    return describedBy;
  };
}

export default Dialog;
export {DialogTitle, DialogContent, DialogFooter, DialogButton};

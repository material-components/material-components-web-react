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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCDialogFoundation, util} from '@material/dialog/dist/mdc.dialog';
import {ponyfill} from '@material/dom/dist/mdc.dom';
import {cssClasses, LAYOUT_EVENTS} from './constants';

import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';
import DialogFooter from './DialogFooter';
import DialogButton from './DialogButton';

class Dialog extends Component {

  focusTrap_ = null;
  foundation_ = null;
  dialogElement_ = React.createRef();
  labelledBy = undefined;
  describedBy = undefined;

  state = {classList: new Set()};

  componentDidMount() {
    const {open, autoStackButtons} = this.props;
    this.foundation_ = new MDCDialogFoundation(this.adapter);
    this.foundation_.init();
    this.initializeFocusTrap();

    if (open) {
      this.foundation_.open();
    }
    if (!autoStackButtons) {
      this.foundation_.setAutoStackButtons(autoStackButtons);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentDidUpdate(prevProps) {
    const {open, autoStackButtons} = this.props;

    if (prevProps.autoStackButtons !== autoStackButtons) {
      this.foundation_.setAutoStackButtons(autoStackButtons);
    }


    if (prevProps.open !== open) {
      return open ? this.foundation_.open() : this.foundation_.close();
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames(cssClasses.BASE, Array.from(classList), className);
  }

  get buttons_() {
    return [].slice.call(
      this.dialogElement_.current.getElementsByClassName(cssClasses.BUTTON)
    );
  }

  get content_() {
    const content = this.dialogElement_.current
      .getElementsByClassName(cssClasses.CONTENT);

    if (content) {
      return content[0];
    }

    return false;
  }

  get defaultButton_() {
    return this.dialogElement_.current
      .querySelector(`.${cssClasses.DEFAULT_BUTTON}`);
  }


  initializeFocusTrap = () => {
    this.focusTrap_ = util.createFocusTrapInstance(this.dialogElement_.current);
  }

  get adapter() {
    const strings = MDCDialogFoundation.strings;
    const {closest, matches} = ponyfill;
    const {isScrollable, areTopsMisaligned} = util;
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      eventTargetMatches: (target, selector) => matches(target, selector),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate(),
      isContentScrollable: () => {
        const content = this.content_;
        return !!content && isScrollable(content);
      },
      areButtonsStacked: () => areTopsMisaligned(this.buttons_),
      getActionFromEvent: (evt) => {
        const elem = closest(evt.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return elem && elem.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        const defaultButton = this.defaultButton_;
        if (defaultButton) {
          this.defaultButton_.click();
        }
      },
      reverseButtons: () => {
        this.buttons_.reverse().forEach((button) =>
          button.parentElement.appendChild(button)
        );
      },
      notifyOpening: () => this.handleOpening(),
      notifyOpened: () => this.handleOpen(),
      notifyClosing: (action) => this.handleClosing(action),
      notifyClosed: (action) => this.handleClosed(action),
    };
  }

  handleOpening = () => {
    this.props.onOpening();
    if (!this.foundation_) return;
    LAYOUT_EVENTS.forEach((evt) =>
      window.addEventListener(evt, this.handleLayout)
    );
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleClosing = (action) => {
    this.props.onClosing();
    if (!this.foundation_) return;
    LAYOUT_EVENTS.forEach((evt) =>
      window.removeEventListener(evt, this.handleLayout)
    );
    document.addEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleOpen = () => this.props.onOpen();
  handleClosed = (action) => { this.props.onClose(action)}
  handleInteraction = (e) => this.foundation_.handleInteraction(e)
  handleDocumentKeyDown = (e) => this.foundation_.handleDocumentKeydown(e);
  handleLayout = () => this.foundation_.layout();


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
      onClosed,
      tag: Tag,
      ...otherProps
      /* eslint-enable no-unused-vars */
    } = this.props;

    const container = this.renderContainer(children, id);
    return (
      <Tag
        {...otherProps}
        aria-labelledby={this.labelledBy_}
        aria-describedby={this.describedBy_}
        className={this.classes}
        id={id}
        role="alertdialog"
        onKeyDown={this.handleInteraction}
        onClick={this.handleInteraction}
        ref={this.dialogElement_}
      >{container}
        <div className={cssClasses.SCRIM}/>
      </Tag>
    );
  }


  renderContainer = (children) => !children ? undefined : (
    <div className={cssClasses.CONTAINER}>
      <div className={cssClasses.SURFACE}>
        {React.Children.map(children, this.renderChild)}
      </div>
    </div>
  );

  renderChild = (child) =>
    ['DialogTitle', 'DialogContent'].indexOf(child.type.name) >= 0
      ? React.cloneElement(child, {
        key: child.type.name,
        ...child.props,
        id: this.setId(child.type.name, child.props.id)})
      : React.cloneElement(child, {key: child.type.name, ...child.props})

  setId = (name, componentId=undefined) => {
    const {id} = this.props;
    if (name === 'DialogTitle') {
      const labelledBy = componentId || id + '-title';
      this.labelledBy_ = labelledBy;
      return labelledBy;
    }

    const describedBy = componentId || id + '-content';
    this.describedBy_ = describedBy;
    return describedBy;
  }
}


Dialog.propTypes = {
  autoStackButtons: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onOpening: PropTypes.func,
  onOpen: PropTypes.func,
  onClosing: PropTypes.func,
  onClose: PropTypes.func,
  tag: PropTypes.string,
  open: PropTypes.bool,
  id: PropTypes.string,
};

Dialog.defaultProps = {
  autoStackButtons: true,
  className: '',
  onOpening: () => {},
  onOpen: () => {},
  onClosing: () => {},
  onClose: () => {},
  tag: 'div',
  id: 'mdc-dialog',
  open: false,
};

export default Dialog;
export {DialogTitle, DialogContent, DialogFooter, DialogButton};

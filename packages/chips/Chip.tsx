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
import * as classnames from 'classnames';
import withRipple from '@material/react-ripple';
// no mdc .d.ts file
// @ts-ignore
import {MDCChipFoundation} from '@material/chips/dist/mdc.chips';

export interface ChipProps {
  id: string;
  label: string;
  className: string;
  selected: boolean;
  handleSelect: (id: string, selected: boolean) => void;
  handleRemove: (id: string) => void;
  handleInteraction: (id: string) => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  onTransitionEnd: React.TransitionEventHandler<HTMLDivElement>;
  initRipple: (surface: HTMLDivElement) => void;
  computeBoundingRect: (chipElement: React.ReactElement<HTMLDivElement>) => void;
  unbounded?: boolean;
  chipCheckmark?: React.ReactElement<HTMLElement>;
  leadingIcon?: React.ReactElement<HTMLElement>;
  removeIcon?: React.ReactElement<HTMLElement>;
};

type ChipState = {
  classList: Set<string>;
  leadingIconClassList: Set<string>;
};

export class Chip extends React.Component<ChipProps, ChipState> {
  chipElement_?: HTMLDivElement;
  foundation_?: MDCChipFoundation;

  static defaultProps: Partial<ChipProps> = {
    label: '',
    className: '',
    selected: false,
    onClick: () => {},
    onKeyDown: () => {},
    onTransitionEnd: () => {},
    initRipple: () => {},
    handleSelect: () => {},
    handleRemove: () => {},
    handleInteraction: () => {},
    computeBoundingRect: () => {},
  };

  state = {
    classList: new Set(),
    leadingIconClassList: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSelected(this.props.selected);
  }

  componentDidUpdate(prevProps: ChipProps) {
    if (this.props.selected !== prevProps.selected) {
      this.foundation_.setSelected(this.props.selected);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  init = (el: HTMLDivElement) => {
    this.chipElement_ = el;
    this.props.initRipple(el);
  };

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-chip', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      eventTargetHasClass: (target: HTMLElement, className: string) =>
        target.classList.contains(className),
      getComputedStyleValue: (propertyName: string) => {
        if (!this.chipElement_) return;
        return window
          .getComputedStyle(this.chipElement_)
          .getPropertyValue(propertyName);
      },
      setStyleProperty: (propertyName: keyof React.CSSProperties, value: string | null) => {
        if (!this.chipElement_) return;
        this.chipElement_.style.setProperty(propertyName, value);
      },
      notifyRemoval: () => this.props.handleRemove(this.props.id),
      notifyInteraction: () => this.props.handleInteraction(this.props.id),
      notifySelection: (selected: boolean) =>
        this.props.handleSelect(this.props.id, selected),
      addClassToLeadingIcon: (className: string) => {
        const leadingIconClassList = new Set(this.state.leadingIconClassList);
        leadingIconClassList.add(className);
        this.setState({leadingIconClassList});
      },
      removeClassFromLeadingIcon: (className: string) => {
        const leadingIconClassList = new Set(this.state.leadingIconClassList);
        leadingIconClassList.delete(className);
        this.setState({leadingIconClassList});
      },
    };
  }

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onClick(e);
    this.foundation_.handleInteraction(e);
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    this.props.onKeyDown(e);
    this.foundation_.handleInteraction(e);
  };

  handleRemoveIconClick = (e: React.MouseEvent) => this.foundation_.handleTrailingIconInteraction(e);

  handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    this.props.onTransitionEnd(e);
    this.foundation_.handleTransitionEnd(e);
  };

  renderLeadingIcon = (leadingIcon: React.ReactElement<HTMLElement>) => {
    const {leadingIconClassList} = this.state;
    const {className, ...otherProps} = leadingIcon.props;
    const props = {
      className: classnames(
        className,
        Array.from(leadingIconClassList),
        'mdc-chip__icon',
        'mdc-chip__icon--leading'
      ),
      ...otherProps,
    };
    return React.cloneElement(leadingIcon, props);
  };

  renderRemoveIcon = (removeIcon: React.ReactElement<HTMLElement>) => {
    const {className, ...otherProps} = removeIcon.props;
    const props = {
      className: classnames(
        className,
        'mdc-chip__icon',
        'mdc-chip__icon--trailing'
      ),
      onClick: this.handleRemoveIconClick,
      onKeyDown: this.handleRemoveIconClick,
      tabIndex: 0,
      role: 'button',
      ...otherProps,
    };
    return React.cloneElement(removeIcon, props);
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      id,
      className,
      selected,
      handleSelect,
      handleInteraction,
      handleRemove,
      onClick,
      onKeyDown,
      onTransitionEnd,
      computeBoundingRect,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      chipCheckmark,
      leadingIcon,
      removeIcon,
      label,
      ...otherProps
    } = this.props;
    return (
      <div
        tabIndex={0}
        className={this.classes}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.init}
        {...otherProps}
      >
        {leadingIcon ? this.renderLeadingIcon(leadingIcon) : null}
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
        {removeIcon ? this.renderRemoveIcon(removeIcon) : null}
      </div>
    );
  }
}

export default withRipple(Chip);

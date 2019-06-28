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
import {
  withRipple,
  InjectedProps,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@material/react-ripple';
import {MDCChipFoundation} from '@material/chips/chip/foundation';
import {MDCChipAdapter} from '@material/chips/chip/adapter';

export interface ChipProps extends InjectedProps<HTMLDivElement> {
  id?: string;
  label?: string;
  className?: string;
  selected?: boolean;
  handleSelect?: (id: string, selected: boolean) => void;
  handleRemove?: (id: string) => void;
  handleInteraction?: (id: string) => void;
  handleTrailingIconInteraction?: (id: string) => void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
  chipCheckmark?: React.ReactElement<HTMLElement>;
  leadingIcon?: React.ReactElement<HTMLElement>;
  shouldRemoveOnTrailingIconClick?: boolean;
  trailingIcon?: React.ReactElement<HTMLElement>;
  initRipple: (surface: HTMLElement | null) => void;
}

type ChipState = {
  classList: Set<string>;
  leadingIconClassList: Set<string>;
};

export class Chip extends React.Component<ChipProps, ChipState> {
  chipElement: HTMLDivElement | null = null;
  foundation!: MDCChipFoundation;

  static defaultProps: Partial<ChipProps> = {
    id: '',
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
    handleTrailingIconInteraction: () => {},
    shouldRemoveOnTrailingIconClick: true,
  };

  state: ChipState = {
    classList: new Set(),
    leadingIconClassList: new Set(),
  };

  componentDidMount() {
    const {selected, shouldRemoveOnTrailingIconClick} = this.props;
    this.foundation = new MDCChipFoundation(this.adapter);
    this.foundation.init();
    this.foundation.setSelected(selected!);
    if (
      shouldRemoveOnTrailingIconClick !==
      this.foundation.getShouldRemoveOnTrailingIconClick()
    ) {
      this.foundation.setShouldRemoveOnTrailingIconClick(
        shouldRemoveOnTrailingIconClick!
      );
    }
  }

  componentDidUpdate(prevProps: ChipProps) {
    const {selected, shouldRemoveOnTrailingIconClick} = this.props;

    if (selected !== prevProps.selected) {
      this.foundation.setSelected(selected!);
    }

    if (
      shouldRemoveOnTrailingIconClick !==
      prevProps.shouldRemoveOnTrailingIconClick
    ) {
      this.foundation.setShouldRemoveOnTrailingIconClick(
        shouldRemoveOnTrailingIconClick!
      );
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  init = (el: HTMLDivElement | null) => {
    this.chipElement = el;
    this.props.initRipple && this.props.initRipple(el);
  };

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-chip', Array.from(classList), className);
  }

  get adapter(): MDCChipAdapter {
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
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      hasLeadingIcon: () => Boolean(this.props.leadingIcon),
      eventTargetHasClass: (target: HTMLElement, className: string) =>
        target.classList.contains(className),
      getComputedStyleValue: (propertyName: string) => {
        if (!this.chipElement) return '';
        return window
          .getComputedStyle(this.chipElement)
          .getPropertyValue(propertyName);
      },
      getRootBoundingClientRect: () => {
        if (!this.chipElement) {
          // new DOMRect is not IE11 compatible
          const defaultDOMRect = {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
          };
          return defaultDOMRect;
        }
        return this.chipElement.getBoundingClientRect();
      },
      getCheckmarkBoundingClientRect: () => {
        const {chipCheckmark} = this.props;
        if (
          !(
            chipCheckmark &&
            chipCheckmark.props &&
            chipCheckmark.props.getBoundingClientRect
          )
        ) {
          // new DOMRect is not IE11 compatible
          const defaultDOMRect = {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
          };
          return defaultDOMRect;
        }
        return chipCheckmark.props.getBoundingClientRect();
      },
      setStyleProperty: (
        propertyName: keyof React.CSSProperties,
        value: string | null
      ) => {
        if (!this.chipElement) return;
        this.chipElement.style.setProperty(propertyName, value);
      },
      notifyRemoval: () => this.props.handleRemove!(this.props.id!),
      notifyInteraction: () => this.props.handleInteraction!(this.props.id!),
      notifySelection: (selected: boolean) =>
        this.props.handleSelect!(this.props.id!, selected),
      notifyTrailingIconInteraction: () =>
        this.props.handleTrailingIconInteraction!(this.props.id!),
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
    this.props.onClick!(e);
    this.foundation.handleInteraction(e.nativeEvent);
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    this.props.onKeyDown!(e);
    this.foundation.handleInteraction(e.nativeEvent);
  };

  handleTrailingIconClick = (e: React.MouseEvent) =>
    this.foundation.handleTrailingIconInteraction(e.nativeEvent);

  handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    this.props.onTransitionEnd!(e);
    this.foundation.handleTransitionEnd(e.nativeEvent);
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

  renderTrailingIcon = (trailingIcon: React.ReactElement<HTMLElement>) => {
    const {className, ...otherProps} = trailingIcon.props;
    const props = {
      className: classnames(
        className,
        'mdc-chip__icon',
        'mdc-chip__icon--trailing'
      ),
      onClick: this.handleTrailingIconClick,
      onKeyDown: this.handleTrailingIconClick,
      tabIndex: 0,
      role: 'button',
      ...otherProps,
    };
    return React.cloneElement(trailingIcon, props);
  };

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      id,
      className,
      selected,
      handleSelect,
      handleInteraction,
      handleRemove,
      handleTrailingIconInteraction,
      onClick,
      onKeyDown,
      onTransitionEnd,
      computeBoundingRect,
      initRipple,
      unbounded,
      shouldRemoveOnTrailingIconClick,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      chipCheckmark,
      leadingIcon,
      trailingIcon,
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
        {leadingIcon && this.renderLeadingIcon(leadingIcon)}
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
        {trailingIcon && this.renderTrailingIcon(trailingIcon)}
      </div>
    );
  }
}

export default withRipple<ChipProps, HTMLDivElement>(Chip);

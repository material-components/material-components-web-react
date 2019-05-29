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
import {MDCTextFieldIconAdapter} from '@material/textfield/icon/adapter';
import {MDCTextFieldIconFoundation} from '@material/textfield/icon/foundation';

export interface IconProps extends React.HTMLProps<HTMLOrSVGElement> {
  disabled?: boolean;
  children: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
  onSelect?: () => void;
}

interface IconState {
  tabindex?: number;
  role?: string;
}

export default class Icon extends React.Component<IconProps, IconState> {
  foundation!: MDCTextFieldIconFoundation;

  static defaultProps: Partial<IconProps> = {
    disabled: false,
  };

  constructor(props: IconProps) {
    super(props);
    const {role} = props.children.props;

    this.state = {
      tabindex: this.tabindex,
      role,
    };
  }

  componentDidMount() {
    this.foundation = new MDCTextFieldIconFoundation(this.adapter);
    this.foundation.init();
    if (this.props.disabled) {
      this.foundation.setDisabled(true);
    }
  }

  componentDidUpdate(prevProps: IconProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation.setDisabled(!!this.props.disabled);
    }

    if (this.props.onSelect !== prevProps.onSelect) {
      this.setState({tabindex: this.tabindex});
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get tabindex() {
    // if tabIndex is not set onSelect will never fire.
    // note that foundation.js alters tabindex not tabIndex
    if (typeof this.props.children.props.tabIndex === 'number') {
      return this.props.children.props.tabIndex;
    }

    return this.props.onSelect ? 0 : -1;
  }

  get adapter(): MDCTextFieldIconAdapter {
    return {
      // need toString() call when tabindex === 0.
      // @types/react requires tabIndex is number
      getAttr: (attr: keyof IconState) => {
        const attr_ = this.state[attr];
        if (attr_ || (typeof attr_ === 'number' && !isNaN(attr_))) {
          return attr_.toString();
        }
        return '';
      },
      setAttr: (attr: keyof IconState, value: string) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            [attr]: attr === 'tabindex' ? Number(value) : value,
          };
        }),
      removeAttr: (attr: keyof IconState) =>
        this.setState((prevState) => ({...prevState, [attr]: null})),
      notifyIconAction: () => this.props.onSelect && this.props.onSelect(),
      // Please manage content and register through JSX
      setContent: () => undefined,
      registerInteractionHandler: () => undefined,
      deregisterInteractionHandler: () => undefined,
    };
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) =>
    this.foundation.handleInteraction(e.nativeEvent);

  handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) =>
    this.foundation.handleInteraction(e.nativeEvent);

  addIconAttrsToChildren = () => {
    const {tabindex: tabIndex, role} = this.state;
    const child = React.Children.only(this.props.children);
    // TODO change literal to constant
    const className = classnames('mdc-text-field__icon', child.props.className);
    const props = Object.assign({}, child.props, {
      className,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      tabIndex,
      role,
    });
    return React.cloneElement(child, props);
  };

  render() {
    return this.addIconAttrsToChildren();
  }
}

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
// @ts-ignore
import {MDCTextFieldIconFoundation} from '@material/textfield/dist/mdc.textfield';

export interface IconProps extends React.HTMLProps<HTMLOrSVGElement> {
  disabled: boolean;
  children: React.ReactElement<React.HTMLProps<HTMLOrSVGElement>>;
};

interface IconState {
  tabindex?: number;
  role?: string;
}

export default class Icon extends React.Component<
  IconProps,
  IconState
  > {
  foundation_: MDCTextFieldIconFoundation;

  static defaultProps: Partial<IconProps> = {
    disabled: false,
  };

  constructor(props: IconProps) {
    super(props);
    const {
      tabIndex: tabindex, // note that foundation.js alters tabindex not tabIndex
      role,
    } = props.children.props;

    this.state = {
      tabindex,
      role,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCTextFieldIconFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.disabled) {
      this.foundation_.setDisabled(true);
    }
  }

  componentDidUpdate(prevProps: IconProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
  }

  componentWillUnmount() {
    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }

  get adapter() {
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
      setAttr: (attr: keyof IconState, value: string | number) => (
        this.setState((prevState) => ({...prevState, [attr]: value}))
      ),
      removeAttr: (attr: keyof IconState) => (
        this.setState((prevState) => ({...prevState, [attr]: null}))
      ),
    };
  }

  addIconAttrsToChildren = () => {
    const {tabindex: tabIndex, role} = this.state;
    const child = React.Children.only(this.props.children);
    const className = classnames('mdc-text-field__icon', child.props.className);
    const props = Object.assign({}, child.props, {
      className,
      tabIndex,
      role,
    });
    return React.cloneElement(child, props);
  };

  render() {
    return this.addIconAttrsToChildren();
  }
}


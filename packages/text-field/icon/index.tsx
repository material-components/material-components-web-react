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
import {MDCTextFieldIconFoundation} from '@material/textfield';
export type IconProps = {
  disabled: boolean
};

type IconState = {
  tabindex: number | string,
  role: string,
};

export default class Icon extends React.Component<
  IconProps,
  IconState
  > {
  foundation_: MDCTextFieldIconFoundation;

  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
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

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation_.setDisabled(this.props.disabled);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      getAttr: (attr) => this.state[attr],
      setAttr: (attr: keyof IconState, value: string) => (
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


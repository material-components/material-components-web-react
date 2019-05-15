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
import {MDCSelectIconAdapter} from '@material/select/icon/adapter';
import {MDCSelectIconFoundation} from '@material/select/icon/foundation';

export interface SelectIconProps extends React.HTMLProps<HTMLElement> {
  setIconFoundation?: (foundation?: MDCSelectIconFoundation) => void;
  tag?: keyof React.ReactHTML;
}

interface ElementAttributes {
  tabindex?: number;
  role?: string;
}

interface SelectIconState extends ElementAttributes {}

export class SelectIcon extends React.Component<
  SelectIconProps,
  SelectIconState
> {
  foundation?: MDCSelectIconFoundation;

  state: SelectIconState = {
    tabindex: undefined,
    role: undefined,
  };

  static defaultProps = {
    tag: 'i',
  };

  componentDidMount() {
    const {setIconFoundation} = this.props;
    this.foundation = new MDCSelectIconFoundation(this.adapter);
    this.foundation.init();
    setIconFoundation && setIconFoundation(this.foundation);
  }

  componentWillUnmount() {
    const {setIconFoundation} = this.props;
    if (this.foundation) {
      this.foundation.destroy();
      setIconFoundation && setIconFoundation(undefined);
    }
  }

  get adapter(): MDCSelectIconAdapter {
    return {
      getAttr: (attr: keyof ElementAttributes) => {
        if (this.state[attr] !== undefined) {
          return (this.state[
            attr
          ] as ElementAttributes[keyof ElementAttributes])!.toString();
        }
        const reactAttr = attr === 'tabindex' ? 'tabIndex' : attr;
        if (this.props[reactAttr] !== undefined) {
          return this.props[reactAttr]!.toString();
        }
        return null;
      },
      setAttr: (
        attr: keyof ElementAttributes,
        value: ElementAttributes[keyof ElementAttributes]
      ) => {
        this.setState((prevState) => ({
          ...prevState,
          [attr]: value,
        }));
      },
      removeAttr: (attr: keyof ElementAttributes) => {
        this.setState((prevState) => ({...prevState, [attr]: null}));
      },
      setContent: () => {
        // not implmenting because developer should would never call `setContent()`
      },
      // the adapter methods below are effectively useless since React
      // handles events and width differently
      registerInteractionHandler: () => undefined,
      deregisterInteractionHandler: () => undefined,
      notifyIconAction: () => undefined,
    };
  }

  render() {
    const {
      tag: Tag,
      setIconFoundation, // eslint-disable-line @typescript-eslint/no-unused-vars
      children,
      className,
      ...otherProps
    } = this.props;
    const {tabindex: tabIndex, role} = this.state;
    return (
      // @ts-ignore  https://github.com/Microsoft/TypeScript/issues/28892
      <Tag
        className={classnames('mdc-select__icon', className)}
        role={role}
        tabIndex={tabIndex}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
}

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
import {MDCTextFieldCharacterCounterAdapter} from '@material/textfield/character-counter/adapter';
import {MDCTextFieldCharacterCounterFoundation} from '@material/textfield/character-counter/foundation';

export interface CharacterCounterProps extends React.HTMLProps<HTMLDivElement> {
  count?: number;
  maxLength?: number;
  template?: string;
}

interface CharacterCounterState {
  count: number;
  maxLength: number;
}

export default class CharacterCounter extends React.Component<CharacterCounterProps, CharacterCounterState> {
  foundation = new MDCTextFieldCharacterCounterFoundation(this.adapter);

  constructor(props: CharacterCounterProps) {
    super(props);
    this.state = {
      count: props.count || 0,
      maxLength: props.maxLength || 0,
    };
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter(): MDCTextFieldCharacterCounterAdapter {
    return {
      // Please manage content through JSX
      setContent: () => undefined,
    };
  }

  renderTemplate(template: string, data: {
    count: number,
    maxLength: number,
  }) {
    const {
      maxLength,
    } = data;

    return template
      .replace('${maxLength}', maxLength.toString())
      .replace('${count}', '0')
    ;
  }

  get classes() {
    return classnames('mdc-text-field-character-counter', this.props.className);
  }

  get otherProps() {
    const {
      /* eslint-disable no-unused-vars */
      className,
      maxLength,
      template,
      /* eslint-disable no-unused-vars */
      ...otherProps
    } = this.props;

    return otherProps;
  }

  render() {
    const {
      count,
      maxLength,
    } = this.state;
    const {
      template,
    } = this.props;

    return <div className={this.classes} {...this.otherProps}>
      {this.renderTemplate(template ? template : '${count} / ${maxLength}', {
        count: count,
        maxLength: maxLength!,
      })}
    </div>;
  }
}


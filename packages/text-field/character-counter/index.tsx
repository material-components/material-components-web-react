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

const cssClasses = MDCTextFieldCharacterCounterFoundation.cssClasses;

const TEMPLATE = {
  COUNT: '${count}',
  MAX_LENGTH: '${maxLength}',
};

export interface CharacterCounterProps extends React.HTMLProps<HTMLDivElement> {
  count?: number;
  maxLength?: number;
  template?: string;
}

export default class CharacterCounter extends React.Component<
  CharacterCounterProps
> {
  foundation = new MDCTextFieldCharacterCounterFoundation(this.adapter);

  componentWillUnmount() {
    this.foundation.destroy();
  }

  get adapter(): MDCTextFieldCharacterCounterAdapter {
    return {
      // Please manage content through JSX
      setContent: () => undefined,
    };
  }

  renderTemplate(template: string) {
    const {count = 0, maxLength = 0} = this.props;

    return template
      .replace(TEMPLATE.COUNT, count.toString())
      .replace(TEMPLATE.MAX_LENGTH, maxLength.toString());
  }

  get classes() {
    return classnames(cssClasses.ROOT, this.props.className);
  }

  get otherProps() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      count,
      maxLength,
      template,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;

    return otherProps;
  }

  render() {
    const {template} = this.props;

    return (
      <div className={this.classes} {...this.otherProps}>
        {this.renderTemplate(
          template ? template : `${TEMPLATE.COUNT} / ${TEMPLATE.MAX_LENGTH}`
        )}
      </div>
    );
  }
}

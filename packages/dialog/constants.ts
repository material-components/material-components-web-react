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

import {cssClasses, strings} from '@material/dialog/constants';

const CSS_CLASSES = {
  ...cssClasses,
  ACTIONS: 'mdc-dialog__actions',
  BUTTON: 'mdc-dialog__button',
  CONTAINER: 'mdc-dialog__container',
  CONTENT: 'mdc-dialog__content',
  DEFAULT_BUTTON: 'mdc-dialog__button--default',
  ROOT: 'mdc-dialog',
  SCRIM: 'mdc-dialog__scrim',
  SURFACE: 'mdc-dialog__surface',
  TITLE: 'mdc-dialog__title',
};

const LAYOUT_EVENTS = ['resize', 'orientationchange'];

const STRINGS = {...strings};

export {CSS_CLASSES, LAYOUT_EVENTS, STRINGS};

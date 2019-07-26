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

import {cssClasses, strings} from '@material/list/constants';

const CSS_CLASSES = {
  ...cssClasses,
  AVATAR_LIST: 'mdc-list--avatar-list',
  DENSE: 'mdc-list--dense',
  DIVIDER: 'mdc-list-divider',
  GROUP: 'mdc-list-group',
  GROUP_SUBHEADER: 'mdc-list-group__subheader',
  ITEM: 'mdc-list-item',
  ITEM_ACTIVATED: cssClasses.LIST_ITEM_ACTIVATED_CLASS,
  ITEM_DISABLED: 'mdc-list-item--disabled',
  ITEM_GRAPHIC: 'mdc-list-item__graphic',
  ITEM_META: 'mdc-list-item__meta',
  ITEM_PRIMARY_TEXT: 'mdc-list-item__primary-text',
  ITEM_SECONDARY_TEXT: 'mdc-list-item__secondary-text',
  ITEM_TEXT: 'mdc-list-item__text',
  ITEM_SELECTED: cssClasses.LIST_ITEM_SELECTED_CLASS,
  NON_INTERACTIVE: 'mdc-list--non-interactive',
  TWO_LINE: 'mdc-list--two-line',
};

const STRINGS = {...strings};

export {CSS_CLASSES, STRINGS};

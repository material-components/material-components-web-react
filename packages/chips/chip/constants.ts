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

import {cssClasses} from '@material/chips/chip/constants';

const CSS_CLASSES = {
  ...cssClasses,
  CHECKMARK_PATH: 'mdc-chip__checkmark-path',
  CHECKMARK_SVG: 'mdc-chip__checkmark-svg',
  EXIT: cssClasses.CHIP_EXIT,
  ICON: 'mdc-chip__icon',
  ICON_LEADING: cssClasses.LEADING_ICON,
  ICON_LEADING_HIDDEN: cssClasses.HIDDEN_LEADING_ICON,
  ICON_TRAILING: cssClasses.TRAILING_ICON,
  ROOT: 'mdc-chip',
  TEXT: 'mdc-chip__text',
};

export {CSS_CLASSES};

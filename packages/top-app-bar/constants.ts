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
const BASE = 'mdc-top-app-bar';
const SECTION = `${BASE}__section`;
const cssClasses = {
  BASE,
  ROW: `${BASE}__row`,
  SECTION,
  SECTION_START: `${SECTION}--align-start`,
  SECTION_END: `${SECTION}--align-end`,
  FIXED: `${BASE}--fixed`,
  SHORT: `${BASE}--short`,
  SHORT_COLLAPSED: `${BASE}--short-collapsed`,
  PROMINENT: `${BASE}--prominent`,
  DENSE: `${BASE}--dense`,
  TITLE: `${BASE}__title`,
  ACTION_ITEM: `${BASE}__action-item`,
  NAV_ICON: `${BASE}__navigation-icon`,
};

export {cssClasses};

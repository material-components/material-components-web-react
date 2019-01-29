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

// TODO: remove this when MDC Web types are added.

export interface IMDCSnackbarAdapter {
    addClass(className: string): void
    removeClass(className: string): void
    announce(): void
    notifyOpening(): void
    notifyOpened(): void
    notifyClosing(reason: string): void
    notifyClosed(reason: string): void
}

export interface IMDCSnackbarFoundation {
    open(): void;
    close(action: string): void;
    isOpen(): boolean
    getTimeoutMs(): number
    setTimeoutMs(timeoutMs: number): void
    getCloseOnEscape(): boolean
    setCloseOnEscape(closeOnEscape: boolean): void
    handleKeyDown(event: KeyboardEvent): void
    handleActionButtonClick(event: MouseEvent): void
    handleActionIconClick(event: MouseEvent): void
    init(): void
    destroy(): void
    adapter_: IMDCSnackbarAdapter
}

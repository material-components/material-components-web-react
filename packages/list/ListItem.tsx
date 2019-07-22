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

import React from 'react';
import classnames from 'classnames';
import {closest} from '@material/dom/ponyfill';
import {
  withRipple,
  InjectedProps,
  // @ts-ignore TODO(issues/955) Remove once possible
  RippledComponentProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@material/react-ripple';
import {MDCListFoundation} from '@material/list/foundation';

import {ListItemContext, ListItemContextShape} from './index';

export interface ListItemProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLProps<T>,
    ListItemContextShape,
    InjectedProps<T> {
  checkboxList?: boolean;
  radioList?: boolean;
  tag?: string;
  activated?: boolean;
  selected?: boolean;
  ref?: React.Ref<any>;
  initRipple?: (surface: T) => void;
}

export interface ListItemState {
  tabIndex?: number;
}

export class ListItemBase<
  T extends HTMLElement = HTMLElement
> extends React.Component<ListItemProps<T>, ListItemState> {
  private listItemElement = React.createRef<T>();

  static defaultProps: Partial<ListItemProps<HTMLElement>> = {
    checkboxList: false,
    radioList: false,
    className: '',
    tabIndex: -1,
    onKeyDown: () => {},
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onDestroy: () => {},
    tag: 'li',
    handleClick: () => {},
    handleKeyDown: () => {},
    handleBlur: () => {},
    handleFocus: () => {},
    getListItemInitialTabIndex: () => -1,
    getClassNamesFromList: () => ({}),
  };

  state = {
    tabIndex: this.props.tabIndex,
  };

  get listElements(): Element[] {
    if (this.listItemElement.current) {
      const listElement = closest(
        this.listItemElement.current,
        `.${MDCListFoundation.cssClasses.ROOT}`
      );
      if (!listElement) return [];
      return [].slice.call(
        listElement.querySelectorAll(
          MDCListFoundation.strings.ENABLED_ITEMS_SELECTOR
        )
      );
    }
    return [];
  }

  componentDidMount() {
    this.initializeTabIndex();
    if (this.props.initRipple) {
      this.props.initRipple(this.listItemElement.current as T);
    }
  }

  componentDidUpdate(prevProps: ListItemProps<T>) {
    if (prevProps.tabIndex !== this.props.tabIndex) {
      this.setState({tabIndex: this.props.tabIndex});
    }
  }

  componentWillUnmount() {
    if (this.listItemElement.current) {
      const index = this.getIndex(this.listItemElement.current);
      this.props.onDestroy!(index);
    }
  }

  get classes() {
    const {
      className,
      activated,
      disabled,
      selected,
      getClassNamesFromList,
    } = this.props;
    let classesFromList = [''];
    if (this.listItemElement.current) {
      const index = this.getIndex(this.listItemElement.current);
      classesFromList = getClassNamesFromList!()[index];
    }
    return classnames('mdc-list-item', className, classesFromList, {
      [MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS]: activated,
      [MDCListFoundation.cssClasses.LIST_ITEM_SELECTED_CLASS]: selected,
      'mdc-list-item--disabled': disabled,
    });
  }

  get role() {
    const {checkboxList, radioList, role} = this.props;
    if (role) {
      return role;
    } else if (checkboxList) {
      return 'checkbox';
    } else if (radioList) {
      return 'radio';
    }
    return null;
  }

  private initializeTabIndex = () => {
    if (this.listItemElement.current) {
      const index = this.getIndex(this.listItemElement.current);
      const tabIndex = this.props.getListItemInitialTabIndex!(index);
      this.setState({tabIndex});
    }
  };

  getIndex = (listElement: Element) => {
    return this.listElements.indexOf(listElement);
  };

  handleClick = (e: React.MouseEvent<any>) => {
    const {onClick} = this.props;
    onClick!(e);
    this.props.handleClick!(e, this.getIndex(e.currentTarget));
  };

  handleKeyDown = (e: React.KeyboardEvent<any>) => {
    const {onKeyDown} = this.props;
    onKeyDown!(e);
    this.props.handleKeyDown!(e, this.getIndex(e.currentTarget));
  };

  handleFocus = (e: React.FocusEvent<any>) => {
    const {onFocus} = this.props;
    onFocus!(e);
    this.props.handleFocus!(e, this.getIndex(e.currentTarget));
  };

  handleBlur = (e: React.FocusEvent<any>) => {
    const {onBlur} = this.props;
    onBlur!(e);
    this.props.handleBlur!(e, this.getIndex(e.currentTarget));
  };

  render() {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      children,
      role,
      initRipple,
      checkboxList,
      radioList,
      selected,
      activated,
      onDestroy,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      handleClick,
      handleKeyDown,
      handleFocus,
      handleBlur,
      getListItemInitialTabIndex,
      getClassNamesFromList,
      tabIndex,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      tag: Tag,
      ...otherProps
    } = this.props;

    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag
        {...otherProps}
        {...this.context}
        role={this.role}
        className={this.classes}
        ref={this.listItemElement}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={this.state.tabIndex}
      >
        {children}
      </Tag>
    );
  }
}

const ListItem: React.FunctionComponent<ListItemProps> = (props) => {
  return (
    <ListItemContext.Consumer>
      {(context) => <ListItemBase {...context} {...props} />}
    </ListItemContext.Consumer>
  );
};

// export default ListItem;
export default withRipple<ListItemProps, HTMLElement>(ListItem);

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

import * as React from 'react';
import classnames from 'classnames';
import {MDCMenuFoundation} from '@material/menu/foundation';
import {MDCMenuAdapter} from '@material/menu/adapter';
import MenuSurface, {MenuSurfaceProps} from '@material/react-menu-surface';
import MenuList, { MenuListProps } from './MenuList';
import MenuListItem from './MenuListItem';

const {cssClasses} = MDCMenuFoundation;

export interface MenuProps extends Exclude<MenuSurfaceProps, 'ref'> {
  children: React.ReactElement<MenuList>;
  handleSelected?: (index: number, item: Element) => void;
};

export interface MenuState {
  classList: Set<string>;
  open: boolean;
  foundation?: MDCMenuFoundation;
};

class Menu extends React.Component<MenuProps, MenuState> {
  menuListElement = React.createRef<MenuList>();
  
  // need foundation on state so that it initializes MenuList with
  // foundation.handleItemAction
  state: MenuState = {
    foundation: undefined,
    classList: new Set(),
    open: this.props.open || false,
  };

  static defaultProps: Partial<MenuProps> = {
    className: '',
    open: false,
    onKeyDown: () => {},
    handleSelected: () => {},
  };

  componentDidMount() {
    const foundation = new MDCMenuFoundation(this.adapter);
    foundation.init();
    this.setState({foundation});
  }

  componentDidUpdate(prevProps: MenuProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({open: this.props.open!});
    }
  }

  componentWillUnmount() {
    if (this.state.foundation) {
      this.state.foundation.destroy();
    }
  }

  get listElements(): Element[] {
    // TODO: do a find of .mdc-list so that people using styled-components can style the list
    if (!(this.menuListElement
      && this.menuListElement.current
      && this.menuListElement.current.listElements.length >= 0 )) {
        return [];
    }
    return this.menuListElement.current.listElements;
  }

  get classes() {
    const {className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-menu', Array.from(classList), className);
  }

  get adapter(): MDCMenuAdapter {
    return {
      addClassToElementAtIndex: (index, className) => {
        const list = this.listElements;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: (index, className) => {
        const list = this.listElements;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: (index, attr, value) => {
        const list = this.listElements;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: (index, attr) => {
        const list = this.listElements;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: (element, className) => element.classList.contains(className),
      closeSurface: () => this.setState({open: false}),
      getElementIndex: (element) => this.listElements.indexOf(element),
      getParentElement: (element) => element.parentElement,
      getSelectedElementIndex: (selectionGroup) => {
        const selectedListItem = selectionGroup.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);
        return selectedListItem ? this.listElements.indexOf(selectedListItem) : -1;
      },
      notifySelected: (evtData) => this.props.handleSelected!(
        evtData.index,
        this.listElements[evtData.index],
      ),
    };
  }

  handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (evt) => {
    const {onKeyDown} = this.props;
    if (onKeyDown) {
      onKeyDown(evt);
    }
    this.state.foundation && this.state.foundation.handleKeydown(evt.nativeEvent);
  }

  handleOpen: MenuSurfaceProps['onOpen'] = () => {
    const {onOpen} = this.props;
    if (onOpen) {
      onOpen();
    }
    if (this.listElements.length > 0) {
      (this.listElements[0] as HTMLElement).focus();
    }
  }

  render() {
    const {
      open,
      onKeyDown,
      onOpen,
      children,
      className,
      handleSelected,
      ref,
      ...otherProps
    } = this.props;

    return (
      <MenuSurface
        tabIndex={-1}
        open={this.state.open}
        className={this.classes}
        onKeyDown={this.handleKeyDown}
        onOpen={this.handleOpen}
        {...otherProps}
      >
        {this.renderChild()}
      </MenuSurface>
    );
  }

  
  renderChild() {
    const {children} = this.props;
    const {foundation} = this.state;
    let handleItemAction: MDCMenuFoundation['handleItemAction'] = () => {};
    if (foundation) {
      // this is to avoid a `handleItemAction` of undefined error
      handleItemAction = foundation.handleItemAction.bind(foundation);
    }
    const updatedProps: MenuListProps<HTMLElement> = {
      // children.props must appear first
      ...children.props,
      handleItemAction,
      ref: this.menuListElement,
      wrapFocus: true,
    };
    return React.cloneElement(children, updatedProps);
  }
}

export default Menu;
export {MenuList, MenuListItem};
export {
  ListDivider as MenuListDivider,
  ListGroup as MenuListGroup,
  ListGroupSubheader as MenuListGroupSubheader,
  ListItemGraphic as MenuListGraphic,
  ListItemMeta as MenuListMeta,
  ListItemText as MenuListItemText,
} from '@material/react-list';

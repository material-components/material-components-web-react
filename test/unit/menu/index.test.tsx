import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme';
import Menu, {
  MenuState,
  MenuList,
  MenuListItem,
} from '../../../packages/menu/index';
import {coerceForTesting} from '../helpers/types';

suite('Menu');

function getFoundation(
  wrapper: ReactWrapper<any, any, any> | ShallowWrapper<Menu>
) {
  return coerceForTesting<MenuState>(wrapper.state()).foundation!;
}

function getAdapter(
  wrapper: ReactWrapper<any, any, any> | ShallowWrapper<Menu>
) {
  // @ts-ignore adapter_ property is protected and we need to override this
  return getFoundation(wrapper).adapter_;
}

test('classNames adds classes', () => {
  const wrapper = shallow(<Menu className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-menu'));
});

test('has state.foundation', () => {
  const wrapper = shallow(<Menu />);
  const foundation = coerceForTesting<MenuState>(wrapper.state()).foundation;
  assert.exists(foundation);
});

test('calls foundation.destroy on unmount', () => {
  const wrapper = shallow(<Menu />);
  const destroy = (getFoundation(wrapper).destroy = td.func<() => void>());
  wrapper.unmount();
  td.verify(destroy(), {times: 1});
});

test('props.open updates from true to false, will set state.open to false', () => {
  const wrapper = shallow(<Menu open />);
  wrapper.setProps({open: false});
  assert.isFalse(coerceForTesting<MenuState>(wrapper.state()).open);
});

test('props.open updates from false to true, will set state.open to true', () => {
  const wrapper = shallow(<Menu />);
  wrapper.setProps({open: true});
  assert.isTrue(coerceForTesting<MenuState>(wrapper.state()).open);
});

// TODO: implement with https://github.com/material-components/material-components-web-react/issues/796
// test('adapter.addClassToElementAtIndex adds a class to a listItem', () => {
// });
// test('adapter.removeClassToElementAtIndex adds a class to a listItem', () => {
// });

test('adapter.addAttributeToElementAtIndex adds a class to a listItem', () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button className='mdc-list-item'>Meow</button>
      </MenuList>
    </Menu>
  );
  getAdapter(wrapper).addAttributeToElementAtIndex(0, 'tabindex', '12');
  const listItem = wrapper.find('.mdc-list-item').getDOMNode();
  assert.equal(coerceForTesting<HTMLElement>(listItem).tabIndex, 12);
  wrapper.unmount();
});

test('adapter.removeAttributeToElementAtIndex adds a class to a listItem', () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button tabIndex={12} className='mdc-list-item'>
          Meow
        </button>
      </MenuList>
    </Menu>
  );
  getAdapter(wrapper).removeAttributeFromElementAtIndex(0, 'tabindex');
  const listItem = wrapper.find('.mdc-list-item').getDOMNode();
  assert.notEqual(coerceForTesting<HTMLElement>(listItem).tabIndex, 12);
  wrapper.unmount();
});

test('adapter.elementContainsClass returns true if element contains class', () => {
  class Div extends React.Component {
    render() {
      return <div className='test-class-name-1'>Meow</div>;
    }
  }
  const wrapper = mount(
    <Menu>
      <Div />
    </Menu>
  );
  const contains = getAdapter(wrapper).elementContainsClass(
    wrapper
      .find('div')
      .last()
      .getDOMNode(),
    'test-class-name-1'
  );
  assert.isTrue(contains);
  wrapper.unmount();
});

test('adapter.elementContainsClass returns FALSE if element does not contains class', () => {
  class Div extends React.Component {
    render() {
      return <div>Meow</div>;
    }
  }
  const wrapper = mount(
    <Menu>
      <Div />
    </Menu>
  );
  const contains = getAdapter(wrapper).elementContainsClass(
    wrapper
      .find('div')
      .first()
      .getDOMNode(),
    'test-class-name-1'
  );
  assert.isFalse(contains);
  wrapper.unmount();
});

test('adapter.closeSurface sets state.open to false', () => {
  const wrapper = shallow(<Menu open />);
  assert.isTrue(coerceForTesting<MenuState>(wrapper.state()).open);
  getAdapter(wrapper).closeSurface();
  assert.isFalse(coerceForTesting<MenuState>(wrapper.state()).open);
});

test('adapter.getElementIndex returns index of list item', () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button className='mdc-list-item'>Meow</button>
        <button className='mdc-list-item'>Woof</button>
      </MenuList>
    </Menu>
  );
  const lastListItem = wrapper
    .find('.mdc-list-item')
    .last()
    .getDOMNode();
  const index = getAdapter(wrapper).getElementIndex(lastListItem);
  assert.equal(index, 1);
  wrapper.unmount();
});

test('adapter.getParentElement returns MenuList if called on list item', () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button className='mdc-list-item'>Meow</button>
        <button className='mdc-list-item'>Woof</button>
      </MenuList>
    </Menu>
  );
  const lastListItem = wrapper
    .find('.mdc-list-item')
    .last()
    .getDOMNode();
  const menuList = getAdapter(wrapper).getParentElement(lastListItem);
  assert.equal(menuList, wrapper.find('.mdc-list').getDOMNode());
  wrapper.unmount();
});

test("adapter.getSelectedElementIndex returns selected list item's index", () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button className='mdc-menu-item mdc-list-item mdc-menu-item--selected'>
          Meow
        </button>
        <button className='mdc-menu-item mdc-list-item'>Woof</button>
      </MenuList>
    </Menu>
  );
  const menuList = wrapper.find('.mdc-list').getDOMNode();
  const selectedListItem = getAdapter(wrapper).getSelectedElementIndex(
    menuList
  );
  assert.equal(selectedListItem, 0);
  wrapper.unmount();
});

test('adapter.getSelectedElementIndex returns -1 if no list item is selected', () => {
  const wrapper = mount(
    <Menu>
      <MenuList>
        <button className='mdc-list-item'>Meow</button>
        <button className='mdc-list-item'>Woof</button>
      </MenuList>
    </Menu>
  );
  const menuList = wrapper.find('.mdc-list').getDOMNode();
  const selectedListItem = getAdapter(wrapper).getSelectedElementIndex(
    menuList
  );
  assert.equal(selectedListItem, -1);
  wrapper.unmount();
});

test('adapter.notifySelected calls props.onSelected with the selectedindex and listElement DOM node', () => {
  const onSelected = td.func<(index: number, element: Element) => void>();
  const wrapper = mount(
    <Menu onSelected={onSelected}>
      <MenuList>
        <MenuListItem />
        <MenuListItem />
      </MenuList>
    </Menu>
  );
  const evtData = {index: 0};
  getAdapter(wrapper).notifySelected(evtData);
  td.verify(
    onSelected(
      0,
      wrapper
        .find('.mdc-list-item')
        .first()
        .getDOMNode()
    ),
    {times: 1}
  );
  wrapper.unmount();
});

test('onKeyDown calls foundation.handleKeydown', () => {
  const wrapper = shallow(<Menu />);
  getFoundation(wrapper).handleKeydown = td.func<(evt: Event) => void>();
  const evt = coerceForTesting<React.KeyboardEvent>({
    nativeEvent: {},
  });
  wrapper.simulate('keydown', evt);
  td.verify(getFoundation(wrapper).handleKeydown(evt.nativeEvent), {times: 1});
});

test('onKeyDown calls props.onKeyDown', () => {
  const onKeyDown = td.func<(evt: React.KeyboardEvent) => void>();
  const wrapper = shallow(<Menu onKeyDown={onKeyDown} />);
  const evt = coerceForTesting<React.KeyboardEvent>({
    nativeEvent: {},
  });
  wrapper.simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('handleOpen calls props.onOpen', () => {
  const onOpen = td.func<() => void>();
  const wrapper = mount(<Menu onOpen={onOpen} />);
  coerceForTesting<Menu>(wrapper.instance()).handleOpen!();
  td.verify(onOpen(), {times: 1});
});

test('menu renders with tabindex=-1', () => {
  const wrapper = shallow(<Menu />);
  assert.equal(wrapper.props().tabIndex, -1);
});

test('menu renders child with handleItemAction', () => {
  class Div extends React.Component {
    render() {
      return <div className='test-div'>Meow</div>;
    }
  }
  const wrapper = mount(
    <Menu>
      <Div />
    </Menu>
  );
  assert.equal(
    typeof coerceForTesting<Menu>(wrapper.instance()).menuListElement.current!
      .props.handleItemAction,
    'function'
  );
  wrapper.unmount();
});

test('menu renders child with wrapFocus', () => {
  class Div extends React.Component {
    render() {
      return <div className='test-div'>Meow</div>;
    }
  }
  const wrapper = mount(
    <Menu>
      <Div />
    </Menu>
  );
  assert.isTrue(
    coerceForTesting<Menu>(wrapper.instance()).menuListElement.current!.props
      .wrapFocus
  );
  wrapper.unmount();
});

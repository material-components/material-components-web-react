import * as React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import {Option} from '../../../packages/select/index';
import {MenuListItem} from '../../../packages/menu/index';

suite('Select Options');

test('renders an option tag if not enhanced', () => {
  const wrapper = shallow(<Option />);
  assert.equal(wrapper.find('option').length, 1);
});

test('renders an MenuListItem if enhanced', () => {
  const wrapper = shallow(<Option enhanced />);
  assert.equal(wrapper.find(MenuListItem).length, 1);
});

test('renders an a value attribute if not enhanced', () => {
  const wrapper = mount(<Option value='test' />);
  assert.equal(
    wrapper
      .find('option')
      .getDOMNode()
      .getAttribute('value'),
    'test'
  );
});

test('renders an a data-value attribute if enhanced', () => {
  const wrapper = mount(<Option enhanced data-value='test' />);
  assert.equal(
    wrapper
      .find(MenuListItem)
      .getDOMNode()
      .getAttribute('data-value'),
    'test'
  );
});

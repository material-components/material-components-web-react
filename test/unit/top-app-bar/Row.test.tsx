import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {TopAppBarRow} from '../../../packages/top-app-bar/index';
import {cssClasses} from '../../../packages/top-app-bar/constants';

suite('TopAppBarRow');

test('renders a TopAppBarRow with default tag', () => {
  const wrapper = shallow(<TopAppBarRow>test</TopAppBarRow>);
  assert.equal(wrapper.type(), 'div');
});

test('renders a TopAppBarRow with custom tag', () => {
  const wrapper = shallow(<TopAppBarRow tag='section' />);
  assert.equal(wrapper.type(), 'section');
});

test('renders a TopAppBarRow with the default className', () => {
  const wrapper = shallow(<TopAppBarRow />);
  assert.isTrue(wrapper.hasClass(cssClasses.ROW));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<TopAppBarRow className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.ROW));
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <TopAppBarRow>
      <p>moewkay</p>
      <span>meowkay</span>
    </TopAppBarRow>
  );

  assert.equal(wrapper.find('p').length, 1);
  assert.equal(wrapper.find('span').length, 1);
});

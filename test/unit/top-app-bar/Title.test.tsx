import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {TopAppBarTitle} from '../../../packages/top-app-bar/index';
import {cssClasses} from '../../../packages/top-app-bar/constants';

suite('TopAppBarTitle');

test('renders a TopAppBarTitle with default tag', () => {
  const wrapper = shallow(<TopAppBarTitle>test</TopAppBarTitle>);
  assert.equal(wrapper.type(), 'span');
});

test('renders a TopAppBarTitle with custom tag', () => {
  const wrapper = shallow(<TopAppBarTitle tag='h2' />);
  assert.equal(wrapper.type(), 'h2');
});

test('redners a TopAppBarTitle with the default className', () => {
  const wrapper = shallow(<TopAppBarTitle />);
  assert.isTrue(wrapper.hasClass(cssClasses.TITLE));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<TopAppBarTitle className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.TITLE));
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <TopAppBarTitle>
      <p>moewkay</p>
      <strong>meowkay</strong>
    </TopAppBarTitle>
  );

  assert.equal(wrapper.find('p').length, 1);
  assert.equal(wrapper.find('strong').length, 1);
});

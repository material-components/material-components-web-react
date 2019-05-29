import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {TopAppBarSection} from '../../../packages/top-app-bar/index';
import {cssClasses} from '../../../packages/top-app-bar/constants';

suite('TopAppBarSection');

test('renders a TopAppBarSection with default tag', () => {
  const wrapper = shallow(<TopAppBarSection>test</TopAppBarSection>);
  assert.equal(wrapper.type(), 'section');
});

test('renders a TopAppBarSection with custom tag', () => {
  const wrapper = shallow(<TopAppBarSection tag='div' />);
  assert.equal(wrapper.type(), 'div');
});

test('redners a TopAppBarSection with the default className', () => {
  const wrapper = shallow(<TopAppBarSection />);
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<TopAppBarSection className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION));
});

test('props.align start adds proper start alignment class', () => {
  const wrapper = shallow(<TopAppBarSection align='start' />);
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION));
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION_START));
});

test('props.align end adds proper end alignment class', () => {
  const wrapper = shallow(<TopAppBarSection align='end' />);
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION));
  assert.isTrue(wrapper.hasClass(cssClasses.SECTION_END));
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <TopAppBarSection>
      <p>moewkay</p>
      <span>meowkay</span>
    </TopAppBarSection>
  );

  assert.equal(wrapper.find('p').length, 1);
  assert.equal(wrapper.find('span').length, 1);
});

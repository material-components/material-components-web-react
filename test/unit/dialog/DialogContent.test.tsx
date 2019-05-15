import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {DialogContent} from '../../../packages/dialog';
import {cssClasses} from '../../../packages/dialog/constants';

suite('DialogContent');

test('renders a DialogContent with default tag', () => {
  const wrapper = shallow(<DialogContent>test</DialogContent>);
  assert.equal(wrapper.type(), 'div');
});

test('renders a DialogContent with custom tag', () => {
  const wrapper = shallow(<DialogContent tag='span' />);
  assert.equal(wrapper.type(), 'span');
});

test('redners a DialogContent with the default className', () => {
  const wrapper = shallow(<DialogContent />);
  assert.isTrue(wrapper.hasClass(cssClasses.CONTENT));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<DialogContent className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.CONTENT));
});

test('prop.id adds id', () => {
  const wrapper = shallow(<DialogContent id='custom-content' />);
  assert.equal(wrapper.find('#custom-content').length, 1);
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <DialogContent>
      <p>moewkay</p>
      <span>meowkay</span>
    </DialogContent>
  );

  assert.equal(wrapper.find('p').length, 1);
  assert.equal(wrapper.find('span').length, 1);
});

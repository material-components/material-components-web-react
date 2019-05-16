import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {DialogTitle} from '../../../packages/dialog';
import {cssClasses} from '../../../packages/dialog/constants';

suite('DialogTitle');

test('renders a DialogTitle with default tag', () => {
  const wrapper = shallow(<DialogTitle>test</DialogTitle>);
  assert.equal(wrapper.type(), 'h2');
});

test('renders a DialogTitle with custom tag', () => {
  const wrapper = shallow(<DialogTitle tag='h3' />);
  assert.equal(wrapper.type(), 'h3');
});

test('redners a DialogTitle with the default className', () => {
  const wrapper = shallow(<DialogTitle />);
  assert.isTrue(wrapper.hasClass(cssClasses.TITLE));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<DialogTitle className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.TITLE));
});

test('prop.id adds id', () => {
  const wrapper = shallow(<DialogTitle id='custom-title' />);
  assert.equal(wrapper.find('#custom-title').length, 1);
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <DialogTitle>
      <em>ensure children</em>
      <span>are valid for parent</span>
    </DialogTitle>
  );

  assert.equal(wrapper.find('em').length, 1);
  assert.equal(wrapper.find('span').length, 1);
});

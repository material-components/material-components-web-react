import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {DialogFooter, DialogButton} from '../../../packages/dialog';
import {cssClasses} from '../../../packages/dialog/constants';

suite('DialogFooter');

test('renders a DialogFooter with default tag', () => {
  const wrapper = shallow(<DialogFooter>test</DialogFooter>);
  assert.equal(wrapper.type(), 'footer');
});

test('renders a DialogFooter with custom tag', () => {
  const wrapper = shallow(<DialogFooter tag='div' />);
  assert.equal(wrapper.type(), 'div');
});

test('redners a DialogFooter with the default className', () => {
  const wrapper = shallow(<DialogFooter />);
  assert.isTrue(wrapper.hasClass(cssClasses.ACTIONS));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<DialogFooter className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.ACTIONS));
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <DialogFooter>
      <DialogButton action='dismiss' />
      <DialogButton action='accept' />
    </DialogFooter>
  );

  assert.equal(wrapper.find('DialogButton').length, 2);
});

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {NativeRadioControl} from '../../../packages/radio/index';

suite('NativeRadioControl');

test('is tag input', () => {
  const wrapper = shallow(<NativeRadioControl />);
  assert.equal(wrapper.type(), 'input');
});

test('is input type radio', () => {
  const wrapper = shallow(<NativeRadioControl />);
  assert.equal(wrapper.props().type, 'radio');
});

test('has mdc-radio__native-control class', () => {
  const wrapper = shallow(<NativeRadioControl />);
  assert.isTrue(wrapper.hasClass('mdc-radio__native-control'));
});

test('adds custom classnames', () => {
  const wrapper = shallow(<NativeRadioControl className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('mdc-radio__native-control'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

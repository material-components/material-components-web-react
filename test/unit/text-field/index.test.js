import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import TextField from '../../../packages/text-field';

suite.only('Text Field');

test('classNames adds classes', () => {
  const wrapper = shallow(<TextField
    label='my label'
    className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field'));
});

test('#componentDidMount creates foundation', () => {
  const wrapper = shallow(<TextField label='my label'/>);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentDidUpdate calls setValue if state.value updates', () => {
  const wrapper = shallow(<TextField label='my label'/>);
  wrapper.instance().foundation.setValue = td.func();
  wrapper.setState({value: 'value'});
  td.verify(wrapper.instance().foundation.setValue('value'), {times: 1});
});

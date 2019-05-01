import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeSelect from '../../../packages/select/NativeSelect';

suite('Select Native');

test('has mdc-select__native-control class', () => {
  const wrapper = shallow(<NativeSelect />);
  assert.isTrue(wrapper.hasClass('mdc-select__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<NativeSelect className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders children', () => {
  const wrapper = shallow(
    <NativeSelect>
      <option value='test'>test</option>
    </NativeSelect>
  );
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});

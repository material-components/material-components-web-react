import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import {DialogButton} from '../../../packages/dialog';
import {cssClasses} from '../../../packages/dialog/constants';

suite('DialogButton');

test('redners a DialogButton with the default className', () => {
  const wrapper = shallow(<DialogButton/>);
  assert.isTrue(wrapper.hasClass(cssClasses.BUTTON));
});

test('props.className adds classes', () => {
  const wrapper = shallow(<DialogButton className="test-class"/>);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.BUTTON));
});

test('props.isDefault adds default className when true', () => {
  const wrapper = shallow(<DialogButton isDefault/>);
  assert.isTrue(wrapper.hasClass(cssClasses.DEFAULT_BUTTON)); 
});

test('props.isDefault does not add default className when false', () => {
  const wrapper = shallow(<DialogButton isDefault={false} />);
  assert.isFalse(wrapper.hasClass(cssClasses.DEFAULT_BUTTON)); 
});

test('props.action is rendered as a data-mdc-dialog-action attribute', () => {
  const wrapper = shallow(<DialogButton action="accept"/>);
  assert.equal(wrapper.prop('data-mdc-dialog-action'), 'accept');
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <DialogButton>
      <span>But Why?</span>
    </DialogButton>
  );

  assert.equal(wrapper.find('span').length, 1);
});

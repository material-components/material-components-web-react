import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import NotchedOutline from '../../../packages/notched-outline/index';

suite('NotchedOutline');

test('classNames adds classes', () => {
  const wrapper = shallow(<NotchedOutline className='test-class-name'/>);
  const outlineElement = wrapper.first().first();
  assert.isTrue(outlineElement.hasClass('mdc-notched-outline'));
  assert.isTrue(outlineElement.hasClass('test-class-name'));
});

test('creates outlineElement_', () => {
  const wrapper = mount(<NotchedOutline />);
  assert.exists(wrapper.instance().outlineElement_.current);
});

test('creates pathElement_', () => {
  const wrapper = mount(<NotchedOutline />);
  assert.exists(wrapper.instance().pathElement_.current);
});

test('creates idleElement_', () => {
  const wrapper = mount(<NotchedOutline />);
  assert.exists(wrapper.instance().idleElement_.current);
});

test('initializes foundation', () => {
  const wrapper = shallow(<NotchedOutline />);
  assert.exists(wrapper.instance().foundation_);
});

test('calls #foundation.notch if notch adds the notched class', () => {
  const wrapper = mount(<NotchedOutline notch notchWidth={50} />);
  wrapper.first().first().hasClass('mdc-notched-outline--notched');
});

test('#componentDidUpdate updating notch to true calls #foundation.notch', () => {
  const wrapper = shallow(<NotchedOutline />);
  wrapper.instance().foundation_.notch = td.func();
  wrapper.setProps({notch: true});
  td.verify(wrapper.instance().foundation_.notch(0, false), {times: 1});
});

test('#componentDidUpdate updating notch to false calls ' +
  '#foundation.closeNotch', () => {
  const wrapper = mount(<NotchedOutline notch />);
  wrapper.instance().foundation_.closeNotch = td.func();
  td.when(wrapper.instance().foundation_.adapter_.getIdleOutlineStyleValue)
    .thenReturn('0px');
  wrapper.setProps({notch: false});
  td.verify(wrapper.instance().foundation_.closeNotch(), {times: 1});
});

test('#componentDidUpdate updating notchWidth calls ' +
  '#foundation.notch with correct arguments', () => {
  const wrapper = mount(<NotchedOutline notch />);
  wrapper.instance().foundation_.notch = td.func();
  td.when(wrapper.instance().foundation_.adapter_.getIdleOutlineStyleValue)
    .thenReturn('0px');
  wrapper.setProps({notchWidth: 100});
  td.verify(wrapper.instance().foundation_.notch(100, false), {times: 1});
});

test('#componentDidUpdate updating isRtl calls #foundation.notch', () => {
  const wrapper = mount(<NotchedOutline notch />);
  wrapper.instance().foundation_.notch = td.func();
  td.when(wrapper.instance().foundation_.adapter_.getIdleOutlineStyleValue)
    .thenReturn('0px');
  wrapper.setProps({isRtl: true});
  td.verify(wrapper.instance().foundation_.notch(0, true), {times: 1});
});

test('#componentDidUpdate updating notch to true with and initial ' +
  'notchWidth calls #foundation.notch with correct arguments', () => {
  const wrapper = mount(<NotchedOutline notchWidth={100} />);
  wrapper.instance().foundation_.notch = td.func();
  wrapper.setProps({notch: true});
  td.verify(wrapper.instance().foundation_.notch(100, false), {times: 1});
});

test('#componentDidUpdate shouldn\'t call #foundation notch or closeNotch' +
  'if another prop changes', () => {
  const wrapper = shallow(<NotchedOutline />);
  wrapper.setProps({className: 'test-class-name'});
  wrapper.instance().foundation_.notch = td.func();
  wrapper.instance().foundation_.closeNotch = td.func();
  td.verify(wrapper.instance().foundation_.notch(td.matchers.isA(Number), td.matchers.isA(Boolean)), {times: 0});
  td.verify(wrapper.instance().foundation_.closeNotch(), {times: 0});
});

test('#adapter.getWidth returns width of outlineElement_', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  div.style.width = '150px';
  div.style.height = '50px';
  div.style.position = 'relative';

  const options = {attachTo: div};
  const wrapper = mount(<NotchedOutline />, options);
  const outlineWidth = wrapper.find('.mdc-notched-outline').instance().offsetWidth;
  assert.equal(wrapper.instance().foundation_.adapter_.getWidth(), outlineWidth);
  div.remove();
});

test('#adapter.getHeight returns height of outlineElement_', () => {
  const div = document.createElement('div');
  document.body.append(div);
  div.style.width = '150px';
  div.style.height = '50px';
  div.style.position = 'relative';

  const options = {attachTo: div};
  const wrapper = mount(<NotchedOutline />, options);
  const outlineHeight = wrapper.find('.mdc-notched-outline').instance().offsetHeight;
  assert.equal(wrapper.instance().foundation_.adapter_.getHeight(), outlineHeight);
  div.remove();
});

test('#adapter.addClass adds class to classList', () => {
  const wrapper = shallow(<NotchedOutline />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass adds class to classList', () => {
  const wrapper = shallow(<NotchedOutline />);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.setOutlinePathAttr add attr to pathElement_', () => {
  const wrapper = mount(<NotchedOutline />);
  wrapper.instance().foundation_.adapter_.setOutlinePathAttr('M10 10');
  const path = wrapper.instance().pathElement_.current;
  assert.equal(path.getAttribute('d'), 'M10 10');
});

test('#adapter.getIdleOutlineStyleValue add attr to pathElement_', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(<NotchedOutline />, options);
  wrapper.instance().idleElement_.current.style.borderRadius = '5px';
  const {adapter_} = wrapper.instance().foundation_;

  assert.equal(
    adapter_.getIdleOutlineStyleValue('border-radius'), '5px');
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<NotchedOutline />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

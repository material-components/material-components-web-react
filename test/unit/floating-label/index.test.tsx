import * as React from 'react';
import * as td from 'testdouble';
import {suite, test} from 'mocha';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
// @ts-ignore
import FloatingLabel from '../../../packages/floating-label/index.tsx';

suite('Floating Label');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <FloatingLabel className='test-class-name'>Test</FloatingLabel>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-floating-label'));
});

test('adds text to children', () => {
  const wrapper = shallow(<FloatingLabel>Test</FloatingLabel>);
  assert.equal(wrapper.text(), 'Test');
});

test('creates labelElement', () => {
  const wrapper = mount<FloatingLabel>(<FloatingLabel />);
  assert.exists(wrapper.instance().labelElement.current);
});

test('#initializeFoundation creates foundation', () => {
  const wrapper = shallow<FloatingLabel>(<FloatingLabel />);
  assert.exists(wrapper.instance().foundation_);
});

test('initializing with float to true floats the label', () => {
  const wrapper = shallow(<FloatingLabel float />);
  assert.isTrue(wrapper.hasClass('mdc-floating-label--float-above'));
});

test('calls handleWidthChange with the offhandleWidthChange of the labelElement', () => {
  const handleWidthChange = td.func() as (width: number) => void;
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(
    <FloatingLabel handleWidthChange={handleWidthChange}>Test</FloatingLabel>,
    options
  );
  td.verify(handleWidthChange((wrapper.getDOMNode() as HTMLLabelElement).offsetWidth), {times: 1});
  div.remove();
});

test('#componentDidUpdate updating the children updates width', () => {
  const handleWidthChange = td.func() as (width: number) => void;
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(
    <FloatingLabel handleWidthChange={handleWidthChange}>Test</FloatingLabel>,
    options
  );

  const firstLength = (wrapper.getDOMNode() as HTMLLabelElement).offsetWidth;
  wrapper.setProps({children: 'Test More Text'});
  const secondLength = (wrapper.getDOMNode() as HTMLLabelElement).offsetWidth;
  td.verify(handleWidthChange(firstLength), {times: 1});
  td.verify(handleWidthChange(secondLength), {times: 1});
  div.remove();
});

test('#componentDidUpdate updating float to true floats the label', () => {
  const wrapper = shallow(<FloatingLabel />);
  wrapper.setProps({float: true});
  assert.isTrue(wrapper.hasClass('mdc-floating-label--float-above'));
});
test(
  'initializing float to true, and then updating it to false ' +
    'removes the class',
  () => {
    const wrapper = shallow(<FloatingLabel float />);
    wrapper.setProps({float: false});
    assert.isFalse(wrapper.hasClass('mdc-floating-label--float-above'));
  }
);

test('on animationend should remove the shake class', () => {
  const wrapper = mount(<FloatingLabel />);
  const classList = new Set();
  classList.add('mdc-floating-label--shake');
  wrapper.setState({classList});
  wrapper.simulate('animationEnd');
  assert.isFalse(wrapper.hasClass('mdc-floating-label--shake'));
});

test('#adapter.addClass', () => {
  const wrapper = mount<FloatingLabel>(<FloatingLabel />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass', () => {
  const wrapper = mount<FloatingLabel>(<FloatingLabel />);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<FloatingLabel>(<FloatingLabel />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

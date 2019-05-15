import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow, ReactWrapper} from 'enzyme';
import {
  Radio,
  NativeRadioControl,
  RadioProps,
} from '../../../packages/radio/index';
import {coerceForTesting} from '../helpers/types';
import {MDCRadioFoundation} from '@material/radio';

const NativeControlUpdate: React.FunctionComponent<
  React.HTMLProps<HTMLInputElement>
> = ({disabled, id}) => {
  return (
    <Radio label='meow'>
      <NativeRadioControl disabled={disabled} id={id} />
    </Radio>
  );
};

suite('Radio');

test('renders wrapper mdc-form-field element', () => {
  const wrapper = shallow(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  assert.isTrue(wrapper.hasClass('mdc-form-field'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Radio className='test-class-name'>
      <NativeRadioControl />
    </Radio>
  );
  assert.isTrue(wrapper.childAt(0).hasClass('test-class-name'));
});

test('classNames has mdc-radio class', () => {
  const wrapper = shallow(
    <Radio className='test-class-name'>
      <NativeRadioControl />
    </Radio>
  );
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-radio'));
});

test('classNames adds classes from state.classList', () => {
  const wrapper = shallow(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.childAt(0).hasClass('test-class'));
});

test('renders label if props.label is provided', () => {
  const wrapper = shallow(
    <Radio label='meow'>
      <NativeRadioControl />
    </Radio>
  );
  assert.equal(wrapper.childAt(1).text(), 'meow');
  assert.equal(wrapper.childAt(1).type(), 'label');
});

test('does not render a label if props.label is missing', () => {
  const wrapper = shallow(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  assert.equal(wrapper.children().length, 1);
});

test('initializes foundation', () => {
  const wrapper = shallow<Radio>(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  assert.exists(wrapper.instance().foundation);
});

test('calls foundation.setDisabled if child.props.disabled is true', () => {
  const setDisabled = td.func<(disabled: boolean) => void>();
  const wrapper = mount<Radio>(
    <Radio>
      <NativeRadioControl disabled />
    </Radio>
  );
  wrapper.instance().foundation = {
    init: () => {},
    setDisabled,
  } as MDCRadioFoundation;
  wrapper.instance().componentDidMount();
  td.verify(setDisabled(true), {times: 1});
});

test('sets state.nativeControlId if child has props.id', () => {
  const wrapper = shallow<Radio>(
    <Radio className='test-class-name'>
      <NativeRadioControl id='123' />
    </Radio>
  );
  assert.equal(wrapper.state().nativeControlId, '123');
});

test('calls props.initRipple', () => {
  const initRipple = coerceForTesting<
    (surface: HTMLDivElement, activator?: HTMLInputElement) => void
  >(td.func());
  const wrapper = mount(
    <Radio initRipple={initRipple}>
      <NativeRadioControl />
    </Radio>
  );
  const input = coerceForTesting<HTMLInputElement>(
    wrapper
      .childAt(0)
      .childAt(0)
      .childAt(0)
      .getDOMNode()
  );
  const radio = coerceForTesting<HTMLDivElement>(
    wrapper
      .childAt(0)
      .childAt(0)
      .getDOMNode()
  );
  td.verify(initRipple(radio, input), {times: 1});
});

test('renders label with for attribute tied to native control id', () => {
  const wrapper = shallow<Radio>(
    <Radio label='meow'>
      <NativeRadioControl id='123' />
    </Radio>
  );
  assert.equal(wrapper.childAt(1).props().htmlFor, '123');
});

test('calls foundation.setDisabled if children.props.disabled updates', () => {
  const wrapper = mount(<NativeControlUpdate />);
  coerceForTesting<ReactWrapper<RadioProps, {}, Radio>>(
    wrapper.children()
  ).instance().foundation.setDisabled = td.func<(disabled: boolean) => null>();
  wrapper.setProps({disabled: true});
  td.verify(
    coerceForTesting<ReactWrapper<RadioProps, {}, Radio>>(wrapper.children())
      .instance()
      .foundation.setDisabled(true),
    {times: 1}
  );
});

test('calls foundation.setDisabled if children.props.disabled updates to false', () => {
  const wrapper = mount(<NativeControlUpdate disabled />);
  coerceForTesting<ReactWrapper<RadioProps, {}, Radio>>(
    wrapper.children()
  ).instance().foundation.setDisabled = td.func<(disabled: boolean) => null>();
  wrapper.setProps({disabled: false});
  td.verify(
    coerceForTesting<ReactWrapper<RadioProps, {}, Radio>>(wrapper.children())
      .instance()
      .foundation.setDisabled(false),
    {times: 1}
  );
});

test('updates state.nativeControlId if children.props.id updates', () => {
  const wrapper = mount(<NativeControlUpdate />);
  wrapper.setProps({id: '321'});
  assert.equal(
    wrapper
      .find('label')
      .getDOMNode()
      .getAttribute('for'),
    '321'
  );
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow<Radio>(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass removes from state.classList', () => {
  const wrapper = shallow<Radio>(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.state().classList.has('test-class'));
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.setNativeControlDisabled sets state.disabled to true', () => {
  const wrapper = shallow<Radio>(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.instance().adapter.setNativeControlDisabled(true);
  assert.isTrue(wrapper.state().disabled);
});

test('#adapter.setNativeControlDisabled sets state.disabled to false', () => {
  const wrapper = shallow<Radio>(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.instance().adapter.setNativeControlDisabled(false);
  assert.isFalse(wrapper.state().disabled);
});

test('renders nativeControl with updated disabled prop', () => {
  const wrapper = mount(
    <Radio>
      <NativeRadioControl />
    </Radio>
  );
  wrapper.setState({disabled: true});
  assert.isTrue(
    wrapper
      .children()
      .children()
      .childAt(0)
      .props().disabled
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Radio>(
    <Radio label='meow'>
      <NativeRadioControl id='123' />
    </Radio>
  );
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

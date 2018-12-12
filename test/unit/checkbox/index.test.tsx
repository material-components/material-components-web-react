import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import * as td from 'testdouble';
// @ts-ignore
import {Checkbox} from '../../../packages/checkbox/index.tsx';

suite('Checkbox');

test('creates foundation', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  assert.exists(wrapper.instance().foundation_);
});

test('has mdc-checkbox class', () => {
  const wrapper = shallow(<Checkbox />);
  assert.exists(wrapper.find('.mdc-checkbox'));
});

test('renders native control', () => {
  const wrapper = shallow(<Checkbox />);
  assert.exists(wrapper.find('.mdc-checkbox__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Checkbox className="test-class-name" />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has disabled class when props.disabled is true', () => {
  const wrapper = shallow(<Checkbox disabled />);
  assert.isTrue(
    wrapper.find('.mdc-checkbox').hasClass('mdc-checkbox--disabled')
  );
});

test('native control props.disabled is true when props.disabled is true', () => {
  const wrapper = shallow(<Checkbox disabled />);
  const nativeControl = wrapper.childAt(0);
  assert.isTrue(nativeControl.props().disabled);
});

test('native control props.checked is true when props.checked is true', () => {
  const wrapper = shallow(<Checkbox checked />);
  const nativeControl = wrapper.childAt(0);
  assert.isTrue(nativeControl.props().checked);
});

test('#foundation_.handleChange gets called when prop.checked updates', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.instance().foundation_.handleChange = td.func();
  wrapper.setProps({checked: true});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#foundation_.handleChange gets called when prop.indeterminate updates', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.instance().foundation_.handleChange = td.func();
  wrapper.setProps({indeterminate: true});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#foundation_.setDisabled gets called when prop.disabled updates', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.instance().foundation_.setDisabled = td.func();
  wrapper.setProps({disabled: true});
  td.verify(wrapper.instance().foundation_.setDisabled(true), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.isChecked returns state.checked if true', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({checked: true});
  assert.isTrue(wrapper.instance().foundation_.adapter_.isChecked());
});

test('#adapter.isChecked returns state.checked if false', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({checked: false});
  assert.isFalse(wrapper.instance().foundation_.adapter_.isChecked());
});

test('#adapter.isIndeterminate returns state.indeterminate if true', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({indeterminate: true});
  assert.isTrue(wrapper.instance().foundation_.adapter_.isIndeterminate());
});

test('#adapter.isIndeterminate returns state.indeterminate if false', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({indeterminate: false});
  assert.isFalse(wrapper.instance().foundation_.adapter_.isIndeterminate());
});

test('#adapter.setNativeControlAttr sets aria-checked state', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper
    .instance()
    .foundation_.adapter_.setNativeControlAttr('aria-checked', true);
  assert.isTrue(wrapper.state()['aria-checked']);
});

test('#adapter.removeNativeControlAttr sets aria-checked state as false', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  wrapper.setState({'aria-checked': true});
  wrapper
    .instance()
    .foundation_.adapter_.removeNativeControlAttr('aria-checked');
  assert.isFalse(wrapper.state()['aria-checked']);
});

test('passes nativeControlId to NativeControl through props', () => {
  const wrapper = shallow(<Checkbox nativeControlId="test-id" />);
  assert.equal(wrapper.childAt(0).props().id, 'test-id');
});

test('calls foundation.handleChange in native control props.onChange', () => {
  const wrapper = shallow<Checkbox>(<Checkbox />);
  const nativeControl = wrapper.childAt(0);
  const mockEvt = {
    target: {
      checked: true,
      indeterminate: false,
    },
  };
  wrapper.instance().foundation_.handleChange = td.func();
  nativeControl.simulate('change', mockEvt);
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('calls props.onChange in native control props.onChange', () => {
  const onChange = td.func() as (evt: React.ChangeEvent<HTMLInputElement>) => void;
  const wrapper = shallow(<Checkbox onChange={onChange} />);
  const nativeControl = wrapper.childAt(0);
  const mockEvt = ({
    target: ({
      checked: true,
      indeterminate: false,
    } as HTMLInputElement),
  } as React.ChangeEvent<HTMLInputElement>);
  nativeControl.simulate('change', mockEvt);
  td.verify(onChange(mockEvt), {times: 1});
});

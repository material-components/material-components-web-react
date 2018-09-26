import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import Select from '../../../packages/select/index';
import NativeControl from '../../../packages/select/NativeControl';

suite('Select');

test('has mdc-select class', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.hasClass('mdc-select'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Select
    label='my label'
    className='test-class-name'
  />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('creates foundation', () => {
  const wrapper = mount(<Select label='my label' />);
  assert.exists(wrapper.instance().foundation_);
});

test('#foundation_.handleChange gets called when state.value updates', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().foundation_.handleChange = td.func();
  const value = 'value';
  wrapper.setState({value});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Select label='my label' />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('props.outlined will add mdc-select--outlined', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  assert.isTrue(wrapper.hasClass('mdc-select--outlined'));
});

test('props.disabled will add mdc-select--disabled', () => {
  const wrapper = shallow(<Select label='my label' disabled />);
  assert.isTrue(wrapper.hasClass('mdc-select--disabled'));
});

test('props.box will add mdc-select--box', () => {
  const wrapper = shallow(<Select label='my label' box />);
  assert.isTrue(wrapper.hasClass('mdc-select--box'));
});

test('a class in state.classList will be added to the select', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['best-class-name'])});
  assert.isTrue(wrapper.hasClass('best-class-name'));
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.addClass('my-added-class');
  assert.isTrue(wrapper.state().classList.has('my-added-class'));
});

test('#adapter.removeClass removes from state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['my-added-class'])});
  wrapper.instance().adapter.removeClass('my-added-class');
  assert.isFalse(wrapper.state().classList.has('my-added-class'));
});

test('#adapter.hasClass returns true if the string is in state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['my-added-class'])});
  assert.isTrue(wrapper.instance().adapter.hasClass('my-added-class'));
});

test('#adapter.hasClass returns false if the string is not in state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isFalse(wrapper.instance().adapter.hasClass('my-added-class'));
});

test('#adapter.isRtl returns true if props.isRtl is true', () => {
  const wrapper = mount(<Select label='my label' isRtl />);
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRtl());
});

test('#adapter.isRtl returns false if parent is not dir="rtl"', () => {
  const wrapper = mount(<Select label='my label' />);
  assert.isFalse(wrapper.instance().foundation_.adapter_.isRtl());
});

test('adapter.getValue returns state.value', () => {
  const wrapper = shallow(<Select label='my label' />);
  const value = 'value';
  wrapper.setState({value});
  assert.equal(wrapper.instance().adapter.getValue(), value);
});

test('#adapter.floatLabel set state.labelIsFloated', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.hasLabel returns true if label exists', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.instance().adapter.hasLabel());
});

test('#adapter.getLabelWidth returns state.labelWidth', () => {
  const wrapper = shallow(<Select label='my label' />);
  const labelWidth = 59;
  wrapper.setState({labelWidth});
  assert.equal(wrapper.instance().adapter.getLabelWidth(), 59);
});

test('#adapter.activateBottomLine sets state.activeLineRipple to true', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.activateBottomLine();
  assert.isTrue(wrapper.state().activeLineRipple);
});

test('#adapter.deactivateBottomLine sets state.activeLineRipple to false', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({activeLineRipple: false});
  wrapper.instance().adapter.deactivateBottomLine();
  assert.isFalse(wrapper.state().activeLineRipple);
});

test('NativeControl.props.setRippleCenter sets state.lineRippleCenter', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.children().first().props().setRippleCenter(123);
  assert.equal(wrapper.state().lineRippleCenter, 123);
});

test('#adapter.notchOutline sets state.outlineIsNotched to true', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.notchOutline();
  assert.isTrue(wrapper.state().outlineIsNotched);
});

test('#adapter.closeOutline sets state.outlineIsNotched to false', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({outlineIsNotched: true});
  wrapper.instance().adapter.closeOutline();
  assert.isFalse(wrapper.state().outlineIsNotched);
});

test('#adapter.hasOutline returns true if props.outlined is true', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  assert.isTrue(wrapper.instance().adapter.hasOutline());
});

test('#adapter.hasOutline returns false if props.outlined is false', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isFalse(wrapper.instance().adapter.hasOutline());
});

test('renders notchedOutline if props.outlined is true', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  const NotchedOutlinePackage = require('../../../packages/notched-outline');
  assert.equal(wrapper.childAt(2).type(), NotchedOutlinePackage.default);
});

test('renders lineRipple if props.outlined is false', () => {
  const wrapper = shallow(<Select label='my label' />);
  const LineRipplePackage = require('../../../packages/line-ripple');
  assert.equal(wrapper.childAt(2).type(), LineRipplePackage.default);
});

test('renders NativeControl for select', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.equal(wrapper.childAt(0).type(), NativeControl);
});

test('renders FloatingLabel after NativeControl', () => {
  const wrapper = shallow(<Select label='my label' />);
  const FloatingLabelPackage = require('../../../packages/floating-label');
  assert.equal(wrapper.childAt(1).type(), FloatingLabelPackage.default);
});

test('passes classNames to NativeControl through props.nativeControlClassName', () => {
  const className = 'native-class';
  const wrapper = shallow(<Select label='my label' nativeControlClassName={className} />);
  assert.isTrue(wrapper.childAt(0).hasClass(className));
});

test('#NativeControl.onChange will update state.value', () => {
  const wrapper = shallow(<Select label='my label' />);
  const evt = {target: {value: 'orange'}};
  wrapper.childAt(0).props().onChange(evt);
  assert.equal(wrapper.state().value, 'orange');
});

test('#NativeControl.onChange will call this.props.onChange', () => {
  const onChange = td.func();
  const wrapper = shallow(<Select label='my label' onChange={onChange} />);
  const evt = {target: {value: 'orange'}};
  wrapper.childAt(0).props().onChange(evt);
  td.verify(onChange(evt), {times: 1});
});

test('#NativeControl.handleDisabled will update state.disabled', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.childAt(0).props().handleDisabled(true);
  assert.equal(wrapper.state().disabled, true);
});

test('passes foundation to NativeControl', () => {
  const wrapper = mount(<Select label='my label' />);
  const nativeControl = wrapper.childAt(0).childAt(0).props();
  assert.equal(nativeControl.foundation, wrapper.instance().foundation_);
});

test('renders just one option passed as children', () => {
  const options = (
    <option value='grape'>Grape</option>
  );
  const wrapper = shallow(<Select label='my label'>
    {options}
  </Select>);
  assert.equal(wrapper.find('option').length, 1);
});

test('renders options passed as children', () => {
  const options = (<React.Fragment>
    <option value='grape'>Grape</option>
    <option value='raisin'>Raisin</option>
  </React.Fragment>);
  const wrapper = shallow(<Select label='my label'>
    {options}
  </Select>);
  assert.equal(wrapper.find('option').length, 2);
});

test('renders options passed as array of 1 string', () => {
  const wrapper = shallow(<Select label='my label' options={['opt 1']}/>);
  assert.equal(wrapper.find('option[value="opt 1"]').length, 1);
});

test('renders options passed as array of strings', () => {
  const wrapper = shallow(<Select label='my label' options={['opt 1', 'opt 2', 'opt 3']}/>);
  assert.equal(wrapper.find('option').length, 3);
});

test('renders options passed as array of 1 object', () => {
  const wrapper = shallow(<Select label='my label' options={[{label: 'opt 1', value: 'opt-1'}]}/>);
  assert.equal(wrapper.find('option[value="opt-1"]').length, 1);
});

test('renders options passed as array of objects', () => {
  const wrapper = shallow(<Select label='my label' options={[
    {label: 'opt 1', value: 'opt-1'},
    {label: 'opt 2', value: 'opt-2'},
    {label: 'opt 3', value: 'opt-3'},
  ]}/>);
  assert.equal(wrapper.find('option').length, 3);
});

test('renders options as disabled', () => {
  const wrapper = shallow(<Select label='my label' options={[
    {label: 'opt 1', value: 'opt-1', disabled: true},
    {label: 'opt 2', value: 'opt-2'},
    {label: 'opt 3', value: 'opt-3'},
  ]}/>);
  assert.equal(wrapper.find('option[disabled]').length, 1);
});

test('passes classNames to FloatingLabel through props.floatingLabelClassName', () => {
  const className = 'floating-class';
  const wrapper = shallow(<Select label='my label' floatingLabelClassName={className} />);
  assert.isTrue(wrapper.childAt(1).hasClass(className));
});

test('updates float prop with state.labelIsFloated', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({labelIsFloated: true});
  assert.isTrue(wrapper.childAt(1).props().float);
});

test('#floatingLabel.handleWidthChange updates state.labelWidth', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({labelWidth: 60});
  assert.equal(wrapper.state().labelWidth, 60);
});

test('passes classNames to LineRipple through props.lineRippleClassName', () => {
  const className = 'line-ripple-class';
  const wrapper = shallow(<Select label='my label' lineRippleClassName={className} />);
  assert.isTrue(wrapper.childAt(2).hasClass(className));
});

test('updates active prop with state.activeLineRipple', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({activeLineRipple: true});
  assert.isTrue(wrapper.childAt(2).props().active);
});

test('passes classNames to NotchedOutline through props.notchedOutlineClassName', () => {
  const className = 'notched-outline-class';
  const wrapper = shallow(<Select label='my label' outlined notchedOutlineClassName={className} />);
  assert.isTrue(wrapper.childAt(2).hasClass(className));
});

test('updates notch prop with state.outlineIsNotched', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  wrapper.setState({outlineIsNotched: true});
  assert.isTrue(wrapper.childAt(2).props().notch);
});

test('updates notchWidth prop with state.labelWidth', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  wrapper.setState({labelWidth: 55});
  assert.equal(wrapper.childAt(2).props().notchWidth, 55);
});

test('notchedOutline props.isRtl updates with parent element dir attribute', () => {
  const wrapper = mount(<Select label='my label' outlined isRtl />);
  const NotchedOutline = wrapper.childAt(0).childAt(2);
  assert.isTrue(NotchedOutline.props().isRtl);
});

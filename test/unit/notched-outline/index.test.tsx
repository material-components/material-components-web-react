import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import NotchedOutline from '../../../packages/notched-outline/index';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline/foundation';
import {coerceForTesting} from '../helpers/types';

const {cssClasses} = MDCNotchedOutlineFoundation;

const getFoundation = (instance: NotchedOutline) => {
  return coerceForTesting<MDCNotchedOutlineFoundation>(instance.foundation!);
};

const getAdapter = (instance: NotchedOutline) => {
  // @ts-ignore adapter_ property is protection, we need to override it for testing purposes
  return getFoundation(instance).adapter_;
};

const floatingLabel = () => <label className='mdc-floating-label'>test</label>;

suite('NotchedOutline');

test('classNames adds classes', () => {
  const wrapper = shallow(<NotchedOutline className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('mdc-notched-outline'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has no label class if there is no label', () => {
  const wrapper = mount(<NotchedOutline />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-notched-outline'));
  assert.isTrue(wrapper.childAt(0).hasClass(cssClasses.NO_LABEL));
});

test('has upgraded class if label is present', () => {
  const wrapper = mount(<NotchedOutline>{floatingLabel()}</NotchedOutline>);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-notched-outline'));
  assert.isTrue(wrapper.childAt(0).hasClass(cssClasses.OUTLINE_UPGRADED));
});

test('label should not have any style transitionDuration', () => {
  const wrapper = mount(<NotchedOutline>{floatingLabel()}</NotchedOutline>);
  const floatingLabelElement = wrapper.find('.mdc-floating-label');
  assert.notExists(floatingLabelElement.props().style);
});

test('should call foundation.notch if props.notchWidth changes and props.notch is true', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline notch />);
  getFoundation(wrapper.instance()).notch = td.func<() => void>();
  wrapper.setProps({notchWidth: 50});
  td.verify(getFoundation(wrapper.instance()).notch(50), {times: 1});
});

test('should not call foundation.notch if props.notchWidth changes and props.notch is false', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getFoundation(wrapper.instance()).notch = td.func<() => void>();
  wrapper.setProps({notchWidth: 50});
  td.verify(getFoundation(wrapper.instance()).notch(50), {times: 0});
});

test('should call foundation.closeNotch if props.notchWidth changes and props.notch is false', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getFoundation(wrapper.instance()).closeNotch = td.func<() => void>();
  wrapper.setProps({notchWidth: 50});
  td.verify(getFoundation(wrapper.instance()).closeNotch(), {times: 1});
});

test('should not call foundation.closeNotch if props.notchWidth changes and props.notch is true', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline notch />);
  getFoundation(wrapper.instance()).closeNotch = td.func<() => void>();
  wrapper.setProps({notchWidth: 50});
  td.verify(getFoundation(wrapper.instance()).closeNotch(), {times: 0});
});

test('should call foundation.notch if props.notch changes from false to true', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline notchWidth={50} />);
  getFoundation(wrapper.instance()).notch = td.func<() => void>();
  wrapper.setProps({notch: true});
  td.verify(getFoundation(wrapper.instance()).notch(50), {times: 1});
});

test('should call foundation.closeNotch if props.notch changes from true to false', () => {
  const wrapper = shallow<NotchedOutline>(
    <NotchedOutline notch notchWidth={50} />
  );
  getFoundation(wrapper.instance()).closeNotch = td.func<() => void>();
  wrapper.setProps({notch: false});
  td.verify(getFoundation(wrapper.instance()).closeNotch(), {times: 1});
});

test('#adapter.addClass should update state.classList', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getAdapter(wrapper.instance()).addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass should update state.classList', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  getAdapter(wrapper.instance()).removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.setNotchWidthProperty should update state.foundationNotchWidth', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getAdapter(wrapper.instance()).setNotchWidthProperty(10);
  assert.equal(wrapper.state().foundationNotchWidth, 10);
});

test('#adapter.removeNotchWidthProperty should update state.foundationNotchWidth to null', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getAdapter(wrapper.instance()).removeNotchWidthProperty();
  assert.equal(wrapper.state().foundationNotchWidth, null);
});

test('renders __notch element if children exist', () => {
  const wrapper = shallow<NotchedOutline>(
    <NotchedOutline>{floatingLabel()}</NotchedOutline>
  );
  assert.equal(wrapper.find('.mdc-notched-outline__notch').length, 1);
});

test('does not render __notch element if children do not exist', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  assert.equal(wrapper.find('.mdc-notched-outline__notch').length, 0);
});

test('renders style.width on __notch element if state.foundationNotchWidth is set', () => {
  const wrapper = shallow<NotchedOutline>(
    <NotchedOutline>{floatingLabel()}</NotchedOutline>
  );
  wrapper.setState({foundationNotchWidth: 10});
  assert.equal(
    wrapper.find('.mdc-notched-outline__notch').props().style!.width,
    '10px'
  );
});

test('does not render style.width on __notch element if state.foundationNotchWidth is not set', () => {
  const wrapper = shallow<NotchedOutline>(
    <NotchedOutline>{floatingLabel()}</NotchedOutline>
  );
  assert.equal(
    wrapper.find('.mdc-notched-outline__notch').props().style!.width,
    undefined
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  const foundation = getFoundation(wrapper.instance());
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

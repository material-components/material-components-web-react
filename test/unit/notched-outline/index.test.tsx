import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {mount, shallow} from 'enzyme';
import NotchedOutline from '../../../packages/notched-outline/index';
import {MDCNotchedOutlineAdapter} from '@material/notched-outline/adapter';

suite('NotchedOutline');

function getAdapter(foundation: any): MDCNotchedOutlineAdapter {
  // @ts-ignore
  return foundation.adapter_;
}

test('classNames adds classes', () => {
  const wrapper = shallow(<NotchedOutline className='test-class-name' />);
  assert.isTrue(wrapper.children().first().hasClass('mdc-notched-outline'));
  assert.isTrue(wrapper.children().first().hasClass('test-class-name'));
});

test('creates outlineElement_', () => {
  const wrapper = mount<NotchedOutline>(<NotchedOutline />);
  assert.exists(wrapper.instance().outlineElement_.current);
});

test('creates pathElement_', () => {
  const wrapper = mount<NotchedOutline>(<NotchedOutline />);
  assert.exists(wrapper.instance().pathElement_.current);
});

test('creates idleElement_', () => {
  const wrapper = mount<NotchedOutline>(<NotchedOutline />);
  assert.exists(wrapper.instance().idleElement_.current);
});

test('initializes foundation', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  assert.exists(wrapper.instance().foundation_);
});

test('calls #foundation.notch if notch adds the notched class', () => {
  const wrapper = mount(<NotchedOutline notch notchWidth={50} />);
  wrapper
    .first()
    .first()
    .hasClass('mdc-notched-outline--notched');
});

test('#componentDidUpdate updating notch to true calls #foundation.notch', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  wrapper.instance().foundation_.notch = td.func<(notchWidth: number) => void>();
  wrapper.setProps({notch: true});
  td.verify(wrapper.instance().foundation_.notch(0), {times: 1});
});

test(
  '#componentDidUpdate updating notch to false calls ' +
    '#foundation.closeNotch',
  () => {
    const wrapper = mount<NotchedOutline>(<NotchedOutline notch />);
    wrapper.instance().foundation_.closeNotch = td.func<() => void>();
    wrapper.setProps({notch: false});
    td.verify(wrapper.instance().foundation_.closeNotch(), {times: 1});
  }
);

test(
  '#componentDidUpdate updating notchWidth calls ' +
    '#foundation.notch with correct arguments',
  () => {
    const wrapper = mount<NotchedOutline>(<NotchedOutline notch />);
    wrapper.instance().foundation_.notch = td.func<(notchWidth: number) => void>();
    wrapper.setProps({notchWidth: 100});
    td.verify(wrapper.instance().foundation_.notch(100), {times: 1});
  }
);

test('#componentDidUpdate updating isRtl calls #foundation.notch', () => {
  const wrapper = mount<NotchedOutline>(<NotchedOutline notch />);
  wrapper.instance().foundation_.notch = td.func<(notchWidth: number) => void>();
  wrapper.setProps({isRtl: true});
  td.verify(wrapper.instance().foundation_.notch(0), {times: 1});
});
test(
  '#componentDidUpdate updating notch to true with and initial ' +
    'notchWidth calls #foundation.notch with correct arguments',
  () => {
    const wrapper = mount<NotchedOutline>(<NotchedOutline notchWidth={100} />);
    wrapper.instance().foundation_.notch = td.func<(notchWidth: number) => void>();
    wrapper.setProps({notch: true});
    td.verify(wrapper.instance().foundation_.notch(100), {times: 1});
  }
);
test(
  '#componentDidUpdate shouldn\'t call #foundation notch or closeNotch' +
    'if another prop changes',
  () => {
    const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
    wrapper.setProps({className: 'test-class-name'});
    wrapper.instance().foundation_.notch = td.func<(notchWidth: number) => void>();
    wrapper.instance().foundation_.closeNotch = td.func<() => void>();
    td.verify(
      wrapper
        .instance()
        .foundation_.notch(td.matchers.isA(Number)),
      {times: 0}
    );
    td.verify(wrapper.instance().foundation_.closeNotch(), {times: 0});
  }
);

test('#adapter.addClass adds class to classList', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  getAdapter(wrapper.instance().foundation_).addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass adds class to classList', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  getAdapter(wrapper.instance().foundation_).removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<NotchedOutline>(<NotchedOutline />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

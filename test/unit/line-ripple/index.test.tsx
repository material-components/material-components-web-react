import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import LineRipple from '../../../packages/line-ripple/index';
import {MDCLineRippleAdapter} from '@material/line-ripple/adapter';
import {coerceForTesting} from '../helpers/types';

suite('LineRipple');

function getAdapter(instance: LineRipple): MDCLineRippleAdapter {
  // @ts-ignore adapter_ property is protected, we need to bypass this check for testing purposes
  return instance.foundation_.adapter_;
}

test('classNames adds classes', () => {
  const wrapper = shallow(<LineRipple className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-line-ripple'));
});

test('retains both state and props styles', () => {
  const wrapper = shallow(<LineRipple />);
  wrapper.setProps({style: {color: 'orange'}});
  wrapper.setState({style: {background: 'red'}});
  assert.deepEqual(wrapper.props().style, {
    background: 'red',
    color: 'orange',
  });
});

test('creates foundation', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentDidMount calls activates line ripple if active is true', () => {
  const wrapper = shallow(<LineRipple active />);
  assert.isTrue(wrapper.hasClass('mdc-line-ripple--active'));
});

test(
  '#componentDidUpdate #foundation activate & deactivate ' +
    'are called when active updates',
  () => {
    const wrapper = shallow<LineRipple>(<LineRipple />);
    wrapper.instance().foundation_.activate = td.func<() => void>();
    wrapper.instance().foundation_.deactivate = td.func<() => void>();
    wrapper.setProps({active: true});
    td.verify(wrapper.instance().foundation_.activate(), {times: 1});
    td.verify(wrapper.instance().foundation_.deactivate(), {times: 0});
    wrapper.setProps({active: false});
    td.verify(wrapper.instance().foundation_.activate(), {times: 1});
    td.verify(wrapper.instance().foundation_.deactivate(), {times: 1});
  }
);

test(
  '#componentDidUpdate when rippleCenter updates it calls ' +
    '#foundation.setRippleCenter',
  () => {
    const wrapper = shallow<LineRipple>(<LineRipple />);
    wrapper.instance().foundation_.setRippleCenter = td.func<
      (xCoordinate: number) => null
    >();
    wrapper.setProps({rippleCenter: 10});
    td.verify(wrapper.instance().foundation_.setRippleCenter(10), {times: 1});
  }
);

test('does not call #foundation.setRippleCenter when props.rippleCenter is NaN', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  wrapper.instance().foundation_.setRippleCenter = td.func<
    (xCoordinate: number) => null
  >();
  wrapper.setProps({rippleCenter: NaN});
  td.verify(
    wrapper.instance().foundation_.setRippleCenter(td.matchers.anything()),
    {times: 0}
  );
});

test('#adapter.addClass updates state.classList', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  getAdapter(wrapper.instance()).addClass('test-color-class');
  assert.isTrue(wrapper.state().classList.has('test-color-class'));
});

test('#adapter.removeClass updates state.classList', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  const classList = new Set<string>();
  classList.add('test-color-class');
  wrapper.setState({classList});
  getAdapter(wrapper.instance()).removeClass('test-color-class');
  assert.isFalse(wrapper.state().classList.has('test-color-class'));
});

test('#adapter.hasClass returns true if exists in classList', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  const classList = new Set<string>();
  classList.add('test-color-class');
  wrapper.setState({classList});
  const hasClass = getAdapter(wrapper.instance()).hasClass('test-color-class');
  assert.isTrue(hasClass);
});

test('#adapter.setStyle updates style', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  getAdapter(wrapper.instance()).setStyle('color', 'blue');
  const style = coerceForTesting<React.CSSProperties>(wrapper.state().style);
  assert.equal(style.color, 'blue');
});

test('onTransitionEnd calls the #foundation.handleTransitionEnd', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  wrapper.instance().foundation_.handleTransitionEnd = td.func<
    (env: TransitionEvent) => null
  >();
  const event: React.TransitionEvent = coerceForTesting<React.TransitionEvent>({
    nativeEvent: {
      test: '123',
    },
  });
  wrapper.simulate('transitionEnd', event);
  td.verify(
    wrapper.instance().foundation_.handleTransitionEnd(event.nativeEvent),
    {
      times: 1,
    }
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('#adapter.setStyle updates style names to camel case', () => {
  const wrapper = shallow<LineRipple>(<LineRipple />);
  getAdapter(wrapper.instance()).setStyle('transform-origin', '25');
  const style = coerceForTesting<React.CSSProperties>(wrapper.state().style);
  assert.equal(style.transformOrigin, 25);
  // @ts-ignore
  assert.equal(style['transform-origin'], undefined);
});

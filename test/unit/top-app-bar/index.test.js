import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import TopAppBar from '../../../packages/top-app-bar';

suite('TopAppBar');

test('classNames adds classes', () => {
  const wrapper = shallow(<TopAppBar className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});

test('has correct standard class', () => {
  const wrapper = shallow(<TopAppBar />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});

test('has correct standard class', () => {
  const wrapper = shallow(<TopAppBar />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});

test('has correct alwaysCollapsed class', () => {
  const wrapper = shallow(<TopAppBar alwaysCollapsed />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
});

test('has correct short class', () => {
  const wrapper = shallow(<TopAppBar short />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short'));
  assert.isFalse(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
});

test('has correct prominent class', () => {
  const wrapper = shallow(<TopAppBar prominent />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--prominent'));
});

test('has correct prominent class', () => {
  const wrapper = shallow(<TopAppBar prominent />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--prominent'));
});

test('navIcon is rendered', () => {
  const navIcon = <div className='test-top-app-bar-nav-icon'></div>;
  const wrapper = shallow(
    <TopAppBar
      navIcon={navIcon} />
  );
  assert.isTrue(wrapper.contains(navIcon));
});

test('actionItems are rendered', () => {
  const actionItem = <a href="#" className='test-action-icon-1'></a>;
  const wrapper = shallow(
    <TopAppBar
      actionItems={[actionItem]} />
  );
  assert.isTrue(wrapper.contains(actionItem));
});

test('#adapter.addClass adds a class to state', () => {
  const wrapper = shallow(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.removeClass removes classes from list', () => {
  const wrapper = shallow(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
  wrapper.instance().adapter.removeClass('test-class-1');
  assert.isFalse(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.hasClass returns true for an added className', () => {
  const wrapper = shallow(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-1'));
});

test('#adapter.registerScrollHandler triggers handler on window scroll', () => {
  const wrapper = shallow(<TopAppBar />);
  const testHandler = td.func();
  wrapper.instance().adapter.registerScrollHandler(testHandler);
  const event = new Event('scroll');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});

test('#adapter.deregisterScrollHandler does not trigger handler ' +
  'after registering scroll handler', () => {
  const wrapper = shallow(<TopAppBar />);
  const testHandler = td.func();
  wrapper.instance().adapter.registerScrollHandler(testHandler);
  const event = new Event('scroll');
  wrapper.instance().adapter.deregisterScrollHandler(testHandler);
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 0});
});

test('#adapter.getTotalActionItems returns true with one actionItem ' +
  'passed', () => {
  const wrapper = shallow(
    <TopAppBar actionItems={[<a key='1'>actionItem</a>]}/>
  );
  assert.isTrue(wrapper.instance().adapter.getTotalActionItems());
});

test('#adapter.getTotalActionItems returns false with no actionItem ' +
  'passed', () => {
  const wrapper = shallow(<TopAppBar />);
  assert.isFalse(wrapper.instance().adapter.getTotalActionItems());
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TopAppBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import TopAppBar from '../../../packages/top-app-bar';
// import {
//   MDCTopAppBarFoundation, MDCShortTopAppBarFoundation,
// } from '@material/top-app-bar';

suite('TopAppBar');

// test('short variant is instanceof correct foundation', () => {
//   const wrapper = shallow(<TopAppBar short/>);
//   assert.isTrue(
//     wrapper.instance().foundation_ instanceof MDCShortTopAppBarFoundation);
// });
//
// test('standard variant is instanceof base foundation', () => {
//   const wrapper = shallow(<TopAppBar />);
//   assert.isTrue(
//    wrapper.instance().foundation_ instanceof MDCTopAppBarFoundation);
// });
//

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

test('#adapter.addClass is called when there are action items and is ' +
  'short', () => {
  const actionItem
    = <a href="#" className='test-action-icon-1'></a>;
  const wrapper = shallow(
    <TopAppBar
      short
      actionItems={[actionItem]} />
  );
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short-has-action-item'));
});

// test('#adapter.removeClass is called when is short and the page ' +
//   'scrolls up', () => {
//   const wrapper = shallow(<TopAppBar short />);
//   td.when(wrapper.instance().adapter.getViewportScrollY()).thenReturn(100);
//   window.dispatchEvent(new Event('scroll'));
//   assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
//   td.when(wrapper.instance().adapter.getViewportScrollY()).thenReturn(0);
//   window.dispatchEvent(new Event('scroll'));
//   assert.isFalse(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
// });

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TopAppBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

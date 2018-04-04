import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import TopAppBar from '../../../packages/top-app-bar';
import {cssClasses} from '../../../packages/top-app-bar/constants';
import asNavIcon from '../../../packages/top-app-bar/asNavIcon';
import asActionItem from '../../../packages/top-app-bar/asActionItem';

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

test('has correct shortCollapsed class', () => {
  const wrapper = shallow(<TopAppBar shortCollapsed />);
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

test('navIcon is rendered with navigation icon class', () => {
  const navIcon = <div className='test-top-app-bar-nav-icon'></div>;
  const wrapper = shallow(
    <TopAppBar
      navIcon={navIcon} />
  );
  assert.isTrue(wrapper.find('.test-top-app-bar-nav-icon').hasClass(cssClasses.NAV_ICON));
});

test('navIcon is rendered as custom component with the HOC asNavIcon', () => {
  class CustomNavIcon extends React.Component {
    render() {
      const {className} = this.props; // eslint-disable-line react/prop-types
      return <div className={`${className} test-top-app-bar-nav-icon`}></div>;
    }
  }
  const NavIcon = asNavIcon(CustomNavIcon);
  const wrapper = shallow(
    <TopAppBar
      navIcon={<NavIcon />} />
  );
  const navIcon = wrapper.find(NavIcon);
  assert.equal(navIcon.length, 1);
});

test('actionItems are rendered with action item class', () => {
  const actionItem = <a href="#" className='test-action-icon-1'></a>;
  const wrapper = shallow(
    <TopAppBar
      actionItems={[actionItem]} />
  );
  assert.isTrue(wrapper.find('.test-action-icon-1').hasClass(cssClasses.ACTION_ITEM));
});

test('actionItems are rendered with the HOC asActionItem', () => {
  const CustomActionItem = <a href="#" className='test-action-icon-1'></a>;
  const ActionItem = asActionItem(CustomActionItem);
  const wrapper = shallow(
    <TopAppBar
      actionItems={[<ActionItem key='1' />]} />
  );
  const actionItem = wrapper.find(ActionItem);
  assert.equal(actionItem.length, 1);
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

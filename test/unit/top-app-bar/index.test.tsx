import * as React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import * as td from 'testdouble';
import TopAppBar from '../../../packages/top-app-bar/index';
import {withRipple, InjectedProps} from '../../../packages/ripple/index';
import {coerceForTesting} from '../helpers/types';

suite('TopAppBar');

interface RippleProps<T> extends InjectedProps<T> {
  hasRipple?: boolean;
  className: string;
}

type DivRippleProps = RippleProps<HTMLDivElement> & React.HTMLProps<HTMLDivElement>;
type ActionItemRippleProps = RippleProps<HTMLAnchorElement> & React.HTMLProps<HTMLAnchorElement>;

// TODO: Replace with real tsx ripple props. Fix with #528
// @ts-ignore
const NavigationIcon: React.FunctionComponent<DivRippleProps> = ({
  /* eslint-disable react/prop-types */
  initRipple,
  hasRipple,
  unbounded,
  className,
  /* eslint-enable react/prop-types */
  ...otherProps
}) => (
  <div
    ref={initRipple}
    className={`${className} test-top-app-bar-nav-icon`}
    {...otherProps}
  />
);

const RippledNavigationIcon = withRipple<RippleProps<HTMLDivElement>, HTMLDivElement>(NavigationIcon);

const ActionItem: React.FunctionComponent<ActionItemRippleProps> = ({
  /* eslint-disable react/prop-types */
  initRipple,
  hasRipple,
  unbounded,
  className,
  ref,
  /* eslint-enable react/prop-types */
  ...otherProps
}) => (
  <a
    href='#'
    ref={initRipple}
    className={`${className} test-action-icon-1`}
    {...otherProps}
  />
);

const RippledActionItem = withRipple<RippleProps<HTMLAnchorElement>, HTMLAnchorElement>(ActionItem);

test('classNames adds classes', () => {
  const wrapper = shallow(<TopAppBar className='test-class-name' />);
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

test('has correct fixed class', () => {
  const wrapper = shallow(<TopAppBar fixed />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--fixed'));
});

test('has correct dense class', () => {
  const wrapper = shallow(<TopAppBar dense />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--dense'));
});

test('has correct prominent dense class', () => {
  const wrapper = shallow(<TopAppBar prominent dense />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--dense'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--prominent'));
});

test('navigationIcon is rendered with navigation icon class', () => {
  const wrapper = mount(
    <TopAppBar navigationIcon={<RippledNavigationIcon />} />
  );
  assert.isTrue(
    wrapper
      .find('.test-top-app-bar-nav-icon')
      .hasClass('mdc-top-app-bar__navigation-icon')
  );
});

test('navigationIcon is rendered as custom component that accepts a className prop', () => {
  const wrapper = mount(
    <TopAppBar navigationIcon={<RippledNavigationIcon />} />
  );
  const navigationIcon = wrapper.find(RippledNavigationIcon);
  assert.isTrue(navigationIcon.hasClass('mdc-top-app-bar__navigation-icon'));
});

test('actionItems are rendered with action item class', () => {
  const wrapper = mount(
    <TopAppBar actionItems={[<RippledActionItem key='1' />]} />
  );
  assert.isTrue(
    wrapper.find('.test-action-icon-1').hasClass('mdc-top-app-bar__action-item')
  );
});

test('actionItems are rendered as a custom component that accepts a className prop', () => {
  const wrapper = mount(
    <TopAppBar actionItems={[<RippledActionItem key='1' />]} />
  );
  const actionItem = wrapper.find(RippledActionItem);
  assert.isTrue(actionItem.hasClass('mdc-top-app-bar__action-item'));
});

test('top app bar style should be set by state', () => {
  const wrapper = mount(<TopAppBar />);
  wrapper.setState({style: {color: 'blue'}});
  assert.equal(coerceForTesting<HTMLElement>(wrapper.getDOMNode()).style.color, 'blue');
});

test('#adapter.addClass adds a class to state', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.removeClass removes classes from list', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
  wrapper.instance().adapter.removeClass('test-class-1');
  assert.isFalse(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.hasClass returns true for an added className', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-1'));
});

test('#adapter.registerScrollHandler triggers handler on window scroll', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const testHandler = coerceForTesting<EventListener>(td.func());
  wrapper.instance().adapter.registerScrollHandler(testHandler);
  const event = new Event('scroll');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});
test(
  '#adapter.deregisterScrollHandler does not trigger handler ' +
    'after registering scroll handler',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    const testHandler = coerceForTesting<EventListener>(td.func());
    wrapper.instance().adapter.registerScrollHandler(testHandler);
    const event = new Event('scroll');
    wrapper.instance().adapter.deregisterScrollHandler(testHandler);
    window.dispatchEvent(event);
    td.verify(testHandler(event), {times: 0});
  }
);
test(
  '#adapter.getTotalActionItems returns true with one actionItem ' + 'passed',
  () => {
    const wrapper = shallow<TopAppBar>(
      <TopAppBar actionItems={[<RippledActionItem key='1' />]} />
    );
    assert.isTrue(wrapper.instance().adapter.getTotalActionItems());
  }
);
test(
  '#adapter.getTotalActionItems returns false with no actionItem ' + 'passed',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    assert.isFalse(wrapper.instance().adapter.getTotalActionItems());
  }
);

test('#adapter.setStyle should update state', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.setStyle('display', 'block');
  assert.equal(wrapper.state().style.display, 'block');
});

test('#adapter.getTopAppBarHeight should return clientHeight', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<TopAppBar>(<TopAppBar title='Hi' />, options);
  const topAppBarHeight = wrapper.instance().adapter.getTopAppBarHeight();
  // 18 is the rendered height in pixels. It won't have the actual
  // top app bar height since the css is not applied. 18 is the height
  // of the title element.
  assert.equal(topAppBarHeight, 18);
  div.remove();
});

test('when changes from short to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true, short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true, short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to standard the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to prominent the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: false, prominent: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to shortCollpased the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to prominent the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, prominent: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to short the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, short: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to shortCollpased the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to standard the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to short the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to shortCollapsed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test(
  'when changes from standard to prominent the foundation does not ' + 'change',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    const originalFoundation = wrapper.instance().foundation;
    wrapper.setProps({prominent: true});
    assert.equal(wrapper.instance().foundation, originalFoundation);
    assert.exists(wrapper.instance().foundation);
  }
);

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('have remaining props', () => {
  const wrapper = shallow(
    <TopAppBar id='identifier' className='classes' data='secret' />
  );
  const props = wrapper.props();
  assert.isTrue(
    props.id === 'identifier' &&
      props.data === 'secret' &&
      wrapper.hasClass('classes')
  );
});

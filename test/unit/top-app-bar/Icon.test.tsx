import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {TopAppBarIcon} from '../../../packages/top-app-bar/index';
import MaterialIcon from '../../../packages/material-icon/index';
import {cssClasses} from '../../../packages/top-app-bar/constants';
import {withRipple, InjectedProps} from '../../../packages/ripple/index';

suite('TopAppBarIcon');

interface RippleProps<T> extends InjectedProps<T> {
  hasRipple?: boolean;
  className: string;
}

type DivRippleProps = RippleProps<HTMLDivElement> &
  React.HTMLProps<HTMLDivElement>;
type ActionItemRippleProps = RippleProps<HTMLAnchorElement> &
  React.HTMLProps<HTMLAnchorElement>;
type SVGRippleProps = RippleProps<SVGSVGElement> &
  React.HTMLProps<SVGSVGElement>;

const NavigationIcon: React.FunctionComponent<DivRippleProps> = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  initRipple,
  hasRipple,
  unbounded,
  className,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...otherProps
}) => (
  <div
    ref={initRipple}
    className={`${className} test-top-app-bar-nav-icon`}
    {...otherProps}
  />
);

const RippledNavigationIcon = withRipple<
  RippleProps<HTMLDivElement>,
  HTMLDivElement
>(NavigationIcon);

const ActionItem: React.FunctionComponent<ActionItemRippleProps> = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  initRipple,
  hasRipple,
  unbounded,
  className,
  ref,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...otherProps
}) => (
  <a
    href='#'
    ref={initRipple}
    className={`${className} test-action-icon-1`}
    {...otherProps}
  />
);

const RippledActionItem = withRipple<
  RippleProps<HTMLAnchorElement>,
  HTMLAnchorElement
>(ActionItem);

const SVGNavigationIcon: React.FunctionComponent<SVGRippleProps> = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  hasRipple,
  initRipple,
  unbounded,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...otherProps
}) => (
  <svg
    onClick={() => console.log('navigation icon click')}
    ref={initRipple}
    {...otherProps}
    width='24px'
    height='24px'
    xmlns='http://www.w3.org/2000/svg'
    className='material-icons'
    viewBox='0 0 24 24'
    fill='#fff'
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path
      d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11
    11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3 12c0-2.13.76-4.08
    2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12
    14.53L8.24 7h7.53L12 14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64
    2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
    4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
    />
  </svg>
);

const RippledSVGNavigationIcon = withRipple<
  RippleProps<SVGSVGElement>,
  SVGSVGElement
>(SVGNavigationIcon);

test('props.actionItem add actionItem class', () => {
  const wrapper = shallow(
    <TopAppBarIcon actionItem>
      <MaterialIcon icon='favorite' />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.ACTION_ITEM));
});

test('actionItem can be rendered as a custom component', () => {
  const wrapper = shallow(
    <TopAppBarIcon actionItem>
      <RippledActionItem />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.ACTION_ITEM));
});

test('props.navIcon add navIcon class', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon>
      <MaterialIcon icon='menu' />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('navIcon can be rendered as a custom component', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon>
      <RippledNavigationIcon />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('navIcon can be rendered as a custom SVG component', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon>
      <RippledSVGNavigationIcon />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('props.className adds classes', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon className='test-class'>
      <MaterialIcon icon='menu' />
    </TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('children are added correctly', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon>
      <i className='material-icons'>menu</i>
    </TopAppBarIcon>
  );

  assert.equal(wrapper.find('i').length, 1);
});

import * as React from 'react';
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

type DivRippleProps = RippleProps<HTMLDivElement> & React.HTMLProps<HTMLDivElement>;
type ActionItemRippleProps = RippleProps<HTMLAnchorElement> & React.HTMLProps<HTMLAnchorElement>;

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

test('props.actionItem add actionItem class', () => {
  const wrapper = shallow(
    <TopAppBarIcon actionItem><MaterialIcon icon='favorite' /></TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.ACTION_ITEM));
});

test('actionItem can be rednered as a custom component', () => {
  const wrapper = shallow(
    <TopAppBarIcon actionItem><RippledActionItem/></TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.ACTION_ITEM));
});

test('props.navIcon add navIcon class', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon><MaterialIcon icon='menu' /></TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('navIcon can be rednered as a custom component', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon><RippledNavigationIcon/></TopAppBarIcon>
  );
  assert.isTrue(wrapper.hasClass(cssClasses.NAV_ICON));
});

test('props.className adds classes', () => {
  const wrapper = shallow(
    <TopAppBarIcon navIcon className='test-class'>
      <MaterialIcon icon='menu' />
    </TopAppBarIcon>);
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


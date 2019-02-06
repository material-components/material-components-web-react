import * as React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import * as td from 'testdouble';
import {Chip} from '../../../packages/chips/Chip';
import ChipCheckmark from '../../../packages/chips/ChipCheckmark';
import {coerceForTesting} from '../helpers/types';

suite('Chip');

test('creates foundation', () => {
  const wrapper = mount<Chip>(<Chip id='1' />);
  assert.exists(wrapper.instance().foundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Chip>(<Chip id='2' />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('calls setSelected if props.selected is true (#foundation.setSelected)', () => {
  const wrapper = mount<Chip>(
    <Chip id='1' selected>
      Hello world
    </Chip>
  );
  assert.isTrue(wrapper.state().classList.has('mdc-chip--selected'));
});


test('renders a Chip with foundation.shouldRemoveOnTrailingIconClick set to true', () => {
  const wrapper = shallow<Chip>(<Chip id='3' />);
  assert.isTrue(wrapper.instance().foundation.getShouldRemoveOnTrailingIconClick());
});

test('#componentDidMount sets #foundation.shouldRemoveOnTrailingIconClick to false if prop false', () => {
  const wrapper = shallow<Chip>(<Chip id='4' shouldRemoveOnTrailingIconClick={false} />);
  assert.isFalse(wrapper.instance().foundation.getShouldRemoveOnTrailingIconClick());
});

test('when props.shouldRemoveOnTrailingIconClick updates to false, ' +
  ' #foundation.setShouldRemoveOnTrailingIconClick is called ', () => {
  const wrapper = shallow<Chip>(<Chip id='5' shouldRemoveOnTrailingIconClick />);
  assert.isTrue(wrapper.instance().foundation.getShouldRemoveOnTrailingIconClick());
  wrapper.instance().foundation.setShouldRemoveOnTrailingIconClick = td.func();
  wrapper.setProps({shouldRemoveOnTrailingIconClick: false});
  td.verify(wrapper.instance().foundation.setShouldRemoveOnTrailingIconClick(false), {times: 1});
});


test('when props.shouldRemoveOnTrailingIconClick updates to true, ' +
  ' #foundation.setShouldRemoveOnTrailingIconClick is called ', () => {
  const wrapper = shallow<Chip>(<Chip id='6' shouldRemoveOnTrailingIconClick={false} />);
  assert.isFalse(wrapper.instance().foundation.getShouldRemoveOnTrailingIconClick());
  wrapper.instance().foundation.setShouldRemoveOnTrailingIconClick = td.func();
  wrapper.setProps({shouldRemoveOnTrailingIconClick: true});
  td.verify(wrapper.instance().foundation.setShouldRemoveOnTrailingIconClick(true), {times: 1});
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Chip id='1' className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('classNames adds classes from state.classList', () => {
  const wrapper = shallow(<Chip id='1' />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow<Chip>(<Chip id='1' />);
  wrapper.instance().adapter.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<Chip>(<Chip id='1' />);
  const classList = new Set(['test-class-name']);
  wrapper.setState({classList});
  wrapper.instance().adapter.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass returns true if component contains class', () => {
  const wrapper = shallow<Chip>(<Chip id='1' className='test-class-name' />);
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.eventTargetHasClass returns true if element contains class', () => {
  const wrapper = shallow<Chip>(<Chip id='1' />);
  const target = document.createElement('div');
  target.classList.add('test-class-name');
  assert.isTrue(
    wrapper.instance().adapter.eventTargetHasClass(target, 'test-class-name')
  );
});

test('#adapter.getComputedStyleValue should get styles from chip element', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<Chip>(<Chip id='1' />, options);
  const width = '10px';
  const chipElement = coerceForTesting<HTMLDivElement>(wrapper.find('.mdc-chip').getDOMNode());
  chipElement.style.setProperty('width', width);
  assert.equal(
    wrapper.instance().adapter.getComputedStyleValue('width'),
    width
  );
  div.remove();
});

test('#adapter.setStyleProperty should add styles to chip', () => {
  const wrapper = mount<Chip>(<Chip id='1' />);
  const width = '10px';
  wrapper.instance().adapter.setStyleProperty('width', width);
  const chipElement = coerceForTesting<HTMLDivElement>(wrapper.find('.mdc-chip').getDOMNode());
  assert.equal(chipElement.style.width, width);
});

test('#adapter.addClassToLeadingIcon adds to state.leadingIconClassList', () => {
  const wrapper = shallow<Chip>(<Chip id='123' />);
  wrapper
    .instance()
    .foundation.adapter_.addClassToLeadingIcon('test-leading-icon-class');
  assert.isTrue(
    wrapper.state().leadingIconClassList.has('test-leading-icon-class')
  );
});

test('#adapter.removeClassFromLeadingIcon removes from state.leadingIconClassList', () => {
  const wrapper = shallow<Chip>(<Chip id='123' />);
  wrapper.setState({
    leadingIconClassList: new Set('test-leading-icon-class'),
  });
  wrapper
    .instance()
    .foundation.adapter_.removeClassFromLeadingIcon('test-leading-icon-class');
  assert.isFalse(
    wrapper.state().leadingIconClassList.has('test-leading-icon-class')
  );
});

test('#adapter.notifyInteraction calls #props.handleInteraction w/ chipId', () => {
  const handleInteraction = coerceForTesting<(id: string) => void>(td.func());
  const wrapper = shallow<Chip>(
    <Chip id='123' handleInteraction={handleInteraction} />
  );
  wrapper.instance().foundation.adapter_.notifyInteraction();
  td.verify(handleInteraction('123'), {times: 1});
});

test('#adapter.notifyRemoval calls #props.handleRemove w/ chipId', () => {
  const handleRemove = coerceForTesting<(id: string) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='123' handleRemove={handleRemove} />);
  wrapper.instance().foundation.adapter_.notifyRemoval();
  td.verify(handleRemove('123'), {times: 1});
});

test('#adapter.notifySelection calls #props.handleSelect w/ chipId and selected false', () => {
  const handleSelect = coerceForTesting<(id: string, selected: boolean) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='123' handleSelect={handleSelect} />);
  wrapper.instance().foundation.adapter_.notifySelection(false);
  td.verify(handleSelect('123', false), {times: 2});
});

test('#adapter.notifySelection calls #props.handleSelect w/ chipId and selected true', () => {
  const handleSelect = coerceForTesting<(id: string, selected: boolean) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='123' handleSelect={handleSelect} />);
  wrapper.instance().foundation.adapter_.notifySelection(true);
  td.verify(handleSelect('123', true), {times: 1});
});

test('#adapter.notifyTrailingIconInteraction calls #props.handleTrailingIconInteraction w/ chipId', () => {
  const handleTrailingIconInteraction = coerceForTesting<(id: string) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='123' handleTrailingIconInteraction={handleTrailingIconInteraction} />);
  wrapper.instance().foundation.adapter_.notifyTrailingIconInteraction();
  td.verify(handleTrailingIconInteraction('123'), {times: 1});
});

test('on click calls #props.onClick', () => {
  const onClick = coerceForTesting<(event: React.MouseEvent) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='1' onClick={onClick} />);
  const evt = coerceForTesting<React.MouseEvent>({});
  wrapper.simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('on click calls #foudation.handleInteraction', () => {
  const wrapper = shallow<Chip>(<Chip id='123' />);
  wrapper.instance().foundation.handleInteraction = td.func();
  const evt = {};
  wrapper.simulate('click', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(evt), {
    times: 1,
  });
});

test('on keydown calls #props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<(event: React.KeyboardEvent) => void>(td.func());
  const wrapper = shallow(<Chip id='1' onKeyDown={onKeyDown} />);
  const evt = coerceForTesting<React.KeyboardEvent>({});
  wrapper.simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('on keydown calls #foudation.handleInteraction', () => {
  const wrapper = shallow<Chip>(<Chip id='123' />);
  wrapper.instance().foundation.handleInteraction = td.func();
  const evt = {};
  wrapper.simulate('keydown', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(evt), {
    times: 1,
  });
});

test('renders leading icon', () => {
  const leadingIcon = <i className='leading-icon' />;
  const wrapper = shallow(<Chip id='1' leadingIcon={leadingIcon} />);
  assert.equal(
    wrapper
      .children()
      .first()
      .type(),
    'i'
  );
});

test('renders leading icon with class name', () => {
  const leadingIcon = <i className='leading-icon' />;
  const wrapper = shallow(<Chip id='1' leadingIcon={leadingIcon} />);
  assert.isTrue(
    wrapper
      .children()
      .first()
      .hasClass('leading-icon')
  );
});

test('renders leading icon with base class names', () => {
  const leadingIcon = <i className='leading-icon' />;
  const wrapper = shallow(<Chip id='1' leadingIcon={leadingIcon} />);
  assert.isTrue(
    wrapper
      .children()
      .first()
      .hasClass('mdc-chip__icon')
  );
  assert.isTrue(
    wrapper
      .children()
      .first()
      .hasClass('mdc-chip__icon--leading')
  );
});

test('renders leadingIcon with state.leadingIconClassList', () => {
  const leadingIcon = <i className='leading-icon' />;
  const wrapper = shallow(<Chip id='1' leadingIcon={leadingIcon} />);
  wrapper.setState({
    leadingIconClassList: new Set(['test-leading-icon-class']),
  });
  assert.isTrue(
    wrapper
      .children()
      .first()
      .hasClass('test-leading-icon-class')
  );
});

test('renders trailing icon', () => {
  const trailingIcon = <i className='remove-icon' />;
  const wrapper = shallow(<Chip id='1' trailingIcon={trailingIcon} />);
  assert.equal(
    wrapper
      .children()
      .last()
      .type(),
    'i'
  );
});

test('renders trailing icon with class name', () => {
  const trailingIcon = <i className='remove-icon' />;
  const wrapper = shallow(<Chip id='1' trailingIcon={trailingIcon} />);
  assert.isTrue(
    wrapper
      .children()
      .last()
      .hasClass('remove-icon')
  );
});

test('renders trailing icon with base class names', () => {
  const trailingIcon = <i className='remove-icon' />;
  const wrapper = shallow(<Chip id='1' trailingIcon={trailingIcon} />);
  assert.isTrue(
    wrapper
      .children()
      .last()
      .hasClass('mdc-chip__icon')
  );
  assert.isTrue(
    wrapper
      .children()
      .last()
      .hasClass('mdc-chip__icon--trailing')
  );
});

test('trailing icon click calls #foundation.handleTrailingIconInteraction', () => {
  const trailingIcon = <i className='remove-icon' />;
  const wrapper = shallow<Chip>(<Chip id='1' trailingIcon={trailingIcon} />);
  wrapper.instance().foundation.handleTrailingIconInteraction = td.func();
  const evt = {};
  wrapper
    .children()
    .last()
    .simulate('click', evt);
  td.verify(wrapper.instance().foundation.handleTrailingIconInteraction(evt), {
    times: 1,
  });
});

test('trailing icon keydown calls #foundation.handleTrailingIconInteraction', () => {
  const trailingIcon = <i className='remove-icon' />;
  const wrapper = shallow<Chip>(<Chip id='1' trailingIcon={trailingIcon} />);
  wrapper.instance().foundation.handleTrailingIconInteraction = td.func();
  const evt = {};
  wrapper
    .children()
    .last()
    .simulate('keydown', evt);
  td.verify(wrapper.instance().foundation.handleTrailingIconInteraction(evt), {
    times: 1,
  });
});


test('calls #foundation.handleTransitionEnd on transitionend event', () => {
  const wrapper = shallow<Chip>(<Chip id='1' />);
  wrapper.instance().foundation.handleTransitionEnd = td.func();
  const evt = {target: {}};
  wrapper.simulate('transitionend', evt);
  td.verify(wrapper.instance().foundation.handleTransitionEnd(evt), {
    times: 1,
  });
});

test('calls #props.onTransitionEnd on transitionend event', () => {
  const onTransitionEnd = coerceForTesting<(event: React.TransitionEvent) => void>(td.func());
  const wrapper = shallow<Chip>(<Chip id='1' onTransitionEnd={onTransitionEnd} />);
  // need to remove foundation, since React.TransitionEvent does not have classList on EventTarget
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
  wrapper.instance().foundation = {handleTransitionEnd: () => {}};
  const evt = coerceForTesting<React.TransitionEvent>({});
  wrapper.simulate('transitionend', evt);
  td.verify(onTransitionEnd(evt), {times: 1});
});

test('renders chip checkmark if it exists', () => {
  const wrapper = mount(<Chip id='1' chipCheckmark={<ChipCheckmark />} />);
  assert.equal(wrapper.find('.mdc-chip__checkmark').length, 1);
});

test('renders custom chip checkmark', () => {
  const wrapper = shallow(
    <Chip id='1' chipCheckmark={<div className='meow-class' />} />
  );
  assert.equal(wrapper.find('.meow-class').length, 1);
});

test('adds mdc-chip--selected class if selected prop is true', () => {
  const wrapper = shallow(<Chip id='1' selected />);
  assert.exists(wrapper.hasClass('mdc-chip--selected'));
});

test('renders chip', () => {
  const wrapper = shallow(<Chip id='1' />);
  assert.isTrue(wrapper.find('.mdc-chip').length === 1);
});

test('renders label text', () => {
  const wrapper = shallow(<Chip id='1' label='Hello Jane' />);
  assert.equal(wrapper.find('.mdc-chip__text').text(), 'Hello Jane');
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Chip>(<Chip id='1' />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

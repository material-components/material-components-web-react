import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount} from 'enzyme';
import ChipSet from '../../../packages/chips/ChipSet';
import {Chip, ChipProps} from '../../../packages/chips/index'; // eslint-disable-line no-unused-vars
import ChipCheckmark from '../../../packages/chips/ChipCheckmark';
import {coerceForTesting} from '../helpers/types';

suite('ChipSet');


test('creates foundation', () => {
  const wrapper = mount<ChipSet>(<ChipSet><Chip /></ChipSet>);
  assert.exists(wrapper.state().foundation);
});

test('updates state.selectedChipIds when the props.selectedChipIds change', () => {
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  const selectedChipIds = ['1'];
  wrapper.setProps({selectedChipIds});
  assert.isTrue(wrapper.state().selectedChipIds.indexOf('1') > -1);
});

test('filter classname is added if is filter variant', () => {
  const wrapper = shallow(
    <ChipSet filter>
      <div id='1' />
    </ChipSet>
  );
  wrapper.hasClass('mdc-chip-set--filter');
});

test('choice classname is added if is choice variant', () => {
  const wrapper = shallow(
    <ChipSet choice>
      <div id='1' />
    </ChipSet>
  );
  wrapper.hasClass('mdc-chip-set--choice');
});

test('input classname is added if is input variant', () => {
  const wrapper = shallow(
    <ChipSet input>
      <div id='1' />
    </ChipSet>
  );
  wrapper.hasClass('mdc-chip-set--input');
});

test('#adapter.hasClass returns true if component contains class', () => {
  const wrapper = shallow<ChipSet>(
    <ChipSet className='test-class-name'>
      <div id='1' />
    </ChipSet>
  );
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.hasClass returns false if component does not contains class', () => {
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  assert.isFalse(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.setSelected adds selectedChipId to state', () => {
  const getSelectedChipIds = td.func();
  const handleSelect = coerceForTesting<(selectedChipIds: string[]) => void>(td.func());
  const foundation = {getSelectedChipIds};
  const wrapper = shallow<ChipSet>(
    <ChipSet handleSelect={handleSelect}>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  td.when(getSelectedChipIds()).thenReturn(['1']);
  wrapper.instance().adapter.setSelected();
  assert.isTrue(wrapper.state().selectedChipIds.indexOf('1') > -1);
  td.verify(handleSelect(['1']), {times: 1});
  td.verify(getSelectedChipIds(), {times: 1});
});

// this is bad
test('#adapter.setSelected removes selectedChipId from state', () => {
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({selectedChipIds: ['1']});
  wrapper.instance().adapter.setSelected();
  assert.isFalse(wrapper.state().selectedChipIds.indexOf('1') > -1);
});

test(
  '#foundation.select is called when #initChipSelection is called and ' +
    'state.selectedChipIds has a selected Id',
  () => {
    const wrapper = shallow<ChipSet>(
      <ChipSet>
        <div id='1' />
      </ChipSet>
    );
    wrapper.state().foundation.select = td.func();
    const selectedChipIds = ['1'];
    wrapper.setState({selectedChipIds});
    wrapper.instance().initChipSelection();
    td.verify(wrapper.state().foundation.select('1'), {times: 1});
  }
);

test('#handleSelect calls foundation.handleChipSelection with selectedChipId and selected=true', () => {
  const handleChipSelection = td.func();
  const foundation = {handleChipSelection};
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  wrapper.instance().handleSelect('1', true);
  td.verify(handleChipSelection('1', true), {times: 1});
});

test('#handleSelect calls foundation.handleChipSelection with selectedChipId and selected=false', () => {
  const handleChipSelection = td.func();
  const foundation = {handleChipSelection};
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  wrapper.instance().handleSelect('1', false);
  td.verify(handleChipSelection('1', false), {times: 1});
});

test('#handleInteraction calls #foundation.handleChipInteraction', () => {
  const handleChipInteraction = td.func();
  const foundation = {handleChipInteraction};
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  wrapper.instance().handleInteraction('1');
  td.verify(handleChipInteraction('1'), {times: 1});
});

test('#handleRemove calls foundation.handleChipRemoval with chipId', () => {
  const handleChipRemoval = td.func();
  const foundation = {handleChipRemoval};
  const wrapper = shallow<ChipSet>(
    <ChipSet>
      <div id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  wrapper.instance().handleRemove('1');
  td.verify(handleChipRemoval('1'), {times: 1});
});

test('#removeChip does not call #props.updateChips if there are no chips', () => {
  const updateChips = coerceForTesting<(chips: Partial<ChipProps>[]) => void>(td.func());
  const wrapper = shallow<ChipSet>(<ChipSet updateChips={updateChips} />);
  wrapper.instance().removeChip(td.matchers.isA(Number));
  td.verify(updateChips(td.matchers.anything()), {times: 0});
});

test('#removeChip calls #props.updateChips with array of remove chip', () => {
  const updateChips = coerceForTesting<(chips: Partial<ChipProps>[]) => void>(td.func());
  const wrapper = shallow<ChipSet>(
    <ChipSet updateChips={updateChips}>
      <Chip id='1' />
    </ChipSet>
  );
  wrapper.instance().removeChip('1');
  td.verify(updateChips([]), {times: 1});
});

test('#removeChip calls #props.updateChips with array of removed chip', () => {
  const updateChips = coerceForTesting<(chips: Partial<ChipProps>[]) => void>(td.func());
  const wrapper = shallow<ChipSet>(
    <ChipSet updateChips={updateChips}>
      <Chip id='1' />
    </ChipSet>
  );
  wrapper.instance().removeChip('1');
  td.verify(updateChips([]), {times: 1});
});

test('#removeChip calls #props.updateChips with array of remaining chips', () => {
  const updateChips = coerceForTesting<(chips: Partial<ChipProps>[]) => void>(td.func());
  const wrapper = shallow<ChipSet>(
    <ChipSet updateChips={updateChips}>
      <Chip id='1' />
      <Chip id='2' />
    </ChipSet>
  );
  wrapper.instance().removeChip('1');
  td.verify(updateChips([td.matchers.contains({id: '2'})]), {times: 1});
});

test('#setCheckmarkWidth sets checkmark width', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip /></ChipSet>);
  wrapper.instance().setCheckmarkWidth(coerceForTesting<ChipCheckmark>({width: 20}));
  assert.equal(wrapper.instance().checkmarkWidth, 20);
});

test('#setCheckmarkWidth does not set checkmark width if checkmark width is already set', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip /></ChipSet>);
  wrapper.instance().checkmarkWidth = 20;
  wrapper.instance().setCheckmarkWidth(coerceForTesting<ChipCheckmark>({width: 40}));
  assert.equal(wrapper.instance().checkmarkWidth, 20);
});

test('#setCheckmarkWidth does not set checkmark width if checkmark is null', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip id='1' /></ChipSet>);
  wrapper.instance().setCheckmarkWidth(null);
  assert.equal(wrapper.instance().checkmarkWidth, 0);
});

test('#computeBoundingRect returns width and height', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip /></ChipSet>);
  const chipWidth = 20;
  const chipHeight = 50;
  const chipElement = coerceForTesting<HTMLDivElement>({
    getBoundingClientRect: () => ({width: chipWidth, height: chipHeight}),
  });
  const {height, width} = wrapper.instance().computeBoundingRect(chipElement);
  assert.equal(height, chipHeight);
  assert.equal(width, chipWidth);
});

test('#computeBoundingRect returns width and height', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip /></ChipSet>);
  const chipWidth = 20;
  const chipHeight = 50;
  wrapper.instance().checkmarkWidth = 20;
  const chipElement = coerceForTesting<HTMLDivElement>({
    getBoundingClientRect: () => ({width: chipWidth, height: chipHeight}),
  });
  const {height, width} = wrapper.instance().computeBoundingRect(chipElement);
  assert.equal(height, chipHeight);
  assert.equal(width, chipWidth + 20);
});

test('chip is rendered with selected prop as false', () => {
  const wrapper = mount(
    <ChipSet>
      <Chip id='1' />
    </ChipSet>
  );
  const chip = wrapper.children().props().children[0];
  assert.isFalse(chip.props.selected);
});

test('chip is rendered with selected prop as true', () => {
  const wrapper = mount(
    <ChipSet>
      <Chip id='1' />
    </ChipSet>
  );
  wrapper.setState({selectedChipIds: ['1']});
  const chip = wrapper.children().props().children[0];
  assert.isTrue(chip.props.selected);
});

test('#chip.props.handleSelect calls #foundation.handleChipSelection', () => {
  const foundation = {handleChipSelection: td.func()};
  const wrapper = mount(
    <ChipSet>
      <Chip id='1' />
    </ChipSet>
  );
  wrapper.setState({foundation});
  const chip = wrapper.children().props().children[0];
  chip.props.handleSelect('1', false);
  td.verify(foundation.handleChipSelection('1', false), {times: 1});
});

test('chip is rendered with handleRemove method', () => {
  const wrapper = mount<ChipSet>(<ChipSet><Chip /></ChipSet>);
  wrapper.instance().handleRemove = coerceForTesting<(chipId: string) => void>(td.func());
  wrapper.setProps({children: <Chip id='1' />});
  const chip = wrapper.children().props().children[0];
  chip.props.handleRemove('1');
  td.verify(wrapper.instance().handleRemove('1'), {times: 1});
});

test('chip is rendered ChipCheckmark if is filter variants', () => {
  const wrapper = mount(
    <ChipSet filter>
      <Chip id='1' />
    </ChipSet>
  );
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.chipCheckmark.type, ChipCheckmark);
});

test('chip is rendered ChipCheckmark if is not filter variants', () => {
  const wrapper = mount(
    <ChipSet>
      <Chip id='1' />
    </ChipSet>
  );
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.chipCheckmark, null);
});

test('chip is rendered computeBoundingRect method prop if is filter variant', () => {
  const wrapper = mount(
    <ChipSet filter>
      <Chip id='1' />
    </ChipSet>
  );
  const chip = wrapper.children().props().children[0];
  const chipElement = {getBoundingClientRect: td.func()};
  td.when(chipElement.getBoundingClientRect()).thenReturn({
    height: 1,
    width: 1,
  });
  chip.props.computeBoundingRect(chipElement);
  td.verify(chipElement.getBoundingClientRect(), {times: 1});
});

test('chip is rendered with computeBoundingRect method prop if is not filter variant', () => {
  const wrapper = mount(
    <ChipSet>
      <Chip id='1' />
    </ChipSet>
  );
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.computeBoundingRect, null);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<ChipSet>(<ChipSet><Chip /></ChipSet>);
  const foundation = wrapper.state().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

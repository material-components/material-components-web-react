import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import ChipSet from '../../../packages/chips/ChipSet';
import {Chip} from '../../../packages/chips/index';
import ChipCheckmark from '../../../packages/chips/ChipCheckmark';

suite('ChipSet');

test('creates foundation', () => {
  const wrapper = mount(<ChipSet />);
  assert.exists(wrapper.instance().foundation_);
});

test('calls #foundation.select when the selectedChipIds change', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  wrapper.instance().updateChipSelection = td.func();
  const selectedChipIds = ['1'];
  wrapper.setProps({selectedChipIds});
  td.verify(wrapper.instance().updateChipSelection(), {times: 1});
});

test('filter classname is added if is filter variant', () => {
  const wrapper = shallow(<ChipSet filter><div id='1' /></ChipSet>);
  wrapper.hasClass('mdc-chip-set--filter');
});

test('choice classname is added if is choice variant', () => {
  const wrapper = shallow(<ChipSet choice><div id='1' /></ChipSet>);
  wrapper.hasClass('mdc-chip-set--choice');
});

test('input classname is added if is input variant', () => {
  const wrapper = shallow(<ChipSet input><div id='1' /></ChipSet>);
  wrapper.hasClass('mdc-chip-set--input');
});

test('#adapter.hasClass returns true if component contains class', () => {
  const wrapper = shallow(<ChipSet className='test-class-name'><div id='1' /></ChipSet>);
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.hasClass returns false if component does not contains class', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  assert.isFalse(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.setSelected adds selectedChipId to state', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  wrapper.instance().adapter.setSelected('1', true);
  assert.isTrue(wrapper.state().selectedChipIds.has('1'));
});

test('#adapter.setSelected removes selectedChipId from state', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  wrapper.setState({selectedChipIds: new Set(['1'])});
  wrapper.instance().adapter.setSelected('1', false);
  assert.isFalse(wrapper.state().selectedChipIds.has('1'));
});

test('#adapter.setSelected removes selectedChipId from state', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  wrapper.setState({selectedChipIdss: new Set(['1'])});
  wrapper.instance().adapter.setSelected('1', false);
  assert.isFalse(wrapper.state().selectedChipIds.has('1'));
});

test('#foundation.select is called when the selectedChipIds change', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  wrapper.instance().foundation_.select = td.func();
  const selectedChipIds = ['1'];
  wrapper.setProps({selectedChipIds});
  td.verify(wrapper.instance().foundation_.select('1'), {times: 1});
});

test('#foundation.deselect is called when the selectedChipIds change', () => {
  const wrapper = shallow(<ChipSet><div id='1' /></ChipSet>);
  const selectedChipIds = ['1'];
  wrapper.setProps({selectedChipIds});
  wrapper.instance().foundation_.deselect = td.func();
  wrapper.setProps({selectedChipIds: []});

  td.verify(wrapper.instance().foundation_.deselect('1'), {times: 1});
});

test('#handleSelect calls props.handleSelect', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<ChipSet handleSelect={handleSelect}></ChipSet>);
  wrapper.instance().handleSelect();
  td.verify(handleSelect([]), {times: 1});
});

test('#handleSelect calls props.handleSelect with selectedChipIds', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<ChipSet handleSelect={handleSelect} selectedChipIds={['1']}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().handleSelect();
  td.verify(handleSelect(['1']), {times: 1});
});

test('#handleSelect calls foundation_.toggleSelect with chipId and is choice variant', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<ChipSet choice handleSelect={handleSelect}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().foundation_.toggleSelect = td.func();
  wrapper.instance().handleSelect('1');
  td.verify(wrapper.instance().foundation_.toggleSelect('1'), {times: 1});
});

test('#handleSelect calls foundation_.toggleSelect with chipId and is filter variant', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<ChipSet filter handleSelect={handleSelect}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().foundation_.toggleSelect = td.func();
  wrapper.instance().handleSelect('1');
  td.verify(wrapper.instance().foundation_.toggleSelect('1'), {times: 1});
});

test('#handleSelect does not call foundation_.toggleSelect with chipId if is neither filter nor choice', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<ChipSet handleSelect={handleSelect}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().foundation_.toggleSelect = td.func();
  wrapper.instance().handleSelect('1');
  td.verify(wrapper.instance().foundation_.toggleSelect('1'), {times: 0});
});

test('#handleRemove calls foundation_.deselect with chipId and is input variant', () => {
  const wrapper = shallow(<ChipSet input>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().foundation_.deselect = td.func();
  wrapper.instance().handleRemove('1');
  td.verify(wrapper.instance().foundation_.deselect('1'), {times: 1});
});

test('#handleRemove does not call foundation_.deselect with chipId if is not input variant', () => {
  const handleRemove = td.func();
  const wrapper = shallow(<ChipSet handleRemove={handleRemove}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().foundation_.deselect = td.func();
  wrapper.instance().handleRemove('1');
  td.verify(wrapper.instance().foundation_.deselect('1'), {times: 0});
});

test('#handleRemove calls removeChip', () => {
  const wrapper = shallow(<ChipSet>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().removeChip = td.func();
  wrapper.instance().handleRemove('1');
  td.verify(wrapper.instance().removeChip('1'), {times: 1});
});

test('#removeChip does not call #props.updateChips if there are no chips', () => {
  const updateChips = td.func();
  const wrapper = shallow(<ChipSet updateChips={updateChips}/>);
  wrapper.instance().removeChip();
  td.verify(updateChips(td.matchers.anything()), {times: 0});
});

test('#removeChip calls #props.updateChips with array of remove chip', () => {
  const updateChips = td.func();
  const wrapper = shallow(<ChipSet updateChips={updateChips}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().removeChip('1');
  td.verify(updateChips([]), {times: 1});
});

test('#removeChip calls #props.updateChips with array of removed chip', () => {
  const updateChips = td.func();
  const wrapper = shallow(<ChipSet updateChips={updateChips}>
    <div id='1' />
  </ChipSet>);
  wrapper.instance().removeChip('1');
  td.verify(updateChips([]), {times: 1});
});

test('#removeChip calls #props.updateChips with array of remaining chips', () => {
  const updateChips = td.func();
  const wrapper = shallow(<ChipSet updateChips={updateChips}>
    <div id='1' />
    <div id='2' />
  </ChipSet>);
  wrapper.instance().removeChip('1');
  td.verify(updateChips([{id: '2'}]), {times: 1});
});

test('#setCheckmarkWidth sets checkmark width', () => {
  const wrapper = shallow(<ChipSet></ChipSet>);
  wrapper.instance().setCheckmarkWidth({width: 20});
  assert.equal(wrapper.instance().checkmarkWidth_, 20);
});

test('#setCheckmarkWidth does not set checkmark width if checkmark width is already set', () => {
  const wrapper = shallow(<ChipSet></ChipSet>);
  wrapper.instance().checkmarkWidth_ = 20;
  wrapper.instance().setCheckmarkWidth({width: 40});
  assert.equal(wrapper.instance().checkmarkWidth_, 20);
});

test('#computeBoundingRect returns width and height', () => {
  const wrapper = shallow(<ChipSet></ChipSet>);
  const chipWidth = 20;
  const chipHeight = 50;
  const chipElement = {
    getBoundingClientRect: () => ({width: chipWidth, height: chipHeight}),
  };
  const {height, width} = wrapper.instance().computeBoundingRect(chipElement);
  assert.equal(height, chipHeight);
  assert.equal(width, chipWidth);
});

test('#computeBoundingRect returns width and height', () => {
  const wrapper = shallow(<ChipSet></ChipSet>);
  const chipWidth = 20;
  const chipHeight = 50;
  wrapper.instance().checkmarkWidth_ = 20;
  const chipElement = {
    getBoundingClientRect: () => ({width: chipWidth, height: chipHeight}),
  };
  const {height, width} = wrapper.instance().computeBoundingRect(chipElement);
  assert.equal(height, chipHeight);
  assert.equal(width, chipWidth+20);
});

test('chip is rendered with selected prop as false', () => {
  const wrapper = mount(<ChipSet><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  assert.isFalse(chip.props.selected);
});

test('chip is rendered with selected prop as true', () => {
  const wrapper = mount(<ChipSet><Chip id='1'/></ChipSet>);
  wrapper.setState({selectedChipIds: new Set(['1'])});
  const chip = wrapper.children().props().children[0];
  assert.isTrue(chip.props.selected);
});

test('chip is rendered with handleSelect method', () => {
  const handleSelect = td.func();
  const wrapper = mount(<ChipSet handleSelect={handleSelect}><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  chip.props.handleSelect('1');
  td.verify(handleSelect([]), {times: 1});
});

test('chip is rendered with handleRemove method', () => {
  const wrapper = mount(<ChipSet></ChipSet>);
  wrapper.instance().handleRemove = td.func();
  wrapper.setProps({children: <Chip id='1'/>});

  const chip = wrapper.children().props().children[0];
  chip.props.handleRemove('1');
  td.verify(wrapper.instance().handleRemove('1'), {times: 1});
});

test('chip is rendered ChipCheckmark if is filter variants', () => {
  const wrapper = mount(<ChipSet filter><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.chipCheckmark.type, ChipCheckmark);
});

test('chip is rendered ChipCheckmark if is not filter variants', () => {
  const wrapper = mount(<ChipSet><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.chipCheckmark, null);
});

test('chip is rendered computeBoundingRect method prop if is filter variant', () => {
  const wrapper = mount(<ChipSet filter><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  const chipElement = {getBoundingClientRect: td.func()};
  td.when(chipElement.getBoundingClientRect()).thenReturn({height: 1, width: 1});
  chip.props.computeBoundingRect(chipElement);
  td.verify(chipElement.getBoundingClientRect(), {times: 1});
});

test('chip is rendered computeBoundingRect method prop if is not filter variant', () => {
  const wrapper = mount(<ChipSet><Chip id='1'/></ChipSet>);
  const chip = wrapper.children().props().children[0];
  assert.equal(chip.props.computeBoundingRect, null);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<ChipSet />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

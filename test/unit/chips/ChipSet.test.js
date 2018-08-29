// import React from 'react';
// import {assert} from 'chai';
// import {shallow} from 'enzyme';
// import {Chip, ChipSet} from '../../../packages/chips/index';
//
// suite('ChipSet');

// test('className prop adds classes', () => {
//   const wrapper = shallow(<ChipSet className='test-class-name' labels={[]} />);
//   assert.isTrue(wrapper.hasClass('test-class-name'));
//   assert.isTrue(wrapper.hasClass('mdc-chip-set'));
// });
//
// test('renders chip set and chip', () => {
//   const wrapper = shallow(
//     <ChipSet>
//       <Chip id={0} label='Bonnie'/>
//       <Chip id={1} label='Clyde'/>
//     </ChipSet>
//   );
//   assert.exists(wrapper.find('.mdc-chip-set'));
//   assert.lengthOf(wrapper.find(Chip), 2);
// });
//
// test('selected filter chip renders checkmark', () => {
//   const wrapper = shallow(
//     <ChipSet filter>
//       <Chip selected id={0} label='Minnie'/>
//       <Chip id={1} label='Mickey'/>
//     </ChipSet>
//   );
//   assert.exists(wrapper.find('.mdc-chip__checkmark'));
// });
//
// test('#adapter.hasClass returns true if class was added in className prop', () => {
//   const wrapper = shallow(<ChipSet className='test-class-name' labels={[]} />);
//   assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
//   assert.isTrue(wrapper.instance().adapter.hasClass('mdc-chip-set'));
// });

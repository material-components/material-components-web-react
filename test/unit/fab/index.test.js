import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import Fab from '../../../packages/fab';

suite('Fab');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Fab className='test-class-name'><i /></Fab>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-fab'));
});

test('has correct standard class', () => {
  const wrapper = shallow(<Fab><i /></Fab>);
  assert.isTrue(wrapper.hasClass('mdc-fab'));
});

test('has correct mini class', () => {
  const wrapper = shallow(<Fab mini><i /></Fab>);
  assert.isTrue(wrapper.hasClass('mdc-fab--mini'));
});

test('i tag is rendered', () => {
  const icon = <i className='test-action-icon-1'></i>;
  const wrapper = shallow(
    <Fab>
      {icon}
    </Fab>
  );
  assert.isTrue(wrapper.children('.mdc-fab__icon').length !== 0);
});

test('span tag is rendered', () => {
  const icon = <span className='test-action-icon-1'></span>;
  const wrapper = shallow(
      <Fab>
        {icon}
      </Fab>
  );
  assert.isTrue(wrapper.children('.mdc-fab__icon').length !== 0);
});

test('a tag is rendered', () => {
  const icon = <a href="#" className='test-action-icon-1'></a>;
  const wrapper = shallow(
      <Fab>
        {icon}
      </Fab>
  );
  assert.isTrue(wrapper.children('.mdc-fab__icon').length !== 0);
});

test('i tag is rendered with mdc-fab__icon class', () => {
  const wrapper = shallow(<Fab><i className="test-class-1"></i></Fab>);
  assert.isTrue(wrapper.find('.test-class-1').hasClass('mdc-fab__icon'));
});

test('span tag is rendered with mdc-fab__icon class', () => {
  const wrapper = shallow(<Fab><span className="test-class-1"></span></Fab>);
  assert.isTrue(wrapper.find('.test-class-1').hasClass('mdc-fab__icon'));
});

test('a tag is rendered with mdc-fab__icon class', () => {
  const wrapper = shallow(<Fab><a className="test-class-1"></a></Fab>);
  assert.isTrue(wrapper.find('.test-class-1').hasClass('mdc-fab__icon'));
});

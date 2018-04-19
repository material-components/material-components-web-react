import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme'; // need mount for ripple ref call
import Fab from '../../../packages/fab';

suite('Fab');

test('classNames adds classes', () => {
  const wrapper = mount(
    <Fab className='test-class-name'><i /></Fab>);
  assert.isTrue(wrapper.find('button').hasClass('mdc-fab'));
});

test('has correct standard class', () => {
  const wrapper = mount(<Fab><i /></Fab>);
  assert.isTrue(wrapper.find('button').hasClass('mdc-fab'));
});

test('has correct mini class', () => {
  const wrapper = mount(<Fab mini><i /></Fab>);
  assert.isTrue(wrapper.find('button').hasClass('mdc-fab--mini'));
});

test('i tag is rendered', () => {
  const icon = <i className='test-action-icon-1'></i>;
  const wrapper = mount(
    <Fab>
      {icon}
    </Fab>
  );
  assert.isTrue(wrapper.find('button').children('.mdc-fab__icon').length !== 0);
});

test('span tag is rendered', () => {
  const icon = <span className='test-action-icon-1'></span>;
  const wrapper = mount(
      <Fab>
        {icon}
      </Fab>
  );
  assert.isTrue(wrapper.find('button').children('.mdc-fab__icon').length !== 0);
});

test('a tag is rendered', () => {
  const icon = <a href="#" className='test-action-icon-1'></a>;
  const wrapper = mount(
      <Fab>
        {icon}
      </Fab>
  );
  assert.isTrue(wrapper.find('button').children('.mdc-fab__icon').length !== 0);
});

test('i tag is rendered with mdc-fab__icon class', () => {
  const wrapper = mount(<Fab><i className="test-class-1"></i></Fab>);
  assert.isTrue(wrapper.find('button').find('.test-class-1').hasClass('mdc-fab__icon'));
});

test('span tag is rendered with mdc-fab__icon class', () => {
  const wrapper = mount(<Fab><span className="test-class-1"></span></Fab>);
  assert.isTrue(wrapper.find('.test-class-1').hasClass('mdc-fab__icon'));
});

test('a tag is rendered with mdc-fab__icon class', () => {
  const wrapper = mount(<Fab><a className="test-class-1"></a></Fab>);
  assert.isTrue(wrapper.find('.test-class-1').hasClass('mdc-fab__icon'));
});

import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import React from 'react';
import td from 'testdouble';

import LinearProgress from '../../../packages/linear-progress/index';

suite('LinearProgress');

test('Skips rendering the buffering dots when props.bufferingDots is false', () => {
  const wrapper = shallow(<LinearProgress bufferingDots={false} />, {disableLifecycleMethods: true});
  assert.isFalse(wrapper.find('.mdc-linear-progress__buffering-dots').exists());
});

test('renders a different tag', () => {
  const wrapper = shallow(<LinearProgress tag='span' />, {disableLifecycleMethods: true});
  assert.equal(wrapper.type(), 'span');
});

test('Creates the foundation', () => {
  const wrapper = shallow(<LinearProgress />, {disableLifecycleMethods: true});
  assert.exists(wrapper.instance().foundation_);
});

test('Adds the mdc-linear-progress class', () => {
  const wrapper = shallow(<LinearProgress />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-linear-progress'));
});

test('Adds the indeterminate class when props.indeterminate is true', () => {
  const wrapper = shallow(<LinearProgress indeterminate />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-linear-progress--indeterminate'));
});

test('Adds the reversed class when props.reversed is true', () => {
  const wrapper = shallow(<LinearProgress reversed />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-linear-progress--reversed'));
});

test('Adds a custom class name', () => {
  const wrapper = shallow(
    <LinearProgress className='test-class-name' />,
    {disableLifecycleMethods: true},
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('Keeps custom props', () => {
  const wrapper = shallow(
    <LinearProgress propOne={true} propTwo='test-prop' />,
    {disableLifecycleMethods: true},
  );
  const props = wrapper.props();
  assert.isTrue(props.propOne);
  assert.equal(props.propTwo, 'test-prop');
});

test('#foundation_.init gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.foundation_.init = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.init(), {times: 1});
});

test('#foundation_.setBuffer gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress buffer={0.1} />);
  const instance = wrapper.instance();
  instance.foundation_.setBuffer = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.setBuffer(0.1), {times: 1});
});

test('#foundation_.setDeterminate gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress indeterminate={true} />);
  const instance = wrapper.instance();
  instance.foundation_.setDeterminate = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.setDeterminate(false), {times: 1});
});

test('#foundation_.setProgress gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress progress={0.1} />);
  const instance = wrapper.instance();
  instance.foundation_.setProgress = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.setProgress(0.1), {times: 1});
});

test('#foundation_.setReverse gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress reversed={true} />);
  const instance = wrapper.instance();
  instance.foundation_.setReverse = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.setReverse(true), {times: 1});
});

test('#foundation_.close gets called when the component mounts', () => {
  const wrapper = mount(<LinearProgress closed />);
  const instance = wrapper.instance();
  instance.foundation_.close = td.func();
  instance.componentDidMount();
  td.verify(instance.foundation_.close(), {times: 1});
});

test('#foundation_.setBuffer gets called when props.buffer updates', () => {
  const wrapper = mount(<LinearProgress buffer={0.1} />);
  wrapper.instance().foundation_.setBuffer = td.func();
  wrapper.setProps({buffer: 0.2});
  td.verify(wrapper.instance().foundation_.setBuffer(0.2), {times: 1});
});

test('#foundation_.close gets called when props.closed updates', () => {
  const wrapper = mount(<LinearProgress closed={false} />);
  wrapper.instance().foundation_.close = td.func();
  wrapper.setProps({closed: true});
  td.verify(wrapper.instance().foundation_.close(), {times: 1});
});

test('#foundation_.open gets called when props.closed updates', () => {
  const wrapper = mount(<LinearProgress closed={true} />);
  wrapper.instance().foundation_.open = td.func();
  wrapper.setProps({closed: false});
  td.verify(wrapper.instance().foundation_.open(), {times: 1});
});

test('#foundation_.setDeterminate gets called when props.indeterminate updates', () => {
  const wrapper = mount(<LinearProgress indeterminate={false} />);
  wrapper.instance().foundation_.setDeterminate = td.func();
  wrapper.setProps({indeterminate: true});
  td.verify(wrapper.instance().foundation_.setDeterminate(false), {times: 1});
});

test('#foundation_.setProgress gets called when props.progress updates', () => {
  const wrapper = mount(<LinearProgress progress={0.1} />);
  wrapper.instance().foundation_.setProgress = td.func();
  wrapper.setProps({progress: 0.2});
  td.verify(wrapper.instance().foundation_.setProgress(0.2), {times: 1});
});

test('#foundation_.setReverse gets called when props.reversed updates', () => {
  const wrapper = mount(<LinearProgress reversed={false} />);
  wrapper.instance().foundation_.setReverse = td.func();
  wrapper.setProps({reversed: true});
  td.verify(wrapper.instance().foundation_.setReverse(true), {times: 1});
});

test('#foundation_.destroy gets called when the component unmounts', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.foundation_.destroy = td.func();
  wrapper.unmount();
  td.verify(instance.foundation_.destroy(), {times: 1});
});

test('#adapter.addClass adds a class to state', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  assert.isTrue(instance.adapter.hasClass('test-class'));
});

test('#adapter.addClass does not add a class to state if not mounted', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.isMounted_ = false;
  instance.adapter.addClass('test-class');
  assert.isFalse(instance.adapter.hasClass('test-class'));
});

test('#adapter.removeClass removes a class from state', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  instance.adapter.removeClass('test-class');
  assert.isFalse(instance.adapter.hasClass('test-class'));
});

test('#adapter.removeClass does not remove a class from state if not mounted', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  instance.isMounted_ = false;
  instance.adapter.removeClass('test-class');
  assert.isTrue(instance.adapter.hasClass('test-class'));
});

test('#adapter.setStyle sets a style property on an element', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.setStyle(instance.adapter.getPrimaryBar(), 'width', '0');
  assert.equal(instance.adapter.getPrimaryBar().style.width, '0px');
});

test('#adapter.setStyle does not set a style property on an element if not mounted', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  instance.isMounted_ = false;
  instance.adapter.setStyle(instance.adapter.getPrimaryBar(), 'width', '0');
  assert.equal(instance.adapter.getPrimaryBar().style.width, '');
});

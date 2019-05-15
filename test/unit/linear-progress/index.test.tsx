import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import React from 'react';
import td from 'testdouble';
import LinearProgress from '../../../packages/linear-progress/index';

suite('LinearProgress');

test('Skips rendering the buffering dots when props.bufferingDots is false', () => {
  const wrapper = shallow(<LinearProgress bufferingDots={false} />, {
    disableLifecycleMethods: true,
  });
  assert.isFalse(wrapper.find('.mdc-linear-progress__buffering-dots').exists());
});

test('renders a different tag', () => {
  const wrapper = shallow(<LinearProgress tag='span' />, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'span');
});

test('Creates the foundation', () => {
  const wrapper = shallow<LinearProgress>(<LinearProgress />, {
    disableLifecycleMethods: true,
  });
  assert.exists(wrapper.instance().foundation);
});

test('Adds the mdc-linear-progress class', () => {
  const wrapper = shallow(<LinearProgress />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-linear-progress'));
});

test('Adds the indeterminate class when props.indeterminate is true', () => {
  const wrapper = shallow(<LinearProgress indeterminate />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-linear-progress--indeterminate'));
});

test('Adds the reversed class when props.reversed is true', () => {
  const wrapper = shallow(<LinearProgress reversed />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-linear-progress--reversed'));
});

test('Adds a custom class name', () => {
  const wrapper = shallow(<LinearProgress className='test-class-name' />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('Keeps custom props', () => {
  const wrapper = shallow(
    <LinearProgress disabled={true} label='test-prop' />,
    {disableLifecycleMethods: true}
  );
  const props = wrapper.props();
  assert.isTrue(props.disabled);
  assert.equal(props.label, 'test-prop');
});

test('#foundation.init gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.foundation.init = td.func<() => void>();
  instance.componentDidMount();
  td.verify(instance.foundation.init(), {times: 1});
});

test('#foundation.setBuffer gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress buffer={0.1} />);
  const instance = wrapper.instance();
  instance.foundation.setBuffer = td.func<(value: number) => void>();
  instance.componentDidMount();
  td.verify(instance.foundation.setBuffer(0.1), {times: 1});
});

test('#foundation.setDeterminate gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(
    <LinearProgress indeterminate={true} />
  );
  const instance = wrapper.instance();
  instance.foundation.setDeterminate = td.func<
    (isDeterminate: boolean) => void
  >();
  instance.componentDidMount();
  td.verify(instance.foundation.setDeterminate(false), {times: 1});
});

test('#foundation.setProgress gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress progress={0.1} />);
  const instance = wrapper.instance();
  instance.foundation.setProgress = td.func<(value: number) => null>();
  instance.componentDidMount();
  td.verify(instance.foundation.setProgress(0.1), {times: 1});
});

test('#foundation.setReverse gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress reversed={true} />);
  const instance = wrapper.instance();
  instance.foundation.setReverse = td.func<(isReversed: boolean) => void>();
  instance.componentDidMount();
  td.verify(instance.foundation.setReverse(true), {times: 1});
});

test('#foundation.close gets called when the component mounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress closed />);
  const instance = wrapper.instance();
  instance.foundation.close = td.func<() => void>();
  instance.componentDidMount();
  td.verify(instance.foundation.close(), {times: 1});
});

test('#foundation.setBuffer gets called when props.buffer updates', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress buffer={0.1} />);
  wrapper.instance().foundation.setBuffer = td.func<(value: number) => void>();
  wrapper.setProps({buffer: 0.2});
  td.verify(wrapper.instance().foundation.setBuffer(0.2), {times: 1});
});

test('#foundation.close gets called when props.closed updates', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress closed={false} />);
  wrapper.instance().foundation.close = td.func<() => void>();
  wrapper.setProps({closed: true});
  td.verify(wrapper.instance().foundation.close(), {times: 1});
});

test('#foundation.open gets called when props.closed updates', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress closed={true} />);
  wrapper.instance().foundation.open = td.func<() => void>();
  wrapper.setProps({closed: false});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
});

test('#foundation.setDeterminate gets called when props.indeterminate updates', () => {
  const wrapper = mount<LinearProgress>(
    <LinearProgress indeterminate={false} />
  );
  wrapper.instance().foundation.setDeterminate = td.func<
    (isDeterminate: boolean) => void
  >();
  wrapper.setProps({indeterminate: true});
  td.verify(wrapper.instance().foundation.setDeterminate(false), {times: 1});
});

test('#foundation.setProgress gets called when props.progress updates', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress progress={0.1} />);
  wrapper.instance().foundation.setProgress = td.func<
    (value: number) => void
  >();
  wrapper.setProps({progress: 0.2});
  td.verify(wrapper.instance().foundation.setProgress(0.2), {times: 1});
});

test('#foundation.setReverse gets called when props.reversed updates', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress reversed={false} />);
  wrapper.instance().foundation.setReverse = td.func<
    (isReversed: boolean) => void
  >();
  wrapper.setProps({reversed: true});
  td.verify(wrapper.instance().foundation.setReverse(true), {times: 1});
});

test('#foundation.destroy gets called when the component unmounts', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(instance.foundation.destroy(), {times: 1});
});

test('#adapter.addClass adds a class to state', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  assert.isTrue(instance.adapter.hasClass('test-class'));
});

test('#adapter.addClass does not add a class to state if not mounted', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.isComponentMounted = false;
  instance.adapter.addClass('test-class');
  assert.isFalse(instance.adapter.hasClass('test-class'));
});

test('#adapter.removeClass removes a class from state', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  instance.adapter.removeClass('test-class');
  assert.isFalse(instance.adapter.hasClass('test-class'));
});

test('#adapter.removeClass does not remove a class from state if not mounted', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.addClass('test-class');
  instance.isComponentMounted = false;
  instance.adapter.removeClass('test-class');
  assert.isTrue(instance.adapter.hasClass('test-class'));
});

test('#adapter.setStyle sets a style property on an element', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.adapter.setStyle(instance.adapter.getPrimaryBar()!, 'width', '0');
  assert.equal(instance.adapter.getPrimaryBar()!.style.width, '0px');
});

test('#adapter.setStyle does not set a style property on an element if not mounted', () => {
  const wrapper = mount<LinearProgress>(<LinearProgress />);
  const instance = wrapper.instance();
  instance.isComponentMounted = false;
  instance.adapter.setStyle(instance.adapter.getPrimaryBar()!, 'width', '0');
  assert.equal(instance.adapter.getPrimaryBar()!.style.width, '');
});

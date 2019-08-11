import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import {cssClasses, strings} from '@material/slider';
import Slider from '../../../packages/slider/index';

suite('Slider');

test('classNames adds classes', () => {
  const testClass = 'test-class-name';
  const wrapper = shallow(<Slider className={testClass} />);
  assert.isTrue(wrapper.hasClass(testClass));
  assert.isTrue(wrapper.hasClass('mdc-slider'));
});

test('check default slider values', () => {
  const wrapper = mount(<Slider />);
  const domNode = wrapper.getDOMNode();
  assert.equal(domNode.getAttribute(strings.ARIA_VALUEMIN), '0');
  assert.equal(domNode.getAttribute(strings.ARIA_VALUEMAX), '100');
  assert.equal(domNode.getAttribute(strings.ARIA_VALUENOW), '0');
  assert.equal(domNode.getAttribute(strings.STEP_DATA_ATTR), '0');
});

test('renders a slider with specified values', () => {
  const wrapper = mount(<Slider min={1} max={10} value={3} step={1} />);
  const domNode = wrapper.getDOMNode();
  assert.equal(domNode.getAttribute(strings.ARIA_VALUEMIN), '1');
  assert.equal(domNode.getAttribute(strings.ARIA_VALUEMAX), '10');
  assert.equal(domNode.getAttribute(strings.ARIA_VALUENOW), '3');
  assert.equal(domNode.getAttribute(strings.STEP_DATA_ATTR), '1');
});

test('markers are only for discrete sliders', () => {
  const wrapper = shallow(<Slider displayMarkers />);
  assert.isFalse(wrapper.hasClass(cssClasses.DISCRETE));
  assert.equal(wrapper.find('.mdc-slider__pin').length, 0);
  assert.isFalse(wrapper.hasClass(cssClasses.HAS_TRACK_MARKER));
  assert.equal(wrapper.find('.mdc-slider__track-marker-container').length, 0);
});

test('renders a discrete slider', () => {
  const wrapper = shallow(<Slider discrete />);
  assert.isTrue(wrapper.hasClass(cssClasses.DISCRETE));
  assert.equal(wrapper.find('.mdc-slider__pin').length, 1);
  // No markers by default
  assert.isFalse(wrapper.hasClass(cssClasses.HAS_TRACK_MARKER));
  assert.equal(wrapper.find('.mdc-slider__track-marker-container').length, 0);
});

test('renders a discrete slider with markers', () => {
  const wrapper = shallow(<Slider discrete displayMarkers />);
  assert.isTrue(wrapper.hasClass(cssClasses.HAS_TRACK_MARKER));
  assert.equal(wrapper.find('.mdc-slider__track-marker-container').length, 1);
});

test('renders a disabled slider', () => {
  const wrapper = mount(<Slider disabled />);
  assert.equal(
    wrapper.getDOMNode().getAttribute(strings.ARIA_DISABLED),
    'true'
  );
});

test('renders a slider with an aria-label', () => {
  const testLabel = 'test-label';
  const wrapper = mount(<Slider ariaLabel={testLabel} />);
  assert.equal(wrapper.getDOMNode().getAttribute('aria-label'), testLabel);
});

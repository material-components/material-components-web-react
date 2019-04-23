import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardMedia} from '../../../packages/card/index';

suite('CardMedia');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardMedia className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__media'));
});

test('square props adds correct classes', () => {
  const wrapper = shallow(<CardMedia square />);
  assert.isTrue(wrapper.hasClass('mdc-card__media--square'));
  assert.isTrue(wrapper.hasClass('mdc-card__media'));
});

test('wide props adds correct classes', () => {
  const wrapper = shallow(<CardMedia wide />);
  assert.isTrue(wrapper.hasClass('mdc-card__media--16-9'));
  assert.isTrue(wrapper.hasClass('mdc-card__media'));
});

test('adds background image', () => {
  const imageUrl = './my/image/path/picture.jpg';
  const wrapper = shallow(<CardMedia imageUrl={imageUrl} />);
  assert.equal(wrapper.props().style.backgroundImage, `url(${imageUrl})`);
});

test('retains styles on image', () => {
  const wrapper = shallow(<CardMedia style={{color: 'orange'}} />);
  assert.equal(wrapper.props().style.color, 'orange');
});

test('adds media content if children exist', () => {
  const wrapper = shallow(<CardMedia>Vacation Pictures</CardMedia>);
  const mediaContent = wrapper.find('.mdc-card__media-content');
  assert.equal(mediaContent.length, 1);
  assert.equal(mediaContent.text(), 'Vacation Pictures');
});

test('adds classes to media content', () => {
  const wrapper = shallow(
    <CardMedia contentClassName='text-class-name'>Vacation Pictures</CardMedia>
  );
  const mediaContent = wrapper.find('.mdc-card__media-content');
  assert.isTrue(mediaContent.hasClass('text-class-name'));
});

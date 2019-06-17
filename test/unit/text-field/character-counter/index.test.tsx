import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import TextField, {
  Input,
  CharacterCounter,
} from '../../../../packages/text-field';

suite('Text Field Character Counter');

test('classNames adds classes', () => {
  const wrapper = shallow(<CharacterCounter className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field-character-counter'));
});

test('default props test', () => {
  const wrapper = shallow(<CharacterCounter />);
  assert.equal('0 / 0', wrapper.text());
});

test('maxLength test', () => {
  const maxLength = 100;
  const wrapper = mount<TextField>(
    <TextField characterCounter={<CharacterCounter />}>
      <Input maxLength={maxLength} />
    </TextField>
  );
  assert.equal(
    `0 / ${maxLength}`,
    wrapper.find('.mdc-text-field-character-counter').text()
  );
});

test('count test', () => {
  const value = 'test value';
  const wrapper = mount<TextField>(
    <TextField characterCounter={<CharacterCounter />}>
      <Input value={value} />
    </TextField>
  );
  assert.equal(
    `${value.length} / 0`,
    wrapper.find('.mdc-text-field-character-counter').text()
  );
});

test('template test', () => {
  const value = 'test value';
  const maxLength = 100;
  const wrapper = mount<TextField>(
    <TextField
      characterCounter={<CharacterCounter template='${count}|${maxLength}' />}
    >
      <Input value={value} maxLength={maxLength} />
    </TextField>
  );
  assert.equal(
    `${value.length}|${maxLength}`,
    wrapper.find('.mdc-text-field-character-counter').text()
  );
});

test('dynamic count test', () => {
  class TestComponent extends React.Component {
    state = {value: ''};
    render() {
      return (
        <TextField characterCounter={<CharacterCounter />}>
          <Input value={this.state.value} maxLength={250} />
        </TextField>
      );
    }
  }
  const wrapper = mount(<TestComponent />);
  const counter = wrapper.find('.mdc-text-field-character-counter');
  assert.equal('0 / 250', counter.text());
  wrapper.instance().setState({value: 'Test Value'});
  assert.equal('10 / 250', counter.text());
});

test('Character counter renders in front of input when tag is textarea', () => {
  const wrapper = mount<TextField>(
    <TextField textarea={true} characterCounter={<CharacterCounter />}>
      <Input />
    </TextField>
  );
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(0)
      .getDOMNode(),
    wrapper.find('.mdc-text-field-character-counter').getDOMNode()
  );
});

test(`MDC React doesn't need to implement this`, () => {
  const wrapper = shallow<CharacterCounter>(<CharacterCounter />);
  wrapper.instance().adapter.setContent('');
  wrapper.unmount();
});

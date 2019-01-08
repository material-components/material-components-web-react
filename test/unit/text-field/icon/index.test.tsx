import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import Icon from '../../../../packages/text-field/icon/index';
import MaterialIcon from '../../../../packages/material-icon/index';
import {coerceForTesting} from '../../helpers/types';

suite('Text Field Icon');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Icon>
      <i className='test-class-name' />
    </Icon>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field__icon'));
});

test('adds text to children', () => {
  const wrapper = shallow(
    <Icon>
      <i>Test</i>
    </Icon>
  );
  assert.equal(wrapper.text(), 'Test');
});

test('initializes with tabIndex', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i tabIndex={10} />
    </Icon>
  );
  assert.equal(wrapper.state().tabindex, 10);
});

test('initializes with role', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i role='button' />
    </Icon>
  );
  assert.equal(wrapper.state().role, 'button'); '';
});

test('#componentDidMount creates foundation', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i />
    </Icon>
  );
  assert.exists(wrapper.instance().foundation_);
});

test('#componentDidMount calls #foundation.setDisabled if disabled prop is true', () => {
  const wrapper = shallow<Icon>(
    <Icon disabled>
      <i />
    </Icon>
  );
  assert.equal(wrapper.state().tabindex, -1); // foundation setDisabled sets tabIndex -1
  assert.equal(wrapper.state().role, undefined);
});

test('#componentDidMount calls #foundation.setDisabled if disabled prop is true and tabindex=0', () => {
  const wrapper = shallow<Icon>(
    <Icon disabled>
      <i tabIndex={0} />
    </Icon>
  );
  assert.equal(wrapper.state().tabindex, -1);
  assert.equal(wrapper.state().role, undefined);
});

test('#componentDidMount sets tabindex if prop not present but onSelect exists', () => {
  // w/out tabindex onSelect will never fire && cursor: pointer is not applied
  const wrapper = shallow<Icon>(
    <Icon onSelect={() => {}}><MaterialIcon icon='favorite' /></Icon>);

  assert.equal(wrapper.state().tabindex, 0);
});

test(
  '#componentDidUpdate will set tabindex if prop not present but updates ' +
    'with onSelect',
  () => {
    const wrapper = shallow<Icon>(<Icon><MaterialIcon icon='favorite' /></Icon>);

    assert.equal(wrapper.state().tabindex, -1);
    wrapper.setProps({onSelect: () => {}});
    assert.equal(wrapper.state().tabindex, 0);
  }
);

test(
  '#componentDidUpdate calls #foundation.setDisabled if ' +
    'props.disabled updates',
  () => {
    const wrapper = shallow<Icon>(
      <Icon>
        <i tabIndex={0} />
      </Icon>
    );
    wrapper.instance().foundation_.setDisabled = td.func();
    wrapper.setProps({disabled: true});
    td.verify(wrapper.instance().foundation_.setDisabled(true), {times: 1});
  }
);

test(
  '#componentDidUpdate calls #foundation.setDisabled if ' +
    'props.disabled updates from true to false',
  () => {
    const wrapper = shallow<Icon>(
      <Icon disabled>
        <i tabIndex={0} />
      </Icon>
    );
    wrapper.instance().foundation_.setDisabled = td.func();
    wrapper.setProps({disabled: false});
    td.verify(wrapper.instance().foundation_.setDisabled(false), {times: 1});
  }
);

test(
  '#componentDidUpdate doesn\'t call #foundation.setDisabled if ' +
    'props.disabled is not updated',
  () => {
    const wrapper = shallow<Icon>(
      <Icon disabled>
        <i tabIndex={0} />
      </Icon>
    );
    wrapper.instance().foundation_.setDisabled = td.func();
    wrapper.setProps({children: <i />});
    td.verify(
      wrapper.instance().foundation_.setDisabled(td.matchers.isA(Boolean)),
      {times: 0}
    );
  }
);

test('#adapter.getAttr for tabIndex', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i tabIndex={0} />
    </Icon>
  );
  const tabIndex = wrapper.instance().foundation_.adapter_.getAttr('tabindex');
  assert.equal(tabIndex, '0');
});

test('#adapter.getAttr for role', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i role='button' />
    </Icon>
  );
  const role = wrapper.instance().foundation_.adapter_.getAttr('role');
  assert.equal(role, 'button');
});

test('#adapter.setAttr for tabIndex', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i tabIndex={0} />
    </Icon>
  );
  wrapper.instance().foundation_.adapter_.setAttr('tabindex', -1);
  assert.equal(wrapper.state().tabindex, -1);
});

test('#adapter.removeAttr for role', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i role='button' />
    </Icon>
  );
  wrapper.instance().foundation_.adapter_.removeAttr('role');
  assert.equal(wrapper.state().role, undefined);
});

test('#adapter.getAttr for tabIndex works with Custom Component', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <MaterialIcon icon='favorite' tabIndex={0} />
    </Icon>
  );
  const tabIndex = wrapper.instance().foundation_.adapter_.getAttr('tabindex');
  assert.equal(tabIndex, '0');
});

test('#adapter.getAttr for role works with Custom Component', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <MaterialIcon icon='favorite' role='button' />
    </Icon>
  );
  const role = wrapper.instance().foundation_.adapter_.getAttr('role');
  assert.equal(role, 'button');
});

test('#adapter.setAttr for tabIndex works with Custom Component', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <MaterialIcon icon='favorite' tabIndex={0} />
    </Icon>
  );
  wrapper.instance().foundation_.adapter_.setAttr('tabindex', -1);
  assert.equal(wrapper.state().tabindex, -1);
});

test('#adapter.removeAttr for role works with Custom Component', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <MaterialIcon icon='favorite' role='button' />
    </Icon>
  );
  wrapper.instance().foundation_.adapter_.removeAttr('role');
  assert.equal(wrapper.state().role, undefined);
});

test('#adapter.notifyIconAction calls props.onSelect', () => {
  const onSelect = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Icon>(
    <Icon onSelect={onSelect}>
      <MaterialIcon icon='favorite' role='button' />
    </Icon>
  );
  wrapper.instance().foundation_.adapter_.notifyIconAction();
  td.verify(onSelect(), {times: 1});
});

test('onClick calls foundation.handleInteraction', () => {
  const onSelect = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Icon>(
    <Icon onSelect={onSelect}>
      <MaterialIcon icon='favorite' role='button' />
    </Icon>
  );
  const evt = coerceForTesting<React.MouseEvent>({});
  wrapper.instance().foundation_.handleInteraction = td.func();
  wrapper.simulate('click', evt);
  td.verify(wrapper.instance().foundation_.handleInteraction(evt), {
    times: 1,
  });
});

test('onKeyDown call foundation.handleInteraction', () => {
  const onSelect = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Icon>(
    <Icon onSelect={onSelect}>
      <MaterialIcon icon='favorite' role='button' />
    </Icon>
  );
  const evt = coerceForTesting<React.KeyboardEvent>({});
  wrapper.instance().foundation_.handleInteraction = td.func();
  wrapper.simulate('keydown', evt);
  td.verify(wrapper.instance().foundation_.handleInteraction(evt), {
    times: 1,
  });
});

test('updating the role reflects on DOM node', () => {
  const wrapper = shallow(
    <Icon>
      <i role='button' />
    </Icon>
  );
  wrapper.setState({role: 'label'});
  assert.equal(wrapper.find('.mdc-text-field__icon').props().role, 'label');
});

test('updating the tabIndex reflects on DOM node', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i tabIndex={0} />
    </Icon>
  );
  wrapper.setState({tabindex: -1});
  assert.equal(wrapper.find('.mdc-text-field__icon').props().tabIndex, -1);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Icon>(
    <Icon>
      <i />
    </Icon>
  );
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

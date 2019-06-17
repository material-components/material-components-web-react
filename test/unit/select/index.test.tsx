import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import Select, {SelectHelperText} from '../../../packages/select/index';
import {MDCSelectFoundation} from '@material/select/foundation';
import {BaseSelect} from '../../../packages/select/BaseSelect';
import {SelectIcon} from '../../../packages/select';
import {coerceForTesting} from '../helpers/types';
import FloatingLabel from '../../../packages/floating-label/index';
import LineRipple from '../../../packages/line-ripple/index';
import NotchedOutline from '../../../packages/notched-outline';
import {MDCSelectHelperTextFoundation} from '@material/select/helper-text/foundation';
import {MDCSelectIconFoundation} from '@material/select/icon/foundation';

suite('Select');

const fakeClassName = 'my-added-class';
const fakeSecondClassName = 'my-other-class';

test('has mdc-select class', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-select'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Select label='my label' className='test-class-name' />
  );
  assert.isTrue(wrapper.childAt(0).hasClass('test-class-name'));
});

test('creates foundation', () => {
  const wrapper = mount<Select>(<Select label='my label' />);
  assert.exists(wrapper.state().foundation);
});

test('#foundation.handleChange gets called when state.value updates', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  const handleChange = td.func<() => void>();
  wrapper.setState({
    foundation: coerceForTesting<MDCSelectFoundation>({handleChange}),
  });
  const value = 'value';
  wrapper.setState({value});
  td.verify(wrapper.state().foundation!.handleChange(true), {times: 1});
});

test('state.value updates when props.value changes', () => {
  const wrapper = shallow<Select>(<Select label='my label' value='test val' />);
  const updatedValue = 'new test value';
  wrapper.setProps({value: updatedValue});
  assert.equal(wrapper.state().value, updatedValue);
});

test('#foundation.setDisabled gets called when props.disabled changes', () => {
  const wrapper = shallow<Select>(<Select label='my label' disabled={false} />);
  const setDisabled = td.func<() => void>();
  wrapper.setState({
    foundation: coerceForTesting<MDCSelectFoundation>({setDisabled}),
  });
  wrapper.setProps({disabled: true});
  td.verify(wrapper.state().foundation!.setDisabled(true), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  const foundation = wrapper.state().foundation!;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('props.outlined will add mdc-select--outlined', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-select--outlined'));
});

test('props.disabled will add mdc-select--disabled', () => {
  const wrapper = shallow(<Select label='my label' disabled />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-select--disabled'));
});

test('props.required will add mdc-select--required', () => {
  const wrapper = shallow(<Select label='my label' required />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-select--required'));
});

test('props.leadingIcon will add mdc-select--with-leading-icon', () => {
  const wrapper = shallow(<Select label='my label' leadingIcon={<i />} />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-select--with-leading-icon'));
});

test('a class in state.classList will be added to the select', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['best-class-name'])});
  assert.isTrue(wrapper.childAt(0).hasClass('best-class-name'));
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.instance().adapter.addClass(fakeClassName);
  assert.isTrue(wrapper.state().classList.has(fakeClassName));
});

test('#adapter.addClass cleans up classesBeingAdded', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.addClass(fakeClassName);
  assert.isFalse(wrapper.instance().classesBeingAdded.has(fakeClassName));
});

test('#adapter.removeClass removes from state.classList', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.setState({classList: new Set([fakeClassName])});
  wrapper.instance().adapter.removeClass(fakeClassName);
  assert.isFalse(wrapper.state().classList.has(fakeClassName));
});

test('#adapter.removeClass cleans up classesBeingRemoved', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.setState({classList: new Set([fakeClassName])});
  wrapper.instance().adapter.removeClass(fakeClassName);
  assert.isFalse(wrapper.instance().classesBeingRemoved.has(fakeClassName));
});

test('back to back calls to removeClass result in removing both classes', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.setState({classList: new Set([fakeClassName, fakeSecondClassName])});
  wrapper.instance().adapter.removeClass(fakeClassName);
  wrapper.instance().adapter.removeClass(fakeSecondClassName);
  assert.isFalse(wrapper.state().classList.has(fakeClassName));
  assert.isFalse(wrapper.state().classList.has(fakeSecondClassName));
});

test('#adapter.hasClass returns true if the string is in state.classList', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.setState({classList: new Set([fakeClassName])});
  assert.isTrue(wrapper.instance().adapter.hasClass(fakeClassName));
});

test('#adapter.hasClass returns true if the string is in classesBeingAdded', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().classesBeingAdded.add(fakeClassName);
  assert.isTrue(wrapper.instance().adapter.hasClass(fakeClassName));
});

test('#adapter.hasClass returns false if the string is not in state.classList', () => {
  const wrapper = shallow<Select>(<Select />);
  assert.isFalse(wrapper.instance().adapter.hasClass(fakeClassName));
});

test('#adapter.hasClass returns false if the string is included in classesBeingRemoved', () => {
  const wrapper = shallow<Select>(<Select className={fakeClassName} />);
  assert.isTrue(wrapper.instance().adapter.hasClass(fakeClassName));
  wrapper.instance().classesBeingRemoved.add(fakeClassName);
  assert.isFalse(wrapper.instance().adapter.hasClass(fakeClassName));
});

test('#adapter.setRippleCenter', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.setRippleCenter(23);
  assert.equal(wrapper.state().lineRippleCenter, 23);
});

test('#adapter.getValue returns state.value', () => {
  const wrapper = shallow<Select>(<Select />);
  const value = 'value';
  wrapper.setState({value});
  assert.equal(wrapper.instance().adapter.getValue(), value);
});

test('#adapter.setValue sets state.value', () => {
  const wrapper = shallow<Select>(<Select />);
  const value = 'value';
  wrapper.instance().adapter.setValue(value);
  assert.equal(wrapper.state().value, value);
});

test('#adapter.setDisabled sets state.disabled', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.setDisabled(true);
  assert.equal(wrapper.state().disabled, true);
});

test('#adapter.closeMenu sets state.open to false', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.closeMenu();
  assert.isFalse(wrapper.state().open);
});

test('#adapter.openMenu sets state.open to true', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.openMenu();
  assert.isTrue(wrapper.state().open);
});

test('#adapter.isMenuOpen for nativeSelect always returns false', () => {
  const wrapper = shallow<Select>(<Select />);
  assert.isFalse(wrapper.instance().adapter.isMenuOpen());
  wrapper.setState({open: true});
  assert.isFalse(wrapper.instance().adapter.isMenuOpen());
});

test('#adapter.checkValidity for nativeSelect returns nativeControl.checkValidity()', () => {
  const checkValidity = td.func();
  td.when(checkValidity()).thenReturn(true);
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().nativeControl = {
    current: coerceForTesting<HTMLSelectElement>({checkValidity}),
  };
  assert.isTrue(wrapper.instance().adapter.checkValidity());
});

test('#adapter.checkValidity for nativeSelect returns false if there is not nativeSelect', () => {
  const wrapper = shallow<Select>(<Select />);
  assert.isFalse(wrapper.instance().adapter.checkValidity());
});

test('#adapter.setValid for nativeSelect adds invalid class when isValid = false', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.instance().adapter.setValid(false);
  assert.isTrue(
    wrapper.state().classList.has(MDCSelectFoundation.cssClasses.INVALID)
  );
});

test('#adapter.setValid for nativeSelect removes invalid class when isValid = true', () => {
  const wrapper = shallow<Select>(<Select />);
  wrapper.setState({
    classList: new Set([MDCSelectFoundation.cssClasses.INVALID]),
  });
  wrapper.instance().adapter.setValid(true);
  assert.isFalse(
    wrapper.state().classList.has(MDCSelectFoundation.cssClasses.INVALID)
  );
});

test('#adapter.isMenuOpen for enhancedSelect returns true when state.open = true', () => {
  const wrapper = shallow<Select>(<Select enhanced />);
  wrapper.setState({open: true});
  assert.isTrue(wrapper.instance().adapter.isMenuOpen());
});

test('#adapter.isMenuOpen for enhancedSelect returns false when state.open = false', () => {
  const wrapper = shallow<Select>(<Select enhanced />);
  assert.isFalse(wrapper.instance().adapter.isMenuOpen());
});

test('#adapter.checkValidity for enhancedSelect returns true if state.value exists & props.required=true', () => {
  const wrapper = shallow<Select>(<Select enhanced value='meow' required />);
  assert.isTrue(wrapper.instance().adapter.checkValidity());
});

test('#adapter.checkValidity for enhancedSelect returns false if no state.value & props.required=true', () => {
  const wrapper = shallow<Select>(<Select enhanced required />);
  assert.isFalse(wrapper.instance().adapter.checkValidity());
});

test('#adapter.checkValidity for enhancedSelect returns true props.disabled=true', () => {
  const wrapper = shallow<Select>(<Select enhanced required disabled />);
  assert.isTrue(wrapper.instance().adapter.checkValidity());
});

test('#adapter.checkValidity for enhancedSelect returns false if no state.value & props.required=true', () => {
  const wrapper = shallow<Select>(<Select enhanced required />);
  assert.isFalse(wrapper.instance().adapter.checkValidity());
});

test(
  '#adapter.setValid for enhancedSelect sets state.isInvalid to false and ' +
    'removes invalid class when isValid=true',
  () => {
    const wrapper = shallow<Select>(<Select enhanced />);
    wrapper.setState({
      classList: new Set([MDCSelectFoundation.cssClasses.INVALID]),
    });
    wrapper.instance().adapter.setValid(true);
    assert.isFalse(wrapper.state().isInvalid);
    assert.isFalse(
      wrapper.state().classList.has(MDCSelectFoundation.cssClasses.INVALID)
    );
  }
);

test(
  '#adapter.setValid for enhancedSelect sets state.isInvalid to true and ' +
    'adds invalid class when isValid=false',
  () => {
    const wrapper = shallow<Select>(<Select enhanced />);
    wrapper.instance().adapter.setValid(false);
    assert.isTrue(wrapper.state().isInvalid);
    assert.isTrue(
      wrapper.state().classList.has(MDCSelectFoundation.cssClasses.INVALID)
    );
  }
);

test('#adapter.floatLabel set state.labelIsFloated', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.instance().adapter.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.getLabelWidth returns state.labelWidth', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  const labelWidth = 59;
  wrapper.setState({labelWidth});
  assert.equal(wrapper.instance().adapter.getLabelWidth(), 59);
});

test('#adapter.activateBottomLine sets state.activeLineRipple to true', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.instance().adapter.activateBottomLine();
  assert.isTrue(wrapper.state().activeLineRipple);
});

test('#adapter.deactivateBottomLine sets state.activeLineRipple to false', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.setState({activeLineRipple: false});
  wrapper.instance().adapter.deactivateBottomLine();
  assert.isFalse(wrapper.state().activeLineRipple);
});

test('#adapter.notifyChange calls props.afterChange with the updated value', () => {
  const afterChange = td.func<(value: string) => void>();
  const wrapper = shallow<Select>(<Select afterChange={afterChange} />);
  wrapper.instance().adapter.notifyChange('test');
  td.verify(afterChange('test'));
});

test('#adapter.notchOutline sets state.outlineIsNotched to true', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.instance().adapter.notchOutline(0);
  assert.isTrue(wrapper.state().outlineIsNotched);
});

test('#adapter.closeOutline sets state.outlineIsNotched to false', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.setState({outlineIsNotched: true});
  wrapper.instance().adapter.closeOutline();
  assert.isFalse(wrapper.state().outlineIsNotched);
});

test('#adapter.hasOutline returns true if props.outlined is true', () => {
  const wrapper = shallow<Select>(<Select label='my label' outlined />);
  assert.isTrue(wrapper.instance().adapter.hasOutline());
});

test('#adapter.hasOutline returns false if props.outlined is false', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  assert.isFalse(wrapper.instance().adapter.hasOutline());
});

test('renders dropdown icon', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(0)
      .type(),
    'i'
  );
});

test('renders leadingIcon if props.leadingIcon is set', () => {
  const wrapper = shallow(<Select leadingIcon={<i>favorite</i>} />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(0)
      .type(),
    'i'
  );
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(1)
      .type(),
    'i'
  );
});

test('renders notchedOutline if props.outlined is true', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(2)
      .type(),
    NotchedOutline
  );
});

test('renders lineRipple if props.outlined is false', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(3)
      .type(),
    LineRipple
  );
});

test('renders BaseSelect for select', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(1)
      .type(),
    BaseSelect
  );
});

test('does not pass className to BaseSelect', () => {
  const wrapper = shallow(
    <Select label='my label' className='container-class' />
  );
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(1)
      .prop('className'),
    ''
  );
});

test('pass selectClassName to BaseSelect', () => {
  const wrapper = shallow(
    <Select label='my label' selectClassName='select-class' />
  );
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(1)
      .prop('className'),
    'select-class'
  );
});

test('renders FloatingLabel after BaseSelect if props.label exists', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(2)
      .type(),
    FloatingLabel
  );
});

test('renders no FloatingLabel if props.label does not exists', () => {
  const wrapper = shallow(<Select />);
  assert.notEqual(
    wrapper
      .childAt(0)
      .childAt(2)
      .type(),
    FloatingLabel
  );
});

test('passes classNames to NativeSelect through props.selectClassName', () => {
  const className = 'native-class';
  const wrapper = mount(
    <Select label='my label' selectClassName={className} />
  );
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(1)
      .childAt(0)
      .getDOMNode()
      .classList.contains('mdc-select__native-control')
  );
});

test('#NativeSelect.value will update with Select.state.value', () => {
  const wrapper = mount<Select>(<Select />);
  const value = 'value';
  wrapper.setState({value});

  assert.equal(wrapper.state().value, value);
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(1)
      .childAt(0)
      .props().value,
    value
  );
});

test('passes foundation to BaseSelect', () => {
  const wrapper = mount<Select>(<Select label='my label' />);
  const baseSelect = wrapper
    .childAt(0)
    .childAt(1)
    .props();
  assert.equal(baseSelect.foundation, wrapper.state().foundation);
});

test('renders just one option passed as children', () => {
  const options = <option value='grape'>Grape</option>;
  const wrapper = mount(<Select label='my label'>{options}</Select>);
  assert.equal(wrapper.find('option').length, 1);
});

test('renders options passed as children', () => {
  const options = (
    <React.Fragment>
      <option value='grape'>Grape</option>
      <option value='raisin'>Raisin</option>
    </React.Fragment>
  );
  const wrapper = mount(<Select label='my label'>{options}</Select>);
  assert.equal(wrapper.find('option').length, 2);
});

test('renders options passed as array of 1 string', () => {
  const wrapper = mount(<Select label='my label' options={['opt 1']} />);
  assert.equal(wrapper.find('option[value="opt 1"]').length, 1);
});

test('renders options passed as array of strings', () => {
  const wrapper = mount(
    <Select label='my label' options={['opt 1', 'opt 2', 'opt 3']} />
  );
  assert.equal(wrapper.find('option').length, 3);
});

test('renders options passed as array of 1 object', () => {
  const wrapper = mount(
    <Select label='my label' options={[{label: 'opt 1', value: 'opt-1'}]} />
  );
  assert.equal(wrapper.find('option[value="opt-1"]').length, 1);
});

test('renders options passed as array of objects', () => {
  const wrapper = mount(
    <Select
      label='my label'
      options={[
        {label: 'opt 1', value: 'opt-1'},
        {label: 'opt 2', value: 'opt-2'},
        {label: 'opt 3', value: 'opt-3'},
      ]}
    />
  );
  assert.equal(wrapper.find('option').length, 3);
});

test('renders options as disabled', () => {
  const wrapper = mount(
    <Select
      label='my label'
      options={[
        {label: 'opt 1', value: 'opt-1', disabled: true},
        {label: 'opt 2', value: 'opt-2'},
        {label: 'opt 3', value: 'opt-3'},
      ]}
    />
  );
  assert.equal(wrapper.find('option[disabled]').length, 1);
});

test('passes classNames to FloatingLabel through props.floatingLabelClassName', () => {
  const className = 'floating-class';
  const wrapper = shallow(
    <Select label='my label' floatingLabelClassName={className} />
  );
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(2)
      .hasClass(className)
  );
});

test('updates float prop with state.labelIsFloated', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({labelIsFloated: true});
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(2)
      .props().float
  );
});

test('#floatingLabel.handleWidthChange updates state.labelWidth', () => {
  const wrapper = shallow<Select>(<Select label='my label' />);
  wrapper.setState({labelWidth: 60});
  assert.equal(wrapper.state().labelWidth, 60);
});

test('passes classNames to LineRipple through props.lineRippleClassName', () => {
  const className = 'line-ripple-class';
  const wrapper = shallow(
    <Select label='my label' lineRippleClassName={className} />
  );
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(3)
      .hasClass(className)
  );
});

test('updates active prop with state.activeLineRipple', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({activeLineRipple: true});
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(3)
      .props().active
  );
});

test('passes classNames to NotchedOutline through props.notchedOutlineClassName', () => {
  const className = 'notched-outline-class';
  const wrapper = shallow(
    <Select label='my label' outlined notchedOutlineClassName={className} />
  );
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(2)
      .hasClass(className)
  );
});

test('updates notch prop with state.outlineIsNotched', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  wrapper.setState({outlineIsNotched: true});
  assert.isTrue(
    wrapper
      .childAt(0)
      .childAt(2)
      .props().notch
  );
});

test('updates notchWidth prop with state.labelWidth', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  wrapper.setState({labelWidth: 55});
  assert.equal(
    wrapper
      .childAt(0)
      .childAt(2)
      .props().notchWidth,
    55
  );
});

test('createFoundation instantiates a new foundation', () => {
  const wrapper = shallow<Select>(<Select label='my label' outlined />);
  const currentFoundation = wrapper.state().foundation;
  wrapper.instance().createFoundation();
  assert.notEqual(currentFoundation, wrapper.state().foundation);
});

test('update to state.helperTextFoundation creates a new foundation', () => {
  const wrapper = shallow<Select>(<Select label='my label' outlined />);
  const destroy = (wrapper.state().foundation!.destroy = td.func<() => {}>());
  wrapper.setState({
    helperTextFoundation: coerceForTesting<MDCSelectHelperTextFoundation>({}),
  });
  assert.exists(wrapper.state().foundation);
  td.verify(destroy(), {times: 1});
});

test('update to state.iconFoundation creates a new foundation', () => {
  const wrapper = shallow<Select>(<Select label='my label' outlined />);
  const destroy = (wrapper.state().foundation!.destroy = td.func<() => {}>());
  wrapper.setState({
    iconFoundation: coerceForTesting<MDCSelectIconFoundation>({}),
  });
  assert.exists(wrapper.state().foundation);
  td.verify(destroy(), {times: 1});
});

test('leadingIcon.props.setIconFoundation() updates state.iconFoundation', () => {
  const wrapper = mount<Select>(
    <Select label='my label' leadingIcon={<SelectIcon />} />
  );
  const foundation = coerceForTesting<MDCSelectIconFoundation>({});
  wrapper
    .childAt(0)
    .childAt(0)
    .props().setIconFoundation!(foundation);
  assert.equal(wrapper.state().iconFoundation, foundation);
});

test('leadingIcon.props.setHelperTextFoundation() updates state.helperTextFoundation', () => {
  const wrapper = mount<Select>(<Select helperText={<SelectHelperText />} />);
  const foundation = coerceForTesting<MDCSelectHelperTextFoundation>({});
  wrapper.childAt(1).props().setHelperTextFoundation!(
    coerceForTesting<MDCSelectHelperTextFoundation>(foundation)
  );
  assert.equal(wrapper.state().helperTextFoundation, foundation);
});

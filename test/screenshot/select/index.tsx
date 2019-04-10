import React from 'react';
import {Link} from 'react-router-dom';
import selectVariants from './variants';
import Select, {SelectProps, Option} from '../../../packages/select/index';
import '../../../packages/select/index.scss';
import './index.scss';

export default () => {
  return (
    <div>
      {selectVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/select/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};

interface SelectTestProps extends SelectProps {
  enhanced: boolean;
}

interface SelectTestState {
  value: string;
}

class SelectTest extends React.Component<SelectTestProps, SelectTestState> {
  constructor(props: SelectTestProps) {
    super(props);
    this.state = {value: props.value || ''}; // eslint-disable-line react/prop-types
  }

  static defaultProps: Partial<SelectProps> = {
    className: '',
    disabled: false,
    floatingLabelClassName: '',
    isRtl: false,
    lineRippleClassName: '',
    nativeControlClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    options: [],
    onChange: () => {},
    enhanced: false,
  }

  onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => (
    this.setState({value: evt.target.value})
  );

  onEnhancedChange = (_index: number, item: Element) => (
    this.setState({value: item.getAttribute('data-value') as string})
  );

  render() {
    const {
      disabled,
      id,
      isRtl,
      enhanced,
      ref, // eslint-disable-line no-unused-vars
      ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <Select
          {...otherProps}
          className='test-select'
          label='Dog'
          id={id}
          enhanced={enhanced}
          isRtl={isRtl}
          disabled={disabled}
          onChange={this.onChange}
          onEnhancedChange={this.onEnhancedChange}
          value={this.state.value}
        >
          <Option enhanced={enhanced} value='' disabled />
          <Option enhanced={enhanced} value='labradoodle'>Labradoodle</Option>
          <Option enhanced={enhanced} value='pomsky'>Pomsky</Option>
          <Option enhanced={enhanced} value='aussiepom'>Aussiepom</Option>
          <Option enhanced={enhanced} value='bullmation'>Bullmation</Option>
        </Select>
      </div>
    );
  }
}

const variants = [{}, {outlined: true}];
const rtlMap = [{}, {isRtl: true}];
const disabledMap = [{}, {disabled: true}];
const requiredMap = [{}, {required: true}];
const valueMap = [{}, {value: 'pomsky'}];

export const getSelects = (enhanced: boolean = false) => variants.map((variant) => {
  return rtlMap.map((isRtl) => {
    return disabledMap.map((disabled) => {
      return valueMap.map((value) => {
        return requiredMap.map((required) => {
          const props = Object.assign({}, variant, disabled, isRtl, value, required, {enhanced});
          const valueKey = Object.keys(value)[0] || '';
          const variantKey = Object.keys(variant)[0] || '';
          const rtlKey = Object.keys(isRtl)[0] || '';
          const disabledKey = Object.keys(disabled)[0] || '';
          const requiredKey = Object.keys(required)[0] || '';
          const key = `${variantKey}-${disabledKey}-${valueKey}-${requiredKey}-${enhanced}--${rtlKey}`;
          return <SelectTest {...props} key={key} id={key} />;
        });
      });
    });
  });
});


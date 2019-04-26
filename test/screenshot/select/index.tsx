import React from 'react';
import Select, {SelectProps} from '../../../packages/select/index';

interface SelectTestState {
  value: any
}

class SelectTest extends React.Component<SelectProps, SelectTestState> {
  constructor(props: SelectProps) {
    super(props);
    this.state = {value: props.value || ''}; // eslint-disable-line react/prop-types
  }

  static defaultProps: Partial<SelectProps> = {
    box: false,
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
  }

  onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => (
    this.setState({value: evt.target.value})
  );

  render() {
    const {
      disabled,
      id,
      isRtl,
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
          isRtl={isRtl}
          disabled={disabled}
          onChange={this.onChange}
          value={this.state.value}
        >
          <option value='' disabled />
          <option value='labradoodle'>Labradoodle</option>
          <option value='pomsky'>Pomsky</option>
          <option value='aussiepom'>Aussiepom</option>
          <option value='bullmation'>Bullmation</option>
        </Select>
      </div>
    );
  }
}

const variants = [{}, {box: true}, {outlined: true}];
const rtlMap = [{}, {isRtl: true}];
const disabledMap = [{}, {disabled: true}];
const valueMap = [{}, {value: 'pomsky'}];

const selects = variants.map((variant) => {
  return rtlMap.map((isRtl) => {
    return disabledMap.map((disabled) => {
      return valueMap.map((value) => {
        const props = Object.assign({}, variant, disabled, isRtl, value);
        const valueKey = Object.keys(value)[0] || '';
        const variantKey = Object.keys(variant)[0] || '';
        const rtlKey = Object.keys(isRtl)[0] || '';
        const disabledKey = Object.keys(disabled)[0] || '';
        const key = `${variantKey}-${disabledKey}-${valueKey}--${rtlKey}`;
        return <SelectTest {...props} key={key} id={key} />;
      });
    });
  });
});

const SelectScreenshotTest = () => {
  return <div className='select-container'>{selects}</div>;
};
export default SelectScreenshotTest;

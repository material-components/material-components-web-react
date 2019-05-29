import React from 'react';
import {Link} from 'react-router-dom';
import selectVariants from './variants';
import Select, {
  SelectIcon,
  SelectProps,
  Option,
  SelectHelperText,
} from '../../../packages/select/index';
import '../../../packages/select/index.scss';
import './index.scss';

const SelectScreenshotTest = () => {
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
    this.state = {value: props.value || ''};
  }

  static defaultProps: Partial<SelectProps> = {
    className: '',
    disabled: false,
    floatingLabelClassName: '',
    lineRippleClassName: '',
    selectClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    options: [],
    onChange: () => {},
    enhanced: false,
  };

  onChange = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({value: evt.target.value});

  onEnhancedChange = (_index: number, item: Element) =>
    this.setState({value: item.getAttribute('data-value') as string});

  render() {
    const {
      disabled,
      id,
      enhanced,
      ref, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...otherProps
    } = this.props;
    return (
      <div className='test-select'>
        <Select
          {...otherProps}
          label='Dog'
          id={id}
          enhanced={enhanced}
          disabled={disabled}
          onChange={this.onChange}
          onEnhancedChange={this.onEnhancedChange}
          value={this.state.value}
        >
          <Option enhanced={enhanced} value='' disabled />
          <Option enhanced={enhanced} value='labradoodle'>
            Labradoodle
          </Option>
          <Option enhanced={enhanced} value='pomsky'>
            Pomsky
          </Option>
          <Option enhanced={enhanced} value='aussiepom'>
            Aussiepom
          </Option>
          <Option enhanced={enhanced} value='bullmation'>
            Bullmation
          </Option>
        </Select>
      </div>
    );
  }
}

const variants = [{}, {outlined: true}];
const leadingIconMap = [
  {},
  {
    leadingIcon: <SelectIcon className='material-icons'>favorite</SelectIcon>,
    key: 'favorite',
  },
];
const disabledMap = [{}, {disabled: true}];
const requiredMap = [{}, {required: true}];
const valueMap = [{}, {value: 'pomsky'}];
const helperTextMap = [
  {key: 'nohelpertext'},
  {
    helperText: <SelectHelperText persistent>Help me</SelectHelperText>,
    key: 'persistent',
  },
];

export const getSelects = (enhanced: boolean = false) =>
  variants.map((variant) => {
    return disabledMap.map((disabled) => {
      return valueMap.map((value) => {
        return requiredMap.map((required) => {
          return helperTextMap.map((helperText) => {
            return leadingIconMap.map((icon) => {
              const props = Object.assign(
                {},
                variant,
                disabled,
                value,
                required,
                helperText,
                icon,
                {enhanced}
              );
              const valueKey = Object.keys(value)[0] || '';
              const variantKey = Object.keys(variant)[0] || '';
              const disabledKey = Object.keys(disabled)[0] || '';
              const requiredKey = Object.keys(required)[0] || '';
              const key = `${variantKey}-${disabledKey}-${valueKey}-${requiredKey}
              -${helperText.key}-${icon.key}-${enhanced}`;
              return <SelectTest {...props} key={key} id={key} />;
            });
          });
        });
      });
    });
  });

export default SelectScreenshotTest;

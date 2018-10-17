import React from 'react';

import TextField, {Input, HelperText} from '../../../packages/text-field/index';
import MaterialIcon from '../../../packages/material-icon/index';

import '../../../packages/floating-label/index.scss';
import '../../../packages/line-ripple/index.scss';
import '../../../packages/notched-outline/index.scss';
import '../../../packages/text-field/index.scss';

class TestField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value === '' ? props.value : 'woof', // eslint-disable-line react/prop-types
    };
  }
  render() {
    const {
      /* eslint-disable react/prop-types */
      disabled,
      id,
      isRtl,
      minLength,
      required,
      value, // eslint-disable-line no-unused-vars
      /* eslint-enable react/prop-types */
      ...otherProps
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <TextField label='Dog' {...otherProps} className='text-field' isRtl={isRtl}>
          <Input value={this.state.value}
            id={id}
            minLength={minLength}
            required={required}
            disabled={disabled}
            onChange={(e) => this.setState({value: e.target.value})}/>
        </TextField>
      </div>
    );
  }
}

const icon = <MaterialIcon icon='favorite' />;
const iconAlt = <MaterialIcon icon='work' />;
const variants = [
  {},
  {outlined: true},
  {fullWidth: true},
];
const icons = [
  {},
  {leadingIcon: icon},
  {trailingIcon: icon},
  {leadingIcon: icon, trailingIcon: iconAlt},
];

const denseMap = [
  {},
  {dense: true},
];

const rtlMap = [
  {},
  {isRtl: true},
];

const requiredMap = [
  {},
  {required: true},
];

const disabledMap = [
  {},
  {disabled: true},
];

const helperTextMap = [
  {},
  {helperText: (
    <HelperText persistent>Help me</HelperText>
  )},
  {helperText: (
    <HelperText validation>Error message</HelperText>
  )},
];

const getHelperKeyText = (helperText, helperTextIndex) => {
  const hasHelperText = Object.keys(helperText).length > 0;
  const isValidationMsg = helperTextIndex === 2;

  if (!hasHelperText) {
    return '';
  } else if (isValidationMsg) {
    return 'validation';
  } else {
    return 'persistent';
  }
};

const textFields = variants.map((variant) => {
  return icons.map((icon) => {
    return denseMap.map((dense) => {
      return rtlMap.map((isRtl) => {
        return requiredMap.map((isRequired) => {
          return disabledMap.map((disabled) => {
            return helperTextMap.map((helperText, helperTextIndex) => {
              const isValidationTextField = helperTextIndex === 2;
              const value = !isValidationTextField ? {value: null} : {value: ''};
              const variantKey = Object.keys(variant)[0] || '';
              const iconKey = Object.keys(icon)[0] || '';
              const denseKey = Object.keys(dense)[0] || '';
              const rtlKey = Object.keys(isRtl)[0] || '';
              const disabledKey = Object.keys(disabled)[0] || '';
              const isRequiredKey = Object.keys(isRequired)[0] || '';
              const helperTextKey = getHelperKeyText(helperText, helperTextIndex);

              const props = Object.assign({}, variant, icon, dense, disabled, helperText, isRequired, isRtl, value);
              const key =
                `${variantKey}-${iconKey}-${denseKey}-${disabledKey}-${helperTextKey}-${isRequiredKey}--${rtlKey}`;

              const hasIcon = iconKey === 'leadingIcon' || iconKey === 'trailingIcon';
              if (variantKey === 'fullWidth' && hasIcon) {
                return;
              }

              return <TestField {...props} key={key} id={key} />;
            });
          });
        });
      });
    });
  });
});

const textareaVariants = [
  {},
  {fullWidth: true},
];

const textareaFields = textareaVariants.map((variant) => {
  return denseMap.map((dense) => {
    return rtlMap.map((isRtl) => {
      return disabledMap.map((disabled) => {
        return helperTextMap.map((helperText, helperTextIndex) => {
          const props = Object.assign({}, variant, dense, disabled, helperText, isRtl);
          const helperTextKey = helperText.length > 0 ? `-${getHelperKeyText(helperText, helperTextIndex)}` : '';
          const key = `textarea-${JSON.stringify(props)}${helperTextKey}`;
          return <TestField textarea {...props} key={key} id={key} />;
        });
      });
    });
  });
});


const TextFieldScreenshotTest = () => (
  <div className='text-field-container'>
    {textFields}
    <h2>Textarea</h2>
    {textareaFields}
  </div>
);

export default TextFieldScreenshotTest;

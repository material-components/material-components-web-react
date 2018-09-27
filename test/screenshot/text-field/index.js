import React from 'react';

import TextField, {Input, HelperText} from '../../../packages/text-field/index';
import MaterialIcon from '../../../packages/material-icon/index';

import '../../../packages/floating-label/index.scss';
import '../../../packages/line-ripple/index.scss';
import '../../../packages/notched-outline/index.scss';
import '../../../packages/text-field/index.scss';

class TestField extends React.Component {
  state = {value: 'woof'};
  render() {
    const {
      disabled, id, isRtl, ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <TextField label='Dog' {...otherProps} className='text-field' isRtl={isRtl}>
          <Input value={this.state.value}
            id={id}
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

const disabledMap = [
  {},
  {disabled: true},
];

const helperTextMap = [
  {},
  {helperText: (
    <HelperText persistent>Help me</HelperText>
  )},
];

const textFields = variants.map((variant) => {
  return icons.map((icon) => {
    return denseMap.map((dense) => {
      return rtlMap.map((isRtl) => {
        return disabledMap.map((disabled) => {
          return helperTextMap.map((helperText) => {
            const props = Object.assign({}, variant, icon, dense, disabled, helperText, isRtl);
            const variantKey = Object.keys(variant)[0] || '';
            const iconKey = Object.keys(icon)[0] || '';
            const denseKey = Object.keys(dense)[0] || '';
            const rtlKey = Object.keys(isRtl)[0] || '';
            const disabledKey = Object.keys(disabled)[0] || '';
            const helperTextKey = Object.keys(helperText)[0] || '';
            const key = `${variantKey}-${iconKey}-${denseKey}-${disabledKey}-${helperTextKey}--${rtlKey}`;

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


const TextFieldScreenshotTest = () => (
  <div className='text-field-container'>
    {textFields}
  </div>
);

export default TextFieldScreenshotTest;

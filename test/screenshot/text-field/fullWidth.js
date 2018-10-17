import React from 'react';

import TextField, {Input, HelperText} from '../../../packages/text-field/index';
import MaterialIcon from '../../../packages/material-icon/index';
import {denseMap, rtlMap , requiredMap, disabledMap, helperTextMap} from './maps';
import TestField from './TestTextField';

const icon = <MaterialIcon icon='favorite' />;
const iconAlt = <MaterialIcon icon='work' />;

const icons = [
  {},
  {leadingIcon: icon},
  {trailingIcon: icon},
  {leadingIcon: icon, trailingIcon: iconAlt},
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

const textFields = icons.map((icon) => {
  return denseMap.map((dense) => {
    return rtlMap.map((isRtl) => {
      return requiredMap.map((isRequired) => {
        return disabledMap.map((disabled) => {
          return helperTextMap.map((helperText, helperTextIndex) => {
            const isValidationTextField = helperTextIndex === 2;
            const value = !isValidationTextField ? {value: null} : {value: ''};
            const iconKey = Object.keys(icon)[0] || '';
            const denseKey = Object.keys(dense)[0] || '';
            const rtlKey = Object.keys(isRtl)[0] || '';
            const disabledKey = Object.keys(disabled)[0] || '';
            const isRequiredKey = Object.keys(isRequired)[0] || '';
            const helperTextKey = getHelperKeyText(helperText, helperTextIndex);

            const props = Object.assign({}, icon, dense, disabled, helperText, isRequired, isRtl, value);
            const key =
              `${iconKey}-${denseKey}-${disabledKey}-${helperTextKey}-${isRequiredKey}--${rtlKey}`;

            const hasIcon = iconKey === 'leadingIcon' || iconKey === 'trailingIcon';

            if (hasIcon) {
              return;
            }

            return <TestField fullWidth {...props} key={key} id={key} />;
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

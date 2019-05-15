import React from 'react';
import {
  iconsMap,
  denseMap,
  rtlMap,
  requiredMap,
  disabledMap,
  helperTextMap,
  getHelperKeyText,
  HelperTextMapType,
  isValidationMsg,
} from './attributesMap';
import TestField from './TestTextField';

const textFields = (variantProps: {variant?: string}) => {
  return iconsMap.map(
    (icon: {
      leadingIcon?: React.ReactNode;
      onLeadingIconSelect?: () => void;
      trailingIcon?: React.ReactNode;
      onTrailingIconSelect?: () => void;
    }) => {
      return denseMap.map((dense: {dense?: boolean}) => {
        return rtlMap.map((isRtl: {isRtl?: boolean}) => {
          return requiredMap.map((isRequired: {required?: boolean}) => {
            return disabledMap.map((disabled: {disabled?: boolean}) => {
              return helperTextMap.map((helperText: HelperTextMapType | {}) => {
                const isValidationTextField = isValidationMsg(helperText);
                const value = !isValidationTextField
                  ? {value: null}
                  : {value: ''};
                const iconKey = Object.keys(icon)[0] || '';
                const denseKey = Object.keys(dense)[0] || '';
                const rtlKey = Object.keys(isRtl)[0] || '';
                const disabledKey = Object.keys(disabled)[0] || '';
                const isRequiredKey = Object.keys(isRequired)[0] || '';
                const helperTextKey = getHelperKeyText(
                  helperText,
                  isValidationTextField
                );
                const props = Object.assign(
                  {},
                  variantProps,
                  icon,
                  dense,
                  disabled,
                  helperText,
                  isRequired,
                  isRtl,
                  value
                );
                const key = `${iconKey}-${denseKey}-${disabledKey}-${helperTextKey}-${isRequiredKey}--${rtlKey}`;
                const hasIcon =
                  iconKey === 'leadingIcon' || iconKey === 'trailingIcon';
                if (hasIcon && variantProps.variant === 'fullWidth') {
                  return;
                }
                return <TestField {...props} key={key} id={key} />;
              });
            });
          });
        });
      });
    }
  );
};

const TextFieldScreenshotTest = (variantProps: {variant?: string}) => (
  <div className='text-field-container'>{textFields(variantProps)}</div>
);

export default TextFieldScreenshotTest;

import * as React from 'react';
// @ts-ignore
import HelperText from '../../../packages/text-field/helper-text/index.tsx';
import {
  denseMap,
  requiredMap,
  rtlMap,
  disabledMap,
  helperTextMap,
  getHelperKeyText,
} from './attributesMap';
import TestField from './TestTextField';

const isValidationMsg = (helperTextMap: {helperText?: HelperText}) => {
  if (!helperTextMap.helperText) return;
  return helperTextMap.helperText.props.validation;
};

const textareaVariants = [{}, {fullWidth: true}];

const textareaFields = textareaVariants.map((variant) => {
  return requiredMap.map(() => {
    return denseMap.map((dense: {dense?: boolean}) => {
      return rtlMap.map((isRtl: {isRtl?: boolean}) => {
        return disabledMap.map((disabled: {disabled?: boolean}) => {
          return helperTextMap.map((helperText: {helperText?: HelperText}) => {
            let helperTextKey = getHelperKeyText(
              helperText,
              isValidationMsg(helperText)
            );
            if (helperTextKey.length > 0) {
              helperTextKey = `-${helperTextKey}`;
            }
            const props = Object.assign(
              {},
              variant,
              dense,
              disabled,
              helperText,
              isRtl
            );
            const key = `textarea-${JSON.stringify(props)}${helperTextKey}`;
            return (
              <TestField variant='textarea' {...props} key={key} id={key} />
            );
          });
        });
      });
    });
  });
});

const TextAreaScreenshotTest = () => (
  <div className='text-field-container'>{textareaFields}</div>
);

export default TextAreaScreenshotTest;

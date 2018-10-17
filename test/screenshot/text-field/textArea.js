import React from 'react';

import {denseMap, rtlMap, disabledMap, helperTextMap} from './attributesMap';
import TestField from './TestTextField';

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


const TextAreaScreenshotTest = () => (
  <div className='text-field-container'>
    {textareaFields}
  </div>
);

export default TextAreaScreenshotTest;

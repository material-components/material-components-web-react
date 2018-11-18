import * as React from "react";
import {
  denseMap,
  requiredMap,
  rtlMap,
  disabledMap,
  helperTextMap,
  getHelperKeyText
} from "./attributesMap";
import TestField from "./TestTextField";
const isValidationMsg = helperTextMap => {
  const hasHelperText = Object.keys(helperTextMap).length > 0;
  return hasHelperText && helperTextMap.helperText.props.validation;
};
const textareaVariants = [{}, {fullWidth: true}];
const textareaFields = textareaVariants.map((variant) => {
  return requiredMap.map((isRequired) => {
    return denseMap.map((dense) => {
      return rtlMap.map((isRtl) => {
        return disabledMap.map((disabled) => {
          return helperTextMap.map((helperText, helperTextIndex) => {
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
              <TestField variant="textarea" {...props} key={key} id={key} />
            );
          });
        });
      });
    });
  });
});
const TextAreaScreenshotTest = () => (
  <div className="text-field-container">{textareaFields}</div>
);
export default TextAreaScreenshotTest;

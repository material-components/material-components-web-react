import React from "react";
import {
  iconsMap,
  denseMap,
  rtlMap,
  requiredMap,
  disabledMap,
  helperTextMap,
  getHelperKeyText
} from "./attributesMap";
import TestField from "./TestTextField";
const isValidationMsg = helperTextMap => {
  const hasHelperText = Object.keys(helperTextMap).length > 0;
  return hasHelperText && helperTextMap.helperText.props.validation;
};
const textFields = variant => {
  return iconsMap.map(icon => {
    return denseMap.map(dense => {
      return rtlMap.map(isRtl => {
        return requiredMap.map(isRequired => {
          return disabledMap.map(disabled => {
            return helperTextMap.map(helperText => {
              const isValidationTextField = isValidationMsg(helperText);
              const value = !isValidationTextField
                ? { value: null }
                : { value: "" };
              const iconKey = Object.keys(icon)[0] || "";
              const denseKey = Object.keys(dense)[0] || "";
              const rtlKey = Object.keys(isRtl)[0] || "";
              const disabledKey = Object.keys(disabled)[0] || "";
              const isRequiredKey = Object.keys(isRequired)[0] || "";
              const helperTextKey = getHelperKeyText(
                helperText,
                isValidationTextField
              );
              const props = Object.assign(
                {},
                variant,
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
                iconKey === "leadingIcon" || iconKey === "trailingIcon";
              if (hasIcon && variant.variant === "fullWidth") {
                return;
              }
              return <TestField {...props} key={key} id={key} />;
            });
          });
        });
      });
    });
  });
};
const TextFieldScreenshotTest = variant => (
  <div className="text-field-container">{textFields(variant)}</div>
);
export default TextFieldScreenshotTest;

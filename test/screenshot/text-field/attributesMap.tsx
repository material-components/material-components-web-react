import React from 'react';
import {HelperText} from '../../../packages/text-field';
import MaterialIcon from '../../../packages/material-icon/index';

export declare type HelperTextMapType = {helperText: HelperText};

const icon = <MaterialIcon icon='favorite' />;

const iconAlt = <MaterialIcon icon='work' />;

const iconsMap = [
  {},
  {leadingIcon: icon, onLeadingIconSelect: () => console.log('bark')},
  {trailingIcon: icon, onTrailingIconSelect: () => console.log('shhh')},
  {leadingIcon: icon, trailingIcon: iconAlt},
];
const denseMap = [{}, {dense: true}];
const rtlMap = [{}, {isRtl: true}];
const requiredMap = [{}, {required: true}];
const disabledMap = [{}, {disabled: true}];
const helperTextMap = [
  {},
  {helperText: <HelperText persistent>Help me</HelperText>},
  {helperText: <HelperText validation>Error message</HelperText>},
];

const getHelperKeyText = (
  helperTextMap: HelperTextMapType | {},
  isValidationMsg: boolean
): string => {
  const hasHelperText = Object.keys(helperTextMap).length > 0;
  if (!hasHelperText) {
    return '';
  } else if (isValidationMsg) {
    return 'validation';
  } else {
    return 'persistent';
  }
};

const isValidationMsg: (helperTextMap: HelperTextMapType | {}) => boolean = (
  helperTextMap
) => {
  const hasHelperText = Object.keys(helperTextMap).length > 0;
  if (!hasHelperText) return false;
  if (!(helperTextMap as HelperTextMapType).helperText) return false;
  return !!(helperTextMap as HelperTextMapType).helperText.props.validation;
};

export {
  iconsMap,
  denseMap,
  rtlMap,
  requiredMap,
  disabledMap,
  helperTextMap,
  getHelperKeyText,
  isValidationMsg,
};

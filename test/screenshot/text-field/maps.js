import React from 'react';
import {HelperText} from '../../../packages/text-field/index';

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

export {denseMap, rtlMap , requiredMap, disabledMap, helperTextMap};

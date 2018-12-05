import * as React from 'react';
import './index.scss';
// @ts-ignore
import Checkbox from '../../../packages/checkbox/index.tsx';

const CheckboxScreenshotTest = () => {
  return (
    <div>
      <Checkbox />
      <Checkbox indeterminate />
      <Checkbox indeterminate checked />
      <Checkbox checked />
      <Checkbox disabled />
      <div dir="rtl">
        <Checkbox />
        <Checkbox indeterminate />
        <Checkbox indeterminate checked />
        <Checkbox checked />
        <Checkbox disabled />
      </div>
      <Checkbox
        className="custom-checkbox"
        nativeControlId="custom-checkbox-input"
        checked
      />
      <label htmlFor="custom-checkbox-input">Custom checkbox with label</label>
    </div>
  );
};
export default CheckboxScreenshotTest;

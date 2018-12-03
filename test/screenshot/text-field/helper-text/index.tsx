import * as React from 'react';
// @ts-ignore
import HelperText from '../../../../packages/text-field/helper-text/index.tsx';

import '../../../../packages/text-field/helper-text/index.scss';

const TextFieldHelperTextScreenshotTest = () => {
  return (
    <div>
      <HelperText>Help Me!</HelperText>
      <HelperText persistent>Help Me Persistent Text!</HelperText>
    </div>
  );
};
export default TextFieldHelperTextScreenshotTest;

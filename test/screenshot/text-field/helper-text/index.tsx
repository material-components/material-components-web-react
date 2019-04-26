import React from 'react';
import HelperText from '../../../../packages/text-field/helper-text/index';

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

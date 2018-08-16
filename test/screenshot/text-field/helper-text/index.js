import React from 'react';
import ReactDOM from 'react-dom';

import HelperText from '../../../../packages/text-field/helper-text';

import '../../../../packages/text-field/helper-text/index.scss';

export default () => {
  return (
    <div>
      <HelperText>Help Me!</HelperText>
      <HelperText persistent>Help Me Persistent Text!</HelperText>
    </div>
  );
}

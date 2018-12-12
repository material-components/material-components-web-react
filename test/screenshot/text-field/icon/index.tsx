import * as React from 'react';
// @ts-ignore
import Icon from '../../../../packages/text-field/icon/index.tsx';
// TODO: return to remove these ts-ignores
// @ts-ignore
import MaterialIcon from '../../../../packages/material-icon/index.js';
import '../../../../packages/text-field/icon/index.scss';

const TextFieldIconScreenshotTest = () => {
  return (
    <div>
      <Icon>
        <i className='material-icons' tabIndex={0} role='button'>
          favorite
        </i>
      </Icon>

      <Icon>
        <MaterialIcon tabIndex='0' role='button' icon='favorite' />
      </Icon>
    </div>
  );
};

export default TextFieldIconScreenshotTest;

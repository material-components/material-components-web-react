import React from 'react';
import Icon from '../../../../packages/text-field/icon/index';
import MaterialIcon from '../../../../packages/material-icon/index';
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
        <MaterialIcon tabIndex={0} role='button' icon='favorite' />
      </Icon>

      <Icon onSelect={() => console.log('❤️')}>
        <MaterialIcon role='button' icon='favorite' />
      </Icon>
    </div>
  );
};

export default TextFieldIconScreenshotTest;

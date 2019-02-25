import * as React from 'react';
import MaterialIcon from '../../../packages/material-icon';
import '../../../packages/material-icon/index.scss';
import './index.scss';

const MaterialIconScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <MaterialIcon icon='menu' tabIndex={0} hasRipple />

      <br />

      <MaterialIcon icon='favorite' />

      <br />

      <MaterialIcon icon='print' className='button-icon' tag='button' />

      <br />

      <MaterialIcon icon='check' tag='a' hasRipple />
    </div>
  );
};

export default MaterialIconScreenshotTest;

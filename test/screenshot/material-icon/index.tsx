import React from 'react';
import MaterialIcon from '../../../packages/material-icon';
import '../../../packages/material-icon/index.scss';

const MaterialIconScreenshotTest: React.FunctionComponent = () => {
  return (
    <div>
      <MaterialIcon icon='menu' hasRipple />

      <br />

      <MaterialIcon icon='favorite' />
    </div>
  );
};

export default MaterialIconScreenshotTest;

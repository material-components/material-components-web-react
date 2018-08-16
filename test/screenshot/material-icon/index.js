import React from 'react';
import ReactDOM from 'react-dom';
import MaterialIcon from '../../../packages/material-icon';
import '../../../packages/material-icon/index.scss';


export default () => {
  return (
    <div>
      <MaterialIcon icon='menu' hasRipple />

      <br />

      <MaterialIcon icon='favorite' />
    </div>
  );
}

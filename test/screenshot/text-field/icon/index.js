import React from 'react';
import ReactDOM from 'react-dom';

import Icon from '../../../../packages/text-field/icon';
import MaterialIcon from '../../../../packages/material-icon';

import '../../../../packages/text-field/icon/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <Icon>
      <i className='material-icons' tabIndex='0' role='button'>favorite</i>
    </Icon>

    <Icon>
      <MaterialIcon tabIndex='0' role='button' icon='favorite'/>
    </Icon>

    <Icon disabled>
      <MaterialIcon tabIndex='0' role='button' icon='favorite'/>
    </Icon>
  </div>
), document.getElementById('app'));

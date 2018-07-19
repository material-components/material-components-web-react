import React from 'react';
import ReactDOM from 'react-dom';
import MaterialIcon from '../../../packages/material-icon/index';
import '../../../packages/icon-button/index.scss';
import './index.scss';

import IconButton from '../../../packages/icon-button';

ReactDOM.render((
  <div>
    <IconButton>
      <MaterialIcon icon='favorite' />
    </IconButton>

    <span className='demo-custom-color'>
      <IconButton>
        <MaterialIcon icon='favorite' />
      </IconButton>
    </span>

    <IconButton isLink>
      <MaterialIcon icon='favorite' />
    </IconButton>

    <IconButton disabled>
      <MaterialIcon icon='favorite' />
    </IconButton>

    <IconButton
      className='mdc-icon-button material-icons'
      aria-label='Add to favorites'
      aria-pressed='false'
      data-demo-toggle
      data-toggle-on-content='favorite'
      data-toggle-on-label='Remove From Favorites'
      data-toggle-off-content='favorite_border'
      data-toggle-off-label='Add to Favorites'
    >
      <MaterialIcon icon='favorite_border' />
    </IconButton>
  </div>
), document.getElementById('app'));

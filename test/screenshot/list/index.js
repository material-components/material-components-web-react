import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import List from '../../../packages/list/index';
import {ListItem} from '../../../packages/list/index';

const ListScreenshotTest = () => {
  return (
    <div>
      <List twoLine singleSelection>
        <ListItem
          primaryText='Photos'
          secondaryText='Jan 9, 2018'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
        <ListItem
          primaryText='Recipes'
          secondaryText='Jan 17, 2018'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
        <ListItem
          primaryText='Work'
          secondaryText='Jan 28, 2018'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
      </List>

      <List >
        <ListItem
          primaryText='Dogs'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
        <ListItem
          primaryText='Cats'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
        <ListItem
          primaryText='Birds'
          graphic={<MaterialIcon icon='folder'/>}
          meta={<MaterialIcon icon='info' tabIndex='0' />}
        />
      </List>
    </div>
  );
};

export default ListScreenshotTest;

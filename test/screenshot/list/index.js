import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import List from '../../../packages/list/index';
import {ListItem} from '../../../packages/list/index';

class SelectionListTest extends React.Component {
  state = {
    selectedIndex: 1, // eslint-disable-line react/prop-types
  };

  render() {
    const {children, ...otherProps} = this.props; // eslint-disable-line react/prop-types
    return (
      <List
        singleSelection
        selectedIndex={this.state.selectedIndex}
        {...otherProps}
      >
        {children}
      </List>
    );
  }
}

const ListScreenshotTest = () => {
  return (
    <div>
      <SelectionListTest twoLine>
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
      </SelectionListTest>

      <List>
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

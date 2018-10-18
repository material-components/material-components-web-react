import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import List from '../../../packages/list/index';
import {ListItem} from '../../../packages/list/index';
import ListItemGraphic from '../../../packages/list/ListItemGraphic';
import ListItemText from '../../../packages/list/ListItemText';
import ListItemMeta from '../../../packages/list/ListItemMeta';

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
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' secondaryText='world'/>
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' secondaryText='world'/>
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' secondaryText='world'/>
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' secondaryText='world'/>
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
      </SelectionListTest>

      <List>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' />
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' />
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' />
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
        <ListItem>
         <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
         <ListItemText primaryText='hello' />
         <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
        </ListItem>
      </List>
    </div>
  );
};

export default ListScreenshotTest;

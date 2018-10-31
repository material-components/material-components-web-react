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
    selectedIndex: 1,
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

const renderListItem = (primaryText, secondaryText) => {
  return (
    <ListItem>
      <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
      <ListItemText primaryText={primaryText} secondaryText={secondaryText}/>
      <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
    </ListItem>
  );
};

const ListScreenshotTest = () => {
  return (
    <div>
      <h2>Two-line Selection List</h2>
      <SelectionListTest twoLine>
        {renderListItem('hello', 'world')}
        {renderListItem('hello', 'world')}
        {renderListItem('hello', 'world')}
      </SelectionListTest>

      <h2>One-line List</h2>
      <List>
        {renderListItem('hello')}
        {renderListItem('hello')}
        {renderListItem('hello')}
      </List>
    </div>
  );
};

export default ListScreenshotTest;

import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  ListGroup,
  ListGroupSubheader
} from '../../../packages/list/index';

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
      <h2>Two-line selection list</h2>
      <SelectionListTest twoLine>
        {renderListItem('List item', 'Secondary text')}
        {renderListItem('List item', 'Secondary text')}
        {renderListItem('List item', 'Secondary text')}
      </SelectionListTest>

      <h2>One-line list</h2>
      <List>
        {renderListItem('List item')}
        {renderListItem('List item')}
        {renderListItem('List item')}
      </List>

      <h2>List group</h2>
      <ListGroup>
        <ListGroupSubheader>Folders</ListGroupSubheader>
        <List>
          {renderListItem('Photos')}
          {renderListItem('Recipes')}
          {renderListItem('Work')}
        </List>
        <ListGroupSubheader>Recent Files</ListGroupSubheader>
        <List>
          {renderListItem('Vacation itinerary')}
          {renderListItem('Kitchen remodel')}
        </List>
      </ListGroup>
    </div>
  );
};

export default ListScreenshotTest;

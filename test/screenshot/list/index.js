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
  ListGroupSubheader,
} from '../../../packages/list/index';
import uuidv1 from 'uuid/v1';

const renderListItem = (primaryText, secondaryText) => {
  return (
    <ListItem key={uuidv1()}>
      <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
      <ListItemText primaryText={primaryText} secondaryText={secondaryText}/>
      <ListItemMeta tabbableOnListItemFocus meta={<MaterialIcon icon='info'/>} />
    </ListItem>
  );
};

class SelectionListTest extends React.Component {
  state = {
    selectedIndex: 1,
    listItems: ['List item 1', 'List item 2', 'List item 3'],
  };

  insertListItem = () => {
    const {listItems, selectedIndex} = this.state;
    listItems.splice(0, 0, 'New list item');
    this.setState({listItems, selectedIndex: selectedIndex + 1});
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.insertListItem}>Insert new list item</button>
        <List
          {...this.props}
          singleSelection
          selectedIndex={this.state.selectedIndex}
          handleSelect={(selectedIndex) => this.setState({selectedIndex})}
        >
          {this.state.listItems.map((text) => renderListItem(text))}
        </List>
      </React.Fragment>
    );
  }
}

const ListScreenshotTest = () => {
  return (
    <div>
      <h2>One-line Selection List</h2>
      <SelectionListTest />

      <h2>Two-line List</h2>
      <List twoLine>
        {renderListItem('List item', 'Secondary text')}
        {renderListItem('List item', 'Secondary text')}
        {renderListItem('List item', 'Secondary text')}
        <li className='mdc-list-divider' role='separator'></li>
        {renderListItem('List item', 'Secondary text')}
        {renderListItem('List item', 'Secondary text')}
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

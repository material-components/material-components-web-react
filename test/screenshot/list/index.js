import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import List from '../../../packages/list/index';
import {ListItem} from '../../../packages/list/index';
import ListItemGraphic from '../../../packages/list/ListItemGraphic';
import ListItemText from '../../../packages/list/ListItemText';
import ListItemMeta from '../../../packages/list/ListItemMeta';
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
        {renderListItem('hello', 'world')}
        {renderListItem('hello', 'world')}
        <li className='mdc-list-divider' role='separator'></li>
        {renderListItem('hello', 'world')}
        {renderListItem('hello', 'world')}
      </List>
    </div>
  );
};

export default ListScreenshotTest;

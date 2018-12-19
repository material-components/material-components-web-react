import * as React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';
// TODO: https://github.com/material-components/material-components-web-react/issues/513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
} from '../../../packages/list/index';
import {ListItemTextProps} from '../../../packages/list/ListItemText'; // eslint-disable-line no-unused-vars

// no .d.ts file
// @ts-ignore
import * as uuidv4 from 'uuid/v4';

type SelectionListTestState = {
  selectedIndex: number,
  listItems: string[],
};

function renderListItem(options: ListItemTextProps) {
  const {primaryText, secondaryText} = options;
  const key = uuidv4();
  return (
    <ListItem key={key}>
      <ListItemGraphic graphic={<MaterialIcon icon='folder' />} />
      <ListItemText primaryText={primaryText} secondaryText={secondaryText} />
      <ListItemMeta
        tabbableOnListItemFocus
        meta={<MaterialIcon icon='info' />}
      />
    </ListItem>
  );
};

class SelectionListTest extends React.Component<{}, SelectionListTestState> {
  state = {
    selectedIndex: 1,
    listItems: ['List item 1', 'List item 2', 'List item 3'],
  };

  insertListItem = () => {
    const {listItems, selectedIndex} = this.state;
    listItems.splice(0, 0, 'New list item');
    this.setState({listItems, selectedIndex: selectedIndex + 1});
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.insertListItem}>Insert new list item</button>
        <List
          singleSelection
          selectedIndex={this.state.selectedIndex}
          handleSelect={(selectedIndex) => this.setState({selectedIndex})}
        >
          {this.state.listItems.map((text) => renderListItem({primaryText: text}))}
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
        {renderListItem({primaryText: 'List item', secondaryText: 'Secondary text'})}
        {renderListItem({primaryText: 'List item', secondaryText: 'Secondary text'})}
        {renderListItem({primaryText: 'List item', secondaryText: 'Secondary text'})}
        <ListDivider />
        {renderListItem({primaryText: 'List item', secondaryText: 'Secondary text'})}
        {renderListItem({primaryText: 'List item', secondaryText: 'Secondary text'})}
      </List>

      <h2>List group</h2>
      <ListGroup>
        <ListGroupSubheader>Folders</ListGroupSubheader>
        <List>
          {renderListItem({primaryText: 'Photos'})}
          {renderListItem({primaryText: 'Recipes'})}
          {renderListItem({primaryText: 'Work'})}
        </List>
        <ListGroupSubheader>Recent Files</ListGroupSubheader>
        <List>
          {renderListItem({primaryText: 'Vacation itinerary'})}
          {renderListItem({primaryText: 'Kitchen remodel'})}
        </List>
      </ListGroup>
    </div>
  );
};
export default ListScreenshotTest;

import * as React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';
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
import {ListItemProps} from '../../../packages/list/ListItem'; // eslint-disable-line no-unused-vars
import {ListItemTextProps} from '../../../packages/list/ListItemText'; // eslint-disable-line no-unused-vars

import * as uuidv1 from 'uuid/v1';

type SelectionListTestState = {
  selectedIndex: number,
  listItems: string[]
};

const ListItemBase: (p: Partial<ListItemTextProps>) => React.ReactElement<ListItemProps<HTMLDivElement>> = ({
  primaryText, secondaryText, // eslint-disable-line react/prop-types
}) => {
  return (
    <ListItem key={uuidv1()}>
      <ListItemGraphic graphic={<MaterialIcon icon="folder" />} />
      <ListItemText primaryText={primaryText} secondaryText={secondaryText} />
      <ListItemMeta
        tabbableOnListItemFocus
        meta={<MaterialIcon icon="info" />}
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
          {...this.props}
          singleSelection
          selectedIndex={this.state.selectedIndex}
          handleSelect={(selectedIndex) => this.setState({selectedIndex})}
        >
          {this.state.listItems.map((text, key) => <ListItemBase key={key} primaryText={text} />)}
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
        <ListItemBase primaryText='List item' secondaryText='Secondary text' />
        <ListItemBase primaryText='List item' secondaryText='Secondary text' />
        <ListItemBase primaryText='List item' secondaryText='Secondary text' />
        <ListDivider />
        <ListItemBase primaryText='List item' secondaryText='Secondary text' />
        <ListItemBase primaryText='List item' secondaryText='Secondary text' />
      </List>

      <h2>List group</h2>
      <ListGroup>
        <ListGroupSubheader>Folders</ListGroupSubheader>
        <List>
          <ListItemBase primaryText='Photos' />
          <ListItemBase primaryText='Recipes' />
          <ListItemBase primaryText='Work' />
        </List>
        <ListGroupSubheader>Recent Files</ListGroupSubheader>
        <List>
          <ListItemBase primaryText='Vacation itinerary' />
          <ListItemBase primaryText='Kitchen remodel' />
        </List>
      </ListGroup>
    </div>
  );
};
export default ListScreenshotTest;

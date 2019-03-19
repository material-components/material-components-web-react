import * as React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';
import MaterialIcon from '../../../packages/material-icon/index';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
} from '../../../packages/list/index';
import Checkbox from '../../../packages/checkbox/index';
import Radio, {NativeRadioControl} from '../../../packages/radio/index';
import {ListItemTextProps} from '../../../packages/list/ListItemText'; // eslint-disable-line no-unused-vars
import {MDCListIndex} from '@material/list/types';

// @ts-ignore no .d.ts file
import * as uuidv4 from 'uuid/v4';

const groceryItems = ['Milk', 'Eggs', 'Barley'];

interface SelectionListTestState {
  selectedIndex: number;
  listItems: string[];
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

class CheckboxList extends React.Component<{}, {selectedIndex: MDCListIndex}> {
  state = {
    selectedIndex: [1],
  };

  handleSelect = (_selectedIndex: number, selected: MDCListIndex) => {
    this.setState({selectedIndex: selected});
  }

  render() {
    return (
      <React.Fragment>
        <h5>
          Selected index: {this.state.selectedIndex}
        </h5>
        <List
          checkboxList
          selectedIndex={this.state.selectedIndex}
          handleSelect={this.handleSelect}
        >
          {groceryItems.map((item, index) => (
            <ListItem key={index}>
              <Checkbox checked={index === 1} />
              <ListItemText primaryText={item} />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

class RadioList extends React.Component<{}, {selectedItem: string}> {
  state = {
    selectedItem: 'Milk',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({selectedItem: e.target.value});
  }

  render() {
    return (
      <React.Fragment>
        <h5>
          Selected index: {this.state.selectedItem}
        </h5>
        <List
          radioList
          selectedIndex={0}
        >
          {groceryItems.map((item, index) => (
            <ListItem key={index}>
              <Radio key={index}>
                <NativeRadioControl
                  name={item}
                  checked={this.state.selectedItem === item}
                  value={item}
                  id={`${index}-${item}`}
                  onChange={this.handleChange}
                />
              </Radio>
              <ListItemText primaryText={item} />
            </ListItem>
          ))}
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

      <h2>Checkbox List</h2>
      <CheckboxList />
      <h2>Radio List</h2>
      <RadioList />
    </div>
  );
};
export default ListScreenshotTest;

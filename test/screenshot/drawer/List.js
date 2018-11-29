import React from 'react';
import MaterialIcon from '../../../packages/material-icon';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListGroupSubheader,
} from '../../../packages/list/index';
import uuidv1 from 'uuid/v1';

import '../../../packages/list/index.scss';


const renderListItem = ({
  title, icon, // eslint-disable-line react/prop-types
}) => {
  return (
    <ListItem key={uuidv1()}>
      <ListItemGraphic graphic={<MaterialIcon icon={icon}/>} />
      <ListItemText primaryText={title} />
    </ListItem>
  );
};

class DrawerList extends React.Component {
  state = {
    selectedIndex: 1,
  };

  render() {
    const topItems = [{
      title: 'Inbox', icon: 'inbox',
    }, {
      title: 'Star', icon: 'star',
    }, {
      title: 'Sent Mail', icon: 'send',
    }, {
      title: 'Drafts', icon: 'drafts',
    }];

    const middleItems = [{
      title: 'Family', icon: 'bookmark',
    }, {
      title: 'Friends', icon: 'bookmark',
    }, {
      title: 'Work', icon: 'bookmark',
    }];

    const bottomItems = [{
      title: 'Settings', icon: 'settings',
    }, {
      title: 'Help & feedback', icon: 'announcement',
    }];

    return (
      <List
        {...this.props}
        singleSelection
        selectedIndex={this.state.selectedIndex}
        handleSelect={(selectedIndex) => this.setState({selectedIndex})}
      >
        {topItems.map(renderListItem)}

        <hr className='mdc-list-divider' />

        <ListGroupSubheader>Labels</ListGroupSubheader>
        {middleItems.map(renderListItem)}

        <hr className='mdc-list-divider' />
        {bottomItems.map(renderListItem)}
      </List>
    );
  }
};

export default DrawerList;

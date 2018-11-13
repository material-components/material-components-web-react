import React from 'react';
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

import '../../../packages/list/index.scss';


const renderListItem = ({title, icon, activated}) => {
  return (
    <ListItem key={uuidv1()}>
      <ListItemGraphic graphic={<MaterialIcon icon={icon}/>} />
      <ListItemText primaryText={title} />
    </ListItem>
  );
};


// const renderListItem = ({
//   title, icon, activated, // eslint-disable-line react/prop-types
// }, index) => {
//   return (
//     <a
//       key={index}
//       className={`mdc-list-item {activated ? 'mdc-list-item--activated' : ''}`}
//       aria-selected='{activated}' tabIndex={activated ? '0' : ''}>
//       <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>
//         {icon}
//       </i>
//       <span className='mdc-list-item__text'>
//         {title}
//         <i className='test-font--redact-prev-letter'></i>
//       </span>
//     </a>
//   );
// };

class DrawerList extends React.Component {
  state = {
    selectedIndex: 1,
  };

  render() {
    const topItems = [{
      title: 'Inbox', icon: 'inbox', activated: true,
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

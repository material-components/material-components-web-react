import React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';

import TopAppBar from '../../../packages/top-app-bar/index';
import MaterialIcon from '../../../packages/material-icon/index';
import Drawer, {
  DrawerAppContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '../../../packages/drawer/index';

class DrawerScreenshotTest extends React.Component {
  state = {open: false};

  render() {
    return (
      <div className='drawer-screenshot-test'>
        <Drawer modal open={this.state.open}>
          <DrawerHeader>
            <DrawerTitle>
              Inbox
            </DrawerTitle>
            <DrawerSubtitle>
              ralph@gmail.com
            </DrawerSubtitle>
          </DrawerHeader>

          <DrawerContent>
            {this.renderList()}
          </DrawerContent>
        </Drawer>

        <DrawerAppContent>
          <TopAppBar
            title='Email'
            navigationIcon={<MaterialIcon onClick={() => this.setState({open: !this.state.open})} icon='menu' />}
          />
          <div className='mdc-top-app-bar--fixed-adjust'>
            {this.renderLoremIpsum()}
          </div>
        </DrawerAppContent>
      </div>
    );
  }

  renderLoremIpsum() {
    return (
      <p className='drawer-lorem-ipsum'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut<br />
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut<br />
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in<br />
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint<br />
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit<br />
        anim id est laborum.
      </p>
    );
  }

  renderList() {
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
      <nav className='mdc-list'>
        {topItems.map(this.renderListItem)}

        <hr className='mdc-list-divider' />
        <h6 className='mdc-list-group__subheader'>Labels</h6>
        {middleItems.map(this.renderListItem)}

        <hr className='mdc-list-divider' />
        {bottomItems.map(this.renderListItem)}
      </nav>
    );
  }

  renderListItem({title, icon, activated}, index) {
    return (
      <a
        key={index}
        className={`mdc-list-item {activated ? 'mdc-list-item--activated' : ''}`}
        aria-selected='{activated}' tabIndex={activated ? '0' : ''}>
        <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>
          {icon}
        </i>
        <span className='mdc-list-item__text'>
          {title}
          <i className='test-font--redact-prev-letter'></i>
        </span>
      </a>
    );
  }
};

export default DrawerScreenshotTest;

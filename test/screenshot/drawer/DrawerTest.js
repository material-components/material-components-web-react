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
import List from './List';

class DrawerScreenshotTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  render() {
    const {title, dismissible, modal} = this.props;
    return (
      <div className='drawer-screenshot-test'>
        <Drawer
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          dismissible={dismissible}
          modal={modal}
        >
          <DrawerHeader>
            <DrawerTitle>
              Inbox
            </DrawerTitle>
            <DrawerSubtitle>
              ralph@gmail.com
            </DrawerSubtitle>
          </DrawerHeader>

          <DrawerContent>
            <List />
          </DrawerContent>
        </Drawer>

        <DrawerAppContent>
          <TopAppBar
            title={title}
            navigationIcon={this.renderNavigationIcon()}
          />
          <div className='mdc-top-app-bar--fixed-adjust'>
            {[0, 1, 2, 3, 4, 5].map(this.renderLoremIpsum)}
          </div>
        </DrawerAppContent>
      </div>
    );
  }

  renderNavigationIcon() {
    if (this.props.hideNavigationIcon) return;
    return (
      <MaterialIcon onClick={() => this.setState({open: !this.state.open})} icon='menu' />
    );
  }

  renderLoremIpsum(item, index) {
    return (
      <p className='drawer-lorem-ipsum' key={index}>
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
};

export default DrawerScreenshotTest;

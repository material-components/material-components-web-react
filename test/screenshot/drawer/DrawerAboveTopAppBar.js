import React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';

import TopAppBar from '../../../packages/top-app-bar/index';
import Drawer, {
  DrawerAppContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '../../../packages/drawer/index';
import List from './List';

const DrawerScreenshotTest = ({
  /* eslint-disable react/prop-types */
  onClose,
  open,
  title,
  dismissible,
  modal,
  renderLoremIpsum,
  renderNavigationIcon,
  /* eslint-enable react/prop-types */
}) => {
  return (
    <div className='drawer-screenshot-test'>
      <Drawer
        open={open}
        onClose={onClose}
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

      <DrawerAppContent className='drawer-app-content'>
        <TopAppBar
          title={title}
          navigationIcon={renderNavigationIcon()}
        />
        <div className='mdc-top-app-bar--fixed-adjust'>
          {[0, 1, 2, 3, 4, 5].map(renderLoremIpsum)}
        </div>
      </DrawerAppContent>
    </div>
  );
};

export default DrawerScreenshotTest;

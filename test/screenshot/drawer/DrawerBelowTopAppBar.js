import React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';

import TopAppBar, {TopAppBarFixedAdjust} from '../../../packages/top-app-bar/index';
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
    <React.Fragment>
      <TopAppBar
        title={title}
        navigationIcon={renderNavigationIcon()}
      />

      <TopAppBarFixedAdjust className='drawer-screenshot-test drawer-screenshot-test--is-below'>
        <Drawer
          open={open}
          onClose={onClose}
          dismissible={dismissible}
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
          {[0, 1, 2, 3, 4, 5].map(renderLoremIpsum)}
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </React.Fragment>
  );
};

export default DrawerScreenshotTest;

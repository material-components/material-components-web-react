import React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';
import TopAppBar, {
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from '../../../packages/top-app-bar/index';
import Drawer, {
  DrawerAppContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '../../../packages/drawer/index';
// @ts-ignore
import List from './List.js';
import {MaterialIconProps} from '../../../packages/material-icon/index'; // eslint-disable-line @typescript-eslint/no-unused-vars

interface DrawerScreenshotTestProps {
  onClose: () => void;
  open: boolean;
  title: string;
  modal: boolean;
  dismissible: boolean;
  renderLoremIpsum: (section: number) => JSX.Element;
  renderNavigationIcon: () => React.ReactElement<MaterialIconProps> | undefined;
}

const DrawerScreenshotTest: React.FunctionComponent<
  DrawerScreenshotTestProps
> = ({
  onClose,
  open,
  title,
  modal,
  dismissible,
  renderLoremIpsum,
  renderNavigationIcon,
}) => {
  return (
    <React.Fragment>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            {renderNavigationIcon()}
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust className='drawer-screenshot-test drawer-screenshot-test--is-below'>
        <Drawer
          open={open}
          onClose={onClose}
          dismissible={dismissible}
          modal={modal}
        >
          <DrawerHeader>
            <DrawerTitle>Inbox</DrawerTitle>
            <DrawerSubtitle>ralph@gmail.com</DrawerSubtitle>
          </DrawerHeader>

          <DrawerContent>
            <List />
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          {[0, 1, 2, 3, 4, 5].map(renderLoremIpsum)}
        </DrawerAppContent>
      </TopAppBarFixedAdjust>
    </React.Fragment>
  );
};
export default DrawerScreenshotTest;

import * as React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';
import TopAppBar, {
  TopAppBarFixedAdjust,
// @ts-ignore
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
// TODO: fix with #513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon/index';

interface DrawerScreenshotTestProps {
  onClose: () => void;
  open: boolean;
  title: string;
  modal: boolean;
  dismissible: boolean;
  renderLoremIpsum: (section: number) => JSX.Element;
  renderNavigationIcon: () => MaterialIcon;
};

const DrawerScreenshotTest: React.FunctionComponent<DrawerScreenshotTestProps> = ({
  /* eslint-disable react/prop-types */
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
      <TopAppBar title={title} navigationIcon={renderNavigationIcon()} />

      <TopAppBarFixedAdjust className='drawer-screenshot-test drawer-screenshot-test--is-below'>
        <Drawer open={open} onClose={onClose} dismissible={dismissible} modal={modal}>
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

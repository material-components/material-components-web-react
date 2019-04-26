import React from 'react';
import DrawerTest from './DrawerTest';

const DismissibleDrawerScreenshotTest: React.FunctionComponent = () => {
  return (
    <DrawerTest
      open
      isBelow
      dismissible
      title='Dismissible Drawer Below Top App Bar'
    />
  );
};

export default DismissibleDrawerScreenshotTest;

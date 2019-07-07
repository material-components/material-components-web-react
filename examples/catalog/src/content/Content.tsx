import React from 'react';
import {TopAppBarFixedAdjust} from '@material/react-top-app-bar';

import {MenuContext} from '../Context';
import {Menus} from '../Router';

export const Content = () => (
  <MenuContext.Consumer>
    {({selectedIndex}) => (
      <TopAppBarFixedAdjust>
        {React.createElement(Menus[selectedIndex].component)}
      </TopAppBarFixedAdjust>
    )}
  </MenuContext.Consumer>
);

import React from 'react';
import {
  TopAppBarFixedAdjust,
  TopAppbarFixedAdjustProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '../../../packages/top-app-bar';

const MainTopAppBarContent: React.FunctionComponent<
  TopAppbarFixedAdjustProps
> = (props) => {
  return (
    <TopAppBarFixedAdjust {...props}>
      <h1>{"Look at me I'm a header"}</h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </TopAppBarFixedAdjust>
  );
};

export default MainTopAppBarContent;

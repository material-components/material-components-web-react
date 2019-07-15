import React from 'react';

import MaterialIcon from '@material/react-material-icon';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';

import {MenuContext} from '../Context';
import {Repository} from '../Router';

const styles = require('./TopBar.scss');

export const TopBar = () => (
  <MenuContext.Consumer>
    {({setOpen}) => (
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon
                hasRipple
                icon='menu'
                onClick={() => setOpen(true)}
              />
            </TopAppBarIcon>
            <TopAppBarTitle className={styles.title}>
              Material Components React
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='end'>
            <a rel='noopener noreferrer' target='_blank' href={Repository}>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon aria-label='code' hasRipple icon='code' />
              </TopAppBarIcon>
            </a>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    )}
  </MenuContext.Consumer>
);

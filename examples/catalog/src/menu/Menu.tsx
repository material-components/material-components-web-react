import React from 'react';

import Drawer, {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
} from '@material/react-drawer';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';

import {MenuContext, UserContext} from '../Context';
import {Menus} from '../Router';

export const Menu = () => (
  <MenuContext.Consumer>
    {({isOpen, setOpen, selectedIndex, setSelectedIndex}) => (
      <UserContext.Consumer>
        {({name, account}) => {
          const close = () => setOpen(false);
          return (
            <Drawer modal open={isOpen} onClose={close}>
              <DrawerHeader>
                <DrawerTitle tag='h2'>{name}</DrawerTitle>
                <DrawerSubtitle>{account}</DrawerSubtitle>
              </DrawerHeader>
              <DrawerContent>
                <List singleSelection selectedIndex={selectedIndex}>
                  {Menus.map((menu, index) => {
                    const click = () => {
                      setSelectedIndex(index);
                      setOpen(false);
                    };
                    return (
                      <ListItem key={index} onClick={click}>
                        <ListItemGraphic
                          graphic={<MaterialIcon icon={menu.icon} />}
                        />
                        <ListItemText primaryText={menu.text} />
                      </ListItem>
                    );
                  })}
                </List>
              </DrawerContent>
            </Drawer>
          );
        }}
      </UserContext.Consumer>
    )}
  </MenuContext.Consumer>
);

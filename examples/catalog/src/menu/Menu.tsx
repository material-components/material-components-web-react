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
        {({name, account}) => (
          <Drawer modal open={isOpen} onClose={() => setOpen(false)}>
            <DrawerHeader>
              <DrawerTitle tag='h2'>{name}</DrawerTitle>
              <DrawerSubtitle>{account}</DrawerSubtitle>
            </DrawerHeader>

            <DrawerContent>
              <List singleSelection selectedIndex={selectedIndex}>
                {Menus.map((menu, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpen(false);
                    }}
                  >
                    <ListItemGraphic
                      graphic={<MaterialIcon icon={menu.icon} />}
                    />
                    <ListItemText primaryText={menu.text} />
                  </ListItem>
                ))}
              </List>
            </DrawerContent>
          </Drawer>
        )}
      </UserContext.Consumer>
    )}
  </MenuContext.Consumer>
);

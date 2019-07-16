import React from 'react';

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: 0,
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: number) => {},
});

export const UserContext = React.createContext({
  name: '',
  account: '',
});

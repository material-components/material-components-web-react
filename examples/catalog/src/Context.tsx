import React from 'react';

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: 0,
  setOpen: (open: boolean) => {},
  setSelectedIndex: (selectedIndex: number) => {},
});

export const UserContext = React.createContext({
  name: '',
  account: '',
});

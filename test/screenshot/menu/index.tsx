import * as React from 'react';
import '../../../packages/menu/index.scss';
import './index.scss';
import Menu, {MenuList, MenuListItem} from '../../../packages/menu/index';
import {ListItemText} from '../../../packages/list/index';

// type MenuButtonProps = {
 
// };

// type MenuButtonState = {
// };

const MenuScreenshotTest = () => {
  const menuOptions = [
    'Save',
    'Edit',
    'Cut',
    'Copy',
    'Paste',
  ];

  return (
    <Menu>
      <MenuList>
        {menuOptions.map((option, index) => (
          <MenuListItem key={index}>
            <ListItemText>{option}</ListItemText>
          </MenuListItem>
        ))}
      </MenuList>
    </Menu>
  );
}
export default MenuScreenshotTest;

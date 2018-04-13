import React from 'react';

const NavIcon = () => {
  return (
    <a
      className='material-icons mdc-top-app-bar__navigation-icon'
      href='#'
      onClick={() => console.log('click')}>
      menu
    </a>
  );
};

export default NavIcon;

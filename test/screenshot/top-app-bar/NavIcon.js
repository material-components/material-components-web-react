import React from 'react';

export default class NavIcon extends React.Component {
  render() {
    return (
      <a
        className='material-icons'
        href='#'
        onClick={() => console.log('click')}>
        menu
      </a>
    );
  }
};

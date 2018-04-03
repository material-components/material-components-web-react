import React from 'react';

export default class ActionItem extends React.Component {
  render() {
    return (
      <a
        href='#'
        className='material-icons'
        aria-label='Bookmark this page'
        alt='Bookmark this page'
        key="bookmark"
      >
        bookmark
      </a>
    );
  }
};

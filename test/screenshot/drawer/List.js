import React from 'react';

const renderListItem = ({title, icon, activated}, index) => {
  return (
    <a
      key={index}
      className={`mdc-list-item {activated ? 'mdc-list-item--activated' : ''}`}
      aria-selected='{activated}'
      tabIndex={activated ? '0' : ''}
    >
      <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>
        {icon}
      </i>
      <span className='mdc-list-item__text'>
        {title}
        <i className='test-font--redact-prev-letter' />
      </span>
    </a>
  );
};

export default () => {
  const topItems = [
    {
      title: 'Inbox',
      icon: 'inbox',
      activated: true,
    },
    {
      title: 'Star',
      icon: 'star',
    },
    {
      title: 'Sent Mail',
      icon: 'send',
    },
    {
      title: 'Drafts',
      icon: 'drafts',
    },
  ];

  const middleItems = [
    {
      title: 'Family',
      icon: 'bookmark',
    },
    {
      title: 'Friends',
      icon: 'bookmark',
    },
    {
      title: 'Work',
      icon: 'bookmark',
    },
  ];

  const bottomItems = [
    {
      title: 'Settings',
      icon: 'settings',
    },
    {
      title: 'Help & feedback',
      icon: 'announcement',
    },
  ];

  return (
    <nav className='mdc-list'>
      {topItems.map(renderListItem)}

      <hr className='mdc-list-divider' />
      <h6 className='mdc-list-group__subheader'>Labels</h6>
      {middleItems.map(renderListItem)}

      <hr className='mdc-list-divider' />
      {bottomItems.map(renderListItem)}
    </nav>
  );
};

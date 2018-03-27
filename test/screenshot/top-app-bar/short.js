import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';

import '../../../packages/top-app-bar/index.scss';

const NavIcon = () => {
  return (
    <a
      className='material-icons mdc-top-app-bar__navigation-icon'
      href='#'
      onClick={() => {console.log('hey')}}>
      menu
    </a>
  );
}

const actionItems = [
  <a href='#' className='material-icons mdc-top-app-bar__action-item' aria-label='Bookmark this page' alt='Bookmark this page'>bookmark</a>,
];

const renderLoremIpsum = () => {
  const createDemoParagraph = (key) => (<p className='demo-paragraph' key={key}>
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames
    ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
    tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
    ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
    vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
    egestas semper. Aenean ultricies mi vitae est.
  </p>);
  const size = 20;
  const tags = Array.from(Array(size).keys());
  return tags.map((tag, key) => createDemoParagraph(key));
}


ReactDOM.render((
  <div>
    <TopAppBar
      short
      title='Miami, Fl'
      navIcon={<NavIcon />}
      actionItems={actionItems}
    />

    {renderLoremIpsum()}
  </div>
), document.getElementById('app'));

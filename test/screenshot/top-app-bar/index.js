import React from 'react';
import {Link} from 'react-router-dom';

import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

const TopAppBarHomePage = () => {
  const topAppBarVariants = [
    'fixed',
    'short',
    'prominent',
    'standard',
    'standardNoActionItems',
    'standardWithNavigationIconElement',
    'shortCollapsed',
  ];

  return (
    <div>
      {topAppBarVariants.map((variant) => {
        <div>
          <Link to={`/top-app-bar/${variant}`}>{variant}</Link>
        </div>
      })}
    </div>
  );
}

export default TopAppBarHomePage;

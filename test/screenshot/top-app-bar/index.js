import React from 'react';
import {Link} from 'react-router-dom';
import topAppBarVariants from './variants';

import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

const TopAppBarHomePage = () => {
  return (
    <div>
      {topAppBarVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/top-app-bar/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
}

export default TopAppBarHomePage;

import React from 'react';
import {Link} from 'react-router-dom';
import drawerVariants from './variants';
import '../../../packages/drawer/index.scss';
import './index.scss';

const DrawerHomePage: React.FunctionComponent = () => {
  return (
    <div>
      {drawerVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/drawer/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};

export default DrawerHomePage;

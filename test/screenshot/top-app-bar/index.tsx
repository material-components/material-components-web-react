import React from 'react';
import {Link} from 'react-router-dom';
import topAppBarVariants from './variants';
import {TopAppBarIcon} from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';
import {actionItem} from './actionItems';

const mapActionItem = ({label, icon}: actionItem) => (
  <TopAppBarIcon actionItem aria-label={label} key={icon} tabIndex={0}>
    <MaterialIcon title={label} icon={icon} hasRipple />
  </TopAppBarIcon>
);
const TopAppBarHomePage: React.FunctionComponent = () => {
  return (
    <div>
      {topAppBarVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/top-app-bar/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};

export default TopAppBarHomePage;
export {mapActionItem};

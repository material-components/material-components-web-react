import * as React from 'react';
import {Link} from 'react-router-dom';
import selectVariants from './variants';
import '../../../packages/select/index.scss';
import './index.scss';

const SelectHomePage = () => {
  return (
    <div>
      {selectVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/select/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};
export default SelectHomePage;

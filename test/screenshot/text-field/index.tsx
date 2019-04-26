import React from 'react';
import {Link} from 'react-router-dom';
import textFieldVariants from './variants';
import '../../../packages/text-field/index.scss';

const TextFieldHomePage = () => {
  return (
    <div>
      {textFieldVariants.map((variant, index) => (
        <div key={index}>
          <Link to={`/text-field/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};
export default TextFieldHomePage;

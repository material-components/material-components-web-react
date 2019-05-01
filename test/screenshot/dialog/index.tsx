import React from 'react';
import {Link} from 'react-router-dom';
import {dialogVariants} from './variants';

const DialogScreenShotTests: React.FunctionComponent = () => {
  return (
    <div>
      {dialogVariants.map((variant: string, index: number) => (
        <div key={index}>
          <Link to={`/dialog/${variant}`}>{variant}</Link>
        </div>
      ))}
    </div>
  );
};

export default DialogScreenShotTests;

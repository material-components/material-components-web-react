import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {COMPONENTS.map((componentPath) => {
        <div>
          <Link to={componentPath}>{getDisplayName(componentPath)}</Link>
        </div>
      })}
      <Link to='card'>Card</Link>
      <Link to='chips'>Chips</Link>
      <Link to='fab'>Fab</Link>
      <Link to='floating-label'>Floating Label</Link>
      <Link to='line-ripple'>Line Ripple</Link>
      <Link to='material-icon'>Material Icon</Link>
      <Link to='notched-outline'>Notched Outline</Link>
      <Link to='select'>Select</Link>
      <Link to='tab-indicator'>Tab Indicator</Link>
      <Link to='text-field'>Text Field</Link>
      <Link to='text-field/icon'>Text Field Icon</Link>
      <Link to='text-field/helper-text'>Text Field Helper Text</Link>
      <Link to='top-app-bar'>Top App Bar</Link>
    </div>
  );
}

export default Home;

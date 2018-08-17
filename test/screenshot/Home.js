import React from 'react';
import {Link} from 'react-router-dom';

const convertPathNameToSpaces = (name) => name.replace(/-(\w)|\/(\w)/g, (_, first, second) => {
  if (first) {
    return ` ${first}`;
  }
  return ` ${second}`;
});

const Home = () => {
  return (
    <div>
      {COMPONENTS.sort().map((componentPath, index) => (
        <div key={index}>
          <Link to={componentPath}>{convertPathNameToSpaces(componentPath)}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;

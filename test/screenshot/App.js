import React from 'react';
import {Link} from 'react-router-dom';

const convertPathNameToSpaces = (name) => name.replace(/-(\w)|\/(\w)/g, (_, first, second) => {
  // first is if the word has a `-` appended to the beginning
  // second i if the word has a `/` appended to the beginning
  return ` ${first ? first : second}`;
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
};

export default Home;

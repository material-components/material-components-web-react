import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const convertPathNameToSpaces = (name) => name.replace(/-(\w)|\/(\w)/g, (_, first, second) => {
  if (first) {
    return ` ${first}`;
  }
  return ` ${second}`;
});

const Home = ({history}) => {
  window.__history__ = history;

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

export default withRouter(Home);

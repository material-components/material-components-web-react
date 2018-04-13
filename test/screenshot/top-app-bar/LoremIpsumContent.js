import React from 'react';

export default () => {
  const createDemoParagraph = (key) => (<p className='demo-paragraph' key={key}>
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames
    ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
    tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
    ultricies mi vitae est. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
    vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
    egestas semper. Aenean ultricies mi vitae est.
  </p>);
  const size = 20;
  const tags = Array.from(Array(size).keys());
  return tags.map((tag, key) => createDemoParagraph(key));
};

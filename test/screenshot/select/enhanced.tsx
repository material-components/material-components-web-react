import * as React from 'react';
import {getSelects} from './index';

const EnhancedSelectScreenshotTest = () => {
  return <div className='select-container'>{getSelects(true)}</div>;
};

export default EnhancedSelectScreenshotTest;

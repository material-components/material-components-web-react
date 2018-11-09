import React from 'react';

import './index.scss';
import LinearProgress from '../../../packages/linear-progress/index';
import '../../../packages/linear-progress/index.scss';

const FullBuffer = () => {
  return (
    <LinearProgress
      buffer={1}
      bufferingDots={false}
      progress={0.5}
    />
  );
};

const Reversed = () => {
  return (
    <LinearProgress
      buffer={0.8}
      bufferingDots={false}
      progress={0.7}
      reversed
    />
  );
};

const Static = () => {
  return (
    <LinearProgress
      buffer={0.8}
      bufferingDots={false}
      progress={0.7}
    />
  );
};

const LinearProgressScreenshot = () => {
  return (
    <div className="linear-progress-sample__container">
      Full buffer
      <FullBuffer />
      Static
      <Static />
      Reversed
      <Reversed />
    </div>
  );
};

export default LinearProgressScreenshot;

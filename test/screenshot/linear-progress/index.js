import React from 'react';

import './index.scss';
import LinearProgress from '../../../packages/linear-progress/index';
import '../../../packages/linear-progress/index.scss';

class Closable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {closed: false};
    this.close = this.close.bind(this);
  }
  close() {
    this.setState((currentState) => ({closed: !currentState.closed}));
  }
  render() {
    return (
      <React.Fragment>
        <LinearProgress
          buffer={0.9}
          bufferingDots={false}
          closed={this.state.closed}
          progress={0.8}
        />
        <button onClick={this.close} type="button">Close</button>
      </React.Fragment>
    );
  }
}

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
      Closable
      <Closable />
    </div>
  );
};

export default LinearProgressScreenshot;

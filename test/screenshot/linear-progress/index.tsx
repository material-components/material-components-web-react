import React from 'react';
import './index.scss';
import LinearProgress from '../../../packages/linear-progress/index';
import '../../../packages/linear-progress/index.scss';

interface ClosableState {
  closed: boolean;
}

class Closable extends React.Component<{}, ClosableState> {
  state = {closed: false};

  render() {
    return (
      <React.Fragment>
        <LinearProgress
          buffer={0.9}
          closed={this.state.closed}
          progress={0.8}
        />
        <button
          onClick={() =>
            this.setState((currentState) => ({closed: !currentState.closed}))
          }
          type='button'
        >
          Close
        </button>
      </React.Fragment>
    );
  }
}

const FullBuffer = () => {
  return <LinearProgress buffer={1} progress={0.5} />;
};

const FullBufferReversed = () => {
  return <LinearProgress buffer={1} progress={0.5} reversed />;
};

const Indeterminate = () => {
  return <LinearProgress indeterminate />;
};

const IndeterminateReversed = () => {
  return <LinearProgress indeterminate reversed />;
};

const Static = () => {
  return <LinearProgress buffer={0.8} progress={0.7} />;
};

const StaticNoDots = () => {
  return <LinearProgress buffer={0.8} bufferingDots={false} progress={0.7} />;
};

const StaticReversed = () => {
  return <LinearProgress buffer={0.8} progress={0.7} reversed />;
};

const StaticReversedNoDots = () => {
  return (
    <LinearProgress
      buffer={0.8}
      bufferingDots={false}
      progress={0.7}
      reversed
    />
  );
};

const LinearProgressScreenshot = () => {
  return (
    <div className='linear-progress-sample__container test-animation--paused'>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Full buffer</p>
        <FullBuffer />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>
          Full buffer (reversed)
        </p>
        <FullBufferReversed />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Static</p>
        <Static />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Static (reversed)</p>
        <StaticReversed />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Static (no dots)</p>
        <StaticNoDots />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>
          Static (reversed, no dots)
        </p>
        <StaticReversedNoDots />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Indeterminate</p>
        <Indeterminate />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>
          Indeterminate (reversed)
        </p>
        <IndeterminateReversed />
      </div>
      <div className='linear-progress-sample__item'>
        <p className='linear-progress-sample__item__title'>Closable</p>
        <Closable />
      </div>
    </div>
  );
};
export default LinearProgressScreenshot;

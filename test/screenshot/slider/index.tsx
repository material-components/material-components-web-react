import React from 'react';
import './index.scss';

import Slider from '../../../packages/slider';

class SelectTest extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Slider value={4} min={2} max={8} />
        <Slider value={60} disabled />
        <Slider value={20} discrete step={10} max={50} />
        <Slider value={20} discrete displayMarkers step={10} />
        <Slider value={60} disabled discrete displayMarkers step={10} />
        <div dir='rtl'>
          <Slider isRtl value={4} min={2} max={8} />
          <Slider isRtl value={60} disabled />
          <Slider isRtl value={20} discrete step={10} max={50} />
          <Slider isRtl value={20} discrete displayMarkers step={10} />
          <Slider isRtl value={60} disabled discrete displayMarkers step={10} />
        </div>
      </div>
    );
  }
}
export default SelectTest;

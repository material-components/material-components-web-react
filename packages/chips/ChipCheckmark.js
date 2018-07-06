import React, {Component} from 'react';

export default class ChipCheckmark extends Component {
  width = null;

  init = (element) => {
    // The checkmark's width may initially be set to 0, so use the checkmark's height as a proxy since the
    // checkmark should always be square.
    this.width = element.getBoundingClientRect().height;
  }

  render() {
    return (
      <div className='mdc-chip__checkmark' ref={this.init}>
        <svg className='mdc-chip__checkmark-svg' viewBox='-2 -3 30 30'>
          <path
            className='mdc-chip__checkmark-path'
            fill='none'
            stroke='black'
            d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
        </svg>
      </div>
    );
  }
}

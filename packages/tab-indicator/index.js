import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCTabIndicatorFoundation} from '@material/tab-indicator/dist/mdc.tabIndicator';

export class TabIndicator extends Component {
  state = {
    
  };

  render() {
    return (
      <span class="mdc-tab-indicator">
        <span class="mdc-tab-indicator__content"></span>
      </span>
    );
  }
}

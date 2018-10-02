import React from 'react';

import {Chip, ChipSet} from '@material/react-chips';
import TopAppBar from '@material/react-top-app-bar';
import TextField from '@material/react-text-field';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';

import './index.scss';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        {this.renderHeader()}
        <div className='mdc-top-app-bar--fixed-adjust'>
          {this.renderContent()}
          <ChipSet filter>
            <Chip id='fast' label='Fast Delivery'/>
            <Chip id='great_flowers' label='Great Flowers'/>
            <Chip id='nice_courier' label='Nice Courier'/>
            <Chip id='easy_to_use' label='Easy to Order'/>
          </ChipSet>
         </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <TopAppBar
        title='Feedback'
        navigationIcon={<MaterialIcon
          icon='close'
          onClick={() => console.log('close feedback surface')}
        />}
      />
    );
  }

  renderContent() {
    return (
      <div>
        <h1 className='mdc-typography--headline5 mdc-theme--on-primary'>
          Thanks for spreading joy with Red Roses
        </h1>
        <p className='mdc-typography--body2'>
          We would love to hear about your ordering experience.
        </p>
      </div>
    );
  }
}

export default Feedback;

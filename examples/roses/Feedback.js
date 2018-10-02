import React from 'react';

import {Chip, ChipSet} from '@material/react-chips';
import TopAppBar from '@material/react-top-app-bar';
import TextField, {Input} from '@material/react-text-field';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';

import './index.scss';

class Feedback extends React.Component {
  state = {
    feedback: '',
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        <main className='feedback-page mdc-top-app-bar--fixed-adjust'>
          <div className='feedback-page__content'>
            {this.renderMessage()}
            <ChipSet filter>
              <Chip id='fast' label='Fast Delivery'/>
              <Chip id='great_flowers' label='Great Flowers'/>
              <Chip id='nice_courier' label='Nice Courier'/>
              <Chip id='easy_to_use' label='Easy to Order'/>
            </ChipSet>
            {this.renderFeedbackTextField()}
          </div>
        </main>
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

  renderMessage() {
    return (
      <div>
        <h1 className='mdc-typography--headline5 mdc-theme--on-primary'>
          Thanks for spreading joy with Red Roses
        </h1>
        <p className='mdc-typography--body2 message__subheader'>
          We would love to hear about your ordering experience.
        </p>
      </div>
    );
  }

  renderFeedbackTextField() {
    return (
      <div className='feedback-text-field__container'>
        <TextField
          label='Additional thoughts...'
          className='feedback-text-field'
          helperText={'Dont worry'}
        >
          <Input
            value={this.state.feedback}
            onChange={(evt) => this.setState({feedback: evt.target.value})}
          />
        </TextField>
      </div>
    );
  }
}

export default Feedback;

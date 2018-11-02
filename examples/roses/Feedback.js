// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {Chip, ChipSet} from '@material/react-chips';
import TopAppBar from '@material/react-top-app-bar';
import TextField, {Input, HelperText} from '@material/react-text-field';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import {Body2, Headline6} from '@material/react-typography';

class Feedback extends React.Component {
  state = {
    feedback: '',
    selectedFeedbackChips: [],
  };

  render() {
    return (
      <div>
        {this.renderTopAppBar()}
        <main className='feedback-page mdc-top-app-bar--fixed-adjust'>
          <div className='feedback-page__content'>
            <img
              className='feedback-logo'
              src='./assets/red_roses_logo.svg'
              alt='red roses logo'
            />
            {this.renderMessage()}
            <ChipSet
              filter
              handleSelect={(selectedFeedbackChips) => this.setState({selectedFeedbackChips})}
            >
              <Chip id='fast' label='Fast Delivery'/>
              <Chip id='great_flowers' label='Great Flowers'/>
              <Chip id='nice_courier' label='Nice Courier'/>
              <Chip id='easy_order' label='Easy to Order'/>
            </ChipSet>
            {this.renderFeedbackTextField()}
            {this.renderSubmit()}
          </div>
        </main>
      </div>
    );
  }

  renderTopAppBar() {
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
        <Headline6 className='mdc-theme--primary' tag='h2'>
          Thanks for spreading joy with Red Roses
        </Headline6>
        <Body2 className='message__subheader'>
          We would love to hear about your ordering experience.
        </Body2>
      </div>
    );
  }

  renderFeedbackTextField() {
    const helperText = (
      <HelperText persistent>
        Don&apos;t worry feedback is never shared with couriers
      </HelperText>
    );
    return (
      <div className='feedback-text-field__container'>
        <TextField
          label='Additional thoughts...'
          className='feedback-text-field'
          trailingIcon={<MaterialIcon icon='edit' />}
          helperText={helperText}
          outlined
        >
          <Input
            value={this.state.feedback}
            onChange={(evt) => this.setState({feedback: evt.target.value})}
          />
        </TextField>
      </div>
    );
  }

  renderSubmit() {
    return (
      <Button
        raised
        onClick={() => console.log('submit!')}
      >
        Submit
      </Button>
    );
  }
}

export default Feedback;

import classNames from 'classnames';
import React, {FormEvent} from 'react';

import Button from '@material/react-button';
import TextField, {Input} from '@material/react-text-field';

import './SearchPage.css';

export default class SearchPage extends React.Component {
  state = {
    keyword: '',
    timeoutKey: null,
  };

  notifyEmpty() {
    const timeoutKey = this.state.timeoutKey;

    if (timeoutKey) {
      clearInterval(timeoutKey);
      this.setState({timeoutKey: null});
    }
    setTimeout(() => {
      this.setState({
        timeoutKey: setTimeout(() => {
          this.setState({timeoutKey: null});
        }, 2000),
      });
    }, 0);
  }

  search() {
    if (this.state.keyword) {
      location.href = `/search-results/${this.state.keyword}`;
    } else {
      this.notifyEmpty();
    }
  }

  render() {
    return (
      <div className='search'>
        <div className='search__middle'>
          <div>
            <img
              alt='Google'
              width={272}
              height={92}
              src='/static/googlelogo@1x.png'
              srcSet={`
                /static/googlelogo@1x.png 1x,
                /static/googlelogo@2x.png 2x
              `}
            />
          </div>
          <div className='search__middle__text-field-wrapper'>
            <TextField
              outlined
              className={classNames(
                'search__middle__text-field-wrapper__text-field',
                !!this.state.timeoutKey && 'notify-empty'
              )}
            >
              <Input
                value={this.state.keyword}
                onChange={({target}: FormEvent) => {
                  this.setState({
                    keyword: (target as HTMLInputElement).value,
                  });
                }}
              />
            </TextField>
          </div>
          <div className='search__middle__button-wrapper'>
            <Button
              raised
              className='search__middle__button-wrapper__search-button'
              onClick={() => this.search()}
            >
              Google Search
            </Button>
            <Button
              raised
              target='_blank'
              href='https://www.google.com/doodles'
            >
              I’m Feeling Lucky
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

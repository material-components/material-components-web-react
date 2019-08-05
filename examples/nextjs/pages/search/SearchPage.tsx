import classNames from 'classnames';
import React from 'react';
import Router from 'next/router';

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
    requestAnimationFrame(() => {
      this.setState({
        timeoutKey: setTimeout(() => {
          this.setState({timeoutKey: null});
        }, 2000),
      });
    });
  }

  search() {
    if (this.state.keyword) {
      Router.push({pathname: `/search-results/${this.state.keyword}`}).catch(
        console.error
      );
    } else {
      this.notifyEmpty();
    }
  }

  clickSearch = () => {
    this.search();
  };

  enterSearch = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.search();
    }
  };

  syncKeyword = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    this.setState({keyword: target.value});
  };

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
                onKeyDown={this.enterSearch}
                onChange={this.syncKeyword}
              />
            </TextField>
          </div>
          <div className='search__middle__button-wrapper'>
            <Button
              raised
              className='search__middle__button-wrapper__search-button'
              onClick={this.clickSearch}
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

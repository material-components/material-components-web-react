import React from 'react';
import Router from 'next/router';
import TextField, {Input} from '@material/react-text-field';

import './SearchResultPage.css';

interface SearchResultProps {
  keyword: string;
}

export default class SearchResultPage extends React.Component<
  SearchResultProps
> {
  static getInitialProps({query: {keyword}}: {query: {keyword: string}}) {
    return {keyword};
  }

  goHome = () => {
    Router.push({pathname: '/'}).catch(console.error);
  };

  getSearchResults() {
    return [
      {
        title: `Material Components React`,
        url: `https://github.com/material-components/material-components-web-react`,
        description: `
          MDC React is the official implementation of Google's Material Design Components.
          It is a wrapper library for MDC Web.
          Please refer to our MDC Web Catalog to play and interact with the Components.
        `,
      },
      {
        title: `Material Components for iOS`,
        url: `https://github.com/material-components/material-components-ios`,
        description: `
          Material Components for iOS (MDC-iOS) helps developers execute Material Design.
          Developed by a core team of engineers and UX designers at Google,
          these components enable a reliable development workflow to build beautiful and functional iOS apps.
        `,
      },
      {
        title: `Material Components for the Web Catalog`,
        url: `https://github.com/material-components/material-components-web-catalog`,
        description: `
          This is the catalog of components for Material Components for the web (MDC Web).
        `,
      },
      {
        title: `Material Components for the web`,
        url: `https://github.com/material-components/material-components-web`,
        description: `
          Material Components for the web (MDC Web) helps developers execute Material Design.
          Developed by a core team of engineers and UX designers at Google,
          these components enable a reliable development workflow to build beautiful and functional web projects.
        `,
      },
      {
        title: `Material Components for Android`,
        url: `https://github.com/material-components/material-components-android`,
        description: `
          Developed by a core team of engineers and UX designers at Google,
          these components enable a reliable development workflow to build beautiful and functional Android apps.
        `,
      },
    ];
  }

  render() {
    return (
      <div className='search-result'>
        <div className='search-result__form'>
          <img
            alt='Google'
            width={123}
            height={40}
            src='/static/googlelogo@1x.png'
            srcSet={`
              /static/googlelogo@1x.png 1x,
              /static/googlelogo@2x.png 2x
            `}
            className='search-result__form__logo'
            onClick={this.goHome}
          />
          <TextField outlined className='search-result__form__text-field'>
            <Input value={this.props.keyword} />
          </TextField>
        </div>
        <div className='search-result__result-list'>
          <p className='search-result__result-list__stats'>
            검색결과 약 7,600,000,000개 (0.49초)
          </p>
          <ul>
            {this.getSearchResults().map((v, i) => (
              <li key={i} className='search-result__result-list__result'>
                <a
                  href={v.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='search-result__result-list__result__title'
                >
                  {v.title}
                </a>
                <a
                  href={v.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='search-result__result-list__result__link'
                >
                  {v.url}
                </a>
                <p className='search-result__result-list__result__description'>
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

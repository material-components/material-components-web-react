import React from 'react';
import ReactDOM from 'react-dom';
import '@material/button/mdc-button.scss';
import '@material/list/mdc-list.scss';
import '../../../packages/card/index.scss';
import './index.scss';

import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardContent,
  CardMedia,
} from '../../../packages/card';
import MaterialIcon from '../../../packages/material-icon';
const imageUrl = './../images/1-1.jpg';

// TODO: swap mdc-button for @material/button

const BasicCard = () => {
  return (
    <Card className='basic-card'>
      <CardContent>
        <CardMedia className='basic-card-image' imageUrl={imageUrl} />
        <div className='basic-card-header'>
          <h2 className='mdc-typography--title card-title'>Pomsky</h2>
          <h3 className='mdc-typography--subheading1 card-subtitle'>
            medium sized dog; one part pomeranian, one part husky
          </h3>
        </div>
      </CardContent>
      <CardActions>
        <CardActionButtons>
          <button className='mdc-button'>Leave Comment</button>
        </CardActionButtons>
        <CardActionIcons>
          <MaterialIcon icon='thumb_up'/>
          <MaterialIcon icon='thumb_down'/>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const HorizontalCard = () => {
  return (
    <Card className='horizontal-card'>
      <CardContent>
        <div className='horizontal-card-content'>
          <CardMedia square className='horizontal-card-image' imageUrl={imageUrl} />
          <div className='horizontal-card-header'>
            <h2 className='mdc-typography--title card-title'>Cardi B</h2>
            <h3 className='mdc-typography--body1 card-subtitle'>Finesse</h3>
            <h3 className='mdc-typography--body1 card-subtitle'>(2018)</h3>
          </div>
        </div>
      </CardContent>
      <hr className='mdc-list-divider'/>
      <CardActions fullBleed>
        <CardActionButtons>
          <button className='mdc-button'>Rate this album</button>
        </CardActionButtons>

        <CardActionIcons>
          <MaterialIcon className='horizontal-card-icon' icon='star_border'/>
          <MaterialIcon className='horizontal-card-icon' icon='star_border'/>
          <MaterialIcon className='horizontal-card-icon' icon='star_border'/>
          <MaterialIcon className='horizontal-card-icon' icon='star_border'/>
          <MaterialIcon className='horizontal-card-icon' icon='star_border'/>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const newsContent = [{
  title: 'Baboons escape',
  snippet: 'Four baboons, having clearly read too much dystopian fiction, '
  + 'escaped...',
}, {
  title: 'The French Caribbean\'s greatest secret',
  snippet: 'Located within the lower crescent of the Caribbean archipelago '
  + 'between the islands of Montserrat and Dominica...',
}, {
  title: 'Is coffee heatlhy?',
  snippet: 'The reduction in risk was more significant once people reached the'
  + ' age of 45, suggesting that it may be even more beneficial to consume coffee'
  + ' as we get older.',
}];

const NewsCard = () => {
  return (
    <Card className='news-card' stroked>
      <h2 className='news-card-headline mdc-typography--subheading1'>Headlines</h2>
      {newsContent.map((content, index) =>
        <NewsRow {...content} key={index} index={index} />)}
      <hr className='mdc-list-divider'/>
      <CardActions fullBleed>
        <CardActionButtons className='news-buttons'>
          <button className='mdc-button'>
            All business headlines
            <MaterialIcon icon='arrow_forward'/>
          </button>
        </CardActionButtons>
      </CardActions>
    </Card>
  );
};

const NewsRow = ({title, snippet, index}) => {
  return ([
    <hr key={`title-${index}`} className='mdc-list-divider'/>,
    <div key={`snippet-${index}`} className='news-row'>
      <h2 className='mdc-typography--title card-title'>{title}</h2>
      <p className='mdc-typography--body1 card-subtitle'>{snippet}</p>
    </div>,
  ]);
};

const ContentOnMediaCard = () => {
  return (
    <Card className='content-on-media-card'>
      <CardContent>
        <CardMedia
          square
          contentClassName='content-on-media-content'
          className='content-on-media-card-image'
          imageUrl={imageUrl}
        >
          <div className='content-on-media-content__text mdc-typography--subheading2'>
            Vacation Photos
          </div>
        </CardMedia>
      </CardContent>
      <CardActions>
        <CardActionIcons>
          <MaterialIcon icon='favorite_border'/>
          <MaterialIcon icon='bookmark_border'/>
          <MaterialIcon icon='share'/>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

ReactDOM.render((
  <div>
    <BasicCard />
    <HorizontalCard />
    <NewsCard />
    <ContentOnMediaCard />
  </div>
), document.getElementById('app'));

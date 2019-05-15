import React from 'react';
import '@material/button/mdc-button.scss';
import '@material/list/mdc-list.scss';
import '../../../packages/card/index.scss';
import './index.scss';
import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardPrimaryContent,
  CardMedia,
} from '../../../packages/card/index';
import MaterialIcon from '../../../packages/material-icon';
const imageUrl = './../images/1-1.jpg';

// TODO: swap mdc-button for @material/button
const BasicCard = () => {
  return (
    <Card className='basic-card'>
      <CardPrimaryContent>
        <CardMedia className='basic-card-image' imageUrl={imageUrl} />
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <button className='mdc-button'>Leave Comment</button>
        </CardActionButtons>
        <CardActionIcons>
          <MaterialIcon icon='thumb_up' />
          <MaterialIcon icon='thumb_down' />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const HorizontalCard = () => {
  return (
    <Card className='horizontal-card'>
      <CardPrimaryContent>
        <div className='horizontal-card-content'>
          <CardMedia
            square
            className='horizontal-card-image'
            imageUrl={imageUrl}
          />
          <div className='horizontal-card-header'>
            <h2 className='mdc-typography--body1 card-title'>Khalid</h2>
            <h3 className='mdc-typography--body1 card-subtitle'>Silence</h3>
            <h3 className='mdc-typography--body1 card-subtitle'>(2017)</h3>
          </div>
        </div>
      </CardPrimaryContent>
      <hr className='mdc-list-divider' />
      <CardActions fullBleed>
        <CardActionButtons>
          <button className='mdc-button'>Rate this album</button>
        </CardActionButtons>
        <CardActionIcons>
          <MaterialIcon className='horizontal-card-icon' icon='star_border' />
          <MaterialIcon className='horizontal-card-icon' icon='star_border' />
          <MaterialIcon className='horizontal-card-icon' icon='star_border' />
          <MaterialIcon className='horizontal-card-icon' icon='star_border' />
          <MaterialIcon className='horizontal-card-icon' icon='star_border' />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const newsContent = [
  {
    title: 'Baboons escape',
    snippet: 'Four baboons, having clearly read too much dystopian fiction...',
  },
  {
    title: 'Copper on the rise',
    snippet: 'Located within the lower crescent of...',
  },
  {
    title: 'Is coffee heatlhy?',
    snippet:
      'The reduction in risk was more significant once people reached...',
  },
];

const NewsCard = () => {
  return (
    <Card className='news-card' outlined>
      {newsContent.map((content, index) => (
        <NewsRow {...content} key={index} index={index} />
      ))}
      <hr className='mdc-list-divider' />
      <CardActions fullBleed>
        <CardActionButtons className='news-buttons'>
          <button className='mdc-button'>
            All business headlines
            <MaterialIcon icon='arrow_forward' />
          </button>
        </CardActionButtons>
      </CardActions>
    </Card>
  );
};

const NewsRow: React.FunctionComponent<{
  title: string;
  snippet: string;
  index: number;
}> = ({title, snippet, index}) => {
  return (
    <React.Fragment>
      <hr key={`title-${index}`} className='mdc-list-divider' />
      <div key={`snippet-${index}`} className='news-row'>
        <h2 className='mdc-typography--body1 card-title'>{title}</h2>
        <p className='mdc-typography--body1 card-subtitle'>{snippet}</p>
      </div>
    </React.Fragment>
  );
};

const ContentOnMediaCard = () => {
  return (
    <Card className='content-on-media-card'>
      <CardPrimaryContent>
        <CardMedia
          square
          contentClassName='content-on-media-content'
          className='content-on-media-card-image'
          imageUrl={imageUrl}
        >
          <div className='content-on-media-content__text mdc-typography--subtitle1'>
            Vacation Images
          </div>
        </CardMedia>
      </CardPrimaryContent>
      <CardActions>
        <CardActionIcons>
          <MaterialIcon icon='favorite_border' />
          <MaterialIcon icon='bookmark_border' />
          <MaterialIcon icon='share' />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const CardScreenshotTest = () => {
  return (
    <div>
      <BasicCard />
      <HorizontalCard />
      <NewsCard />
      <ContentOnMediaCard />
    </div>
  );
};
export default CardScreenshotTest;

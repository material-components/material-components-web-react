import React from 'react';
import ReactDOM from 'react-dom';
import '../../../packages/card/index.scss';
import './index.scss';

import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardContent,
  CardMedia,
} from '../../../packages/card';
const imageUrl = '';

const BasicCard = () => {
  return (
    <Card className='basic-card'>
      <CardContent>
        <CardMedia className='basic-card-image' imageUrl={imageUrl} />
        <div className='basic-card-header'>
          <h2 className='mdc-typography--title basic-card-title'>Pomsky</h2>
          <h3 className='mdc-typography--subheading1 basic-card-subtitle'>
            medium sized dog; one part pomeranian, one part husky
          </h3>
        </div>
      </CardContent>
      <CardActions>
        <CardActionButtons>
          <button>Leave Comment</button>
        </CardActionButtons>
        <CardActionIcons>
          <i>Like</i>
          <i>Hate</i>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

const HorizontalCard = () => {
  return (
    <Card className='horizontal-card'>
      <CardContent>

      </CardContent>
    </Card>
  );
};

ReactDOM.render((
  <div>
    <BasicCard />
    <HorizontalCard />
  </div>
), document.getElementById('app'));

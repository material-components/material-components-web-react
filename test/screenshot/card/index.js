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
    <Card>
      <CardMedia imageUrl={imageUrl}/>
    </Card>
  );
}
ReactDOM.render((
  <div>
    <BasicCard />
  </div>
), document.getElementById('app'));

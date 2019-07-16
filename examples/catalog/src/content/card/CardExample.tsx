import React from 'react';

import Button from '@material/react-button';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from '@material/react-card';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';

const styles = require('./CardExample.scss');
const avatar = 'https://avatars3.githubusercontent.com/u/19478152?s=200&v=4';

export const CardExample = () => (
  <Grid className={styles.container}>
    <Row>
      {Array(12)
        .fill(0)
        .map((_, i) => i + 1)
        .map((key) => (
          <Cell key={key} desktopColumns={3}>
            <Card>
              <CardPrimaryContent>
                <CardMedia square imageUrl={avatar} />
              </CardPrimaryContent>

              <CardActions>
                <CardActionButtons>
                  <Button>Click Me</Button>
                </CardActionButtons>
                <CardActionIcons>
                  <MaterialIcon icon='favorite_border' />
                </CardActionIcons>
              </CardActions>
            </Card>
          </Cell>
        ))}
    </Row>
  </Grid>
);

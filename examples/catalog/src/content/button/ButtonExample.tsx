import React from 'react';

import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';

export const ButtonExample = () => (
  <Grid>
    <Row>
      <Cell>
        <Button>default</Button>
      </Cell>
      <Cell>
        <Button raised>raised</Button>
      </Cell>
      <Cell>
        <Button unelevated>unelevated</Button>
      </Cell>
      <Cell>
        <Button outlined>outlined</Button>
      </Cell>
      <Cell>
        <Button dense>dense</Button>
      </Cell>
      <Cell>
        <Button icon={<MaterialIcon icon='stars' />}>icon</Button>
      </Cell>
      <Cell>
        <Button trailingIcon={<MaterialIcon icon='cached' />}>
          trailing-icon
        </Button>
      </Cell>
      <Cell>
        <Button disabled>disabled</Button>
      </Cell>
    </Row>
  </Grid>
);

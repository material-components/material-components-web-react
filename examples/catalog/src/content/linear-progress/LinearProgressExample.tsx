import React from 'react';

import LinearProgress from '@material/react-linear-progress';
import {Cell, Grid, Row} from '@material/react-layout-grid';

export const LinearProgressExample = () => (
  <Grid>
    <Row>
      <Cell>
        <LinearProgress indeterminate />
      </Cell>
      <Cell>
        <LinearProgress buffer={0.9} progress={0.8} />
      </Cell>
      <Cell>
        <LinearProgress reversed buffer={0.9} progress={0.8} />
      </Cell>
      <Cell>
        <LinearProgress bufferingDots={false} buffer={0.9} progress={0.8} />
      </Cell>
    </Row>
  </Grid>
);

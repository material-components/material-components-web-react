import React from 'react';

import Radio, {NativeRadioControl} from '@material/react-radio';
import {Cell, Grid, Row} from '@material/react-layout-grid';

export const RadioExample = () => (
  <Grid>
    <Row>
      <Cell>
        <Radio label='Angular' key='angular'>
          <NativeRadioControl name='framework' value='angular' id='angular' />
        </Radio>
      </Cell>
      <Cell>
        <Radio label='React' key='react'>
          <NativeRadioControl name='framework' value='react' id='react' />
        </Radio>
      </Cell>
      <Cell>
        <Radio label='Vue' key='vue'>
          <NativeRadioControl name='framework' value='vue' id='vue' />
        </Radio>
      </Cell>
      <Cell>
        <Radio label='Disabled' key='disabled'>
          <NativeRadioControl
            disabled
            name='framework'
            value='disabled'
            id='disabled'
          />
        </Radio>
      </Cell>
    </Row>
  </Grid>
);

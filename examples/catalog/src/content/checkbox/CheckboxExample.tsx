import React from 'react';

import Checkbox from '@material/react-checkbox';
import {Cell, Grid, Row} from '@material/react-layout-grid';

const styles = require('./CheckboxExample.scss');

export const CheckboxExample = () => (
  <Grid>
    <Row>
      <Cell className={styles.checkbox}>
        <Checkbox nativeControlId='checkbox1' className={styles.check} />
        <label htmlFor='checkbox1' className={styles.label}>
          default
        </label>
      </Cell>
      <Cell className={styles.checkbox}>
        <Checkbox
          nativeControlId='checkbox2'
          className={styles.check}
          checked
        />
        <label htmlFor='checkbox2' className={styles.label}>
          checked
        </label>
      </Cell>
      <Cell className={styles.checkbox}>
        <Checkbox
          nativeControlId='checkbox2'
          className={styles.check}
          indeterminate
        />
        <label htmlFor='checkbox2' className={styles.label}>
          indeterminate
        </label>
      </Cell>
      <Cell className={styles.checkbox}>
        <Checkbox
          nativeControlId='checkbox3'
          className={styles.check}
          disabled
        />
        <label htmlFor='checkbox3' className={styles.label}>
          disabled
        </label>
      </Cell>
    </Row>
  </Grid>
);

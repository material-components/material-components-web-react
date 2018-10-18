import React from 'react';

import './index.scss';
import {Cell, Grid, Row} from '../../../packages/layout-grid/index';
import '../../../packages/layout-grid/index.scss';

const NoWidth = () => {
  return (
    <Grid>
      <Row>
        <Cell className="layout-grid-sample__cell__one">Tennis</Cell>
        <Cell className="layout-grid-sample__cell__two">Cricket</Cell>
        <Cell className="layout-grid-sample__cell__three">StarCraft</Cell>
      </Row>
    </Grid>
  );
};

const OneThird = () => {
  return (
    <Grid>
      <Row>
        <Cell className="layout-grid-sample__cell__one" columns={4}>Tennis</Cell>
        <Cell className="layout-grid-sample__cell__two" columns={4}>Cricket</Cell>
        <Cell className="layout-grid-sample__cell__three" columns={4}>StarCraft</Cell>
      </Row>
    </Grid>
  );
};

const ThirdHalfFull = () => {
  return (
    <Grid>
      <Row>
        <Cell
          className="layout-grid-sample__cell__one"
          desktop={4}
          phone={4}
          tablet={4}
        >
          Tennis
        </Cell>
        <Cell
          className="layout-grid-sample__cell__two"
          desktop={4}
          phone={4}
          tablet={4}
        >
          Cricket
        </Cell>
        <Cell
          className="layout-grid-sample__cell__three"
          desktop={4}
          phone={4}
          tablet={4}
        >
          StarCraft
        </Cell>
      </Row>
    </Grid>
  );
};

const Nested = () => {
  return (
    <Grid>
      <Row>
        <Cell desktop={8} phone={4} tablet={5}>
          <Row>
            <Cell
              className="layout-grid-sample__cell__one"
              desktop={6}
              phone={2}
              tablet={4}
            >
              Tennis
            </Cell>
            <Cell
              className="layout-grid-sample__cell__two"
              desktop={6}
              phone={2}
              tablet={4}
            >
              Cricket
            </Cell>
          </Row>
        </Cell>
        <Cell desktop={4} phone={4} tablet={3}>
          <Row>
            <Cell
              className="layout-grid-sample__cell__one"
              desktop={6}
              phone={2}
              tablet={4}
            >
              Tennis
            </Cell>
            <Cell
              className="layout-grid-sample__cell__two"
              desktop={6}
              phone={2}
              tablet={4}
            >
              Cricket
            </Cell>
          </Row>
        </Cell>
      </Row>
    </Grid>
  );
};

const Ordering = () => {
  return (
    <Grid>
      <Row>
        <Cell className="layout-grid-sample__cell__one" order={3}>Tennis</Cell>
        <Cell className="layout-grid-sample__cell__two" order={1}>Cricket</Cell>
        <Cell className="layout-grid-sample__cell__three" order={2}>StarCraft</Cell>
      </Row>
    </Grid>
  );
};

const LayoutGrid = () => {
  return (
    <div>
      No width specified
      <NoWidth />
      One third
      <OneThird />
      Third (Desktop), Half (Tablet), Full (Phone)
      <ThirdHalfFull />
      Nested
      <Nested />
      Ordering
      <Ordering />
    </div>
  );
};

export default LayoutGrid;

import React from 'react';
import {
  Body1,
  Body2,
  Button,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '../../../packages/typography/index';
import '../../../packages/typography/index.scss';

const Standard = () => (
  <React.Fragment>
    <Headline1>Kate Lockwell</Headline1>
    <Headline2>Jim Raynor</Headline2>
    <Headline3>Kerrigan</Headline3>
    <Headline4>Arcturus Mengsk</Headline4>
    <Headline5>Valerian Mengsk</Headline5>
    <Headline6>Donny Vermillion</Headline6>
    <Subtitle1>Kate Lochwell</Subtitle1>
    <Subtitle2>Jim Raynor</Subtitle2>
    <Body1>Kerrigan</Body1>
    <Body2>Arcturus Mengsk</Body2>
    <div>
      <Caption>Valerian Mengsk</Caption>
    </div>
    <div>
      <Button>Donny Vermillion</Button>
    </div>
    <div>
      <Overline>Kate Lockwell</Overline>
    </div>
  </React.Fragment>
);

const Nested = () => (
  <React.Fragment>
    <Body1>
      Kate <Caption>Lockwell</Caption>
    </Body1>
    <Body2>
      Donny <Button>Vermillion</Button>
    </Body2>
  </React.Fragment>
);

const Typography = () => (
  <React.Fragment>
    Standard:
    <Standard />
    Nested:
    <Nested />
  </React.Fragment>
);

export default Typography;

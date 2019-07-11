import React from 'react';
import TextField, {
  CharacterCounter,
  Input,
} from '../../../../packages/text-field';

import '../../../../packages/text-field/character-counter/index.scss';

const Container = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <div>
    <div style={{display: 'inline-block'}}>{props.children}</div>
  </div>
);

const TextFieldCharacterCounterScreenshotTest = () => {
  return (
    <React.Fragment>
      <CharacterCounter />
      <CharacterCounter template='now(${count} / max(${maxLength}))' />
      <Container>
        <TextField label='HaHa' characterCounter={<CharacterCounter />}>
          <Input maxLength={150} />
        </TextField>
      </Container>
      <Container>
        <TextField label='HaHa' characterCounter={<CharacterCounter />}>
          <Input value='Happy Coding' maxLength={150} />
        </TextField>
      </Container>
      <Container>
        <TextField
          label='HaHa'
          characterCounter={
            <CharacterCounter template='현재(${count}) / 최대(${maxLength})' />
          }
        >
          <Input value='Happy Coding' maxLength={150} />
        </TextField>
      </Container>
      <Container>
        <TextField
          textarea
          label='HaHa'
          characterCounter={
            <CharacterCounter template='현재(${count}) / 최대(${maxLength})' />
          }
        >
          <Input value='Happy Coding' maxLength={150} />
        </TextField>
      </Container>
    </React.Fragment>
  );
};
export default TextFieldCharacterCounterScreenshotTest;

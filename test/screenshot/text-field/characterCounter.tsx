import React from 'react';
import TextField, {CharacterCounter, Input} from '../../../packages/text-field';

const Container = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div>
    <div style={{display: 'inline-block'}}>
      {props.children}
    </div>
  </div>
);

class CharacterCounterTextField extends React.Component<{}, {value: string}> {
  render() {
    return (
      <React.Fragment>
        <Container>
          <TextField label='HaHa' characterCounter={<CharacterCounter />}>
            <Input maxLength={150} />
          </TextField>
        </Container>
        <Container>
          <TextField label='HaHa' characterCounter={<CharacterCounter />}>
            <Input
              value='Happy Coding'
              maxLength={150}
            />
          </TextField>
        </Container>
        <Container>
          <TextField label='HaHa' characterCounter={<CharacterCounter template='현재(${count}) / 최대(${maxLength})' />}>
            <Input
              value='Happy Coding'
              maxLength={150}
            />
          </TextField>
        </Container>
        <Container>
          <TextField
            textarea
            label='HaHa'
            characterCounter={<CharacterCounter template='현재(${count}) / 최대(${maxLength})' />}
          >
            <Input
              value='Happy Coding'
              maxLength={150}
            />
          </TextField>
        </Container>
      </React.Fragment>
    );
  }
}
export default CharacterCounterTextField;

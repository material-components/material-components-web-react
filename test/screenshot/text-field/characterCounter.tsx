import React from 'react';
import TextField, {CharacterCounter, Input} from '../../../packages/text-field';

class CharacterCounterTextField extends React.Component<{}, {value: string}> {
  render() {
    return (
      <div>
        <TextField label='HaHa' characterCounter={<CharacterCounter />}>
          <Input maxLength={150} />
        </TextField>
        <TextField label='HaHa' characterCounter={<CharacterCounter />}>
          <Input
            value='Happy Coding'
            maxLength={150}
          />
        </TextField>
      </div>
    );
  }
}
export default CharacterCounterTextField;

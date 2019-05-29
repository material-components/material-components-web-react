import React from 'react';
import TextField, {Input} from '../../../packages/text-field';

class OutlinedTextField extends React.Component<{}, {value: string}> {
  inputEl: Input<HTMLInputElement> | null = null;
  state = {value: ''};

  onChange: (e: React.FormEvent) => void = (e) =>
    this.setState({value: (e.target as HTMLInputElement).value});

  render() {
    return (
      <div>
        <TextField label='Dog' outlined>
          <Input autoFocus value={this.state.value} onChange={this.onChange} />
        </TextField>
      </div>
    );
  }
}
export default OutlinedTextField;

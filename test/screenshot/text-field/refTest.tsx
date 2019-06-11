import React from 'react';
import TextField, {Input} from '../../../packages/text-field';
import Button from '../../../packages/button/index';

class TextFieldRefTest extends React.Component<{}, {value: string}> {
  inputEl: Input<HTMLInputElement> | null = null;
  state = {value: ''};

  onChange: (e: React.FormEvent) => void = (e) =>
    this.setState({value: (e.target as HTMLInputElement).value});

  onClick: () => void = () => {
    if (!this.inputEl) return;
    if (!this.inputEl.inputElement) return;
    this.inputEl.inputElement.focus();
  };

  init: (input: any) => void = (input) => (this.inputEl = input);

  render() {
    return (
      <div>
        <TextField label='Dog' outlined>
          <Input
            ref={this.init}
            value={this.state.value}
            onChange={this.onChange}
          />
        </TextField>
        <div>
          <Button raised onClick={this.onClick}>
            Focus Text Field
          </Button>
        </div>
      </div>
    );
  }
}
export default TextFieldRefTest;

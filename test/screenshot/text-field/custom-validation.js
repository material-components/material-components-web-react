import React from 'react';

import TextField, {HelperText, Input} from '../../../packages/text-field/index';

class CustomValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: undefined, value: '', value2: ''};
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.renderHelperText = this.renderHelperText.bind(this);
    this.validate = this.validate.bind(this);
  }
  onChange(e) {
    this.setState({value: e.target.value});
    this.validate();
  }
  onChange2(e) {
    this.setState({value2: e.target.value});
  }
  validate() {
    this.setState({error: 'BAD'});
  }
  renderHelperText() {
    if (!!this.state.error) {
      return (
        <HelperText
          isValid={false}
          isValidationMessage
          // persistent
          validation
        >
          {this.state.error}
        </HelperText>
      );
    } else {
      return (
        <HelperText
          // persistent
        >
          Helper text
        </HelperText>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div style={{margin: '0 0 100px 0'}}>
          <TextField
            helperText={this.renderHelperText()}
            label="Bad input"
            >
              <Input
                onBlur={this.validate}
                onChange={this.onChange}
                name="bad-field"
                isValid={!(!!this.state.error)}
                value={this.state.value}
              />
            </TextField>
        </div>
        <div style={{margin: '0 0 100px 0'}}>
          <TextField
            helperText={(
              <HelperText
                isValid={false}
                isValidationMessage
                validation
              >
                Invalid from the start
              </HelperText>
            )}
            label="Bad input 2"
            >
              <Input
                onChange={this.onChange2}
                name="bad-field"
                isValid={false}
                value={this.state.value}
              />
            </TextField>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomValidation;

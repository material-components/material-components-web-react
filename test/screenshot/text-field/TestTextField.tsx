import * as React from 'react';
import TextField, {Input} from '../../../packages/text-field';
type TestFieldProps = {
  disabled?: boolean,
  id?: string,
  variant?: string,
  isRtl?: boolean,
  minLength?: number,
  required?: boolean,
  value?: string | number | boolean,
};

type TestFieldState = {
  value: string,
};

class TestField extends React.Component<TestFieldProps, TestFieldState> {
  constructor(props: TestFieldProps) {
    super(props);
    this.state = {
      value: props.value === '' ? props.value : 'woof',
    };
  }

  onChange = (e: React.FormEvent) => this.setState({value: (e.target as HTMLInputElement).value});

  render() {
    const {
      /* eslint-disable react/prop-types */
      disabled,
      id,
      variant,
      isRtl,
      minLength,
      required,
      value, // eslint-disable-line no-unused-vars
      /* eslint-enable react/prop-types */
      ...otherProps
    } = this.props;

    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <TextField
          label='Dog'
          outlined={variant === 'outlined'}
          fullWidth={variant === 'fullWidth'}
          textarea={variant === 'textarea'}
          {...otherProps}
          className='text-field'>
          <Input
            value={this.state.value}
            id={id}
            minLength={minLength}
            required={required}
            disabled={disabled}
            onChange={this.onChange}
          />
        </TextField>
      </div>
    );
  }
}
export default TestField;

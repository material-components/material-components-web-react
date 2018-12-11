import * as React from 'react';
// @ts-ignore
import TextField, {Input} from '../../../packages/text-field/index.tsx';
type TestFieldProps = {
  disabled: boolean,
  id: string,
  variant: string,
  isRtl: boolean,
  minLength: number,
  required: boolean,
  value: string | number | boolean,
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
          className='text-field'
          isRtl={isRtl}
        >
          <Input
            value={this.state.value}
            id={id}
            minLength={minLength}
            required={required}
            disabled={disabled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({value: (e.target as HTMLInputElement).value})}
          />
        </TextField>
      </div>
    );
  }
}
export default TestField;

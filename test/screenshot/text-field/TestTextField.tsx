import React from "react";
import TextField, { Input } from "../../../packages/text-field";
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
  constructor(props) {
    super(props);
    this.state = {
      value: props.value === "" ? props.value : "woof"
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
      <div dir={isRtl ? "rtl" : "ltr"}>
        <TextField
          label="Dog"
          outlined={variant === "outlined"}
          fullWidth={variant === "fullWidth"}
          textarea={variant === "textarea"}
          {...otherProps}
          className="text-field"
          isRtl={isRtl}
        >
          <Input
            value={this.state.value}
            id={id}
            minLength={minLength}
            required={required}
            disabled={disabled}
            onChange={(e) => this.setState({ value: (e.target as HTMLInputElement).value })}
          />
        </TextField>
      </div>
    );
  }
}
export default TestField;

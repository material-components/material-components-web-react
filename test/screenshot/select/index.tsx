import * as React from "react";
import Select, {SelectProps} from "../../../packages/select/index";
import "../../../packages/select/index.scss";
import "./index.scss";


interface SelectTestState {
  value: any
}

class SelectTest extends React.Component<SelectProps, SelectTestState> {
  constructor(props: SelectProps) {
    super(props);
    this.state = { value: props.value || "" }; // eslint-disable-line react/prop-types
  }

  render() {
    const {
      disabled,
      id,
      isRtl,
      ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? "rtl" : "ltr"}>
        <Select
          {...otherProps}
          className="test-select"
          label="Dog"
          id={id}
          isRtl={isRtl}
          disabled={disabled}
          onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => this.setState({ value: evt.target.value })}
          value={this.state.value}
        >
          <option value="" disabled />
          <option value="labradoodle">Labradoodle</option>
          <option value="pomsky">Pomsky</option>
          <option value="aussiepom">Aussiepom</option>
          <option value="bullmation">Bullmation</option>
        </Select>
      </div>
    );
  }
}

const variants = [{}, { box: true }, { outlined: true }];
const rtlMap = [{}, { isRtl: true }];
const disabledMap = [{}, { value: "pomsky" }, { disabled: true }];
const selects = variants.map(variant => {
  return rtlMap.map(isRtl => {
    return disabledMap.map(disabled => {
      const props = Object.assign({}, variant, disabled, isRtl);
      const variantKey = Object.keys(variant)[0] || "";
      const rtlKey = Object.keys(isRtl)[0] || "";
      const disabledKey = Object.keys(disabled)[0] || "";
      const key = `${variantKey}-${disabledKey}--${rtlKey}`;
      return <SelectTest {...props} key={key} id={key} />;
    });
  });
});

const SelectScreenshotTest = () => {
  return <div className="select-container">{selects}</div>;
};
export default SelectScreenshotTest;

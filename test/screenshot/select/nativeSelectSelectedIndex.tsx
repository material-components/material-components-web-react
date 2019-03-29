import * as React from 'react';
import Select, {SelectProps} from '../../../packages/select/index';
import Button from '../../../packages/button/index';

interface SelectTestState {
  value: any
}

interface Props extends SelectProps {
  staticContext: any;
}

class SelectedIndexTest extends React.Component<Props, SelectTestState> {

  constructor(props: Props) {
    super(props);
    this.state = {value: props.value || ''}; // eslint-disable-line react/prop-types
  }

  static defaultProps: Partial<SelectProps> = {
    box: false,
    className: '',
    disabled: false,
    floatingLabelClassName: '',
    isRtl: false,
    lineRippleClassName: '',
    nativeControlClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    options: [],
    onChange: () => {},
  }

  onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => (
    this.setState({value: evt.target.value})
  );

  render() {
    const {
      disabled,
      id,
      isRtl,
      staticContext,
      ref, // eslint-disable-line no-unused-vars
      ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        {/* <Button onClick={}>
          Select 2nd Item
        </Button> */}
        <Select
          {...otherProps}
          className='test-select'
          label='Dog'
          id={id}
          isRtl={isRtl}
          disabled={disabled}
          onChange={this.onChange}
          value={this.state.value}
        >
          <option value='' disabled />
          <option value='labradoodle'>Labradoodle</option>
          <option value='pomsky'>Pomsky</option>
          <option value='aussiepom'>Aussiepom</option>
          <option value='bullmation'>Bullmation</option>
        </Select>
      </div>
    );
  }
}

export default SelectedIndexTest;
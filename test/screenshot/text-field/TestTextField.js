import React from 'react';

import TextField, {Input, HelperText} from '../../../packages/text-field/index';
import MaterialIcon from '../../../packages/material-icon/index';
import {denseMap, rtlMap , requiredMap, disabledMap, helperTextMap} from './maps';

class TestField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value === '' ? props.value : 'woof', // eslint-disable-line react/prop-types
    };
  }
  render() {
    const {
      /* eslint-disable react/prop-types */
      disabled,
      id,
      isRtl,
      minLength,
      required,
      value, // eslint-disable-line no-unused-vars
      /* eslint-enable react/prop-types */
      ...otherProps
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <TextField label='Dog' {...otherProps} className='text-field' isRtl={isRtl}>
          <Input value={this.state.value}
            id={id}
            minLength={minLength}
            required={required}
            disabled={disabled}
            onChange={(e) => this.setState({value: e.target.value})}/>
        </TextField>
      </div>
    );
  }
}

export default TestField;

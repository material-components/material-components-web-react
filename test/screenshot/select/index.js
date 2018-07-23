import React from 'react';
import ReactDOM from 'react-dom';

import Select from '../../../packages/select/index';

import '../../../packages/select/index.scss';
import './index.scss';

class SelectTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value || ''}; // eslint-disable-line react/prop-types
  }

  render() {
    const {
      disabled, id, isRtl, ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <Select
          {...otherProps}
          className='test-select'
          label='Dog'
          id={id}
          disabled={disabled}
          onChange={(evt) => this.setState({value: evt.target.value})}
          value={this.state.value}
        >
          <option value="" disabled></option>
          <option value='labradoodle'>Labradoodle</option>
          <option value='pomsky'>Pomsky</option>
          <option value='aussiepom'>Aussiepom</option>
          <option value='bullmation'>Bullmation</option>
        </Select>
      </div>
    );
  }
}

const variants = [
  {},
  {box: true},
  {outlined: true},
];

const rtlMap = [
  {},
  {isRtl: true},
];

const disabledMap = [
  {},
  {value: 'pomsky'},
  {disabled: true},
];

const selects = variants.map((variant) => {
  return rtlMap.map((isRtl) => {
    return disabledMap.map((disabled) => {
      const props = Object.assign({}, variant, disabled, isRtl);
      const variantKey = Object.keys(variant)[0] || '';
      const rtlKey = Object.keys(isRtl)[0] || '';
      const disabledKey = Object.keys(disabled)[0] || '';
      const key = `${variantKey}-${disabledKey}--${rtlKey}`;

      return <SelectTest {...props} key={key} id={key} />;
    });
  });
});


ReactDOM.render((
  <div className='select-container'>
    {selects}
  </div>
), document.getElementById('app'));

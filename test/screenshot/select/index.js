import React from 'react';
import ReactDOM from 'react-dom';

import Select from '../../../packages/select/index';

import '../../../packages/select/index.scss';
import './index.scss';

class SelectTest extends React.Component {
  state = {value: 'grapefruit'};

  render() {
    const {
      disabled, id, isRtl, ...otherProps // eslint-disable-line react/prop-types
    } = this.props;
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <Select
          {...otherProps}
          className='select'
          label='Favorite'
          value={this.state.value}
        >
          <option value='grapefruit'>Grapefruit</option>
          <option value='lime'>Lime</option>
          <option value='coconut'>Coconut</option>
          <option value='mango'>Mango</option>
        </Select>
      </div>
    );
  }
}

// const variants = [
//   {},
//   {box: true},
//   {outlined: true},
//   {fullWidth: true},
// ];
//
// const denseMap = [
//   {},
//   {dense: true},
// ];
//
// const rtlMap = [
//   {},
//   {isRtl: true},
// ];
//
// const disabledMap = [
//   {},
//   {disabled: true},
// ];
//
// const helperTextMap = [
//   {},
//   {helperText: (
//     <HelperText persistent>Help me</HelperText>
//   )},
// ];
//
// const textFields = variants.map((variant) => {
//   return icons.map((icon) => {
//     return denseMap.map((dense) => {
//       return rtlMap.map((isRtl) => {
//         return disabledMap.map((disabled) => {
//           return helperTextMap.map((helperText) => {
//             const props = Object.assign({}, variant, icon, dense, disabled, helperText, isRtl);
//             const variantKey = Object.keys(variant)[0] || '';
//             const iconKey = Object.keys(icon)[0] || '';
//             const denseKey = Object.keys(dense)[0] || '';
//             const rtlKey = Object.keys(isRtl)[0] || '';
//             const disabledKey = Object.keys(disabled)[0] || '';
//             const helperTextKey = Object.keys(helperText)[0] || '';
//             const key = `${variantKey}-${iconKey}-${denseKey}-${disabledKey}-${helperTextKey}--${rtlKey}`;
//
//             const hasIcon = iconKey === 'leadingIcon' || iconKey === 'trailingIcon';
//             if (variantKey === 'fullWidth' && hasIcon) {
//               return;
//             }
//
//             return <TestField {...props} key={key} id={key} />;
//           });
//         });
//       });
//     });
//   });
// });


ReactDOM.render((
  <div className='select-container'>
    <SelectTest />
  </div>
), document.getElementById('app'));

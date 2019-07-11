# React Select

MDC React Select is component for MDC Select. Please see [MDC Select](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select/).

## Installation

```
npm install @material/react-select
```

## Usage

### Styles

with Sass:
```js
import '@material/react-list/index.scss';
import '@material/react-menu-surface/index.scss';
import '@material/react-menu/index.scss';
import '@material/react-select/index.scss';
```

with CSS:
```js
import '@material/react-list/dist/menu.css';
import '@material/react-menu-surface/dist/menu.css';
import '@material/react-menu/dist/menu.css';
import '@material/react-select/dist/select.css';
```

### Javascript Instantiation

React Select requires at least one `<Option>` element as a child and a label prop.

```js
import React from 'react';
import Select, {Option} from '@material/react-select';

class MyApp extends React.Component {
  state = {value: 'pomsky'};

  render() {
    return (
      <Select
        label='Choose Dog'
        value={this.state.value}
        onChange={(evt) => this.setState({value: evt.target.value})}
      >
        <Option value='pomsky'>Pomsky</Option>
        <Option value='goldenDoodle'>Golden Doodle</Option>
      </Select>
    );
  }
}
```

> NOTE: In order to get access to the value, you must add an `onChange` handler, which accepts an event and updates the value of the select as shown above.

#### Enhanced Select

React Select provides a Material styled select, instead of the default native drop down.

```js
import React from 'react';
import Select, {Option} from '@material/react-select';

class MyApp extends React.Component {
  state = {value: 'pomsky'};

  onEnhancedChange = (index, item) => (
    this.setState({value: item.getAttribute('data-value')})
  );

  render() {
    return (
      <Select
        enhanced
        label='Choose Dog'
        value={this.state.value}
        onEnhancedChange={this.onEnhancedChange}
      >
        <Option value='pomsky'>Pomsky</Option>
        <Option value='goldenDoodle'>Golden Doodle</Option>
      </Select>
    );
  }
}
```

#### Shorthand options

If the option elements do not require anything unique, you can omit passing `this.props.children` and set the `options` prop.

This options shorthand is most useful when your select options come in the form of JSON. Typically, when building a select, the options will be backed by an array of objects or strings (either from an API endpoint or a JSON File). If the `label` and `value` key names exist in the array of objects, you can run a `map` function over that array as shown below.

```js
import React from 'react';
import Select from '@material/react-select';

class MyApp extends React.Component {
  state = {value: 'pomsky'};

  render() {
    const options = [{
      label: 'Pomsky',
      value: 'pomsky',
    }, {
      label: 'Golden Doodle',
      value: 'goldenDoodle',
      disabled: true,
    }];

    return (
      <Select
        label='Choose Dog'
        onChange={(evt) => this.setState({value: evt.target.value})}
        value={this.state.value}
        options={options}
      />
    );
  }
}
```

> NOTE: If you want a floating label to act as a placeholder, you will need an empty option as documented in the [MDC Web Select](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select/#using-the-floating-label-as-the-placeholder).

## Props

Prop Name | Type | Description
--- | --- | ---
children | Array{Element}/Element | Array of `<option>` elements or a single `<option>` element.
className | String | An optional class added to the `.mdc-select` element.
disabled | Boolean | Disables the select.
enhanced | Boolean | Enables the enhanced select.
floatingLabelClassName | String | An optional class added to the floating label element.
id | String | Id of the `<select>` element.
label | String | Label text that appears as the floating label.
lineRippleClassName | String | An optional class added to the line ripple element.
selectClassName | String | An optional class added to the native `<select>` element.
notchedOutlineClassName | String | An optional class added to the notched outline element. Only applied if `props.outlined` is enabled.
outlined | Boolean | Enables outlined variant.
options | Array{String/Object} | Array of strings or objects to be used as options. To be used instead of `<option>` elements passed as `this.props.children`. If its an array of strings, then the string value will be used as the `label` and `value` of the `<option>` tag.
value | String | Optional property used to control the selected value outside of `<Select>` component.
afterChange | (value: string) => void | Callback for when the select value changed.
onEnhancedChange | (index: number, target: Element) => void | Callback for when the enhanced select receives a new value.
onChange | (evt: React.ChangeEvent<HTMLSelectElement> => void) | Callback for when the native select receives a new value.
helperText | SelectHelperText | Element to appear as helper text of the select element.
leadingIcon | SelectIcon | Element to appear as leading icon of the select element.

### Option

The `<Option />` component is a provided component to be used for both the enhanced and native select.

#### Use with Native Select

When used in the native select, the `<Option />` accepts all the same props as the native `<option />` tag.

```js
<Option value='goldenDoodle'>Golden Doodle</Option>
<Option value='pomsky'>Pomsky</Option>
```

#### Use with Enhanced Select

When used in the enhanced select, the `<Option />` component extends from [MenuListItem](../menu/README.md#menulistitem). For your convience other auxilary components of [menu](../menu) are exported from select.

* OptionGroup (see [MenuListGroup](../menu/README.md#menulistgroup))
* OptionDivider (see [MenuListDivider](../menu/README.md#menulistdivider))
* OptionGroupSubheader (see [MenuListGroup](../menu/README.md#menulistgroup))
* OptionGraphic (see [MenuListItemGraphic](../menu/README.md#menulistitemgraphic))
* OptionMeta (see [MenuListItemMeta](../menu/README.md#menulistitemmeta))
* OptionText (see [MenuListText](../menu/README.md#menulisttext))

### Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-select/README.md#sass-mixins)

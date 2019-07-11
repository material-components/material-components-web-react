import React from 'react';

import Select, {
  Option,
  SelectHelperText,
  SelectIcon,
} from '@material/react-select';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';

class EnhancedSelect extends React.Component<any> {
  state = {value: 'Korea'};

  onEnhancedChange = (_: number, item: Element) =>
    this.setState({value: item.getAttribute('data-value')});

  render() {
    return (
      <Select
        {...this.props}
        enhanced
        label='Destination'
        value={this.state.value}
        onEnhancedChange={this.onEnhancedChange}
      >
        <Option value='USA'>USA</Option>
        <Option value='Korea'>Korea</Option>
        <Option value='Japan'>Japan</Option>
      </Select>
    );
  }
}

export const SelectExample = () => (
  <Grid>
    <Row>
      <Cell>
        <EnhancedSelect />
      </Cell>
      <Cell>
        <EnhancedSelect disabled />
      </Cell>
      <Cell>
        <EnhancedSelect outlined />
      </Cell>
      <Cell>
        <EnhancedSelect
          helperText={<SelectHelperText>Help me!</SelectHelperText>}
        />
      </Cell>
      <Cell>
        <EnhancedSelect
          leadingIcon={
            <SelectIcon>
              <MaterialIcon icon='flight' />
            </SelectIcon>
          }
        />
      </Cell>
    </Row>
  </Grid>
);

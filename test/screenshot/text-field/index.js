import React from 'react';
import ReactDOM from 'react-dom';

import TextField, {Input} from '../../../packages/text-field';
import MaterialIcon from '../../../packages/material-icon/index';

import '../../../packages/text-field/index.scss';
import './index.scss';

class TestField extends React.Component {
  render() {
    return (
      <TextField label='Cat'>
        <Input value='MEOW' />
      </TextField>
    );
  }
}

ReactDOM.render((
  <div>
    <div>
      <TextField label='Cat'>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField dense label='Cat'>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField outlined dense label='Cat'>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField outlined label='Cat'>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField outlined label='Cat'>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField
        label='Cat' outlined
        leadingIcon={<MaterialIcon icon='favorite' />}>
        <Input value='MEOW' />
      </TextField>
    </div>
    <div>
      <TextField
        label='Cat' box
        leadingIcon={<MaterialIcon icon='favorite' />}>
        <Input value='MEOW' />
      </TextField>
    </div>
  </div>
), document.getElementById('app'));

import React from 'react';

import {Chip, ChipSet} from '@material/react-chips';
import TopAppBar from '@material/react-top-app-bar';
import TextField from '@material/react-text-field';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';

import './index.scss';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <ChipSet choice>
           <Chip id='summer' label='Summer'/>
           <Chip id='winter' label='Winter'/>
         </ChipSet>
      </div>
    );
  }
}

export default Feedback;

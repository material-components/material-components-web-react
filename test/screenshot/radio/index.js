import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import MaterialIcon from '../../../packages/material-icon';
import Radio, {NativeRadioControl} from '../../../packages/radio/index';

class PetsRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petValue: props.petValue,
    };
  }

  render() {
    const {petValue} = this.state;
    const {name} = this.props;
    const pets = [{
      value: 'dogs',
      label: 'Dogs',
      id: 'radio-dogs',
    }, {
      value: 'cats',
      label: 'Cats',
      id: 'radio-cats',
    }];

    return (
      <div>
        {pets.map((pet) => (
          <Radio label={pet.label} key={pet.id}>
            <NativeRadioControl
              name={name}
              checked={petValue === pet.value}
              value={pet.value}
              id={pet.id}
              onChange={(e) => this.setState({petValue: e.target.value})}
            />
          </Radio>
        ))}
        {petValue ? <p>{petValue}</p> : null}
      </div>
    );
  }
}
const RadioScreenshotTest = () => {
  return (
    <div>
      <h3>Pet Radio Buttons</h3>
      <PetsRadio name='pets'/>

      <h3>Preselected Radio Buttons</h3>
      <PetsRadio name='pets-preselect' petValue={'cats'}/>
    </div>
  );
};

export default RadioScreenshotTest;

import React from 'react';
import './index.scss';
import '../../../packages/list/index.scss';

import Radio, {NativeRadioControl} from '../../../packages/radio/index';

class PetsRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petValue: props.petValue, // eslint-disable-line react/prop-types
    };
  }

  render() {
    const {petValue} = this.state;
    const {name, disabled} = this.props; // eslint-disable-line react/prop-types
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
              disabled={disabled}
              checked={petValue === pet.value}
              value={pet.value}
              id={`${pet.id}-${name}`}
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

      <h3>Disabled Radio Buttons</h3>
      <PetsRadio name='pets-disabled' disabled />
    </div>
  );
};

export default RadioScreenshotTest;

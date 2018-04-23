import React from 'react';
import ReactDOM from 'react-dom';
import FloatingLabel from '../../../packages/floating-label';

import '../../../packages/floating-label/index.scss';
import './index.scss';

class Input extends React.Component {
  state = {
    shouldUsePrimaryLabel: true,
    float: false,
    width: 0,
  };

  constructor(props) {
    super(props);
    this.floatingLabelElement_ = React.createRef();
  }

  render() {
    const {shouldUsePrimaryLabel, float} = this.state;
    const labelText = ['My Label Text', 'Alternate Label Text'];

    return (
      <div>
        <div className='input__container'>
          <div className='input__dock'>
            <FloatingLabel
              float={float}
              ref={this.floatingLabelElement_}
              handleWidthChange={(width) => this.setState({width})}
            >
              {shouldUsePrimaryLabel ? labelText[0] : labelText[1]}
            </FloatingLabel>
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render((
    <div>
      <Input />

      <div className='floated-label-box-example'>
        <FloatingLabel float>
          Floated Label
        </FloatingLabel>
      </div>
    </div>
), document.getElementById('app'));

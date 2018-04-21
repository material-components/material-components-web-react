import React from 'react';
import ReactDOM from 'react-dom';
import FloatingLabel from '../../../packages/floating-label';

import '../../../packages/floating-label/index.scss';
import './index.scss';

class Input extends React.Component {
  state = {
    shouldUsePrimaryLabel: true,
    shouldFloat: false,
    width: 0,
  };

  constructor(props) {
    super(props);
    this.floatingLabelElement_ = React.createRef();
  }

  render() {
    const {shouldUsePrimaryLabel, shouldFloat} = this.state;
    const labelText = ['My Label Text', 'Alternate Label Text'];

    return (
      <div>
        <div className='input__container'>
          <div className='input__dock'>
            <FloatingLabel
              shouldFloat={shouldFloat}
              ref={this.floatingLabelElement_}
              setWidth={(width) => this.setState({width})}
            >
              {shouldUsePrimaryLabel ? labelText[0] : labelText[1]}
            </FloatingLabel>
          </div>
          {this.renderControls()}
        </div>
      </div>
    );
  }

  renderControls() {
    const {width} = this.state;
    const buttons = [{
      text: 'Float',
      action: () => this.setState({shouldFloat: !this.state.shouldFloat}),
    }, {
      text: 'Shake',
      action: this.floatingLabelElement_.current && this.floatingLabelElement_.current.shake,
    }, {
      text: 'Label Text',
      action: () => this.setState({shouldUsePrimaryLabel: !this.state.shouldUsePrimaryLabel}),
    }];

    return (
      <div className='input__controls'>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className='mdc-button mdc-button--raised input__control-button'>
            {button.text}
          </button>
        ))}
        <div>
          Label Width: {width}
        </div>
      </div>
    );
  }
};

ReactDOM.render((
    <div>
      <Input />

      <div className='floated-label-box-example'>
        <FloatingLabel shouldFloat>
          Floated Label
        </FloatingLabel>
      </div>
    </div>
), document.getElementById('app'));

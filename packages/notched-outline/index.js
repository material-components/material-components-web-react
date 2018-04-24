import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline';

export default class NotchedOutline extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  constructor(props) {
    super(props);
    this.outlineElement = React.createRef();
    this.pathElement = React.createRef();
  }

  componentDidMount() {
    this.foundation_ = new MDCNotchedOutlineFoundation();
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-notched-outline', Array.from(classList), className);
  }

  get adapter() {
    return {
      getWidth: () => this.outlineElement.offsetWidth,
      getHeight: () => this.outlineElement.offsetHeight,
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
    };
  }

  render() {
    return ([
      <div
        className={this.classes}
        key='notched-outline'
        ref={this.outlineElement}>
        <svg>
          <path ref={this.pathElement}
            class='mdc-notched-outline__path' />
        </svg>
      </div>,
      <div className='mdc-notched-outline__idle' key='notched-outline-idle'></div>
    ]);
  }

}

TopAppBar.propTypes = {
};

TopAppBar.defaultProps = {

};

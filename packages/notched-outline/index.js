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
    this.outlineElement_ = React.createRef();
    this.pathElement_ = React.createRef();
    this.idleElement_ = React.createRef();
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
      getWidth: () => this.outlineElement_.offsetWidth,
      getHeight: () => this.outlineElement_.offsetHeight,
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setOutlinePathAttr: (value) => this.pathElement_.setAttribute('d', value),
      getIdleOutlineStyleValue: (propertyName) =>
        window.getComputedStyle(this.idleElement_).getPropertyValue(propertyName),
    };
  }

  render() {
    return ([
      <div
        className={this.classes}
        key='notched-outline'
        ref={this.outlineElement_}>
        <svg>
          <path ref={this.pathElement_}
            class='mdc-notched-outline__path' />
        </svg>
      </div>,
      <div
        ref={this.idleElement_}
        className='mdc-notched-outline__idle'
        key='notched-outline-idle'></div>
    ]);
  }

}

TopAppBar.propTypes = {
};

TopAppBar.defaultProps = {

};

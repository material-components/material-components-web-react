import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCFloatingLabelFoundation} from '@material/floating-label';

export default class FloatingLabel extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  initializeFoundation = () => {
    this.foundation_ = new MDCFloatingLabelFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-floating-label', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      getWidth: () => {

      },
    };
  }

  render() {
    return (
      <label
        className={this.classes}
        {...this.props}
      >
        {children}
      </label>
    );
  }
}

FloatingLabel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

FloatingLabel.defaultProps = {
  className: '',
};

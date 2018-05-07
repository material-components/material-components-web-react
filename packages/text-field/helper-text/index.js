import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextFieldHelperTextFoundation} from '@material/textfield';

export default class HelperText extends React.Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.state = {
      'aria-hidden': props['aria-hidden'],
      'role': props.role,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCTextFieldHelperTextFoundation(this.adapter);
    this.foundation_.init();

    if (this.props.showToScreenReader) {
      this.foundation_.showToScreenReader(true);
    }
    if (!this.props.isValid) {
      this.foundation_.setValidity(false);
    }
    if (this.props.isValidation) {
      this.foundation_.setValidation(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showToScreenReader !== nextProps.showToScreenReader) {
      this.foundation_.showToScreenReader(nextProps.showToScreenReader);
    }
    if (this.props.isValid !== nextProps.isValid) {
      this.foundation_.setValidity(nextProps.isValid);
    }
    if (this.props.isValidation !== nextProps.isValidation) {
      this.foundation_.setValidation(nextProps.isValidation);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {className, persistent, validation} = this.props;

    return classnames('mdc-text-field-helper-text', className, {
      'mdc-text-field-helper-text--persistent': persistent,
      'mdc-text-field-helper-text--validation-msg': validation,
    });
  }

  get adapter() {
    return {
      hasClass: (className) => this.classes.split(' ').includes(className),
      setAttr: (attr, value) => this.setState({[attr]: value}),
      removeAttr: (attr) => this.setState({[attr]: null}),
    };
  }

  render() {
    return (
      <p
        className={this.classes}
        role={this.state.role}
        aria-hidden={this.state['aria-hidden']}
      >
        {this.props.children}
      </p>
    );
  }
}

HelperText.propTypes = {
  'aria-hidden': PropTypes.bool,
  'children': PropTypes.node,
  'className': PropTypes.string,
  'isValid': PropTypes.bool,
  'isValidation': PropTypes.bool,
  'persistent': PropTypes.bool,
  'role': PropTypes.string,
  'showToScreenReader': PropTypes.bool,
  'validation': PropTypes.bool,
};

HelperText.defaultProps = {
  'aria-hidden': false,
  'children': null,
  'className': '',
  'isValid': true,
  'isValidation': false,
  'persistent': false,
  'role': null,
  'showToScreenReader': false,
  'validation': false,
};

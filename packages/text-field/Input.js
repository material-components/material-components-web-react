// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {VALIDATION_ATTR_WHITELIST} from '@material/textfield/constants';

export default class Input extends React.Component {
  inputElement = React.createRef();
  state = {wasUserTriggeredChange: false};

  componentDidMount() {
    if (this.props.id) {
      this.props.setInputId(this.props.id);
    }
    if (this.props.disabled) {
      this.props.setDisabled(true);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      handleValueChange,
      setInputId,
      setDisabled,
      foundation,
      value,
      disabled,
    } = this.props;

    this.handleValidationAttributeUpdate(prevProps);

    if (disabled !== prevProps.disabled) {
      setDisabled(disabled);
      foundation.setDisabled(disabled);
    }

    if (id !== prevProps.id) {
      setInputId(id);
    }

    // this should be in the componentDidMount, but foundation is not created
    // at that time.
    // Will fix this in
    // https://github.com/material-components/material-components-web-react/pull/353/files
    if (value && foundation !== prevProps.foundation) {
      handleValueChange(value, () => foundation.setValue(value));
      return;
    }

    if (value !== prevProps.value) {
      handleValueChange(value, () => {
        // only call #foundation.setValue on programatic changes;
        // not changes by the user.
        if (this.state.wasUserTriggeredChange) {
          this.setState({wasUserTriggeredChange: false});
        } else {
          foundation.setValue(value);
        }
      });
    }
  }

  get classes() {
    return classnames('mdc-text-field__input', this.props.className);
  }

  handleFocus = (e) => {
    const {foundation, handleFocusChange, onFocus} = this.props;
    foundation.activateFocus();
    handleFocusChange(true);
    onFocus(e);
  }

  handleBlur = (e) => {
    const {foundation, handleFocusChange, onBlur} = this.props;
    foundation.deactivateFocus();
    handleFocusChange(false);
    onBlur(e);
  }

  handleMouseDown = (e) => {
    const {foundation, onMouseDown} = this.props;
    foundation.setTransformOrigin(e);
    onMouseDown(e);
  }

  handleTouchStart = (e) => {
    const {foundation, onTouchStart} = this.props;
    foundation.setTransformOrigin(e);
    onTouchStart(e);
  }

  // To stay in sync with the MDC React Text Field Component, handleValueChange()
  // is called to update MDC React Text Field's state. That state variable
  // is used to let other subcomponents and the foundation know what the current
  // value of the input is.
  handleChange = (e) => {
    const {foundation, onChange} = this.props;
    // autoCompleteFocus runs on `input` event in MDC Web. In React, onChange and
    // onInput are the same event
    // https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput
    foundation.autoCompleteFocus();
    this.setState({wasUserTriggeredChange: true});
    onChange(e);
  }

  handleValidationAttributeUpdate = (nextProps) => {
    const {foundation} = nextProps;
    VALIDATION_ATTR_WHITELIST.some((attributeName) => {
      let attr = attributeName;
      if (attributeName === 'minlength') {
        attr = 'minLength';
      } else if (attributeName === 'maxlength') {
        attr = 'maxLength';
      }
      if (this.props[attr] !== nextProps[attr]) {
        foundation.handleValidationAttributeChange([attributeName]);
        return true;
      }
    });
  }

  isBadInput = () => this.inputElement.current.validity.badInput;
  isValid = () => this.inputElement.current.validity.valid;

  render() {
    const {
      inputType,
      disabled,
      /* eslint-disable no-unused-vars */
      className,
      foundation,
      value,
      handleFocusChange,
      handleValueChange,
      setDisabled,
      setInputId,
      onFocus,
      onBlur,
      onMouseDown,
      onTouchStart,
      onChange,
      /* eslint-enable no-unused-vars */
      ...otherProps
    } = this.props;
    const InputComponent = inputType;
    return (
      <InputComponent
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        onChange={this.handleChange}
        disabled={disabled}
        value={value}
        ref={this.inputElement}
        className={this.classes}
        {...otherProps}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  inputType: PropTypes.string,
  disabled: PropTypes.bool,
  foundation: PropTypes.shape({
    activateFocus: PropTypes.func,
    deactivateFocus: PropTypes.func,
    autoCompleteFocus: PropTypes.func,
    setDisabled: PropTypes.func,
    setTransformOrigin: PropTypes.func,
    handleValidationAttributeMutation_: PropTypes.func,
  }),
  handleValueChange: PropTypes.func,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  setDisabled: PropTypes.func,
  setInputId: PropTypes.func,
  handleFocusChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Input.defaultProps = {
  className: '',
  inputType: 'input',
  disabled: false,
  foundation: {
    activateFocus: () => {},
    deactivateFocus: () => {},
    autoCompleteFocus: () => {},
    setDisabled: () => {},
    setTransformOrigin: () => {},
    handleValidationAttributeMutation_: () => {},
  },
  handleValueChange: () => {},
  id: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onMouseDown: () => {},
  onTouchStart: () => {},
  setDisabled: () => {},
  setInputId: () => {},
  handleFocusChange: () => {},
  value: '',
};

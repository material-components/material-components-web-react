import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextFieldFoundation} from '@material/textfield';

import Input from './Input';
import Icon from './icon';
import HelperText from './helper-text';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

export default class TextField extends React.Component {

  foundation_ = null;
  getBadInput = () => {};
  getIsValid = () => {};

  constructor(props) {
    super(props);
    this.floatingLabelElement = React.createRef();
  }

  state = {
    // line ripple state
    activeLineRipple: false,

    // root state
    classList: new Set(),
    inputId: props.children.props.id, // need to generate one if not provided
    validationAttributeChangeHandler: () => {}, // prop of <Input />
    isFocused: false,
    isBadInput: false,
    isValid: true,

    // floatin label state
    shouldFloatLabel: false, // needs to read off of props if should float
    labelWidth: 0,
  };

  componentDidMount() {
    this.foundation_ = new MDCTextFieldFoundation(this.adapter);
    this.foundation_.init();

    const {notch, notchWidth, isRtl} = this.props;
    if (notch) {
      this.foundation_.notch(notchWidth, isRtl);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-text-field', Array.from(classList), className);
  }

  get adapter() {
    const rootAdapterMethods = {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      registerValidationAttributeChangeHandler: (handler) => this.setState({
        validationAttributeChangeHandler: handler,
      }),
      deregisterValidationAttributeChangeHandler: () => this.setState({
        validationAttributeChangeHandler: () => {},
      }),
      isFocused: () => this.state.isFocused,
      isRtl: this.props.isRtl,
    };

    return Object.assign({},
      rootAdapterMethods,
      this.inputAdapter,
      this.labelAdapter,
      this.lineRippleAdapter,
    );
  }

  get inputAdapter() {
    // value: string,
    // disabled: boolean, --> doesn't need to be implemented since the <INPUT> handles it
    // also the `get disabled` isn't actually used, except in the vanilla component
    // validity: {
    //   badInput: boolean,
    //   valid: boolean,
    // },

    return {
      value: () => this.state.value,
      validity: {
        badInput: () => this.getBadInput(),
        valid: () => this.getIsValid(),
      },
    };
  }

  get labelAdapter() {
    return {
      shakeLabel: () => {
        const {floatingLabelElement: floatingLabel} = this;
        if (floatingLabel && floatingLabel.current) {
          floatingLabel.current.shake();
        }
      },
      floatLabel: (shouldFloatLabel) => this.setState({shouldFloatLabel}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.labelWidth,
    };
  }

  get lineRippleAdapter() {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
      setLineRippleTransformOrigin: () => this.setState({})
    };
  }




  inputWithAddedProps() {
    const child = React.Children.only(this.props.children);
    const className = classnames('mdc-text-field__input', child.props.className);
    const props = Object.assign({}, child.props, {
      className,
      foundation: this.foundation_,
      validationAttributeChangeHandler: this.state.validationAttributeChangeHandler,
      updateFocus: (isFocused) => this.setState({isFocused}),
      handleValueChange: (value) => this.setState({value}),
      setBadInputHandler: (getBadInput) => this.getBadInput = getBadInput,
      setIsValidHandler: (getIsValid) => this.getIsValid = getIsValid,
    });
    return React.cloneElement(child, props);
  }

  render() {
    const {
      label,
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.foundation_.handleTextFieldInteraction}
        onKeyDown={this.foundation_.handleTextFieldInteraction}
      >
        {this.inputWithAddedProps()}
        {label ? this.renderLabel() : null}
        {this.renderLineRipple()}
      </div>
    );
  }

  renderLabel() {
    const {label, labelClassNames} = this.props;
    return (
      <FloatingLabel
        className={labelClassNames}
        float={this.state.shouldFloatLabel}
        handleWidthChange={
          (labelWidth) => this.setState({labelWidth})}
        ref={this.floatingLabelElement}
      >
        {label}
      </FloatingLabel>
    );
  }

  renderLineRipple() {
    return (
      <LineRipple active={this.state.activeLineRipple}/>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  labelClassNames: PropTypes.string,
};

TextField.defaultProps = {
  label: ''
  labelClassNames: '',
};

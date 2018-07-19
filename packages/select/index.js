import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCSelectFoundation} from '@material/select';

import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';

class TextField extends React.Component {

  foundation_ = null;
  selectElement = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled,
      classList: new Set(),

      // floating label state
      labelIsFloated: false,
      labelWidth: 0,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCSelectFoundation(this.adapter);
    this.foundation_.init();
  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  /**
  * getters
  */

  get classes() {
    const {classList, disabled} = this.state;
    const {className, box, dense, outlined} = this.props;
    return classnames('mdc-text-field', Array.from(classList), className, {
      'mdc-text-field--outlined': outlined,
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--box': box,
      'mdc-text-field--dense': dense,
    });
  }

  get adapter() {
    const rootAdapterMethods = {
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList}),
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      isRtl: this.getIsRtl,
      getSelectedIndex: this.nativeControl_.selectedIndex,
      // setSelectedIndex: this.nativeControl_.selectedIndex,
    };

    return Object.assign({},
      rootAdapterMethods,
      this.inputAdapter,
      this.labelAdapter,
      this.lineRippleAdapter,
      this.notchedOutlineAdapter,
    );
  }

  get labelAdapter() {
    return {
      floatLabel: (labelIsFloated) => this.setState({labelIsFloated}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.labelWidth,
    };
  }

  get lineRippleAdapter() {
    return {
      activateLineRipple: () => this.setState({activeLineRipple: true}),
      deactivateLineRipple: () => this.setState({activeLineRipple: false}),
    };
  }

  get notchedOutlineAdapter() {
    return {
      notchOutline: () => this.setState({outlineIsNotched: true}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };
  }

  get helperTextAdapter() {
    return {
      showToScreenReader: () =>
        this.setState({showHelperTextToScreenReader: true}),
      setValidity: (isValid) => this.setState({isValid}),
    };
  }

  getIsRtl = () => {
    if (this.selectContainerElement.current) {
      const dir = window.getComputedStyle(this.selectContainerElement.current).getPropertyValue('direction');
      return dir === 'rtl';
    }
  }

  inputProps(props) {
    return Object.assign({}, props, {
      foundation: this.foundation_,
      handleFocusChange: (isFocused) => this.setState({isFocused}),
      handleValueChange: (value) => this.setState({value}),
      setDisabled: (disabled) => this.setState({disabled}),
      setInputId: (id) => this.setState({selectId: id}),
      ref: this.selectElement,
    });
  }

  /**
  * render methods
  */

  render() {
    const {
      label,
      outlined,
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
        onKeyDown={() => this.foundation_ && this.foundation_.handleTextFieldInteraction()}
        ref={this.selectContainerElement}
      >
        {label ? this.renderWithLabel((
          {this.renderSelect()}
          {outlined ? this.renderNotchedOutline() : this.renderLineRipple()}
        )) : (
          {this.renderSelect()}
          {outlined ? this.renderNotchedOutline() : this.renderLineRipple()}
        )}
      </div>
    );
  }

  renderSelect() {
    const child = React.Children.only(this.props.children);
    const props = this.inputProps(child.props);
    return React.cloneElement(child, props);
  }

  renderWithLabel(selectContainer) {
    const {label, floatingLabelClassName} = this.props;
    const {selectId} = this.state;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.labelIsFloated}
        handleWidthChange={
          (labelWidth) => this.setState({labelWidth})}
        ref={this.floatingLabelElement}
        htmlFor={selectId}
      >
        {label}
        {selectContainer}
      </FloatingLabel>
    );
  }

  renderLineRipple() {
    const {lineRippleClassName} = this.props;
    const {activeLineRipple, lineRippleCenter} = this.state;
    return (
      <LineRipple
        rippleCenter={lineRippleCenter}
        className={lineRippleClassName}
        active={activeLineRipple}
      />
    );
  }

  renderNotchedOutline() {
    const {notchedOutlineClassName} = this.props;
    const {outlineIsNotched, labelWidth} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        isRtl={this.getIsRtl()}
        notch={outlineIsNotched}
        notchWidth={labelWidth}
      />
    );
  }
}

TextField.propTypes = {
  'box': PropTypes.bool,
  'children.props': PropTypes.shape(Input.propTypes),
  'children': PropTypes.element,
  'className': PropTypes.string,
  'dense': PropTypes.bool,
  'floatingLabelClassName': PropTypes.string,
  'label': PropTypes.string.isRequired,
  'leadingIcon': PropTypes.element,
  'lineRippleClassName': PropTypes.string,
  'notchedOutlineClassName': PropTypes.string,
  'outlined': PropTypes.bool,
  'textarea': PropTypes.bool,
  'trailingIcon': PropTypes.element,
};

TextField.defaultProps = {
  box: false,
  className: '',
  dense: false,
  floatingLabelClassName: '',
  leadingIcon: null,
  lineRippleClassName: '',
  notchedOutlineClassName: '',
  outlined: false,
  textarea: false,
  trailingIcon: null,
};


export {Icon, HelperText, Input};
export default TextField;

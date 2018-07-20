import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCSelectFoundation} from '@material/select';

import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';
import NativeControl from './NativeControl';

export default class Select extends React.Component {

  foundation_ = null;
  selectContainerElement = React.createRef();
  nativeControlElement = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      classList: new Set(),
      disabled: props.disabled,
      value: null,
      selectId: props.children.props.id,

      // floating label state
      labelIsFloated: false,
      labelWidth: 0,

      // line ripple state
      activeLineRipple: false,

      // notched outline state
      outlineIsNotched: false,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCSelectFoundation(this.adapter);
    this.foundation_.init();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.value)
    console.log(this.nativeControlElement.current.value)
    if (this.state.value !== prevState.value) {
      // This react component doesn't keep track of selectedIndex
      // but this is the only public foundation method that floats the label
      this.foundation_.setValue(this.nativeControlElement.current.value);
    }
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
    return classnames('mdc-select', Array.from(classList), className, {
      'mdc-select--outlined': outlined,
      'mdc-select--disabled': disabled,
      'mdc-select--box': box,
      'mdc-select--dense': dense,
    });
  }

  get adapter() {
    const rootAdapterMethods = {
      addClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      isRtl: this.getIsRtl,
      getValue: () => this.nativeControlElement.current.value,
      setValue: this.setValue,
      // dont think these are needed since end dev should change value
      // and selectedindex themselves
      // getSelectedIndex: this.nativeControl_.selectedIndex,
      // setSelectedIndex: this.nativeControl_.selectedIndex,
    };

    return Object.assign({},
      rootAdapterMethods,
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
      activateBottomLine: () => this.setState({activeLineRipple: true}),
      deactivateBottomLine: () => this.setState({activeLineRipple: false}),
    };
  }

  get notchedOutlineAdapter() {
    return {
      notchOutline: () => this.setState({outlineIsNotched: true}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };
  }

  getIsRtl = () => {
    if (this.selectContainerElement.current) {
      const dir = window.getComputedStyle(this.selectContainerElement.current).getPropertyValue('direction');
      return dir === 'rtl';
    }
  }

  setValue = (value) => {
    if (this.nativeControlElement.current) {
      this.nativeControlElement.current.value = value;
    }
  }

  selectProps(props) {
    return Object.assign({}, props, {
      foundation: this.foundation_,
      handleValueChange: this.setValue,
      setDisabled: (disabled) => this.setState({disabled}),
      setSelectId: (id) => this.setState({selectId: id}),
      setNativeControl: this.nativeControlElement,
    });
  }

  /**
  * render methods
  */

  render() {
    const {
      outlined,
    } = this.props;

    return (
      <div
        className={this.classes}
        ref={this.selectContainerElement}
      >
        {this.renderSelect()}
        {this.renderWithLabel()}
        {this.props.outlined ? this.renderNotchedOutline() : this.renderLineRipple()}
      </div>
    );
  }

  renderSelect() {
    const child = React.Children.only(this.props.children);
    const props = this.selectProps(child.props);
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
        htmlFor={selectId}
      >
        {label}
      </FloatingLabel>
    );
  }

  renderLineRipple() {
    const {lineRippleClassName} = this.props;
    const {activeLineRipple} = this.state;
    return (
      <LineRipple
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

Select.propTypes = {
  'box': PropTypes.bool,
  'children.props': PropTypes.shape(NativeControl.propTypes),
  'children': PropTypes.element,
  'className': PropTypes.string,
  'dense': PropTypes.bool,
  'floatingLabelClassName': PropTypes.string,
  'label': PropTypes.string.isRequired,
  'lineRippleClassName': PropTypes.string,
  'notchedOutlineClassName': PropTypes.string,
  'outlined': PropTypes.bool,
};

Select.defaultProps = {
  box: false,
  className: '',
  dense: false,
  floatingLabelClassName: '',
  lineRippleClassName: '',
  notchedOutlineClassName: '',
  outlined: false,
};

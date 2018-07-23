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
  selectContainerElement_ = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      classList: new Set(),
      disabled: props.disabled,
      value: null,

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
    if (this.state.value !== prevState.value) {
      // This react component doesn't keep track of selectedIndex
      // but this is the only public foundation method that floats the label
      this.foundation_.setValue(this.state.value);
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
    const {className, box, outlined} = this.props;
    return classnames('mdc-select', Array.from(classList), className, {
      'mdc-select--outlined': outlined,
      'mdc-select--disabled': disabled,
      'mdc-select--box': box,
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
      getValue: (value) => this.state.value,
      // setValue, getSelectedIndex, setSelectedIndex aren't needed
      // since end dev should change value
      // and selectedindex themselves
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
    if (this.selectContainerElement_.current) {
      const dir = window.getComputedStyle(this.selectContainerElement_.current).getPropertyValue('direction');
      return dir === 'rtl';
    }
  }

  /**
  * render methods
  */

  render() {
    return (
      <div
        className={this.classes}
        ref={this.selectContainerElement_}
      >
        {this.renderSelect()}
        {this.renderWithLabel()}
        {this.props.outlined ? this.renderNotchedOutline() : this.renderLineRipple()}
      </div>
    );
  }

  renderSelect() {
    const {
      nativeControlClassName,
      /* eslint-disable */
      box,
      className,
      outlined,
      floatingLabelClassName,
      lineRippleClassName,
      notchedOutlineClassName,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <NativeControl
        className={nativeControlClassName}
        foundation={this.foundation_}
        handleValueChange={(value) => this.setState({value})}
        setDisabled={(disabled) => this.setState({disabled})}
        {...otherProps}
      >
        {this.renderOptions()}
      </NativeControl>
    );
  }

  renderOptions() {
    const {children, options} = this.props;
    const hasOptions = options && options.length;
    if (!hasOptions) {
      return children;
    }

    return options.map((option, index) => {
      if (typeof option === 'string') {
        option = {value: option, label: value};
      }

      return (
        <option
          disabled={option.disabled}
          value={option.value}
          key={index}
        >
          {option.label}
        </option>
      );
    });
  }

  renderWithLabel(selectContainer) {
    const {id, label, floatingLabelClassName} = this.props;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.labelIsFloated}
        handleWidthChange={
          (labelWidth) => this.setState({labelWidth})}
        htmlFor={id}
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
  box: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  floatingLabelClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  lineRippleClassName: PropTypes.string,
  nativeControlClassName: PropTypes.string,
  notchedOutlineClassName: PropTypes.string,
  outlined: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
};

Select.defaultProps = {
  box: false,
  className: '',
  disabled: false,
  floatingLabelClassName: '',
  id: null,
  lineRippleClassName: '',
  nativeControlClassName: '',
  notchedOutlineClassName: '',
  outlined: false,
  options: [],
};

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
      this.foundation_.handleChange();
    }
    // this is mainly to layout if dir='rtl' / vice versa
    if (this.props.layout !== prevProps.layout) {
      this.foundation_.notchOutline(this.state.value.length > 0);
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
    };

    const labelAdapter = {
      floatLabel: (labelIsFloated) => this.setState({labelIsFloated}),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.labelWidth,
    };

    const lineRippleAdapter = {
      activateBottomLine: () => this.setState({activeLineRipple: true}),
      deactivateBottomLine: () => this.setState({activeLineRipple: false}),
    };

    const notchedOutlineAdapter = {
      notchOutline: () => this.setState({outlineIsNotched: true}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };

    return Object.assign({},
      rootAdapterMethods,
      labelAdapter,
      lineRippleAdapter,
      notchedOutlineAdapter,
    );
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
        {this.renderLabel()}
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
      floatingLabelClassName,
      layout,
      lineRippleClassName,
      notchedOutlineClassName,
      outlined,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <NativeControl
        className={nativeControlClassName}
        foundation={this.foundation_}
        syncSelectValue={(value) => this.setState({value})}
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

    return options.map((optionData, index) => {
      if (typeof optionData === 'string') {
        return (
          <option key={index} value={optionData}>{optionData}</option>
        );
      }

      const {label, ...nonLabelOptionData} = optionData;
      return (
        <option key={index} {...nonLabelOptionData}>{label}</option>
      );
    });
  }

  renderLabel(selectContainer) {
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  floatingLabelClassName: PropTypes.string,
  layout: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  layout: PropTypes.bool,
  lineRippleClassName: PropTypes.string,
  nativeControlClassName: PropTypes.string,
  notchedOutlineClassName: PropTypes.string,
  outlined: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])),
};

Select.defaultProps = {
  box: false,
  className: '',
  disabled: false,
  floatingLabelClassName: '',
  id: null,
  layout: false,
  lineRippleClassName: '',
  nativeControlClassName: '',
  notchedOutlineClassName: '',
  outlined: false,
  options: [],
};

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
import React from "react";
import classnames from "classnames";
import { MDCSelectFoundation } from "@material/select/dist/mdc.select";
import FloatingLabel from "@material/react-floating-label";
import LineRipple from "@material/react-line-ripple";
import NotchedOutline from "@material/react-notched-outline";
import NativeControl from "./NativeControl";
type Select = {
  declare interface Props {
    box?: boolean,
    className?: string,
    disabled?: boolean,
    floatingLabelClassName?: string,
    id?: string,
    isRtl?: boolean,
    label: string,
    lineRippleClassName?: string,
    nativeControlClassName?: string,
    notchedOutlineClassName?: string,
    onChange?: (...args: any[]) => any,
    outlined?: boolean,
    options?: (string | object)[],
    value?: string | number | boolean
  }
  declare interface State {
    classList: Set<any>,
    disabled: any,
    value: any,
    labelIsFloated: boolean,
    labelWidth: number,
    activeLineRipple: boolean,
    lineRippleCenter: null,
    outlineIsNotched: boolean
  }
}
export default class Select extends React.Component<SelectProps, SelectState> {
  foundation_ = null;
  constructor(props) {
    super(props);
    this.state = {
      classList: new Set(),
      disabled: props.disabled,
      value: props.value,
      // floating label state
      labelIsFloated: false,
      labelWidth: 0,
      // line ripple state
      activeLineRipple: false,
      lineRippleCenter: null,
      // notched outline state
      outlineIsNotched: false
    };
  }
  componentDidMount() {
    this.foundation_ = new MDCSelectFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.handleChange();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.foundation_.handleChange();
    }
  }
  componentWillUnmount() {
    this.foundation_.destroy();
  }
  onChange = evt => {
    this.props.onChange(evt);
    const { value } = evt.target;
    this.setState({ value });
  };
  /**
   * getters
   */
  get classes() {
    const { classList, disabled } = this.state;
    const { className, box, outlined } = this.props;
    return classnames("mdc-select", Array.from(classList), className, {
      "mdc-select--outlined": outlined,
      "mdc-select--disabled": disabled,
      "mdc-select--box": box
    });
  }
  get adapter() {
    const rootAdapterMethods = {
      addClass: className => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({ classList });
      },
      removeClass: className => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({ classList });
      },
      hasClass: className => this.classes.split(" ").includes(className),
      isRtl: () => this.props.isRtl,
      getValue: () => this.state.value
    };
    const labelAdapter = {
      floatLabel: labelIsFloated => this.setState({ labelIsFloated }),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.state.labelWidth
    };
    const lineRippleAdapter = {
      activateBottomLine: () => this.setState({ activeLineRipple: true }),
      deactivateBottomLine: () => this.setState({ activeLineRipple: false })
    };
    const notchedOutlineAdapter = {
      notchOutline: () => this.setState({ outlineIsNotched: true }),
      closeOutline: () => this.setState({ outlineIsNotched: false }),
      hasOutline: () => !!this.props.outlined
    };
    return Object.assign(
      {},
      rootAdapterMethods,
      labelAdapter,
      lineRippleAdapter,
      notchedOutlineAdapter
    );
  }
  /**
   * render methods
   */
  render() {
    return (
      <div className={this.classes}>
        {this.renderSelect()}
        {this.renderLabel()}
        {this.props.outlined
          ? this.renderNotchedOutline()
          : this.renderLineRipple()}
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
      isRtl,
      lineRippleClassName,
      notchedOutlineClassName,
      outlined,
      onChange,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    return (
      <NativeControl
        className={nativeControlClassName}
        foundation={this.foundation_}
        handleDisabled={disabled => this.setState({ disabled })}
        onChange={this.onChange}
        setRippleCenter={lineRippleCenter =>
          this.setState({ lineRippleCenter })
        }
        {...otherProps}
      >
        {this.renderOptions()}
      </NativeControl>
    );
  }
  renderOptions() {
    const { children, options } = this.props;
    const hasOptions = options && options.length;
    if (!hasOptions) {
      return children;
    }
    return options.map((optionData, index) => {
      if (typeof optionData === "string") {
        return (
          <option key={index} value={optionData}>
            {optionData}
          </option>
        );
      }
      const { label, ...nonLabelOptionData } = optionData;
      return (
        <option key={index} {...nonLabelOptionData}>
          {label}
        </option>
      );
    });
  }
  renderLabel() {
    const { id, label, floatingLabelClassName } = this.props;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.labelIsFloated}
        handleWidthChange={labelWidth => this.setState({ labelWidth })}
        htmlFor={id}
      >
        {label}
      </FloatingLabel>
    );
  }
  renderLineRipple() {
    const { lineRippleClassName } = this.props;
    const { activeLineRipple, lineRippleCenter } = this.state;
    return (
      <LineRipple
        rippleCenter={lineRippleCenter}
        className={lineRippleClassName}
        active={activeLineRipple}
      />
    );
  }
  renderNotchedOutline() {
    const { isRtl, notchedOutlineClassName } = this.props;
    const { outlineIsNotched, labelWidth } = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        isRtl={isRtl}
        notch={outlineIsNotched}
        notchWidth={labelWidth}
      />
    );
  }
}
Select.defaultProps = {
  box: false,
  className: "",
  disabled: false,
  floatingLabelClassName: "",
  id: null,
  isRtl: false,
  lineRippleClassName: "",
  nativeControlClassName: "",
  notchedOutlineClassName: "",
  onChange: () => {},
  outlined: false,
  options: [],
  value: ""
};

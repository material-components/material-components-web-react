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

import * as React from 'react';
import classnames from 'classnames';
// @ts-ignore no mdc .d.ts file
import {MDCSelectFoundation, MDCSelectAdapter} from '@material/select/dist/mdc.select';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';
import NativeControl from './NativeControl';

type SelectOptionsType = (string | React.HTMLProps<HTMLOptionElement>)[];

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  box?: boolean;
  className?: string;
  disabled?: boolean;
  floatingLabelClassName?: string;
  isRtl?: boolean;
  label?: string;
  lineRippleClassName?: string;
  nativeControlClassName?: string;
  notchedOutlineClassName?: string;
  outlined?: boolean;
  options?: SelectOptionsType;
  value?: string;
}

interface SelectState {
  value?: string;
  classList: Set<string>;
  disabled: boolean;
  labelIsFloated: boolean;
  labelWidth: number;
  activeLineRipple: boolean;
  lineRippleCenter?: number;
  outlineIsNotched: boolean;
};

export default class Select extends React.Component<SelectProps, SelectState> {
  foundation?: MDCSelectFoundation;

  constructor(props: SelectProps) {
    super(props);
    this.state = {
      classList: new Set(),
      disabled: props.disabled!,
      value: props.value,
      // floating label state
      labelIsFloated: false,
      labelWidth: 0,
      // line ripple state
      activeLineRipple: false,
      lineRippleCenter: undefined,
      // notched outline state
      outlineIsNotched: false,
    };
  }

  static defaultProps: Partial<SelectProps> = {
    box: false,
    className: '',
    disabled: false,
    floatingLabelClassName: '',
    isRtl: false,
    lineRippleClassName: '',
    nativeControlClassName: '',
    notchedOutlineClassName: '',
    outlined: false,
    options: [],
    onChange: () => {},
    value: '',
  };

  componentDidMount() {
    this.foundation = new MDCSelectFoundation(this.adapter);
    this.foundation.init();
    this.foundation.handleChange();
  }

  componentDidUpdate(prevProps: SelectProps, prevState: SelectState) {
    // this is to fix onChange being called twice
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value});
    }
    if (this.state.value !== prevState.value) {
      this.foundation.handleChange();
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }
  onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange && this.props.onChange(evt);
    const {value} = evt.target;
    this.setState({value});
  };

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

  get adapter(): MDCSelectAdapter {
    const rootAdapterMethods = {
      addClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const classList = new Set(this.state.classList);
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      isRtl: () => this.props.isRtl,
      getValue: () => this.state.value,
    };
    const labelAdapter = {
      floatLabel: (labelIsFloated: boolean) => this.setState({labelIsFloated}),
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
    return {
      ...rootAdapterMethods,
      ...labelAdapter,
      ...lineRippleAdapter,
      ...notchedOutlineAdapter,
    };
  }

  setRippleCenter = (lineRippleCenter: number) => this.setState({lineRippleCenter});
  setDisabled = (disabled: boolean) => this.setState({disabled});

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
      ref,
      value,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <NativeControl
        className={nativeControlClassName}
        foundation={this.foundation}
        handleDisabled={this.setDisabled}
        onChange={this.onChange}
        setRippleCenter={this.setRippleCenter}
        value={this.state.value}
        {...otherProps}
      >
        {this.renderOptions()}
      </NativeControl>
    );
  }

  renderOptions() {
    const {children, options} = this.props;

    if (options === undefined || !options.length) {
      return children;
    }

    return options.map((optionData, index) => {
      if (typeof optionData === 'string') {
        return (
          <option key={index} value={optionData}>
            {optionData}
          </option>
        );
      }

      const {label, ...nonLabelOptionData} = optionData;
      return (
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31485
        // @ts-ignore
        <option key={index} {...nonLabelOptionData}>
          {label}
        </option>
      );
    });
  }

  renderLabel() {
    const {id, label, floatingLabelClassName} = this.props;
    return (
      <FloatingLabel
        className={floatingLabelClassName}
        float={this.state.labelIsFloated}
        handleWidthChange={(labelWidth) => this.setState({labelWidth})}
        htmlFor={id}
      >
        {label}
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
    const {isRtl, notchedOutlineClassName} = this.props;
    const {outlineIsNotched, labelWidth} = this.state;
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

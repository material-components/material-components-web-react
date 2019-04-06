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
import {MDCSelectAdapter} from '@material/select/adapter';
import {MDCSelectFoundation} from '@material/select/foundation';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';
import NativeControl from './NativeControl';
import EnhancedSelect, {EnhancedChild, EnhancedSelectProps} from './EnhancedSelect';
import EnhancedOption, {EnhancedOptionProps} from './Option';

const {cssClasses} = MDCSelectFoundation;

type SelectOptionsType = (string | React.HTMLProps<HTMLOptionElement>)[];
type NativeChild = React.ReactElement<EnhancedOptionProps<HTMLElement>>
type SelectChildren<T extends HTMLElement> = EnhancedChild<T> | EnhancedChild<T>[] | NativeChild | NativeChild[];

export interface SelectProps<T extends HTMLElement = HTMLElement> extends React.HTMLProps<HTMLSelectElement> {
  box?: boolean;
  enhanced?: boolean;
  children?: SelectChildren<T>;
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
  afterChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | Pick<EnhancedSelectProps, 'handleSelected'>;
}

interface SelectState {
  open?: boolean;
  value: string;
  classList: Set<string>;
  disabled: boolean;
  labelIsFloated: boolean;
  labelWidth: number;
  activeLineRipple: boolean;
  lineRippleCenter?: number;
  outlineIsNotched: boolean;
};

export default class Select<T extends HTMLElement = HTMLElement> extends React.Component<SelectProps<T>, SelectState> {
  foundation?: MDCSelectFoundation;
  nativeControl = React.createRef<HTMLSelectElement>();

  constructor(props: SelectProps<T>) {
    super(props);
    this.state = {
      classList: new Set(),
      disabled: props.disabled!,
      value: props.value!,
      // floating label state
      labelIsFloated: false,
      labelWidth: 0,
      // line ripple state
      activeLineRipple: false,
      lineRippleCenter: undefined,
      // notched outline state
      outlineIsNotched: false,
      open: false,
    };
  }

  static defaultProps: Partial<SelectProps<HTMLElement>> = {
    box: false,
    enhanced: false,
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
    afterChange: () => {},
  };

  componentDidMount() {
    this.foundation = new MDCSelectFoundation(this.adapter);
    this.foundation.init();
    this.foundation.handleChange(false);
  }

  componentDidUpdate(prevProps: SelectProps<T>, prevState: SelectState) {
    // this is to fix onChange being called twice
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value!});
    }
    if (this.foundation && this.state.value !== prevState.value) {
      this.foundation.handleChange(true);
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  /**
   * getters
   */
  get classes() {
    const {classList, disabled} = this.state;
    const {className, required, outlined} = this.props;
    return classnames('mdc-select', Array.from(classList), className, {
      'mdc-select--outlined': outlined,
      'mdc-select--disabled': disabled,
      'mdc-select--required': required,
    });
  }

  get adapter(): MDCSelectAdapter {
    const {enhanced} = this.props;

    const commonAdapter = {
      addClass: this.addClass,
      removeClass: this.removeClass,
      hasClass: (className: string) => this.classes.split(' ').includes(className),
      setRippleCenter: this.setRippleCenter,
      getValue: () => this.state.value,
      setValue: (value: string) => this.setState({value}),
      setDisabled: this.setDisabled,
      // not implemented because react select element
      // does not support this API
      setSelectedIndex: () => {},
    };
    const nativeAdapter = {
      openMenu: () => this.setState({open: true}),
      closeMenu: this.closeMenu,
      isMenuOpen: () => this.state.open!,
      setValid: this.setValidClasses,
      checkValidity: () => {
        if (this.nativeControl.current) {
          return this.nativeControl.current.checkValidity();
        }
        return false;
      },
    };

    // TODO
    const enhancedAdapter = {
      openMenu: () => this.setState({open: true}),
      closeMenu: () => this.setState({open: false}),
      isMenuOpen: () => this.state.open!,
      setValid: this.setValidClasses,
      checkValidity: () => {
        if (this.nativeControl.current) {
          return this.nativeControl.current.checkValidity();
        }
        return false;
      },
    };

    const labelAdapter = {  
      floatLabel: (labelIsFloated: boolean) => this.setState({labelIsFloated}),
      getLabelWidth: () => this.state.labelWidth,
    };
    const lineRippleAdapter = {
      activateBottomLine: () => this.setState({activeLineRipple: true}),
      deactivateBottomLine: () => this.setState({activeLineRipple: false}),
      notifyChange: (value: string) => this.props.afterChange!(value),
    };
    const notchedOutlineAdapter = {
      notchOutline: () => this.setState({outlineIsNotched: true}),
      closeOutline: () => this.setState({outlineIsNotched: false}),
      hasOutline: () => !!this.props.outlined,
    };
    return {
      ...(enhanced ? enhancedAdapter : nativeAdapter),
      ...commonAdapter,
      ...labelAdapter,
      ...lineRippleAdapter,
      ...notchedOutlineAdapter,
    };
  }

  setRippleCenter = (lineRippleCenter: number) => this.setState({lineRippleCenter});
  setDisabled = (disabled: boolean) => this.setState({disabled});
  addClass = (className: string) => {
    const classList = new Set(this.state.classList);
    classList.add(className);
    this.setState({classList});
  };
  removeClass = (className: string) => {
    const classList = new Set(this.state.classList);
    classList.delete(className);
    this.setState({classList});
  };
  closeMenu = () => this.setState({open: false});

  setValidClasses = (isValid: boolean) => {
    if (isValid) {
      this.removeClass(cssClasses.INVALID);
    } else {
      this.addClass(cssClasses.INVALID);
    }
  }

  /**
   * render methods
   */
  render() {
    return (
      <div className={this.classes}>
        <i className='mdc-select__dropdown-icon'></i>
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
      enhanced,
      className,
      floatingLabelClassName,
      isRtl,
      lineRippleClassName,
      notchedOutlineClassName,
      outlined,
      ref,
      value,
      afterChange,
      /* eslint-enable */
      ...otherProps
    } = this.props;
    const {open} = this.state;

    if (enhanced) {
      return (
        // TODO: pass required and all props
        <EnhancedSelect
          open={open}
          closeMenu={this.closeMenu}
          foundation={this.foundation}
          handleSelected={this.props.onChange}
        >
          {this.renderOptions()}
        </EnhancedSelect>
      );
    }

    return (
      <NativeControl
        className={nativeControlClassName}
        foundation={this.foundation}
        handleDisabled={this.setDisabled}
        setRippleCenter={this.setRippleCenter}
        value={this.state.value}
        innerRef={this.nativeControl}
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

export {EnhancedOption};
export {
  MenuListDivider as EnhancedOptionDivider,
  MenuListGroup as EnhancedOptionGroup,
  MenuListGroupSubheader as EnhancedOptionGroupSubheader,
  MenuListItemGraphic as EnhancedOptionGraphic,
  MenuListItemMeta as EnhancedOptionMeta,
  MenuListItemText as EnhancedOptionText,
} from '@material/react-menu';
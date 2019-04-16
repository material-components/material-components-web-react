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
import classnames from 'classnames';
import {MDCSelectAdapter} from '@material/select/adapter';
import {MDCSelectFoundation} from '@material/select/foundation';
import FloatingLabel from '@material/react-floating-label';
import LineRipple from '@material/react-line-ripple';
import NotchedOutline from '@material/react-notched-outline';
import {BaseSelect, BaseSelectProps} from './BaseSelect';
import {EnhancedChild} from './EnhancedSelect';
import Option, {OptionProps} from './Option';
import {SelectHelperTextProps} from './helper-text/index';
import {SelectIconProps} from './icon/index';
import MDCSelectHelperTextFoundation from '@material/select/helper-text/foundation';

const {cssClasses} = MDCSelectFoundation;

type SelectOptionsType = (string | React.HTMLProps<HTMLOptionElement>)[];
type NativeChild = React.ReactElement<OptionProps<HTMLElement>>
type SelectChildren<T extends HTMLElement> = EnhancedChild<T> | EnhancedChild<T>[] | NativeChild | NativeChild[];

export interface SelectProps<T extends HTMLElement = HTMLElement> 
  extends React.HTMLProps<HTMLSelectElement> {
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
  value: string;
  afterChange?: (value: string) => void;
  onEnhancedChange?: (index: number, target: Element) => void;
  helperText?: React.ReactElement<SelectHelperTextProps>;
  leadingIcon?: React.ReactElement<SelectIconProps>;
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
  selectElement: React.RefObject<HTMLDivElement>;
  isInvalid: boolean;
  helperTextFoundation?: MDCSelectHelperTextFoundation;
  foundation?: MDCSelectFoundation;
};

export default class Select<T extends HTMLElement = HTMLSelectElement> extends React.Component<SelectProps<T>, SelectState> {
  nativeControl = React.createRef<HTMLSelectElement>();

  // These Sets are needed because setState({classList}) is asynchronous.
  // This is an issue during a foundation.handleBlur call, when the 
  // focus class is being removed, and an adapter.hasClass() is immediately
  // called after that.
  classesBeingRemoved = new Set();
  classesBeingAdded = new Set();
  
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
      selectElement: React.createRef<HTMLDivElement>(),
      isInvalid: false,
      helperTextFoundation: undefined,
      foundation: undefined,
    };
  }

  static defaultProps: Partial<SelectProps<HTMLElement>> = {
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
    onEnhancedChange: () => {},
    value: '',
    afterChange: () => {},
  };

  componentDidMount() {
    this.createFoundation(() => {
      this.state.foundation!.handleChange(false);
    });
  }

  componentDidUpdate(prevProps: SelectProps<T>, prevState: SelectState) {
    // this is to fix onChange being called twice
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value!});
    }
    if (this.state.foundation && this.state.value !== prevState.value) {
      this.state.foundation.handleChange(true);
    }
    if (this.state.helperTextFoundation !== prevState.helperTextFoundation) {
      this.destroyFoundation();
      this.createFoundation();
    }
  }

  componentWillUnmount() {
    this.destroyFoundation();
  }

  /**
   * getters
   */
  get classes() {
    const {classList, disabled} = this.state;
    const {className, leadingIcon, required, outlined} = this.props;
    return classnames('mdc-select', Array.from(classList), className, {
      'mdc-select--outlined': outlined,
      'mdc-select--disabled': disabled,
      'mdc-select--required': required,
      'mdc-select--with-leading-icon': leadingIcon,
    });
  }

  get adapter(): MDCSelectAdapter {
    const {enhanced} = this.props;

    const commonAdapter = {
      addClass: this.addClass,
      removeClass: this.removeClass,
      hasClass: (className: string) => {
        // See comment aboe about classesBeingAdded/classesBeingRemoved
        const hasClass = this.classes.split(' ').includes(className);
        const isBeingAdded = this.classesBeingAdded.has(className);
        const isBeingRemoved = this.classesBeingRemoved.has(className);
        return (hasClass || isBeingAdded) && !isBeingRemoved;
      },
      setRippleCenter: this.setRippleCenter,
      getValue: () => this.state.value,
      setValue: (value: string) => this.setState({value}),
      setDisabled: (disabled: boolean) => this.setState({disabled}),
      // not implemented because react select element
      // does not support this API
      setSelectedIndex: () => {},
      closeMenu: this.closeMenu,
      openMenu: () => this.setState({open: true}),
    };
    const nativeAdapter = {
      // native select does not utilize this.props.open
      isMenuOpen: () => false,
      checkValidity: () => {
        if (this.nativeControl.current) {
          return this.nativeControl.current.checkValidity();
        }
        return false;
      },
      setValid: this.setValidClasses,
    };

    const enhancedAdapter = {
      isMenuOpen: () => this.state.open!,
      checkValidity: () => {
        if (!this.props.disabled && this.props.required) {
          return Boolean(this.state.value);
        }
        return true;
      },
      setValid: (isValid: boolean) => {
        this.setState({isInvalid: !isValid});
        this.setValidClasses(isValid);
      }
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

  get foundationMap() {
    const {helperTextFoundation} = this.state;
    return {
      helperText: helperTextFoundation ? helperTextFoundation : undefined,
      // leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
    };
  }

  createFoundation = (callback?: () => void) => {
    const foundation = new MDCSelectFoundation(this.adapter, this.foundationMap);
    foundation.init();
    this.setState({foundation}, callback);
  }

  destroyFoundation = () => {
    if (this.state.foundation) {
      this.state.foundation.destroy();
    }
  }

  setRippleCenter = (lineRippleCenter: number) => this.setState({lineRippleCenter});

  addClass = (className: string) => {
    // See comment above about classesBeingAdded/classesBeingRemoved
    this.classesBeingAdded.add(className);
    this.setState((prevState) => {
      const classList = new Set(prevState.classList);
      classList.add(className);
      return {classList};
    }, () => {
      this.classesBeingAdded.delete(className);
    });
  };
  removeClass = (className: string) => {
    // See comment above about classesBeingAdded/classesBeingRemoved
    this.classesBeingRemoved.add(className);
    this.setState((prevState) => {
      const classList = new Set(prevState.classList);
      classList.delete(className);
      return {classList};
    }, () => {
      this.classesBeingRemoved.delete(className);
    });
  };
  closeMenu = () => this.setState({open: false});

  setValidClasses = (isValid: boolean) => {
    if (isValid) {
      this.removeClass(cssClasses.INVALID);
    } else {
      this.addClass(cssClasses.INVALID);
    }
  }

  getHelperTextFoundation = (helperTextFoundation: MDCSelectHelperTextFoundation) => {
    this.setState({helperTextFoundation});
  }

  /**
   * render methods
   */
  render() {
    const {leadingIcon} = this.props;
    return (
      <React.Fragment>
        <div className={this.classes} ref={this.state.selectElement}>
          {leadingIcon ? leadingIcon : null}
          <i className='mdc-select__dropdown-icon'></i>
          {this.renderSelect()}
          {this.renderLabel()}
          {this.props.outlined
            ? this.renderNotchedOutline()
            : this.renderLineRipple()}
        </div>
        {this.renderHelperText()}
      </React.Fragment>
    );
  }

  renderSelect() {
    const {
      nativeControlClassName,
      /* eslint-disable */
      floatingLabelClassName,
      isRtl,
      lineRippleClassName,
      notchedOutlineClassName,
      outlined,
      ref,
      value: propsValue,
      afterChange,
      onEnhancedChange,
      helperText,
      leadingIcon,
      /* eslint-enable */
      enhanced,
      ...otherProps
    } = this.props;
    const {open, selectElement, isInvalid, value} = this.state;

    const enhancedProps = {
      onEnhancedChange,
      closeMenu: this.closeMenu,
      anchorElement: selectElement!.current,
      enhanced,
      isInvalid,
    };

    return (
      <BaseSelect
        open={open}
        value={value}
        innerRef={this.nativeControl}
        foundation={this.state.foundation}
        className={enhanced ? '' : nativeControlClassName}
        {...(enhanced ? enhancedProps : {})}
        {...otherProps as BaseSelectProps<T>}
      >
        {this.renderOptions()}
      </BaseSelect>
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
    const {notchedOutlineClassName} = this.props;
    const {outlineIsNotched, labelWidth} = this.state;
    return (
      <NotchedOutline
        className={notchedOutlineClassName}
        notch={outlineIsNotched}
        notchWidth={labelWidth}
      />
    );
  }

  renderHelperText() {
    const {helperText} = this.props;
    if (!helperText) return;
    const props = {
      ...helperText.props,
      getHelperTextFoundation: this.getHelperTextFoundation,
    } as SelectHelperTextProps;
    return React.cloneElement(helperText, props);
  }
}

export {
  SelectHelperText,
  SelectHelperTextProps,
} from './helper-text';
export {
  SelectIcon,
  SelectIconProps,
} from './icon';

export {Option};
export {
  MenuListDivider as OptionDivider,
  MenuListGroup as OptionGroup,
  MenuListGroupSubheader as OptionGroupSubheader,
  MenuListItemGraphic as OptionGraphic,
  MenuListItemMeta as OptionMeta,
  MenuListItemText as OptionText,
} from '@material/react-menu';
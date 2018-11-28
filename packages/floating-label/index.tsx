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
import {MDCFloatingLabelFoundation} from '@material/floating-label';

export type FloatingLabelProps<T> = Props & React.LabelHTMLAttributes<T>;

type Props = {
  className?: string,
  handleWidthChange?: (width: number) => void,
  float?: boolean,
};

type FloatingLabelState = {
  classList: Set<String>,
};

export default class FloatingLabel extends React.Component<
  FloatingLabelProps<object>,
  FloatingLabelState
  > {
  foundation_: null | MDCFloatingLabelFoundation;
  labelElement: React.RefObject<HTMLLabelElement>;

  static defaultProps = {
    className: '',
    float: false,
  };

  constructor(props) {
    super(props);
    this.labelElement = React.createRef();
  }
  state = {
    classList: new Set(),
  };
  componentDidMount() {
    this.initializeFoundation();
    this.handleWidthChange();
    if (this.props.float) {
      this.foundation_.float(true);
    }
  }
  componentWillUnmount() {
    this.foundation_.destroy();
  }
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.handleWidthChange();
    }
    if (this.props.float !== prevProps.float) {
      this.foundation_.float(this.props.float);
    }
  }
  initializeFoundation = () => {
    this.foundation_ = new MDCFloatingLabelFoundation(this.adapter);
    this.foundation_.init();
  };
  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-floating-label', Array.from(classList), className);
  }
  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: this.removeClassFromClassList,
    };
  }
  // must be called via ref
  shake = () => {
    this.foundation_.shake(true);
  };

  removeClassFromClassList = (className) => {
    const {classList} = this.state;
    classList.delete(className);
    this.setState({classList});
  };

  handleWidthChange = () => {
    const {handleWidthChange} = this.props;
    if (handleWidthChange && this.labelElement.current) {
      handleWidthChange(this.labelElement.current.offsetWidth);
    }
  };

  onShakeEnd = () => {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    this.removeClassFromClassList(LABEL_SHAKE);
  };

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      children,
      handleWidthChange, // eslint-disable-line no-unused-vars
      float, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <label
        className={this.classes}
        ref={this.labelElement}
        onAnimationEnd={this.onShakeEnd}
        {...otherProps}
      >
        {children}
      </label>
    );
  }
}

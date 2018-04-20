import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCFloatingLabelFoundation} from '@material/floating-label';

export default class FloatingLabel extends React.Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    this.labelElement = React.createRef();
  }

  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.initializeFoundation();
    this.setWidth();

    if (this.props.shouldFloat) {
      this.foundation_.float(true);
    }
    if (this.props.shouldShake) {
      this.foundation_.shake(true);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shouldFloat !== nextProps.shouldFloat) {
      this.foundation_.float(nextProps.shouldFloat);
    }
    if (this.props.shouldShake !== nextProps.shouldShake) {
      this.foundation_.shake(nextProps.shouldShake);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.setWidth();
    }
  }

  initializeFoundation = () => {
    this.foundation_ = new MDCFloatingLabelFoundation(this.adapter);
    this.foundation_.init();
  }

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

  removeClassFromClassList = (className) => {
    const {classList} = this.state;
    classList.delete(className);
    this.setState({classList});
  }

  setWidth = () => {
    const {setWidth} = this.props;
    if (setWidth && typeof setWidth === 'function') {
      setWidth(this.labelElement.current.offsetWidth);
    }
  }

  onShakeEnd = () => {
    const {onShakeEnd} = this.props;
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    this.removeClassFromClassList(LABEL_SHAKE);
    if (onShakeEnd && typeof onShakeEnd === 'function') {
      onShakeEnd();
    }
  }

  render() {
    const {
      className,
      children,
      onShakeEnd,
      setWidth,
      shouldFloat,
      shouldShake,
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

FloatingLabel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onShakeEnd: PropTypes.func,
  setWidth: PropTypes.func,
  shouldFloat: PropTypes.bool,
  shouldShake: PropTypes.bool,
};

FloatingLabel.defaultProps = {
  className: '',
  onShakeEnd: () => {},
  setWidth: () => {},
  shouldFloat: false,
  shouldShake: false,
};

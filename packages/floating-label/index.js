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
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shouldFloat !== nextProps.shouldFloat) {
      this.foundation_.float(nextProps.shouldFloat);
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

  // must be called via ref
  shake = () => {
    this.foundation_.shake(true);
  }

  removeClassFromClassList = (className) => {
    const {classList} = this.state;
    classList.delete(className);
    this.setState({classList});
  }

  setWidth = () => {
    const {setWidth} = this.props;
    if (setWidth && typeof setWidth === 'function' && this.labelElement.current) {
      setWidth(this.labelElement.current.offsetWidth);
    }
  }

  onShakeEnd = () => {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    this.removeClassFromClassList(LABEL_SHAKE);
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      children,
      setWidth, // eslint-disable-line no-unused-vars
      shouldFloat, // eslint-disable-line no-unused-vars
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
  setWidth: PropTypes.func,
  shouldFloat: PropTypes.bool,
};

FloatingLabel.defaultProps = {
  className: '',
  setWidth: () => {},
  shouldFloat: false,
};

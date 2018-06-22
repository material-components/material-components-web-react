import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCLineRippleFoundation} from '@material/line-ripple';

export default class LineRipple extends Component {

  foundation_ = null;

  state = {
    classList: new Set(),
    style: {},
  };

  componentDidMount() {
    this.foundation_ = new MDCLineRippleFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.active) {
      this.foundation_.activate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      if (nextProps.active) {
        this.foundation_.activate();
      } else {
        this.foundation_.deactivate();
      }
    }
    if (this.props.rippleCenter !== nextProps.rippleCenter) {
      this.foundation_.setRippleCenter(nextProps.rippleCenter);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.state.classList.has(className),
      setStyle: this.setStyle,
    };
  }

  get classes() {
    const {className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-line-ripple', Array.from(classList), className);
  }

  setStyle = (varName, value) => {
    const styleName = varName.replace(/-(\w)/g, (_, v) => v.toUpperCase());
    const updatedStyle = Object.assign({}, this.state.style);
    updatedStyle[styleName] = value;
    this.setState({style: updatedStyle});
  }

  getMergedStyles = () => {
    const {style: wrappedStyle} = this.props;
    const {style} = this.state;
    return Object.assign({}, style, wrappedStyle);
  }

  render() {
    const {
      style, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      active, // eslint-disable-line no-unused-vars
      rippleCenter, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    return (
      <div
        className={this.classes}
        style={this.getMergedStyles()}
        onTransitionEnd={(evt) => this.foundation_.handleTransitionEnd(evt)}
        {...otherProps}></div>
    );
  }
}

LineRipple.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool,
  rippleCenter: PropTypes.number,
};

LineRipple.defaultProps = {
  className: '',
  style: {},
  active: false,
  rippleCenter: 0,
};

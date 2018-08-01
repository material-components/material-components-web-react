import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import NativeControl from './NativeControl';
// import withRipple from '../ripple';
// import {MDCSwitchFoundation} from '@material/switch/dist/mdc.switch';

export class Switch extends Component {
  foundation_ = null;
  state = {
    classList: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCSwitchFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-switch', Array.from(classList), className);
  }

  get adapter() {
    return {
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
    };
  }

  handleClick = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.handleClick}
        {...otherProps}
      >
        <div className='mdc-switch__track' />
        <div className='mdc-switch__thumb-underlay'>
          <div className='mdc-switch__thumb'>
            <NativeControl id={id} />
          </div>
        </div>
      </div>
    );
  }
}

Switch.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Switch.defaultProps = {
  className: '',
  onClick: () => {}
};

export default Switch; // TODO: add ripple

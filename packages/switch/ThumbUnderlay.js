import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withRipple from '@material/react-ripple';

export class ThumbUnderlay extends React.Component {

  init = (el) => {
    this.props.initRipple(el, this.props.rippleActivator);
  }

  get classes() {
    return classnames('mdc-switch__thumb-underlay', this.props.className);
  }

  render() {
    const {
      children,
      /* eslint-disable */
      className,
      initRipple,
      unbounded,
      rippleActivator,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        ref={this.init}
        {...otherProps}
      >
        <div className='mdc-switch__thumb'>
          {children}
        </div>
      </div>
    );
  }
}

ThumbUnderlay.propTypes = {
  className: PropTypes.string,
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  rippleActivator: PropTypes.element.isRequired,
};

ThumbUnderlay.defaultProps = {
  className: '',
  onChange: () => {},
  initRipple: () => {},
  unbounded: true,
};

export default withRipple(ThumbUnderlay);

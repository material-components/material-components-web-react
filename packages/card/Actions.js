import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Actions extends React.Component {

  render() {
    const {
      className,
      children,
      fullBleed,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__actions', className, {
      'mdc-card__actions--full-bleed': fullBleed,
    });

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

Actions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fullBleed: PropTypes.bool,
};

Actions.defaultProps = {
  className: '',
  children: null,
  fullBleed: false,
};

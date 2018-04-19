import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class PrimaryContent extends React.Component {

  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__primary-action', className);

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

PrimaryContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

PrimaryContent.defaultProps = {
  className: '',
  children: null,
};

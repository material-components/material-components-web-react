import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Row = (props) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid__inner', className);

  return (
    <div classNames={classes} {...otherProps}>{children}</div>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Row.defaultProps = {
  className: '',
};

export default Row;

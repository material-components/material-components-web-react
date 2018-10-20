import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Row = (props) => {
  const {
    children,
    className,
    tag: Tag,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid__inner', className);

  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Row.defaultProps = {
  className: '',
  tag: 'div',
};

export default Row;

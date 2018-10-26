import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Body2 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--body2', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Body2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Body2.defaultProps = {
  className: '',
  tag: 'p',
};

export default Body2;

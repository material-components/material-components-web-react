import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Body1 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--body1', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Body1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Body1.defaultProps = {
  className: '',
  tag: 'p',
};

export default Body1;

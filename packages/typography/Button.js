import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Button = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--button', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  tag: 'span',
};

export default Button;

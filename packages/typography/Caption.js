import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Caption = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--caption', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Caption.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Caption.defaultProps = {
  className: '',
  tag: 'span',
};

export default Caption;

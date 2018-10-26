import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline6 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline6', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline6.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline6.defaultProps = {
  className: '',
  tag: 'h6',
};

export default Headline6;

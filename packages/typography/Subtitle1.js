import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Subtitle1 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--subtitle1', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Subtitle1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Subtitle1.defaultProps = {
  className: '',
  tag: 'h6',
};

export default Subtitle1;

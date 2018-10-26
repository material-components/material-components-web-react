import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline2 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline2', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline2.defaultProps = {
  className: '',
  tag: 'h2',
};

export default Headline2;

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline5 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline5', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline5.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline5.defaultProps = {
  className: '',
  tag: 'h5',
};

export default Headline5;

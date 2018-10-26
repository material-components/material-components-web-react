import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline4 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline4', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline4.defaultProps = {
  className: '',
  tag: 'h4',
};

export default Headline4;

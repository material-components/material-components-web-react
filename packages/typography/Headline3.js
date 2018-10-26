import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline3 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline3', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline3.defaultProps = {
  className: '',
  tag: 'h3',
};

export default Headline3;

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Headline1 = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--headline1', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Headline1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Headline1.defaultProps = {
  className: '',
  tag: 'h1',
};

export default Headline1;

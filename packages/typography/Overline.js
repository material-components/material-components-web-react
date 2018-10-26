import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Overline = (props) => {
  const {children, className, tag: Tag, ...otherProps} = props;
  const classes = classnames('mdc-typography', 'mdc-typography--overline', className);
  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Overline.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

Overline.defaultProps = {
  className: '',
  tag: 'span',
};

export default Overline;

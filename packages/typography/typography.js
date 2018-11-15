import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const typographyHOC = (options) => {
  const {tag, classModifier} = options;

  const Typography = (props) => {
    const {children, className, tag: Tag, ...otherProps} = props;
    const classes = classnames('mdc-typography', `mdc-typography--${classModifier}`, className);
    return (
      <Tag className={classes} {...otherProps}>{children}</Tag>
    );
  };

  Typography.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    tag: PropTypes.string,
  };

  Typography.defaultProps = {
    className: '',
    tag,
  };

  return Typography;
};

export default typographyHOC;

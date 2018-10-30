import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerContent = (props) => {
  const {
    tag: Tag,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Tag
      className={classnames('mdc-drawer__content', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

DrawerContent.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerContent.defaultProps = {
  tag: 'div',
  className: '',
};

export default DrawerContent;

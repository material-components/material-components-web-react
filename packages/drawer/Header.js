import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerHeader = (props) => {
  const {
    tag: Tag,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Tag
      className={classnames('mdc-drawer__header', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

DrawerHeader.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerHeader.defaultProps = {
  tag: 'div',
  className: '',
};

export default DrawerHeader;

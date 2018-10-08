import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerAppContent = (props) => {
  const {
    tag: Tag,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Tag
      className={classnames('mdc-drawer-app-content', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

DrawerAppContent.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerAppContent.defaultProps = {
  tag: 'div',
  className: '',
};

export default DrawerAppContent;

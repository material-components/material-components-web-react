import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerSubTitle = (props) => {
  const {
    tag: Tag,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Tag
      className={classnames('mdc-drawer__subtitle', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

DrawerSubTitle.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerSubTitle.defaultProps = {
  tag: 'h6',
  className: '',
};

export default DrawerSubTitle;

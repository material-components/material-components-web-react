import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerTitle = (props) => {
  const {
    tag: Tag,
    className,
    ...otherProps
  } = props;
  return (
    <Tag
      className={classnames('mdc-drawer__title', className)}
      {...otherProps}
    >
      {props.children}
    </Tag>
  );
};

DrawerTitle.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerTitle.defaultProps = {
  tag: 'h3',
  className: '',
};

export default DrawerTitle;

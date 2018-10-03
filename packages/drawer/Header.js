import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerHeader = (props) => {
  const {
    elementType: Element,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Element
      className={classnames('mdc-drawer__header', className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
}

DrawerHeader.propTypes = {
  elementType: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerHeader.defaultProps = {
  elementType: 'div',
  className: '',
};

export default DrawerHeader;

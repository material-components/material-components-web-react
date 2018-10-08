import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerAppContent = (props) => {
  const {
    elementType: Element,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Element
      className={classnames('mdc-drawer-app-content', className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
};

DrawerAppContent.propTypes = {
  elementType: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerAppContent.defaultProps = {
  elementType: 'div',
  className: '',
};

export default DrawerAppContent;

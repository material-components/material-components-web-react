import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerContent = (props) => {
  const {
    elementType: Element,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Element
      className={classnames('mdc-drawer__content', className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
};

DrawerContent.propTypes = {
  elementType: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerContent.defaultProps = {
  elementType: 'div',
  className: '',
};

export default DrawerContent;

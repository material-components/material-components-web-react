import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerSubTitle = (props) => {
  const {
    elementType: Element,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <Element
      className={classnames('mdc-drawer__subtitle', className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
}

DrawerSubTitle.propTypes = {
  elementType: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerSubTitle.defaultProps = {
  elementType: 'h6',
  className: '',
};

export default DrawerSubTitle;

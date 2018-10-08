import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrawerTitle = (props) => {
  const {
    elementType: Element,
    className,
    ...otherProps
  } = props;
  return (
    <Element
      className={classnames('mdc-drawer__title', className)}
      {...otherProps}
    >
      {props.children}
    </Element>
  );
};

DrawerTitle.propTypes = {
  elementType: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DrawerTitle.defaultProps = {
  elementType: 'h3',
  className: '',
};

export default DrawerTitle;

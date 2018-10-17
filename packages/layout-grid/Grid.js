import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Grid = (props) => {
  const {
    align,
    children,
    className,
    fixedColumnWidth,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid', className, {
    [`mdc-layout-grid--align-${align}`]: !!align,
    'mdc-layout-grid--fixed-column-width': fixedColumnWidth,
  });

  return (
    <div classNames={classes} {...otherProps}>{children}</div>
  );
};

Grid.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fixedColumnWidth: PropTypes.bool,
};

Grid.defaultProps = {
  align: undefined,
  className: '',
  fixedColumnWidth: false,
};

export default Grid;

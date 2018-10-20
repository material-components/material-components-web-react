import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Grid = (props) => {
  const {
    align,
    children,
    className,
    fixedColumnWidth,
    tag: Tag,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid', className, {
    [`mdc-layout-grid--align-${align}`]: !!align,
    'mdc-layout-grid--fixed-column-width': fixedColumnWidth,
  });

  return (
    <Tag className={classes} {...otherProps}>{children}</Tag>
  );
};

Grid.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fixedColumnWidth: PropTypes.bool,
  tag: PropTypes.string,
};

Grid.defaultProps = {
  align: undefined,
  className: '',
  fixedColumnWidth: false,
  tag: 'div',
};

export default Grid;

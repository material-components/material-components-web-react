import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Cell = (props) => {
  const {
    align,
    children,
    className,
    columns,
    desktopColumns,
    order,
    phoneColumns,
    tabletColumns,
    tag: Tag,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid__cell', className, {
    [`mdc-layout-grid__cell--align-${align}`]: !!align,
    [`mdc-layout-grid__cell--order-${order}`]: !!order,
    [`mdc-layout-grid__cell--span-${columns}`]: !!columns,
    [`mdc-layout-grid__cell--span-${desktopColumns}-desktop`]: !!desktopColumns,
    [`mdc-layout-grid__cell--span-${phoneColumns}-phone`]: !!phoneColumns,
    [`mdc-layout-grid__cell--span-${tabletColumns}-tablet`]: !!tabletColumns,
  });

  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

Cell.propTypes = {
  align: PropTypes.oneOf(['bottom', 'middle', 'top']),
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  desktopColumns: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  order: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  phoneColumns: PropTypes.oneOf([1, 2, 3, 4]),
  tabletColumns: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  tag: PropTypes.string,
};

Cell.defaultProps = {
  align: undefined,
  children: undefined,
  className: '',
  columns: undefined,
  desktopColumns: undefined,
  order: undefined,
  phoneColumns: undefined,
  tabletColumns: undefined,
  tag: 'div',
};

export default Cell;

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Cell = (props) => {
  const {
    align,
    children,
    className,
    columns,
    desktop,
    order,
    phone,
    tablet,
    tag: Tag,
    ...otherProps
  } = props;

  const classes = classnames('mdc-layout-grid__cell', className, {
    [`mdc-layout-grid__cell--align-${align}`]: !!align,
    [`mdc-layout-grid__cell--order-${order}`]: !!order,
    [`mdc-layout-grid__cell--span-${columns}`]: !!columns,
    [`mdc-layout-grid__cell--span-${desktop}-desktop`]: !!desktop,
    [`mdc-layout-grid__cell--span-${phone}-phone`]: !!phone,
    [`mdc-layout-grid__cell--span-${tablet}-tablet`]: !!tablet,
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
  desktop: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  order: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  phone: PropTypes.oneOf([1, 2, 3, 4]),
  tablet: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  tag: PropTypes.string,
};

Cell.defaultProps = {
  align: undefined,
  children: undefined,
  className: '',
  columns: undefined,
  desktop: undefined,
  order: undefined,
  phone: undefined,
  tablet: undefined,
  tag: 'div',
};

export default Cell;

import * as React from 'react';
import * as classnames from 'classnames';

export type TwelveColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type FourColumn = 1 | 2 | 3 | 4;
export type EightColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Alignment = 'bottom' | 'middle' | 'top';

export interface CellProps<T> extends React.HTMLProps<T> {
  align?: Alignment,
  className?: string,
  columns?: TwelveColumn,
  desktopColumns?: TwelveColumn,
  order?: TwelveColumn,
  phoneColumns?: FourColumn,
  tabletColumns?: EightColumn,
  tag?: string
};

const Cell: <T extends {} = HTMLDivElement>(props: CellProps<T>) => React.ReactElement<any> = ({
  /* eslint-disable react/prop-types */
  align,
  children,
  className = '',
  columns,
  desktopColumns,
  order,
  phoneColumns,
  tabletColumns,
  tag: Tag = 'div',
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const classes = classnames('mdc-layout-grid__cell', className, {
    [`mdc-layout-grid__cell--align-${align}`]: !!align,
    [`mdc-layout-grid__cell--order-${order}`]: !!order,
    [`mdc-layout-grid__cell--span-${columns}`]: !!columns,
    [`mdc-layout-grid__cell--span-${desktopColumns}-desktop`]: !!desktopColumns,
    [`mdc-layout-grid__cell--span-${phoneColumns}-phone`]: !!phoneColumns,
    [`mdc-layout-grid__cell--span-${tabletColumns}-tablet`]: !!tabletColumns,
  });

  return (
    // https://github.com/Microsoft/TypeScript/issues/28892
    // @ts-ignore
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Cell;

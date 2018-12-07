import * as React from "react";
import * as classnames from "classnames";

export declare type TwelveColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare type FourColumn = 1 | 2 | 3 | 4;
export declare type EightColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare type Alignment = "bottom" | "middle" | "top";

export interface CellProps {
  align?: Alignment,
  className: string,
  columns?: TwelveColumn,
  desktopColumns?: TwelveColumn,
  order?: TwelveColumn,
  phoneColumns?: FourColumn,
  tabletColumns?: EightColumn,
  tag: string
};

const Cell: React.FunctionComponent<CellProps & React.HTMLProps<HTMLElement>> = ({
  align,
  children,
  className = '',
  columns,
  desktopColumns,
  order,
  phoneColumns,
  tabletColumns,
  tag: Tag = 'div',
  ...otherProps
}) => {

  const classes = classnames("mdc-layout-grid__cell", className, {
    [`mdc-layout-grid__cell--align-${align}`]: !!align,
    [`mdc-layout-grid__cell--order-${order}`]: !!order,
    [`mdc-layout-grid__cell--span-${columns}`]: !!columns,
    [`mdc-layout-grid__cell--span-${desktopColumns}-desktop`]: !!desktopColumns,
    [`mdc-layout-grid__cell--span-${phoneColumns}-phone`]: !!phoneColumns,
    [`mdc-layout-grid__cell--span-${tabletColumns}-tablet`]: !!tabletColumns
  });

  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};
export default Cell;

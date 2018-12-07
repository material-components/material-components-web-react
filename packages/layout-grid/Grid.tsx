import * as React from "react";
import * as classnames from "classnames";

export interface GridProps {
  align?: Alignment,
  className?: string,
  fixedColumnWidth?: boolean,
  tag?: string
};
export declare type Alignment = "left" | "right";

const Grid: React.FunctionComponent<GridProps> = props => {
  const {
    align,
    children,
    className = '',
    fixedColumnWidth = false,
    tag: Tag = 'div',
    ...otherProps
  } = props;
  const classes = classnames("mdc-layout-grid", className, {
    [`mdc-layout-grid--align-${align}`]: !!align,
    "mdc-layout-grid--fixed-column-width": fixedColumnWidth
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Grid;

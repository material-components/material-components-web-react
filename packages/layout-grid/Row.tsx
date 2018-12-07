import * as React from "react";
import * as classnames from "classnames";

export interface RowProps {
  className?: string,
  tag?: string
};

const Row: React.FunctionComponent<RowProps> = ({
  children = '', className, tag: Tag = 'div', ...otherProps
}) => {
  const classes = classnames("mdc-layout-grid__inner", className);

  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Row;

import * as React from 'react';
import * as classnames from 'classnames';

export interface RowProps {
  className?: string,
  tag?: string
};

const Row: <T extends {} = HTMLDivElement>(props: RowProps & React.HTMLProps<T>) => React.ReactElement<any> = ({
  children = '', className, tag: Tag = 'div', ...otherProps // eslint-disable-line react/prop-types
}) => {
  const classes = classnames('mdc-layout-grid__inner', className);

  return (
    // https://github.com/Microsoft/TypeScript/issues/28892
    // @ts-ignore
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Row;

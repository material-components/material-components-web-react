import * as React from 'react';
import * as classnames from 'classnames';

export interface RowProps<T> extends React.HTMLProps<T> {
  className?: string,
  tag?: string
};

const Row: <T extends {} = HTMLDivElement>(props: RowProps<T>) => React.ReactElement<any> = ({
  /* eslint-disable react/prop-types */
  children = '',
  className,
  tag: Tag = 'div',
  ...otherProps
  /* eslint-enable react/prop-types */
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

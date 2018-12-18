import * as React from 'react';
import * as classnames from 'classnames';

export type Alignment = 'left' | 'right';
export interface GridProps<T> extends React.HTMLProps<T> {
  align?: Alignment,
  className?: string,
  fixedColumnWidth?: boolean,
  tag?: string
};

const Grid: <T extends {} = HTMLDivElement>(props: GridProps<T>) => React.ReactElement<any> = ({
  /* eslint-disable react/prop-types */
  align,
  children,
  className = '',
  fixedColumnWidth = false,
  tag: Tag = 'div',
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const classes = classnames('mdc-layout-grid', className, {
    [`mdc-layout-grid--align-${align}`]: !!align,
    'mdc-layout-grid--fixed-column-width': fixedColumnWidth,
  });
  return (
    // https://github.com/Microsoft/TypeScript/issues/28892
    // @ts-ignore
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Grid;
